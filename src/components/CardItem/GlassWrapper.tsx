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
  flexibility = 1,
  distortion = 20,
  blur = 4,
  backgroundOpacity = 1,
  backgroundColor = 'var(--colors-card-background)',
  borderSize = 1,
  borderColor = 'var(--colors-card-border)',
  borderRadius = 6,
  padding = '0',
  className,
}: GlassWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  // On mobile/touch devices, we want the effect to be always somewhat visible or react to scroll
  // For simplicity, let's keep it visible on mobile and hover-dependent on desktop
  const showEffect = isHovered || (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        borderRadius,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <style jsx global>{`
        .glass-ui-distortion-layer {
          transition: backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, opacity 0.4s ease !important;
        }
        .glass-ui-background-layer {
          transition: opacity 0.4s ease, background-color 0.4s ease !important;
        }
        .glass-ui-border-layer {
          transition: opacity 0.4s ease !important;
        }
      `}</style>
      <GlassCard
        flexibility={flexibility}
        distortion={showEffect ? distortion : 0}
        blur={showEffect ? blur : 0}
        backgroundOpacity={showEffect ? backgroundOpacity : 0}
        backgroundColor={backgroundColor}
        borderSize={borderSize}
        borderColor={borderColor}
        borderOpacity={showEffect ? 0.2 : 0}
        borderRadius={borderRadius}
        padding={padding}
        className={className}
        avoidSvgCreation={!showEffect}
      >
        {children}
      </GlassCard>
    </div>
  )
}
