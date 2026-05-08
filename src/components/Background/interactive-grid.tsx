'use client'

import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/contexts/MouseContext'

interface ShootingStar {
  dir: 'h' | 'v'
  forward: boolean
  pos: number
  from: number
  to: number
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
const MAX_CANVAS_DPR = 1.5

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  size: number,
  color: string,
  alpha: number,
  offsetX = 0,
  offsetY = 0,
) {
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 1

  ctx.beginPath()
  for (let x = offsetX; x <= w; x += size) {
    ctx.moveTo((x + 0.5) | 0, 0)
    ctx.lineTo((x + 0.5) | 0, h)
  }
  for (let y = offsetY; y <= h; y += size) {
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
  scrollX: number,
  scrollY: number,
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
      const y = star.pos - scrollY
      if (y < -STAR_THICKNESS || y > h + STAR_THICKNESS) continue

      const cx = star.from + (star.to - star.from) * progress - scrollX

      const sx = star.forward ? cx - TRAIL_LENGTH : cx + TRAIL_LENGTH
      const grad = ctx.createLinearGradient(sx, y, cx, y)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.7, star.color)
      grad.addColorStop(1, 'rgba(255,255,255,0.8)')

      ctx.fillStyle = grad
      const left = Math.min(sx, cx)
      const tw = Math.abs(cx - sx)
      ctx.fillRect(left, y - STAR_THICKNESS / 2, tw, STAR_THICKNESS)
    } else {
      const x = star.pos - scrollX
      if (x < -STAR_THICKNESS || x > w + STAR_THICKNESS) continue

      const cy = star.from + (star.to - star.from) * progress - scrollY

      const sy = star.forward ? cy - TRAIL_LENGTH : cy + TRAIL_LENGTH
      const grad = ctx.createLinearGradient(x, sy, x, cy)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.7, star.color)
      grad.addColorStop(1, 'rgba(255,255,255,0.8)')

      ctx.fillStyle = grad
      const top = Math.min(sy, cy)
      const th = Math.abs(cy - sy)
      ctx.fillRect(x - STAR_THICKNESS / 2, top, STAR_THICKNESS, th)
    }
  }

  ctx.globalAlpha = 1
}

function gridOffset(scroll: number, size: number) {
  return -(((scroll % size) + size) % size)
}

