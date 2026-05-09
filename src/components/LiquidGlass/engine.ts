'use client'

import { useSyncExternalStore } from 'react'

export const INTERACTIVE_GRID_CANVAS_ID = 'interactive-grid-canvas'
export const LIQUID_GLASS_SELECTOR = '[data-liquid-glass="true"]'
export const LIQUID_GLASS_RADIUS = 42
export const LIQUID_GLASS_MAX_BEZEL = 54
export const LIQUID_GLASS_IOR = 2.35

export function getLiquidGlassRadius(
  width: number,
  height: number,
  fallbackRadius: number,
) {
  const maxRadius = Math.max(2, Math.min(width, height) / 2 - 1)

  return Math.max(2, Math.min(fallbackRadius, maxRadius))
}

export function getLiquidGlassBezel(
  width: number,
  height: number,
  radius: number,
) {
  return Math.max(
    1,
    Math.min(LIQUID_GLASS_MAX_BEZEL, radius * 1.2, width / 2 - 1, height / 2 - 1),
  )
}

export function getLiquidGlassThickness(distortion: number) {
  return Math.max(24, distortion * 2.5)
}

export type LiquidGlassEngine = 'svg' | 'webgl'

function isChromiumBrowser() {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent
  const isIosWebKitShell = /(CriOS|FxiOS|EdgiOS)\//.test(ua)

  return (
    !isIosWebKitShell &&
    /(Chrome|Chromium|Edg|OPR|SamsungBrowser)\//.test(ua)
  )
}

export function supportsSvgLiquidGlass() {
  return isChromiumBrowser()
}

export function getLiquidGlassEngine(): LiquidGlassEngine {
  return supportsSvgLiquidGlass() ? 'svg' : 'webgl'
}

export function useLiquidGlassEngine() {
  return useSyncExternalStore(
    () => () => {},
    getLiquidGlassEngine,
    () => 'webgl',
  )
}
