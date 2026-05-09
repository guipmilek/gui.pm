'use client'

interface SvgFilterOptions {
  width: number
  height: number
  radius: number
  thickness: number
  bezel: number
  ior: number
  blur: number
  scaleRatio: number
  specularOpacity: number
  specularSaturation: number
}

export interface SvgFilterData {
  width: number
  height: number
  blur: number
  scale: number
  specularOpacity: number
  specularSaturation: number
  displacementMapUrl: string
  specularMapUrl: string
}

const surfaceHeight = (x: number) => (1 - (1 - x) ** 4) ** 0.25

function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  ior: number,
  samples = 128,
) {
  const eta = 1 / ior
  const profile = new Float64Array(samples)

  const refract = (nx: number, ny: number) => {
    const dot = ny
    const k = 1 - eta * eta * (1 - dot * dot)
    if (k < 0) return null

    const sq = Math.sqrt(k)

    return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny]
  }

  for (let i = 0; i < samples; i++) {
    const x = i / samples
    const y = surfaceHeight(x)
    const dx = x < 1 ? 0.0001 : -0.0001
    const y2 = surfaceHeight(x + dx)
    const deriv = (y2 - y) / dx
    const mag = Math.sqrt(deriv * deriv + 1)
    const ref = refract(-deriv / mag, -1 / mag)

    if (!ref) {
      profile[i] = 0
      continue
    }

    profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1])
  }

  return profile
}

function createMapCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) return null

  return { canvas, context }
}

function generateDisplacementMap(
  width: number,
  height: number,
  radius: number,
  bezelWidth: number,
  profile: Float64Array,
  maxDisp: number,
) {
  const map = createMapCanvas(width, height)
  if (!map) return ''

  const { canvas, context } = map
  const image = context.createImageData(width, height)
  const data = image.data

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 128
    data[i + 1] = 128
    data[i + 2] = 0
    data[i + 3] = 255
  }

  const radiusSq = radius * radius
  const radiusPlusOneSq = (radius + 1) ** 2
  const innerRadiusSq = Math.max(radius - bezelWidth, 0) ** 2
  const bodyWidth = width - radius * 2
  const bodyHeight = height - radius * 2
  const samples = profile.length

  for (let y1 = 0; y1 < height; y1++) {
    for (let x1 = 0; x1 < width; x1++) {
      const x = x1 < radius ? x1 - radius : x1 >= width - radius ? x1 - radius - bodyWidth : 0
      const y = y1 < radius ? y1 - radius : y1 >= height - radius ? y1 - radius - bodyHeight : 0
      const distSq = x * x + y * y

      if (distSq > radiusPlusOneSq || distSq < innerRadiusSq) continue

      const dist = Math.sqrt(distSq)
      const fromSide = radius - dist
      const opacity =
        distSq < radiusSq
          ? 1
          : 1 - (dist - Math.sqrt(radiusSq)) / (Math.sqrt(radiusPlusOneSq) - Math.sqrt(radiusSq))

      if (opacity <= 0 || dist === 0) continue

      const cos = x / dist
      const sin = y / dist
      const bi = Math.min(((fromSide / bezelWidth) * samples) | 0, samples - 1)
      const disp = profile[bi] || 0
      const dX = (-cos * disp) / maxDisp
      const dY = (-sin * disp) / maxDisp
      const index = (y1 * width + x1) * 4

      data[index] = (128 + dX * 127 * opacity + 0.5) | 0
      data[index + 1] = (128 + dY * 127 * opacity + 0.5) | 0
    }
  }

  context.putImageData(image, 0, 0)

  return canvas.toDataURL()
}

function generateSpecularMap(
  width: number,
  height: number,
  radius: number,
  bezelWidth: number,
  angle = Math.PI / 3,
) {
  const map = createMapCanvas(width, height)
  if (!map) return ''

  const { canvas, context } = map
  const image = context.createImageData(width, height)
  const data = image.data
  data.fill(0)

  const radiusSq = radius * radius
  const radiusPlusOneSq = (radius + 1) ** 2
  const innerRadiusSq = Math.max(radius - bezelWidth, 0) ** 2
  const bodyWidth = width - radius * 2
  const bodyHeight = height - radius * 2
  const vector = [Math.cos(angle), Math.sin(angle)]

  for (let y1 = 0; y1 < height; y1++) {
    for (let x1 = 0; x1 < width; x1++) {
      const x = x1 < radius ? x1 - radius : x1 >= width - radius ? x1 - radius - bodyWidth : 0
      const y = y1 < radius ? y1 - radius : y1 >= height - radius ? y1 - radius - bodyHeight : 0
      const distSq = x * x + y * y

      if (distSq > radiusPlusOneSq || distSq < innerRadiusSq) continue

      const dist = Math.sqrt(distSq)
      const fromSide = radius - dist
      const opacity =
        distSq < radiusSq
          ? 1
          : 1 - (dist - Math.sqrt(radiusSq)) / (Math.sqrt(radiusPlusOneSq) - Math.sqrt(radiusSq))

      if (opacity <= 0 || dist === 0) continue

      const cos = x / dist
      const sin = -y / dist
      const dot = Math.abs(cos * vector[0] + sin * vector[1])
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2))
      const coeff = dot * edge
      const color = (255 * coeff) | 0
      const alpha = (color * coeff * opacity) | 0
      const index = (y1 * width + x1) * 4

      data[index] = color
      data[index + 1] = color
      data[index + 2] = color
      data[index + 3] = alpha
    }
  }

  context.putImageData(image, 0, 0)

  return canvas.toDataURL()
}

export function buildLiquidGlassSvgFilter({
  width,
  height,
  radius,
  thickness,
  bezel,
  ior,
  blur,
  scaleRatio,
  specularOpacity,
  specularSaturation,
}: SvgFilterOptions): SvgFilterData | null {
  const mapWidth = Math.max(2, Math.round(width))
  const mapHeight = Math.max(2, Math.round(height))
  const maxRadius = Math.max(2, Math.min(mapWidth, mapHeight) / 2 - 1)
  const clampedRadius = Math.max(2, Math.min(radius, maxRadius))
  const clampedBezel = Math.max(1, Math.min(bezel, clampedRadius - 1))

  const profile = calculateRefractionProfile(thickness, clampedBezel, ior)
  const maxDisp = Math.max(...Array.from(profile, Math.abs)) || 1
  const displacementMapUrl = generateDisplacementMap(
    mapWidth,
    mapHeight,
    clampedRadius,
    clampedBezel,
    profile,
    maxDisp,
  )
  const specularMapUrl = generateSpecularMap(
    mapWidth,
    mapHeight,
    clampedRadius,
    clampedBezel * 2.5,
  )

  if (!displacementMapUrl || !specularMapUrl) return null

  return {
    width: mapWidth,
    height: mapHeight,
    blur,
    scale: maxDisp * scaleRatio,
    specularOpacity,
    specularSaturation,
    displacementMapUrl,
    specularMapUrl,
  }
}
