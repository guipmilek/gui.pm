'use client'

import type { CSSProperties, FocusEvent, PointerEvent, ReactNode } from 'react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { LiquidGlassSurface } from '@/components/LiquidGlass/Surface'
import { ensureLiquidGLEnhancement } from '@/components/LiquidGlass/webgl'

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
  enableWebGLEnhancement?: boolean
  variant?: 'default' | 'compact' | 'header'
}

interface GlassPointerState {
  x: number
  y: number
  angle: number
  intensity: number
  rimSize: number
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {}

      const media = window.matchMedia(query)

      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', callback)
        return () => media.removeEventListener('change', callback)
      }

      media.addListener(callback)

      return () => media.removeListener(callback)
    },
    () =>
      typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
    () => false,
  )
}

function backgroundWithOpacity(color: string, opacity: number) {
  return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, transparent)`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getStableLightAngle(x: number, y: number) {
  return clamp(135 + (x - 50) * 0.25 + (y - 50) * 0.08, 116, 154)
}

function getEdgeIntensity(x: number, y: number) {
  const distanceToClosestEdge = Math.min(x, 100 - x, y, 100 - y)
  return clamp(1 - distanceToClosestEdge / 42, 0, 1)
}

const DEFAULT_POINTER_STATE: GlassPointerState = {
  x: 50,
  y: 0,
  angle: 135,
  intensity: 0.35,
  rimSize: 140,
}

export function GlassWrapper({
  children,
  blur = 8,
  backgroundOpacity = 0.16,
  backgroundColor = 'var(--colors-card-background)',
  borderSize = 1,
  borderColor = 'var(--colors-card-border)',
  borderRadius = 6,
  padding = '0',
  className,
  enableWebGLEnhancement = false,
  variant = 'default',
}: GlassWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pointerTargetRef = useRef<GlassPointerState>({
    ...DEFAULT_POINTER_STATE,
  })
  const pointerCurrentRef = useRef<GlassPointerState>({
    ...DEFAULT_POINTER_STATE,
  })
  const pointerAnimationRef = useRef<number | null>(null)
  const isCoarsePointer = useMediaQuery('(hover: none)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  const isFinePointer = !isCoarsePointer
  const isActive = isHovered || isFocusWithin
  const effectiveBlur = isCoarsePointer ? Math.min(blur, 5) : blur
  const effectiveBackgroundOpacity = isCoarsePointer
    ? Math.min(backgroundOpacity, 0.1)
    : backgroundOpacity
  const shouldUseWebGL =
    enableWebGLEnhancement && isFinePointer && !prefersReducedMotion

  useEffect(() => {
    if (!shouldUseWebGL) return
    ensureLiquidGLEnhancement()
  }, [shouldUseWebGL])

  useEffect(() => {
    return () => {
      if (pointerAnimationRef.current !== null) {
        cancelAnimationFrame(pointerAnimationRef.current)
      }
    }
  }, [])

  function writePointerVars({
    x,
    y,
    angle,
    intensity,
    rimSize,
  }: GlassPointerState) {
    const element = wrapperRef.current
    if (!element) return

    element.style.setProperty('--glass-x', `${x}%`)
    element.style.setProperty('--glass-y', `${y}%`)
    element.style.setProperty('--glass-angle', `${angle}deg`)
    element.style.setProperty('--glass-rim-size', `${rimSize}px`)
    element.style.setProperty(
      '--glass-rim-opacity',
      String(0.12 + intensity * 0.28),
    )
    element.style.setProperty(
      '--glass-rim-core-alpha',
      String(0.16 + intensity * 0.26),
    )
    element.style.setProperty(
      '--glass-rim-blue-alpha',
      String(0.04 + intensity * 0.1),
    )
    element.style.setProperty(
      '--glass-rim-line-alpha',
      String(0.025 + intensity * 0.1),
    )
    element.style.setProperty(
      '--glass-fill-light-alpha',
      String(0.036 + intensity * 0.032),
    )
    element.style.setProperty(
      '--glass-frost-alpha',
      String(0.026 + intensity * 0.026),
    )
    element.style.setProperty(
      '--glass-sheen-opacity',
      String(0.05 + intensity * 0.12),
    )
  }

  function animatePointerVars() {
    const current = pointerCurrentRef.current
    const target = pointerTargetRef.current
    const ease = 0.14

    current.x += (target.x - current.x) * ease
    current.y += (target.y - current.y) * ease
    current.angle += (target.angle - current.angle) * ease
    current.intensity += (target.intensity - current.intensity) * ease
    current.rimSize += (target.rimSize - current.rimSize) * ease

    writePointerVars(current)

    const isSettled =
      Math.abs(target.x - current.x) < 0.1 &&
      Math.abs(target.y - current.y) < 0.1 &&
      Math.abs(target.angle - current.angle) < 0.2 &&
      Math.abs(target.intensity - current.intensity) < 0.01 &&
      Math.abs(target.rimSize - current.rimSize) < 0.2

    if (isSettled) {
      writePointerVars(target)
      pointerCurrentRef.current = { ...target }
      pointerAnimationRef.current = null
      return
    }

    pointerAnimationRef.current = requestAnimationFrame(animatePointerVars)
  }

  function startPointerAnimation() {
    if (pointerAnimationRef.current !== null) return
    pointerAnimationRef.current = requestAnimationFrame(animatePointerVars)
  }

  function setPointerVars(
    clientX: number,
    clientY: number,
    immediate = false,
  ) {
    const element = wrapperRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100)
    const angle = getStableLightAngle(x, y)
    const edgeIntensity = getEdgeIntensity(x, y)
    const centerDistance =
      Math.hypot(x - 50, y - 50) / Math.hypot(50, 50)
    const intensity = clamp(
      0.28 + edgeIntensity * 0.5 + centerDistance * 0.06,
      0.35,
      1,
    )
    const rimSize = clamp(
      Math.min(rect.width, rect.height) * (0.95 - edgeIntensity * 0.28),
      72,
      180,
    )

    const nextState = { x, y, angle, intensity, rimSize }

    pointerTargetRef.current = nextState

    if (immediate) {
      if (pointerAnimationRef.current !== null) {
        cancelAnimationFrame(pointerAnimationRef.current)
        pointerAnimationRef.current = null
      }

      pointerCurrentRef.current = { ...nextState }
      writePointerVars(nextState)
      return
    }

    startPointerAnimation()
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (!isFinePointer) return
    setPointerVars(event.clientX, event.clientY, true)
    setIsHovered(true)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isFinePointer) return
    setPointerVars(event.clientX, event.clientY)
  }

  function handlePointerLeave() {
    if (!isFinePointer) return
    setIsHovered(false)
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusWithin(false)
    }
  }

  const contentStyle: CSSProperties | undefined =
    padding !== '0' ? { padding } : undefined

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={handleBlur}
      className={className}
      data-glass-active={isActive ? 'true' : 'false'}
      style={{
        borderRadius,
        position: 'relative',
      }}
    >
      <LiquidGlassSurface
        active={isActive}
        blur={effectiveBlur}
        background={backgroundWithOpacity(
          backgroundColor,
          effectiveBackgroundOpacity,
        )}
        borderSize={borderSize}
        borderColor={borderColor}
        enableWebGLEnhancement={shouldUseWebGL}
        variant={variant}
      />

      <div className="glass-ui-card-content" style={contentStyle}>
        {children}
      </div>

      <span
        aria-hidden="true"
        className="glass-card-dim"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: 'rgba(0, 0, 0, 0.26)',
          opacity: 'var(--glass-card-dim-opacity, 0)',
          transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  )
}
