'use client'

import { useEffect, useRef } from 'react'

import { useMouseContext } from '@/contexts/MouseContext'

interface ShootingStar {
  headX: number
  headY: number
  dir: 'h' | 'v'
  moveSign: number
  speed: number
  waypoints: { x: number; y: number }[]
  startPos: { x: number; y: number }
  totalDist: number
  guided: boolean
  color: string
  startTime: number
  absorbTime?: number
  occupancyKey?: string
}

const BIG_SIZE = 80
const SMALL_SIZE = 20
const TRAIL_LENGTH = 160
const MAX_STARS = 20
const STAR_THICKNESS = 1.2
const STAR_HEAD_SIZE = 1.2

const STAR_SPAWN_MIN = 350
const STAR_SPAWN_MAX = 800
const STAR_SPEED = 0.28 // px/ms
const STAR_LIFETIME = 8000 // ms
const ABSORB_DIST = 62
const ABSORB_FADE = 300 // ms

const GRID_BIG = 'rgba(113, 113, 122, 0.15)'
const GRID_SMALL = 'rgba(113, 113, 122, 0.07)'
const HOVER_RADIUS = 280
const STAR_COLOR = 'rgba(148, 163, 184, 0.25)'
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
    let alpha = 1 - Math.pow(elapsed / STAR_LIFETIME, 2)

    if (star.absorbTime) {
      const absorbElapsed = now - star.absorbTime
      const absorbAlpha = 1 - absorbElapsed / ABSORB_FADE
      alpha = Math.min(alpha, absorbAlpha)
    }

    if (alpha <= 0) continue

    ctx.globalAlpha = alpha

    // Draw the "Spark" head - softer and smaller
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.beginPath()
    ctx.arc(star.headX - scrollX, star.headY - scrollY, STAR_HEAD_SIZE, 0, Math.PI * 2)
    ctx.fill()

    const trailPoints = [
      { x: star.headX, y: star.headY },
      ...star.waypoints,
      star.startPos,
    ]

    let remainingLength = TRAIL_LENGTH
    let currentDist = 0

    for (let j = 0; j < trailPoints.length - 1; j++) {
      const p1 = trailPoints[j]
      const p2 = trailPoints[j + 1]
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const segLen = Math.sqrt(dx * dx + dy * dy)

      if (segLen <= 0) continue

      const drawLen = Math.min(segLen, remainingLength)
      const ratio = drawLen / segLen
      const p2v = {
        x: p1.x + dx * ratio - scrollX,
        y: p1.y + dy * ratio - scrollY,
      }
      const p1v = { x: p1.x - scrollX, y: p1.y - scrollY }

      if (
        !Number.isFinite(p1v.x) ||
        !Number.isFinite(p1v.y) ||
        !Number.isFinite(p2v.x) ||
        !Number.isFinite(p2v.y)
      ) {
        remainingLength -= drawLen
        currentDist += drawLen
        if (remainingLength <= 0) break
        continue
      }

      // Skip if completely off-screen

      const getStopColor = (d: number) => {
        const p = 1 - d / TRAIL_LENGTH
        if (p > 0.8) return `rgba(226, 232, 240, ${p * 0.4})`
        if (p > 0) return `rgba(148, 163, 184, ${p * 0.2})`
        return 'transparent'
      }

      const grad = ctx.createLinearGradient(p2v.x, p2v.y, p1v.x, p1v.y)
      grad.addColorStop(0, getStopColor(currentDist + drawLen))
      grad.addColorStop(1, getStopColor(currentDist))

      ctx.strokeStyle = grad
      ctx.lineWidth = STAR_THICKNESS
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(p1v.x, p1v.y)
      ctx.lineTo(p2v.x, p2v.y)
      ctx.stroke()

      remainingLength -= drawLen
      currentDist += drawLen
      if (remainingLength <= 0) break
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

  const { positionRef, isHoveringRef } = useMouseContext()
  const lastTimeRef = useRef(0)
  const lineOccupancyRef = useRef<Set<string>>(new Set())

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

    const maxStars = window.innerWidth >= 1024 ? MAX_STARS : 3

    let running = true
    let isMouseInside = true
    let glowOpacity = 0
    let lastMx = -1
    let lastMy = -1
    let lastGlowLeft = -R
    let lastGlowTop = -R
    let hasGlowPosition = false
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

      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const mx = positionRef.current.x
      const my = positionRef.current.y
      const hasPointer = Number.isFinite(mx) && Number.isFinite(my)
      const inBounds = hasPointer && mx > 0 && my > 0 && mx < w && my < h
      const guided = !isTouchRef.current && isMouseInside && inBounds

      let headX = 0
      let headY = 0
      let dir: 'h' | 'v' = 'h'
      let moveSign = 1
      let occupancyKey = ''

      const findUnoccupiedLine = (scroll: number, size: number, orientation: 'h' | 'v') => {
        for (let attempt = 0; attempt < 10; attempt++) {
          const line = randomGridLine(scroll, size)
          const key = `${orientation}-${line}`
          if (!lineOccupancyRef.current.has(key)) return { line, key }
        }
        const line = randomGridLine(scroll, size)
        return { line, key: `${orientation}-${line}` }
      }

      if (guided) {
        const edge = (Math.random() * 4) | 0
        if (edge === 0) {
          // Top
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = scrollY - 100
          dir = 'v'
          moveSign = 1
        } else if (edge === 1) {
          // Bottom
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = scrollY + h + 100
          dir = 'v'
          moveSign = -1
        } else if (edge === 2) {
          // Left
          headX = scrollX - 100
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          dir = 'h'
          moveSign = 1
        } else {
          // Right
          headX = scrollX + w + 100
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          dir = 'h'
          moveSign = -1
        }
      } else {
        const side: 'h' | 'v' = Math.random() > 0.5 ? 'h' : 'v'
        const forward = Math.random() > 0.5
        dir = side
        moveSign = forward ? 1 : -1
        if (side === 'h') {
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          headX = forward ? scrollX - 100 : scrollX + w + 100
        } else {
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = forward ? scrollY - 100 : scrollY + h + 100
        }
      }

      lineOccupancyRef.current.add(occupancyKey)
      starsRef.current.push({
        headX,
        headY,
        dir,
        moveSign,
        speed: STAR_SPEED,
        waypoints: [],
        startPos: { x: headX, y: headY },
        totalDist: 0,
        guided,
        color: STAR_COLOR,
        startTime: performance.now(),
        occupancyKey,
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

      const dt = lastTimeRef.current === 0 ? 16.6 : timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      if (window.scrollX !== lastScrollX || window.scrollY !== lastScrollY) {
        drawGlowGrid(w, h)
      }

      ctx.clearRect(0, 0, w, h)

      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const mx = positionRef.current.x
      const my = positionRef.current.y

      if (!isTouchRef.current) {
        const hasPointerPosition = Number.isFinite(mx) && Number.isFinite(my)
        const inBounds =
          hasPointerPosition && mx > 0 && my > 0 && mx < w && my < h

        const EASING = 0.20
        if (hasPointerPosition && inBounds) {
          if (!hasGlowPosition || glowOpacity < 0.01) {
            smoothRef.current.x = mx
            smoothRef.current.y = my
            hasGlowPosition = true
          } else {
            smoothRef.current.x += (mx - smoothRef.current.x) * EASING
            smoothRef.current.y += (my - smoothRef.current.y) * EASING
          }
        }

        const targetOpacity = isMouseInside && inBounds ? 1 : 0
        const opacityEasing = targetOpacity > glowOpacity ? 0.18 : 0.12
        glowOpacity += (targetOpacity - glowOpacity) * opacityEasing

        const mouseStill =
          hasPointerPosition &&
          Math.abs(mx - lastMx) < 0.5 &&
          Math.abs(my - lastMy) < 0.5
        const isSmoothSettled =
          hasPointerPosition &&
          Math.abs(mx - smoothRef.current.x) < 0.5 &&
          Math.abs(my - smoothRef.current.y) < 0.5
        const glowSettled =
          glowOpacity < 0.01 || Math.abs(targetOpacity - glowOpacity) < 0.005

        if (
          glowOpacity > 0.01 &&
          hasGlowPosition &&
          !(mouseStill && isSmoothSettled && glowSettled)
        ) {
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
        } else if (glowOpacity > 0.01 && hasGlowPosition) {
          ctx.drawImage(glowCanvas, lastGlowLeft, lastGlowTop, R * 2, R * 2)
        }

        if (targetOpacity === 0 && glowOpacity < 0.01) {
          hasGlowPosition = false
        }
      }

      // Update Stars
      const hasPointer = Number.isFinite(mx) && Number.isFinite(my)
      const tx = hasPointer ? mx + scrollX : 0
      const ty = hasPointer ? my + scrollY : 0

      for (let i = starsRef.current.length - 1; i >= 0; i--) {
        const star = starsRef.current[i]
        const elapsed = timestamp - star.startTime

        if (star.absorbTime) {
          if (timestamp - star.absorbTime > ABSORB_FADE) {
            starsRef.current.splice(i, 1)
          }
          continue
        }

        if (elapsed > STAR_LIFETIME) {
          if (star.occupancyKey) lineOccupancyRef.current.delete(star.occupancyKey)
          starsRef.current.splice(i, 1)
          continue
        }

        const step = star.speed * dt
        star.totalDist += step

        if (star.guided && hasPointer) {
          const vmx = star.headX - scrollX
          const vmy = star.headY - scrollY
          const distToMouse = Math.sqrt((vmx - mx) ** 2 + (vmy - my) ** 2)

          const currentAbsorbDist = isHoveringRef.current ? 16 : ABSORB_DIST
          if (distToMouse < currentAbsorbDist) {
            star.absorbTime = timestamp
            if (star.occupancyKey) lineOccupancyRef.current.delete(star.occupancyKey)
            continue
          }

          const btx = Math.round(tx / BIG_SIZE) * BIG_SIZE
          const bty = Math.round(ty / BIG_SIZE) * BIG_SIZE
          const distToBigGrid = Math.sqrt((tx - btx) ** 2 + (ty - bty) ** 2)

          // Only use the smaller grid if the big grid lines are too far to reach the cursor
          const useSmallGrid = distToBigGrid > currentAbsorbDist - 5
          const gridSize = useSmallGrid ? SMALL_SIZE : BIG_SIZE

          const targetGridX = Math.round(tx / gridSize) * gridSize
          const targetGridY = Math.round(ty / gridSize) * gridSize

          if (star.dir === 'h') {
            star.headX += star.moveSign * step
            const nextGridX = Math.round(star.headX / gridSize) * gridSize
            if (Math.abs(star.headX - nextGridX) < step) {
              if (Math.abs(targetGridY - star.headY) >= gridSize) {
                star.headX = nextGridX
                star.waypoints.unshift({ x: star.headX, y: star.headY })
                star.dir = 'v'
                star.moveSign = Math.sign(targetGridY - star.headY) || 1
              }
            }
          } else {
            star.headY += star.moveSign * step
            const nextGridY = Math.round(star.headY / gridSize) * gridSize
            if (Math.abs(star.headY - nextGridY) < step) {
              if (Math.abs(targetGridX - star.headX) >= gridSize) {
                star.headY = nextGridY
                star.waypoints.unshift({ x: star.headX, y: star.headY })
                star.dir = 'h'
                star.moveSign = Math.sign(targetGridX - star.headX) || 1
              }
            }
          }

          // Waypoint Trimming: Remove waypoints that are further than TRAIL_LENGTH
          let totalWpDist = 0
          let lastX = star.headX
          let lastY = star.headY
          for (let j = 0; j < star.waypoints.length; j++) {
            const wp = star.waypoints[j]
            totalWpDist += Math.sqrt((wp.x - lastX) ** 2 + (wp.y - lastY) ** 2)
            if (totalWpDist > TRAIL_LENGTH) {
              star.waypoints.splice(j + 1)
              break
            }
            lastX = wp.x
            lastY = wp.y
          }
        } else {
          if (star.dir === 'h') {
            star.headX += star.moveSign * step
          } else {
            star.headY += star.moveSign * step
          }
        }
      }

      drawStars(
        ctx,
        w,
        h,
        timestamp,
        starsRef.current,
        scrollX,
        scrollY,
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
