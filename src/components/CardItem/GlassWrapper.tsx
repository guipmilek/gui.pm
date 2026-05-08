'use client'

import { GlassCard } from 'react-glass-ui'
import { ReactNode } from 'react'

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
  return (
    <GlassCard
      flexibility={flexibility}
      distortion={distortion}
      blur={blur}
      backgroundOpacity={backgroundOpacity}
      backgroundColor={backgroundColor}
      borderSize={borderSize}
      borderColor={borderColor}
      borderRadius={borderRadius}
      padding={padding}
      className={className}
    >
      {children}
    </GlassCard>
  )
}
