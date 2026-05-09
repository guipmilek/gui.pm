'use client'

import type { CSSProperties } from 'react'

interface LiquidGlassSurfaceProps {
  active: boolean
  blur: number
  background: string
  borderSize: number
  borderColor: string
  enableWebGLEnhancement: boolean
  variant?: 'default' | 'compact' | 'header'
}

export function LiquidGlassSurface({
  active,
  blur,
  background,
  borderSize,
  borderColor,
  enableWebGLEnhancement,
  variant = 'default',
}: LiquidGlassSurfaceProps) {
  const isCompact = variant === 'compact'
  const isHeader = variant === 'header'
  const rimPadding = Math.max(1, borderSize)
  const materialFilter = `blur(${blur}px) saturate(${isHeader ? 135 : 145}%) brightness(${isHeader ? 1.01 : 1.02})`

  const opacityTransition = active
    ? 'opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1)'
    : 'opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1)'
  const motionTransition = active
    ? 'opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
    : 'opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1), transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)'
  const rimSize = `var(--glass-rim-size, ${isHeader ? 72 : isCompact ? 118 : 168}px)`
  const rimOpacity = isHeader
    ? 'calc(var(--glass-rim-opacity, 0.42) * 0.68)'
    : isCompact
    ? 'calc(var(--glass-rim-opacity, 0.48) * 0.78)'
    : 'var(--glass-rim-opacity, 0.56)'
  const baseShade = isHeader ? 0.06 : isCompact ? 0.09 : 0.1
  const activeShade = isHeader ? 0.08 : isCompact ? 0.1 : 0.11

  const layerBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  }

  return (
    <span
      aria-hidden="true"
      className="glass-liquid-surface"
      style={{
        ...layerBase,
        zIndex: 0,
        overflow: 'hidden',
        background,
        backdropFilter: materialFilter,
        WebkitBackdropFilter: materialFilter,
        boxShadow: isHeader
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
          : active
          ? '0 12px 34px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
          : '0 6px 18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        transition:
          'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {enableWebGLEnhancement ? (
        <span
          className="liquid-glass-webgl-lens"
          data-liquid-ignore=""
          style={{
            ...layerBase,
            zIndex: 0,
            overflow: 'hidden',
          }}
        />
      ) : null}

      <span
        className="glass-liquid-fill"
        style={{
          ...layerBase,
          zIndex: 1,
          background: `
            radial-gradient(120% 90% at 50% 0%, rgba(255, 255, 255, ${isHeader ? 0.018 : isCompact ? 0.026 : 0.032}), transparent 48%),
            linear-gradient(145deg, rgba(255, 255, 255, ${isHeader ? 0.02 : isCompact ? 0.032 : 0.038}) 0%, rgba(255, 255, 255, 0.006) 42%, rgba(0, 0, 0, ${baseShade}) 100%)
          `,
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, ${isHeader ? 0.04 : 0.075}),
            inset 0 -${isCompact || isHeader ? 8 : 14}px ${isCompact || isHeader ? 14 : 22}px rgba(0, 0, 0, ${baseShade}),
            inset 0 0 ${isCompact || isHeader ? 10 : 14}px rgba(255, 255, 255, ${isHeader ? 0.008 : 0.014})
          `,
        }}
      />

      <span
        className="glass-liquid-fill-active"
        style={{
          ...layerBase,
          zIndex: 2,
          background: `
            radial-gradient(${isCompact ? '90% 130%' : '120% 90%'} at var(--glass-x, 50%) var(--glass-y, 0%), rgba(255, 255, 255, var(--glass-fill-light-alpha, ${isHeader ? 0.035 : isCompact ? 0.052 : 0.068})), transparent ${isCompact ? 56 : 50}%),
            linear-gradient(145deg, rgba(255, 255, 255, ${isHeader ? 0.032 : 0.05}) 0%, rgba(255, 255, 255, 0.008) 42%, rgba(0, 0, 0, ${activeShade}) 100%)
          `,
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, ${isHeader ? 0.065 : 0.12}),
            inset 0 -${isCompact || isHeader ? 10 : 14}px ${isCompact || isHeader ? 16 : 22}px rgba(0, 0, 0, ${activeShade}),
            inset 0 0 ${isCompact || isHeader ? 12 : 14}px rgba(255, 255, 255, ${isHeader ? 0.016 : 0.026})
          `,
          opacity: active ? (isHeader ? 0.55 : 1) : 0,
          transition: opacityTransition,
        }}
      />

      <span
        className="glass-liquid-frost"
        style={{
          ...layerBase,
          zIndex: 3,
          background: `
            radial-gradient(circle at 18% 0%, rgba(255, 255, 255, ${isHeader ? 0.016 : 0.026}), transparent 36%),
            radial-gradient(circle at 84% 10%, rgba(125, 220, 255, ${isHeader ? 0.008 : 0.012}), transparent 30%)
          `,
          mixBlendMode: 'screen',
          opacity: isHeader ? 0.12 : 0.16,
        }}
      />

      <span
        className="glass-liquid-frost-active"
        style={{
          ...layerBase,
          zIndex: 4,
          background: `
            radial-gradient(circle at var(--glass-x, 50%) var(--glass-y, 0%), rgba(255, 255, 255, var(--glass-frost-alpha, ${isHeader ? 0.026 : isCompact ? 0.038 : 0.052})), transparent ${isCompact || isHeader ? 44 : 38}%),
            radial-gradient(circle at 84% 10%, rgba(125, 220, 255, ${isHeader ? 0.01 : 0.02}), transparent 30%)
          `,
          mixBlendMode: 'screen',
          opacity: active ? (isHeader ? 0.32 : 0.62) : 0,
          transition: opacityTransition,
        }}
      />

      {borderSize > 0 ? (
        <>
          <span
            className="glass-liquid-border"
            style={{
              ...layerBase,
              zIndex: 5,
              boxShadow: `inset 0 0 0 ${borderSize}px ${borderColor}`,
              opacity: isHeader ? 0.18 : 0.22,
            }}
          />

          <span
            className="glass-liquid-rim"
            style={{
              ...layerBase,
              zIndex: 6,
              padding: `${rimPadding}px`,
              background: `
                radial-gradient(${rimSize} ${rimSize} at var(--glass-x, 50%) var(--glass-y, 0%), rgba(255, 255, 255, var(--glass-rim-core-alpha, ${isHeader ? 0.26 : 0.36})) 0%, rgba(205, 240, 255, var(--glass-rim-blue-alpha, ${isHeader ? 0.07 : 0.11})) 24%, transparent 64%),
                conic-gradient(from var(--glass-angle, 135deg), transparent 0deg, rgba(255, 255, 255, var(--glass-rim-line-alpha, ${isHeader ? 0.035 : 0.065})) 55deg, rgba(84, 214, 255, calc(var(--glass-rim-line-alpha, ${isHeader ? 0.035 : 0.065}) * 0.5)) 95deg, transparent 150deg, rgba(255, 255, 255, calc(var(--glass-rim-line-alpha, ${isHeader ? 0.035 : 0.065}) * 0.75)) 245deg, transparent 310deg)
              `,
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: active ? rimOpacity : 0,
              transition: opacityTransition,
            }}
          />
        </>
      ) : null}

      <span
        className="glass-liquid-sheen"
        style={{
          ...layerBase,
          zIndex: 7,
          background: `
            linear-gradient(var(--glass-angle, 135deg), transparent 24%, rgba(255, 255, 255, ${isHeader ? 0.025 : 0.048}) 46%, rgba(99, 209, 255, ${isHeader ? 0.008 : 0.016}) 50%, transparent 68%)
          `,
          mixBlendMode: 'screen',
          opacity: active
            ? isHeader
              ? 'calc(var(--glass-sheen-opacity, 0.18) * 0.62)'
              : 'var(--glass-sheen-opacity, 0.22)'
            : 0,
          transform: active ? 'translate3d(0, 0, 0)' : 'translate3d(-2%, -1%, 0)',
          transition: motionTransition,
        }}
      />

      {isHeader ? (
        <span
          className="glass-liquid-header-edge"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            height: '1px',
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18) 18%, rgba(125, 220, 255, 0.16) 50%, rgba(255, 255, 255, 0.14) 82%, transparent)',
            boxShadow: '0 1px 10px rgba(125, 220, 255, 0.08)',
          }}
        />
      ) : null}
    </span>
  )
}
