'use client'

export const LIQUID_GLASS_RADIUS = 42

export function getLiquidGlassRadius(
  width: number,
  height: number,
  fallbackRadius: number,
) {
  const maxRadius = Math.max(2, Math.min(width, height) / 2 - 1)

  return Math.max(2, Math.min(fallbackRadius, maxRadius))
}