function randomGridLine(scroll: number, viewportSize: number) {
  const firstLine = Math.floor(scroll / BIG_SIZE) * BIG_SIZE
  const lineCount = Math.ceil((viewportSize + scroll - firstLine) / BIG_SIZE) + 1

  return firstLine + ((Math.random() * lineCount) | 0) * BIG_SIZE
}

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<ShootingStar[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const dprRef = useRef(1)
  const animRef = useRef(0)
  const spawnIdRef = useRef<ReturnType<typeof setTimeout>>(undefined)
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
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const glowCanvas = document.createElement('canvas')
    const glowCtx = glowCanvas.getContext('2d')
    if (!glowCtx) return

    // Cache the bright glow grid — drawn once on resize, reused every frame.
    const glowGridCanvas = document.createElement('canvas')
    const glowGridCtx = glowGridCanvas.getContext('2d')
    if (!glowGridCtx) return

    // Cache the radial mask; the glow tile reuses it every frame.
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
    let isMouseInside = true
    let glowOpacity = 0
    let lastMx = -1
    let lastMy = -1
    let lastGlowLeft = -R
    let lastGlowTop = -R
    let lastScrollX = Number.NaN
    let lastScrollY = Number.NaN

    const onMouseEnter = () => { isMouseInside = true }
    const onMouseLeave = () => { isMouseInside = false }
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    const drawGlowGrid = (w: number, h: number) => {
      const scrollX = window.scrollX
      const scrollY = window.scrollY

      glowGridCtx.clearRect(0, 0, w, h)
      drawGrid(
        glowGridCtx,
        w,
        h,
        SMALL_SIZE,
        'rgba(161, 161, 170, 0.15)',
        1,
        gridOffset(scrollX, SMALL_SIZE),
        gridOffset(scrollY, SMALL_SIZE),
      )
      drawGrid(
        glowGridCtx,
        w,
        h,
        BIG_SIZE,
        'rgba(161, 161, 170, 0.28)',
        1,
        gridOffset(scrollX, BIG_SIZE),
        gridOffset(scrollY, BIG_SIZE),
      )

      lastScrollX = scrollX
      lastScrollY = scrollY
      lastMx = Number.NaN
      lastMy = Number.NaN
    }

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR)
      const w = window.innerWidth
      const h = window.innerHeight
      const pixelW = Math.round(w * dpr)
      const pixelH = Math.round(h * dpr)

      if (
        canvas.width === pixelW &&
        canvas.height === pixelH &&
        sizeRef.current.w === w &&
        sizeRef.current.h === h
      ) return

      canvas.width = pixelW
      canvas.height = pixelH
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const glowSize = R * 2
      const glowPixelSize = Math.round(glowSize * dpr)
      glowCanvas.width = glowPixelSize
      glowCanvas.height = glowPixelSize
      glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      glowGridCanvas.width = pixelW
      glowGridCanvas.height = pixelH
      glowGridCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawGlowGrid(w, h)

      dprRef.current = dpr
      sizeRef.current = { w, h }
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

      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const axisScroll = dir === 'h' ? scrollX : scrollY
      const axisSize = dir === 'h' ? w : h
      const pos =
        dir === 'h'
          ? randomGridLine(scrollY, h)
          : randomGridLine(scrollX, w)
      const from = forward
        ? axisScroll - TRAIL_LENGTH
        : axisScroll + axisSize + TRAIL_LENGTH
      const to = forward
        ? axisScroll + axisSize + TRAIL_LENGTH
        : axisScroll - TRAIL_LENGTH

      starsRef.current.push({
        dir,
        forward,
        pos,
        from,
        to,
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

      if (window.scrollX !== lastScrollX || window.scrollY !== lastScrollY) {
        drawGlowGrid(w, h)
      }

      ctx.clearRect(0, 0, w, h)

      if (!isTouchRef.current) {
        const mx = positionRef.current.x
        const my = positionRef.current.y

        const EASING = 0.20
        smoothRef.current.x += (mx - smoothRef.current.x) * EASING
        smoothRef.current.y += (my - smoothRef.current.y) * EASING

        const inBounds = mx > 0 && my > 0 && mx < w && my < h
        const targetOpacity = isMouseInside && inBounds ? 1 : 0
        glowOpacity += (targetOpacity - glowOpacity) * 0.15

        const mouseStill = Math.abs(mx - lastMx) < 0.5 && Math.abs(my - lastMy) < 0.5
        const isSmoothSettled = Math.abs(mx - smoothRef.current.x) < 0.5 && Math.abs(my - smoothRef.current.y) < 0.5
        const glowSettled = glowOpacity < 0.01 || Math.abs(targetOpacity - glowOpacity) < 0.005

        if (glowOpacity > 0.01 && !(mouseStill && isSmoothSettled && glowSettled)) {
          lastMx = mx
          lastMy = my

          const { x: sx, y: sy } = smoothRef.current
          const dpr = dprRef.current
          const glowSize = R * 2
          const left = Math.floor(sx - R)
          const top = Math.floor(sy - R)
          const sourceX = Math.max(0, left)
          const sourceY = Math.max(0, top)
          const destX = sourceX - left
          const destY = sourceY - top
          const sourceW = Math.min(glowSize - destX, w - sourceX)
          const sourceH = Math.min(glowSize - destY, h - sourceY)

          lastGlowLeft = left
          lastGlowTop = top

          glowCtx.clearRect(0, 0, glowSize, glowSize)

          if (sourceW > 0 && sourceH > 0) {
            glowCtx.drawImage(
              glowGridCanvas,
              sourceX * dpr,
              sourceY * dpr,
              sourceW * dpr,
              sourceH * dpr,
              destX,
              destY,
              sourceW,
              sourceH,
            )
          }

          glowCtx.globalCompositeOperation = 'destination-in'
          glowCtx.globalAlpha = glowOpacity
          glowCtx.drawImage(maskCanvas, 0, 0, glowSize, glowSize)
          glowCtx.globalAlpha = 1
          glowCtx.globalCompositeOperation = 'source-over'

          ctx.drawImage(glowCanvas, left, top, glowSize, glowSize)
        } else if (glowOpacity > 0.01) {
          ctx.drawImage(glowCanvas, lastGlowLeft, lastGlowTop, R * 2, R * 2)
        }
      }

      drawStars(
        ctx,
        w,
        h,
        timestamp,
        starsRef.current,
        window.scrollX,
        window.scrollY,
      )

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
        }
        running = true
        animRef.current = requestAnimationFrame(frame)
        scheduleNext()
      }
    }

    updateSize()

    let resizeTimeout: ReturnType<typeof setTimeout>
    const scheduleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateSize()
      }, 200)
    }
    const observer = new ResizeObserver(scheduleResize)
    observer.observe(document.documentElement)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', scheduleResize)
    window.addEventListener('pageshow', onPageShow)

    animRef.current = requestAnimationFrame(frame)
    scheduleNext()

    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
      clearTimeout(spawnIdRef.current)
      clearTimeout(resizeTimeout)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', scheduleResize)
      window.removeEventListener('pageshow', onPageShow)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [positionRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
