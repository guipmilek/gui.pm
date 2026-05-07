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

interface Ripple {
  x: number
  y: number
  startTime: number
}

const BIG_SIZE = 80
const SMALL_SIZE = 20
const TRAIL_LENGTH = 150
const RIPPLE_DURATION = 1000
const MAX_STARS = 15
const STAR_THICKNESS = 1

const STAR_SPAWN_MIN = 200
const STAR_SPAWN_MAX = 600
const STAR_SPEED_MIN = 2000
const STAR_SPEED_MAX = 4500

const GRID_BIG = 'rgba(113, 113, 122, 0.15)'
const GRID_SMALL = 'rgba(113, 113, 122, 0.07)'
const HOVER_RADIUS = 280
const RIPPLE_COLOR = 'rgba(56, 189, 248, 0.4)'
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

function drawRipples(
  ctx: CanvasRenderingContext2D,
  now: number,
  ripples: Ripple[],
) {
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i]
    const elapsed = now - ripple.startTime
    const progress = elapsed / RIPPLE_DURATION

    if (progress >= 1) {
      ripples.splice(i, 1)
      continue
    }

    const alpha = (1 - progress) ** 2 * 0.5
    const radius = progress * 200

    ctx.strokeStyle = RIPPLE_COLOR
    ctx.globalAlpha = alpha
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  ctx.globalAlpha = 1
}

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<ShootingStar[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  // Canvas logical dimensions — separate from DPR-scaled pixel dimensions.
  const sizeRef = useRef({ w: 0, h: 0 })
  const animRef = useRef(0)
  const spawnIdRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  // Cached gradient — rebuilt only on resize.
  const vignetteRef = useRef<CanvasGradient | null>(null)
  // Smoothed mouse position for the hover glow — mutated in place.
  const smoothRef = useRef({ x: -100, y: -100 })
  const isTouchRef = useRef(true)

  const positionRef = useMousePosition()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Off-screen canvas for the mouse hover glow layer.
    const glowCanvas = document.createElement('canvas')
    const glowCtx = glowCanvas.getContext('2d')
    if (!glowCtx) return

    // Detect pointer type once — no need for a separate effect.
    isTouchRef.current = !window.matchMedia('(pointer: fine)').matches

    let running = true

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      // The canvas is position:absolute inset:0 so its rect.left/top are
      // always 0 — we only need the CSS dimensions.
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      glowCanvas.width = w * dpr
      glowCanvas.height = h * dpr
      glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      sizeRef.current = { w, h }

      // Rebuild the vignette gradient after every resize — it depends on w/h.
      const cx = w / 2
      const cy = h / 2
      const maxDim = Math.max(w, h)
      const g = ctx.createRadialGradient(cx, cy, maxDim * 0.3, cx, cy, maxDim * 0.7)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      vignetteRef.current = g
    }

    const doSpawn = () => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) return
      if (starsRef.current.length >= MAX_STARS) return

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

      // Mouse hover glow — desktop only, reads position directly from the ref.
      if (!isTouchRef.current) {
        const { x: mx, y: my } = positionRef.current
        // positionRef uses client coordinates; the canvas is inset:0
        // so client coords map directly onto canvas coords.
        if (mx > 0 && my > 0 && mx < w && my < h) {
          const EASING = 0.08
          // Mutate in place — no object allocation per frame.
          smoothRef.current.x += (mx - smoothRef.current.x) * EASING
          smoothRef.current.y += (my - smoothRef.current.y) * EASING

          const { x: sx, y: sy } = smoothRef.current

          glowCtx.clearRect(0, 0, w, h)
          drawGrid(glowCtx, w, h, SMALL_SIZE, 'rgba(161, 161, 170, 0.15)', 1)
          drawGrid(glowCtx, w, h, BIG_SIZE, 'rgba(161, 161, 170, 0.28)', 1)

          glowCtx.globalCompositeOperation = 'destination-in'
          const mask = glowCtx.createRadialGradient(sx, sy, 0, sx, sy, HOVER_RADIUS)
          mask.addColorStop(0, 'rgba(0,0,0,0.50)')
          mask.addColorStop(0.2, 'rgba(0,0,0,0.30)')
          mask.addColorStop(0.5, 'rgba(0,0,0,0.08)')
          mask.addColorStop(1, 'rgba(0,0,0,0)')
          glowCtx.fillStyle = mask
          glowCtx.fillRect(0, 0, w, h)
          glowCtx.globalCompositeOperation = 'source-over'

          ctx.drawImage(glowCanvas, 0, 0)
        }
      }

      drawStars(ctx, w, h, timestamp, starsRef.current)
      drawRipples(ctx, timestamp, ripplesRef.current)

      // Apply the vignette using the cached gradient (rebuilt only on resize).
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
      } else {
        animRef.current = requestAnimationFrame(frame)
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
      // Hide the CSS fallback grid once the canvas is ready.
      const fallback = document.getElementById('grid-fallback')
      if (fallback) fallback.style.display = 'none'
    }

    const observer = new ResizeObserver(updateSize)
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
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [positionRef])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    ripplesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      startTime: performance.now(),
    })
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
      onClick={handleClick}
      aria-hidden="true"
    />
  )
}
