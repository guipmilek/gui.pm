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
  distortion = 30,
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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  // On mobile/touch devices, we want the effect to be always somewhat visible
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
      }}
    >
      <style jsx global>{`
        /* Base state: hide glass layers */
        .glass-ui-distortion-layer,
        .glass-ui-background-layer,
        .glass-ui-border-layer,
        .glass-ui-inner-light,
        .glass-ui-outer-light {
          opacity: 0 !important;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
          pointer-events: none;
        }

        /* Hover state: show glass layers */
        [data-glass-hover='true'] .glass-ui-distortion-layer,
        [data-glass-hover='true'] .glass-ui-background-layer {
          opacity: 1 !important;
        }

        [data-glass-hover='true'] .glass-ui-border-layer,
        [data-glass-hover='true'] .glass-ui-inner-light {
          opacity: 0.4 !important; /* Soften the rim light */
        }
      `}</style>
      <GlassCard
        flexibility={flexibility}
        distortion={distortion}
        blur={blur}
        chromaticAberration={1} /* Reduce to avoid noticeable yellow/blue fringes */
        saturation={120} /* Slightly more natural saturation */
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
