'use client'

import { GlassCard } from 'react-glass-ui'
import { ReactNode, useEffect, useState } from 'react'

interface GlassWrapperProps {
  children: ReactNode
  flexibility?: number
  distortion?: number
  blur?: number
  backgroundOpacity?: number
  backgroundColor?: string
  borderSize?: number
  borderColor?: string
  borderRadius?: number
  padding?: string
  className?: string
}

export function GlassWrapper({
  children,
  flexibility = 3, /* Increase for better mouse tracking */
  distortion: targetDistortion = 30,
  blur = 2,
  backgroundOpacity = 0.3,
  backgroundColor = 'var(--colors-card-background)',
  borderSize = 1,
  borderColor = 'var(--colors-card-border)',
  borderRadius = 6,
  padding = '0',
  className,
}: GlassWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentDistortion, setCurrentDistortion] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animate distortion value manually for smoother SVG filter transition
  useEffect(() => {
    let frame: number
    const animate = () => {
      const target = isHovered || isMobile ? targetDistortion : 0
      setCurrentDistortion((prev) => {
        const diff = target - prev
        if (Math.abs(diff) < 0.1) return target
        return prev + diff * 0.15 // Smooth easing
      })
      frame = requestAnimationFrame(animate)
    }
    
    if (isMounted) {
      frame = requestAnimationFrame(animate)
    }
    
    return () => cancelAnimationFrame(frame)
  }, [isHovered, isMounted, targetDistortion])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      data-glass-hover={isHovered || isMobile}
      style={{
        borderRadius,
        position: 'relative',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isHovered ? 'scale(1.02) translateY(-2px)' : 'scale(1) translateY(0)',
        zIndex: isHovered ? 10 : 0,
      }}
    >
      <style jsx global>{`
        /* Base state: hide glass layers and set initial scale for magnifying effect */
        .glass-ui-distortion-layer,
        .glass-ui-background-layer,
        .glass-ui-border-layer,
        .glass-ui-inner-light,
        .glass-ui-outer-light {
          opacity: 0 !important;
          transform: scale(0.98) !important;
          transform-origin: center center !important;
          transition: 
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
          pointer-events: none;
        }

        /* Hover state: show glass layers and scale to 1 (magnify) */
        [data-glass-hover='true'] .glass-ui-distortion-layer,
        [data-glass-hover='true'] .glass-ui-background-layer {
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        [data-glass-hover='true'] .glass-ui-border-layer,
        [data-glass-hover='true'] .glass-ui-inner-light {
          opacity: 0.4 !important;
          transform: scale(1) !important;
        }

        /* Ensure the library's internal container doesn't clip the magnification */
        .glass-ui-container {
          overflow: visible !important;
        }
      `}</style>
      <GlassCard
        flexibility={flexibility}
        distortion={currentDistortion}
        blur={blur}
        chromaticAberration={1}
        saturation={120}
        brightness={105}
        innerLightColor="rgba(255, 255, 255, 0.3)"
        innerLightBlur={1}
        innerLightSpread={1}
        innerLightOpacity={0.4}
        backgroundOpacity={backgroundOpacity}
        backgroundColor={backgroundColor}
        borderSize={borderSize}
        borderColor={borderColor}
        borderRadius={borderRadius}
        padding={padding}
        className={className}
        avoidSvgCreation={false}
      >
        {children}
      </GlassCard>
    </div>
  )
}
