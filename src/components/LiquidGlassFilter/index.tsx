'use client'

import { useEffect, useState } from 'react'

export function LiquidGlassFilter() {
  const [dataUrl, setDataUrl] = useState<string>('')

  useEffect(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imgData = ctx.createImageData(size, size)
    const data = imgData.data

    const bezelStart = 0.6 // Start of the refractive edge (0.0 to 1.0)
    const p = 4 // Squircle exponent

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4

        // Normalized coordinates (-1 to 1)
        const dx = (x / (size - 1)) * 2 - 1
        const dy = (y / (size - 1)) * 2 - 1

        // Squircle distance: (|x|^p + |y|^p)^(1/p)
        const squircleDist = Math.pow(Math.pow(Math.abs(dx), p) + Math.pow(Math.abs(dy), p), 1 / p)

        let shiftX = 0
        let shiftY = 0
        let height = 0

        if (squircleDist > bezelStart) {
          // Normalize distance within bezel area (0 to 1)
          const factor = (squircleDist - bezelStart) / (1 - bezelStart)
          
          // Height map: smooth curve from 0 to 1
          height = Math.pow(Math.sin((factor * Math.PI) / 2), 2)

          // Normal vector approximation
          // Gradient of squircleDist is approximately (dx^(p-1), dy^(p-1))
          const gx = Math.pow(Math.abs(dx), p - 1) * Math.sign(dx)
          const gy = Math.pow(Math.abs(dy), p - 1) * Math.sign(dy)
          const gMag = Math.sqrt(gx * gx + gy * gy)

          if (gMag > 0) {
            shiftX = (gx / gMag) * height
            shiftY = (gy / gMag) * height
          }
        }

        data[i] = Math.round(128 + shiftX * 127)
        data[i + 1] = Math.round(128 + shiftY * 127)
        data[i + 2] = Math.round(height * 255) // Store height in blue channel for specular lighting
        data[i + 3] = 255
      }
    }

    ctx.putImageData(imgData, 0, 0)
    setDataUrl(canvas.toDataURL())
  }, [])

  if (!dataUrl) return null

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <filter
        id="liquid-glass-filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={dataUrl}
          result="map"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
        {/* Refraction */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="40"
          xChannelSelector="R"
          yChannelSelector="G"
          result="refracted"
        />
        {/* Specular Highlight - using the Blue channel as height */}
        <feSpecularLighting
          in="map"
          surfaceScale="5"
          specularConstant="0.8"
          specularExponent="40"
          lightingColor="#ffffff"
          result="specular"
        >
          <fePointLight x="50" y="-50" z="100" />
        </feSpecularLighting>
        {/* Composite specular on top of refracted content */}
        <feComposite
          in="specular"
          in2="refracted"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
        />
      </filter>
    </svg>
  )
}
