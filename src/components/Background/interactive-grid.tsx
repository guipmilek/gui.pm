'use client'

import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/contexts/MouseContext'

interface ShootingStar {
  dir: 'h' | 'v'
  forward: boolean
  pos: number
  speed: number
  color: string
  startTime: number
}

const BIG_SIZE = 80
const SMALL_SIZE = 20
const TRAIL_LENGTH = 150
const MAX_STARS = 15
const STAR_THICKNESS = 1

const STAR_SPAWN_MIN = 200
const STAR_SPAWN_MAX = 600
const STAR_SPEED_MIN = 2000
const STAR_SPEED_MAX = 4500

const GRID_BIG = 'rgba(113, 113, 122, 0.15)'
const GRID_SMALL = 'rgba(113, 113, 122, 0.07)'
const HOVER_RADIUS = 280
const STAR_COLOR = 'rgba(148, 163, 184, 0.85)'

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  size: number,
  color: string,
  alpha: number,
) {
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 1

  ctx.beginPath()
  for (let x = 0; x <= w; x += size) {
    ctx.moveTo((x + 0.5) | 0, 0)
    ctx.lineTo((x + 0.5) | 0, h)
  }
  for (let y = 0; y <= h; y += size) {
    ctx.moveTo(0, (y + 0.5) | 0)
    ctx.lineTo(w, (y + 0.5) | 0)
  }
  ctx.stroke()

  ctx.globalAlpha = 1
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  now: number,
  stars: ShootingStar[],
) {
  for (let i = stars.length - 1; i >= 0; i--) {
    const star = stars[i]
    const elapsed = now - star.startTime
    const progress = elapsed / star.speed

    if (progress >= 1) {
      stars.splice(i, 1)
      continue
    }

    const alpha = 1 - progress * progress
    ctx.globalAlpha = alpha

    if (star.dir === 'h') {
      const total = w + TRAIL_LENGTH * 2
      const cx = star.forward
        ? -TRAIL_LENGTH + total * progress
        : w + TRAIL_LENGTH - total * progress

      const sx = star.forward ? cx - TRAIL_LENGTH : cx + TRAIL_LENGTH
      const grad = ctx.createLinearGradient(sx, star.pos, cx, star.pos)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.7, star.color)
      grad.addColorStop(1, 'rgba(255,255,255,0.8)')

      ctx.fillStyle = grad
      const left = Math.min(sx, cx)
      const tw = Math.abs(cx - sx)
      ctx.fillRect(left, star.pos - STAR_THICKNESS / 2, tw, STAR_THICKNESS)
    } else {
      const total = h + TRAIL_LENGTH * 2
      const cy = star.forward
        ? -TRAIL_LENGTH + total * progress
        : h + TRAIL_LENGTH - total * progress

      const sy = star.forward ? cy - TRAIL_LENGTH : cy + TRAIL_LENGTH
      const grad = ctx.createLinearGradient(star.pos, sy, star.pos, cy)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.7, star.color)
      grad.addColorStop(1, 'rgba(255,255,255,0.8)')

      ctx.fillStyle = grad
      const top = Math.min(sy, cy)
      const th = Math.abs(cy - sy)
      ctx.fillRect(star.pos - STAR_THICKNESS / 2, top, STAR_THICKNESS, th)
    }
  }

  ctx.globalAlpha = 1
}

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<ShootingStar[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const animRef = useRef(0)
  const spawnIdRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const vignetteRef = useRef<CanvasGradient | null>(null)
  const smoothRef = useRef({ x: -100, y: -100 })
  const isTouchRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)

  const positionRef = useMousePosition()

  useEffect(() => {
    // B1: On touch/coarse devices the CSS GridFallback handles everything.
    // No need for canvas rAF — zero CPU/battery waste on mobile.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { desynchronized: true })
    if (!ctx) return

    const glowCanvas = document.createElement('canvas')
    const glowCtx = glowCanvas.getContext('2d')
    if (!glowCtx) return

    // Cache the bright glow grid — drawn once on resize, reused every frame.
    const glowGridCanvas = document.createElement('canvas')
    const glowGridCtx = glowGridCanvas.getContext('2d')
    if (!glowGridCtx) return

    // Cache the radial mask — fixed size, drawn once, translated each frame.
    const R = HOVER_RADIUS
    const maskCanvas = document.createElement('canvas')
    maskCanvas.width = R * 2
    maskCanvas.height = R * 2
    const maskCtx = maskCanvas.getContext('2d')
    if (maskCtx) {
      const g = maskCtx.createRadialGradient(R, R, 0, R, R, R)
      g.addColorStop(0, 'rgba(0,0,0,0.75)')
      g.addColorStop(0.2, 'rgba(0,0,0,0.45)')
      g.addColorStop(0.5, 'rgba(0,0,0,0.12)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      maskCtx.fillStyle = g
      maskCtx.fillRect(0, 0, R * 2, R * 2)
    }

    isTouchRef.current = false
    prefersReducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const maxStars = window.innerWidth >= 1024 ? MAX_STARS : 8

    let running = true
    let resizeTimer: ReturnType<typeof setTimeout> | undefined

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      glowCanvas.width = w * dpr
      glowCanvas.height = h * dpr
      glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      glowGridCanvas.width = glowCanvas.width
      glowGridCanvas.height = glowCanvas.height
      glowGridCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawGrid(glowGridCtx, w, h, SMALL_SIZE, 'rgba(161, 161, 170, 0.15)', 1)
      drawGrid(glowGridCtx, w, h, BIG_SIZE, 'rgba(161, 161, 170, 0.28)', 1)

      sizeRef.current = { w, h }

      const cx = w / 2
      const cy = h / 2
      const maxDim = Math.max(w, h)
      const g = ctx.createRadialGradient(cx, cy, maxDim * 0.3, cx, cy, maxDim * 0.7)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      vignetteRef.current = g
    }

    const doSpawn = () => {
      if (prefersReducedMotionRef.current) return
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return
      if (starsRef.current.length >= maxStars) return

      const dir: 'h' | 'v' = Math.random() > 0.5 ? 'h' : 'v'
      const forward = Math.random() > 0.5
      const speed =
        STAR_SPEED_MIN + Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN)

      const pos =
        dir === 'h'
          ? ((Math.random() * (h / BIG_SIZE + 1)) | 0) * BIG_SIZE
          : ((Math.random() * (w / BIG_SIZE + 1)) | 0) * BIG_SIZE

      starsRef.current.push({
        dir,
        forward,
        pos,
        speed,
        color: STAR_COLOR,
        startTime: performance.now(),
      })
    }

    const scheduleNext = () => {
      if (!running) return
      const delay =
        STAR_SPAWN_MIN + Math.random() * (STAR_SPAWN_MAX - STAR_SPAWN_MIN)

      if (document.visibilityState !== 'visible') {
        spawnIdRef.current = setTimeout(scheduleNext, delay)
        return
      }

      doSpawn()
      spawnIdRef.current = setTimeout(scheduleNext, delay)
    }

    const frame = (timestamp: number) => {
      if (!running) return

      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(frame)
        return
      }

      ctx.clearRect(0, 0, w, h)

      drawGrid(ctx, w, h, SMALL_SIZE, GRID_SMALL, 0.6)
      drawGrid(ctx, w, h, BIG_SIZE, GRID_BIG, 0.8)

      if (!isTouchRef.current) {
        const { x: mx, y: my } = positionRef.current
        if (mx > 0 && my > 0 && mx < w && my < h) {
          const EASING = 0.20
          smoothRef.current.x += (mx - smoothRef.current.x) * EASING
          smoothRef.current.y += (my - smoothRef.current.y) * EASING

          const { x: sx, y: sy } = smoothRef.current

          glowCtx.clearRect(0, 0, w, h)
          glowCtx.drawImage(glowGridCanvas, 0, 0)

          glowCtx.globalCompositeOperation = 'destination-in'
          glowCtx.save()
          glowCtx.translate(sx - R, sy - R)
          glowCtx.drawImage(maskCanvas, 0, 0)
          glowCtx.restore()
          glowCtx.globalCompositeOperation = 'source-over'

          ctx.drawImage(glowCanvas, 0, 0)
        }
      }

      drawStars(ctx, w, h, timestamp, starsRef.current)

      if (vignetteRef.current) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-in'
        ctx.fillStyle = vignetteRef.current
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
      }

      animRef.current = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current)
        clearTimeout(spawnIdRef.current)
        spawnIdRef.current = undefined
      } else {
        animRef.current = requestAnimationFrame(frame)
        scheduleNext()
      }
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        updateSize()
        const { w, h } = sizeRef.current
        if (w > 0 && h > 0) {
          ctx.clearRect(0, 0, w, h)
          drawGrid(ctx, w, h, SMALL_SIZE, GRID_SMALL, 0.6)
          drawGrid(ctx, w, h, BIG_SIZE, GRID_BIG, 0.8)
        }
        running = true
        animRef.current = requestAnimationFrame(frame)
        scheduleNext()
      }
    }

    updateSize()
    const { w, h } = sizeRef.current
    if (w > 0 && h > 0) {
      ctx.clearRect(0, 0, w, h)
      drawGrid(ctx, w, h, SMALL_SIZE, GRID_SMALL, 0.6)
      drawGrid(ctx, w, h, BIG_SIZE, GRID_BIG, 0.8)
      const fallback = document.getElementById('grid-fallback')
      if (fallback) fallback.style.display = 'none'
    }

    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateSize, 100)
    })
    observer.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)

    animRef.current = requestAnimationFrame(frame)
    scheduleNext()

    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
      clearTimeout(spawnIdRef.current)
      observer.disconnect()
      clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [positionRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  )
}
