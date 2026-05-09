'use client'

type LiquidGLFactory = (options: Record<string, unknown>) => unknown

declare global {
  interface Window {
    liquidGL?: LiquidGLFactory & { syncWith?: () => void }
    __guipmLiquidGLPromise?: Promise<void>
    __guipmLiquidGLInstance?: unknown
  }
}

const HTML2CANVAS_SCRIPT_ID = 'guipm-html2canvas'
const LIQUID_GL_SCRIPT_ID = 'guipm-liquid-gl'
const HTML2CANVAS_SRC =
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
const LIQUID_GL_SRC = 'https://liquidgl.naughtyduk.com/scripts/liquidGL.js'

function loadScript(id: string, src: string) {
  const existing = document.getElementById(id) as HTMLScriptElement | null

  if (existing?.dataset.loaded === 'true') {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    const script = existing ?? document.createElement('script')

    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        resolve()
      },
      { once: true },
    )
    script.addEventListener('error', () => reject(new Error(src)), {
      once: true,
    })

    if (!existing) {
      script.id = id
      script.src = src
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })
}

function waitForIdle() {
  return new Promise<void>((resolve) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => resolve(), { timeout: 1200 })
      return
    }

    window.setTimeout(resolve, 500)
  })
}

function hasWebGL() {
  const canvas = document.createElement('canvas')
  const context = (
    canvas.getContext('webgl2') ||
    canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl')
  ) as WebGLRenderingContext | WebGL2RenderingContext | null

  if (!context) return false

  context.getExtension('WEBGL_lose_context')?.loseContext()

  return true
}

function canUseLiquidGL() {
  if (typeof window === 'undefined') return false
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return false
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }
  if (window.innerWidth < 1024) return false

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection

  if (connection?.saveData) return false

  if (!document.querySelector('.liquid-glass-webgl-lens')) return false

  return hasWebGL()
}

export function ensureLiquidGLEnhancement() {
  if (!canUseLiquidGL()) return
  if (window.__guipmLiquidGLPromise) return

  window.__guipmLiquidGLPromise = (async () => {
    await waitForIdle()
    await loadScript(HTML2CANVAS_SCRIPT_ID, HTML2CANVAS_SRC)
    await loadScript(LIQUID_GL_SCRIPT_ID, LIQUID_GL_SRC)
    await waitForIdle()

    if (!window.liquidGL || !canUseLiquidGL()) return

    window.__guipmLiquidGLInstance = window.liquidGL({
      target: '.liquid-glass-webgl-lens',
      snapshot: document.querySelector('#grid-fallback')
        ? '#grid-fallback'
        : 'body',
      resolution: 1,
      refraction: 0,
      bevelDepth: 0.026,
      bevelWidth: 0.09,
      frost: 0.8,
      shadow: false,
      specular: true,
      tilt: false,
      reveal: 'none',
      magnify: 1,
    })
  })().catch(() => {
    window.__guipmLiquidGLPromise = undefined
  })
}
