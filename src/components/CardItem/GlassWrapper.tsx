'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'

import {
  getLiquidGlassBezel,
  getLiquidGlassRadius,
  getLiquidGlassThickness,
  LIQUID_GLASS_IOR,
  useLiquidGlassEngine,
} from '@/components/LiquidGlass/engine'
import {
  buildLiquidGlassSvgFilter,
  type SvgFilterData,
} from '@/components/LiquidGlass/svg'

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

type LayerStyle = CSSProperties & {
  WebkitBackdropFilter?: string
}

const layerTransition =
  'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'

function backgroundWithOpacity(color: string, opacity: number) {
  return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, transparent)`
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

export function GlassWrapper({
  children,
  flexibility = 3,
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
  const rawFilterId = useId()
  const filterId = `liquid-glass-${rawFilterId.replaceAll(':', '')}`
  const isMounted = useMounted()
  const isCoarsePointer = useCoarsePointer()
  const engine = useLiquidGlassEngine()
  const [isHovered, setIsHovered] = useState(false)
  const [filterData, setFilterData] = useState<SvgFilterData | null>(null)

  const isActive = isHovered || isCoarsePointer

  useEffect(() => {
    if (!isMounted || engine !== 'svg') return

    const node = wrapperRef.current
    if (!node) return

    let frame = 0

    const rebuildFilter = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        if (rect.width < 2 || rect.height < 2) return

        const filterRadius = getLiquidGlassRadius(
          rect.width,
          rect.height,
          borderRadius,
        )
        const filterBezel = getLiquidGlassBezel(
          rect.width,
          rect.height,
          filterRadius,
        )

        setFilterData(
          buildLiquidGlassSvgFilter({
            width: rect.width,
            height: rect.height,
            radius: filterRadius,
            thickness: getLiquidGlassThickness(distortion),
            bezel: filterBezel,
            ior: LIQUID_GLASS_IOR,
            blur,
            scaleRatio: Math.max(0.35, flexibility / 3),
            specularOpacity: 0.45,
            specularSaturation: 4,
          }),
        )
      })
    }

    const observer = new ResizeObserver(rebuildFilter)
    observer.observe(node)
    rebuildFilter()
    window.addEventListener('resize', rebuildFilter)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', rebuildFilter)
    }
  }, [
    blur,
    borderRadius,
    distortion,
    engine,
    flexibility,
    isMounted,
  ])

  const backdropFilter =
    engine === 'svg' && filterData
      ? `url(#${filterId})`
      : 'none'
  const activeLayerStyle: LayerStyle = {
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
    border: borderSize > 0 ? `${borderSize}px solid ${borderColor}` : undefined,
    boxShadow:
      'inset 0 0 20px -10px rgba(255, 255, 255, 0.55), 0 8px 28px rgba(0, 0, 0, 0.18)',
    backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    isolation: 'isolate',
  }
  const contentStyle: CSSProperties | undefined =
    padding !== '0' ? { padding } : undefined

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      data-liquid-glass="true"
      data-liquid-glass-active={isActive ? 'true' : 'false'}
      data-liquid-glass-engine={engine}
      data-liquid-glass-radius={borderRadius}
      data-liquid-glass-blur={blur}
      data-liquid-glass-distortion={distortion}
      data-liquid-glass-background-opacity={backgroundOpacity}
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
      {engine === 'svg' && filterData && (
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          style={{ position: 'absolute', overflow: 'hidden' }}
          colorInterpolationFilters="sRGB"
        >
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={filterData.blur}
                result="blurred_source"
              />
              <feImage
                href={filterData.displacementMapUrl}
                x="0"
                y="0"
                width={filterData.width}
                height={filterData.height}
                result="disp_map"
              />
              <feDisplacementMap
                in="blurred_source"
                in2="disp_map"
                scale={filterData.scale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feColorMatrix
                in="displaced"
                type="saturate"
                values={String(filterData.specularSaturation)}
                result="displaced_sat"
              />
              <feImage
                href={filterData.specularMapUrl}
                x="0"
                y="0"
                width={filterData.width}
                height={filterData.height}
                result="spec_layer"
              />
              <feComposite
                in="displaced_sat"
                in2="spec_layer"
                operator="in"
                result="spec_masked"
              />
              <feComponentTransfer in="spec_layer" result="spec_faded">
                <feFuncA type="linear" slope={String(filterData.specularOpacity)} />
              </feComponentTransfer>
              <feBlend
                in="spec_masked"
                in2="displaced"
                mode="normal"
                result="with_sat"
              />
              <feBlend in="spec_faded" in2="with_sat" mode="normal" />
            </filter>
          </defs>
        </svg>
      )}

      <span
        className="liquid-glass-layer glass-ui-distortion-layer"
        style={activeLayerStyle}
        aria-hidden="true"
      />

      <div className="glass-ui-card-content" style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
