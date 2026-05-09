'use client'

import { useEffect, useRef } from 'react'

import {
  getLiquidGlassBezel,
  getLiquidGlassRadius,
  getLiquidGlassThickness,
  INTERACTIVE_GRID_CANVAS_ID,
  LIQUID_GLASS_IOR,
  LIQUID_GLASS_SELECTOR,
  useLiquidGlassEngine,
} from './engine'

const MAX_DPR = 1.5

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform vec2 uGlassCenter;
uniform vec2 uGlassSize;
uniform float uRadius;
uniform float uBezel;
uniform float uThickness;
uniform float uIOR;
uniform float uBlur;
uniform float uSpecular;
uniform float uTint;
uniform float uShadow;
uniform float uProgress;
uniform sampler2D uBgTex;

float sdRoundedRect(vec2 p, vec2 halfSize, float radius) {
  float r = min(radius, min(halfSize.x, halfSize.y));
  vec2 q = abs(p) - halfSize + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float surfaceHeight(float t) {
  float s = 1.0 - t;
  return pow(1.0 - s * s * s * s, 0.25);
}

vec4 sampleBg(vec2 screenUV) {
  if (
    screenUV.x < 0.0 || screenUV.x > 1.0 ||
    screenUV.y < 0.0 || screenUV.y > 1.0
  ) {
    return vec4(0.0);
  }

  return texture2D(uBgTex, screenUV);
}

vec4 sampleBgBlurred(vec2 uv, float radius) {
  if (radius < 0.5) return sampleBg(uv);

  vec4 sum = vec4(0.0);
  vec2 px = 1.0 / uResolution;

  sum += sampleBg(uv + vec2(-0.94201, -0.39906) * radius * px);
  sum += sampleBg(uv + vec2(0.94558, -0.76890) * radius * px);
  sum += sampleBg(uv + vec2(-0.09418, -0.92938) * radius * px);
  sum += sampleBg(uv + vec2(0.34495, 0.29387) * radius * px);
  sum += sampleBg(uv + vec2(-0.91588, -0.45771) * radius * px);
  sum += sampleBg(uv + vec2(-0.81544, 0.48568) * radius * px);
  sum += sampleBg(uv + vec2(-0.38277, -0.56071) * radius * px);
  sum += sampleBg(uv + vec2(-0.12675, 0.84686) * radius * px);
  sum += sampleBg(uv + vec2(0.89642, 0.41254) * radius * px);
  sum += sampleBg(uv + vec2(0.18150, -0.30020) * radius * px);
  sum += sampleBg(uv + vec2(-0.01445, -0.16001) * radius * px);
  sum += sampleBg(uv + vec2(0.59614, 0.71118) * radius * px);
  sum += sampleBg(uv + vec2(0.49742, -0.47280) * radius * px);
  sum += sampleBg(uv + vec2(0.80685, 0.04588) * radius * px);
  sum += sampleBg(uv + vec2(-0.32490, -0.03965) * radius * px);
  sum += sampleBg(uv + vec2(-0.60975, 0.06566) * radius * px);

  return sum / 16.0;
}

void main() {
  vec2 screenPx = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
  vec2 p = screenPx - uGlassCenter;
  vec2 halfSize = uGlassSize * 0.5;
  float sd = sdRoundedRect(p, halfSize, uRadius);

  if (sd > 0.0) {
    float shadowFalloff = exp(-sd * sd / 800.0);
    float shadowAlpha = uShadow * uProgress * shadowFalloff * 0.55;
    if (shadowAlpha < 0.004) discard;

    gl_FragColor = vec4(0.0, 0.0, 0.0, shadowAlpha);
    return;
  }

  float distFromEdge = -sd;
  float bezel = max(1.0, min(uBezel, min(halfSize.x, halfSize.y) - 1.0));
  float t = clamp(distFromEdge / bezel, 0.0, 1.0);

  float h = surfaceHeight(t);
  float dt = 0.001;
  float h2 = surfaceHeight(min(t + dt, 1.0));
  float dh = (h2 - h) / dt;
  float slopeAngle = atan(dh * ((uThickness * uProgress) / bezel));
  float sinR = clamp(sin(slopeAngle) / uIOR, -1.0, 1.0);
  float thetaR = asin(sinR);
  float displacement = h * uThickness * (tan(slopeAngle) - tan(thetaR));

  vec2 grad;
  float eps = 0.5;
  grad.x = sdRoundedRect(p + vec2(eps, 0.0), halfSize, uRadius) - sd;
  grad.y = sdRoundedRect(p + vec2(0.0, eps), halfSize, uRadius) - sd;
  grad = normalize(grad);

  vec2 screenUV = screenPx / uResolution;
  vec2 refractedUV = screenUV - grad * displacement / uResolution;
  vec3 color = sampleBgBlurred(refractedUV, uBlur * uProgress).rgb;

  vec2 lightDir = normalize(vec2(0.5, -0.7));
  float rimDot = abs(dot(grad, lightDir));
  float rimFalloff = 1.0 - smoothstep(0.0, bezel * 0.4, distFromEdge);
  float specHighlight = pow(rimDot * rimFalloff, 1.5);
  color += vec3(specHighlight * uSpecular * uProgress);

  float innerShadow = 1.0 - smoothstep(0.0, bezel * 0.6, distFromEdge);
  color *= mix(1.0, 0.7, innerShadow * 0.3);

  float innerRim = smoothstep(0.0, 2.0, distFromEdge) *
    (1.0 - smoothstep(2.0, 5.0, distFromEdge));
  color += vec3(innerRim * 0.22 * uSpecular * uProgress);
  color = mix(color, vec3(1.0), uTint * uProgress);

  float alpha = smoothstep(0.0, 1.5, distFromEdge) * 0.9 * uProgress;
  gl_FragColor = vec4(color, alpha);
}
`

interface Uniforms {
  resolution: WebGLUniformLocation | null
  glassCenter: WebGLUniformLocation | null
  glassSize: WebGLUniformLocation | null
  radius: WebGLUniformLocation | null
  bezel: WebGLUniformLocation | null
  thickness: WebGLUniformLocation | null
  ior: WebGLUniformLocation | null
  blur: WebGLUniformLocation | null
  specular: WebGLUniformLocation | null
  tint: WebGLUniformLocation | null
  shadow: WebGLUniformLocation | null
  progress: WebGLUniformLocation | null
  bgTex: WebGLUniformLocation | null
}

interface ElementAnimationState {
  progress: number
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  return program
}

function readDatasetNumber(
  element: HTMLElement,
  key: keyof DOMStringMap,
  fallback: number,
) {
  const value = Number(element.dataset[key])

  return Number.isFinite(value) ? value : fallback
}

function webglGlassElements() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(LIQUID_GLASS_SELECTOR),
  ).filter((element) => {
    return element.dataset.liquidGlassEngine === 'webgl'
  })
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3
}

export function LiquidGlassWebGLLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engine = useLiquidGlassEngine()

  useEffect(() => {
    if (engine !== 'webgl') return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
    })
    if (!gl) return

    const program = createProgram(gl)
    if (!program) return

    const positionBuffer = gl.createBuffer()
    const texture = gl.createTexture()
    if (!positionBuffer || !texture) return

    const positionLocation = gl.getAttribLocation(program, 'aPosition')
    const uniforms: Uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      glassCenter: gl.getUniformLocation(program, 'uGlassCenter'),
      glassSize: gl.getUniformLocation(program, 'uGlassSize'),
      radius: gl.getUniformLocation(program, 'uRadius'),
      bezel: gl.getUniformLocation(program, 'uBezel'),
      thickness: gl.getUniformLocation(program, 'uThickness'),
      ior: gl.getUniformLocation(program, 'uIOR'),
      blur: gl.getUniformLocation(program, 'uBlur'),
      specular: gl.getUniformLocation(program, 'uSpecular'),
      tint: gl.getUniformLocation(program, 'uTint'),
      shadow: gl.getUniformLocation(program, 'uShadow'),
      progress: gl.getUniformLocation(program, 'uProgress'),
      bgTex: gl.getUniformLocation(program, 'uBgTex'),
    }

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.uniform1i(uniforms.bgTex, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    let animationFrame = 0
    let dpr = 1
    let viewportWidth = 0
    let viewportHeight = 0
    let lastTimestamp = 0
    const animationStates = new Map<HTMLElement, ElementAnimationState>()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight

      const width = Math.round(viewportWidth * dpr)
      const height = Math.round(viewportHeight * dpr)

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    const render = (timestamp: number) => {
      resize()
      gl.clear(gl.COLOR_BUFFER_BIT)

      const dt = lastTimestamp === 0 ? 16.6 : timestamp - lastTimestamp
      lastTimestamp = timestamp
      const step = Math.min(1, dt / 600)

      const elements = webglGlassElements()
      const currentElements = new Set(elements)
      const sourceCanvas = document.getElementById(
        INTERACTIVE_GRID_CANVAS_ID,
      ) as HTMLCanvasElement | null

      for (const element of animationStates.keys()) {
        if (!currentElements.has(element)) {
          animationStates.delete(element)
        }
      }

      const drawableElements = elements.filter((element) => {
        const state = animationStates.get(element) ?? { progress: 0 }
        const target = element.dataset.liquidGlassActive === 'true' ? 1 : 0
        state.progress =
          target > state.progress
            ? Math.min(target, state.progress + step)
            : Math.max(target, state.progress - step)
        animationStates.set(element, state)

        return state.progress > 0
      })

      if (
        sourceCanvas &&
        sourceCanvas.width > 0 &&
        sourceCanvas.height > 0 &&
        drawableElements.length > 0
      ) {
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          sourceCanvas,
        )

        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.uniform2f(uniforms.resolution, viewportWidth, viewportHeight)

        for (const element of drawableElements) {
          const state = animationStates.get(element)
          if (!state) continue

          const rect = element.getBoundingClientRect()
          if (
            rect.width < 2 ||
            rect.height < 2 ||
            rect.bottom < 0 ||
            rect.right < 0 ||
            rect.top > viewportHeight ||
            rect.left > viewportWidth
          ) {
            continue
          }

          const declaredRadius = readDatasetNumber(
            element,
            'liquidGlassRadius',
            8,
          )
          const radius = getLiquidGlassRadius(
            rect.width,
            rect.height,
            declaredRadius,
          )
          const blur = readDatasetNumber(element, 'liquidGlassBlur', 2)
          const distortion = readDatasetNumber(
            element,
            'liquidGlassDistortion',
            30,
          )
          const backgroundOpacity = readDatasetNumber(
            element,
            'liquidGlassBackgroundOpacity',
            0.3,
          )
          const bezel = getLiquidGlassBezel(rect.width, rect.height, radius)
          const progress = easeOutCubic(state.progress)
          const layerScale = 0.98 + progress * 0.02

          gl.uniform2f(
            uniforms.glassCenter,
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
          )
          gl.uniform2f(
            uniforms.glassSize,
            rect.width * layerScale,
            rect.height * layerScale,
          )
          gl.uniform1f(uniforms.radius, radius * layerScale)
          gl.uniform1f(uniforms.bezel, Math.max(1, bezel))
          gl.uniform1f(uniforms.thickness, getLiquidGlassThickness(distortion))
          gl.uniform1f(uniforms.ior, LIQUID_GLASS_IOR)
          gl.uniform1f(uniforms.blur, Math.min(14, blur * 3.2))
          gl.uniform1f(uniforms.specular, 0.72)
          gl.uniform1f(uniforms.tint, Math.min(0.26, backgroundOpacity * 0.32))
          gl.uniform1f(uniforms.shadow, 0.55)
          gl.uniform1f(uniforms.progress, progress)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
      }

      lastTimestamp = 0
      animationFrame = requestAnimationFrame(render)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame)
        return
      }

      animationFrame = requestAnimationFrame(render)
    }

    animationFrame = requestAnimationFrame(render)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(animationFrame)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      gl.deleteBuffer(positionBuffer)
      gl.deleteTexture(texture)
      gl.deleteProgram(program)
    }
  }, [engine])

  if (engine !== 'webgl') return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
