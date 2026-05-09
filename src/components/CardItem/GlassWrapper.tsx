'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useRef, useState, useSyncExternalStore } from 'react'

import LiquidGlass from 'liquid-glass-react'

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

function useCoarsePointer() {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia('(hover: none)')

      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', callback)
        return () => media.removeEventListener('change', callback)
      }

      media.addListener(callback)

      return () => media.removeListener(callback)
    },
    () => window.matchMedia('(hover: none)').matches,
    () => false,
  )
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

function backgroundWithOpacity(color: string, opacity: number) {
  return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, transparent)`
}

export function GlassWrapper({
  children,
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMounted = useMounted()
  const isCoarsePointer = useCoarsePointer()
  const [isHovered, setIsHovered] = useState(false)

  const isActive = isHovered || isCoarsePointer

  const layerTransition =
    'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'

  const contentStyle: CSSProperties | undefined =
    padding !== '0' ? { padding } : undefined

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        borderRadius,
        position: 'relative',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isHovered
          ? 'scale(1.02) translateY(-2px)'
          : 'scale(1) translateY(0)',
        zIndex: isHovered ? 10 : 0,
      }}
    >
      {/* Glass effect layer — uses liquid-glass-react for distortion on Chromium,
          falls back to blur-only on Firefox automatically */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.98)',
          transformOrigin: 'center center',
          transition: layerTransition,
          background: backgroundWithOpacity(backgroundColor, backgroundOpacity),
          border:
            borderSize > 0
              ? `${borderSize}px solid ${borderColor}`
              : undefined,
          boxShadow:
            'inset 0 0 20px -10px rgba(255, 255, 255, 0.55), 0 8px 28px rgba(0, 0, 0, 0.18)',
          isolation: 'isolate',
        }}
      >
        {isMounted ? (
          <LiquidGlass
            displacementScale={Math.max(40, distortion * 2.3)}
            blurAmount={blur * 0.03}
            saturation={140}
            cornerRadius={borderRadius}
            aberrationIntensity={1}
            elasticity={0}
            mode="standard"
            padding="0"
            style={{
              position: 'static',
              top: 'auto',
              left: 'auto',
              transform: 'none',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Empty — this is just the glass backdrop layer, content is rendered separately */}
            <span style={{ display: 'block', width: '100%', height: '100%' }} />
          </LiquidGlass>
        ) : null}
      </span>

      <div className="glass-ui-card-content" style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
