'use client'

import { useEffect, useRef } from 'react'

import { useMouseContext } from '@/contexts/MouseContext'

interface ShootingStar {
  headX: number
  headY: number
  dir: 'h' | 'v'
  moveSignX: number
  moveSignY: number
  speed: number
  waypoints: { x: number; y: number }[]
  startPos: { x: number; y: number }
  totalDist: number
  lastTurnDist: number
  lastGridSize: number
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
  const edgeHistoryRef = useRef<number[]>([])

  useEffect(() => {
    // B1: On touch/coarse devices the CSS GridFallback handles the base grid.
    // We allow the canvas to run for stars, but limit count on mobile.
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    isTouchRef.current = !isFinePointer

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
      const tx = mx + window.scrollX
      const ty = my + window.scrollY
      const hasPointer = Number.isFinite(mx) && Number.isFinite(my)
      const inBounds = hasPointer && mx > 0 && my > 0 && mx < w && my < h
      const guided = !isTouchRef.current && isMouseInside && inBounds

      let headX = 0
      let headY = 0
      let dir: 'h' | 'v' = 'h'
      let moveSignX = 1
      let moveSignY = 1
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

      // Pick an edge, avoiding the most recent ones if possible
      const availableEdges = [0, 1, 2, 3].filter(e => !edgeHistoryRef.current.includes(e))
      const edge = (availableEdges.length > 0
        ? availableEdges[(Math.random() * availableEdges.length) | 0]
        : (Math.random() * 4) | 0) as number

      edgeHistoryRef.current.push(edge)
      if (edgeHistoryRef.current.length > 2) edgeHistoryRef.current.shift()

      const entryDepth = 100 + Math.random() * 150 // Randomize entry distance (100-250px)

      if (guided) {
        if (edge === 0) {
          // Top
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = scrollY - entryDepth
          dir = 'v'
          moveSignY = 1
          moveSignX = tx > headX ? 1 : -1
        } else if (edge === 1) {
          // Bottom
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = scrollY + h + entryDepth
          dir = 'v'
          moveSignY = -1
          moveSignX = tx > headX ? 1 : -1
        } else if (edge === 2) {
          // Left
          headX = scrollX - entryDepth
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          dir = 'h'
          moveSignX = 1
          moveSignY = ty > headY ? 1 : -1
        } else {
          // Right
          headX = scrollX + w + entryDepth
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          dir = 'h'
          moveSignX = -1
          moveSignY = ty > headY ? 1 : -1
        }
      } else {
        const forward = Math.random() > 0.5
        if (edge === 2 || edge === 3) {
          // Left or Right
          const side = edge === 2 ? 'left' : 'right'
          const { line, key } = findUnoccupiedLine(scrollY, h, 'h')
          headY = line
          occupancyKey = key
          headX = side === 'left' ? scrollX - entryDepth : scrollX + w + entryDepth
          dir = 'h'
          moveSignX = side === 'left' ? 1 : -1
          moveSignY = 1
        } else {
          // Top or Bottom
          const side = edge === 0 ? 'top' : 'bottom'
          const { line, key } = findUnoccupiedLine(scrollX, w, 'v')
          headX = line
          occupancyKey = key
          headY = side === 'top' ? scrollY - entryDepth : scrollY + h + entryDepth
          dir = 'v'
          moveSignY = side === 'top' ? 1 : -1
          moveSignX = 1
        }
      }

      lineOccupancyRef.current.add(occupancyKey)
      starsRef.current.push({
        headX,
        headY,
        dir,
        moveSignX,
        moveSignY,
        speed: STAR_SPEED,
        waypoints: [],
        startPos: { x: headX, y: headY },
        totalDist: 0,
        lastTurnDist: 0,
        lastGridSize: BIG_SIZE,
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

        if (star.guided && hasPointer && isMouseInside) {
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

          // Grid size hysteresis to prevent flipping
          let gridSize = star.lastGridSize || BIG_SIZE
          const switchToSmall = distToBigGrid > currentAbsorbDist - 5
          const switchToBig = distToBigGrid < currentAbsorbDist - 15
          if (gridSize === BIG_SIZE && switchToSmall) gridSize = SMALL_SIZE
          else if (gridSize === SMALL_SIZE && switchToBig) gridSize = BIG_SIZE
          star.lastGridSize = gridSize

          const targetGridX = Math.round(tx / gridSize) * gridSize
          const targetGridY = Math.round(ty / gridSize) * gridSize

          // Turn cool-down: must move a bit before turning again
          const canTurn = (star.totalDist - star.lastTurnDist) > gridSize * 1.1

          if (star.dir === 'h') {
            star.headX += star.moveSignX * step
            const nextGridX = Math.round(star.headX / gridSize) * gridSize
            if (canTurn && Math.abs(star.headX - nextGridX) < step) {
              if (Math.abs(targetGridY - star.headY) >= gridSize) {
                const targetKey = `v-${nextGridX}`
                const isOccupied = lineOccupancyRef.current.has(targetKey)

                // Check for a free alternative vertical line that also reaches the cursor
                const altGridX = targetGridX === nextGridX
                  ? (tx > targetGridX ? targetGridX + gridSize : targetGridX - gridSize)
                  : targetGridX
                const altKey = `v-${altGridX}`
                const isAltOccupied = lineOccupancyRef.current.has(altKey)
                const altReaches = Math.abs(altGridX - tx) < gridSize * 1.5

                let shouldTurn = false
                if (!isOccupied) {
                  shouldTurn = true
                } else if (distToMouse < 160) {
                  if (altReaches && !isAltOccupied && altGridX !== nextGridX) {
                    shouldTurn = false
                  } else {
                    shouldTurn = true
                  }
                }

                if (shouldTurn) {
                  // Momentum lock: don't reverse direction on an axis once committed near target
                  const nextMoveSignY = Math.sign(targetGridY - star.headY) || 1
                  if (distToMouse > 80 || nextMoveSignY === star.moveSignY || star.waypoints.length < 2) {
                    if (star.occupancyKey) lineOccupancyRef.current.delete(star.occupancyKey)
                    star.headX = nextGridX
                    star.waypoints.unshift({ x: star.headX, y: star.headY })
                    star.dir = 'v'
                    star.moveSignY = nextMoveSignY
                    star.lastTurnDist = star.totalDist
                    star.occupancyKey = targetKey
                    lineOccupancyRef.current.add(targetKey)
                  }
                }
              }
            }
          } else {
            star.headY += star.moveSignY * step
            const nextGridY = Math.round(star.headY / gridSize) * gridSize
            if (canTurn && Math.abs(star.headY - nextGridY) < step) {
              if (Math.abs(targetGridX - star.headX) >= gridSize) {
                const targetKey = `h-${nextGridY}`
                const isOccupied = lineOccupancyRef.current.has(targetKey)

                // Check for a free alternative horizontal line that also reaches the cursor
                const altGridY = targetGridY === nextGridY
                  ? (ty > targetGridY ? targetGridY + gridSize : targetGridY - gridSize)
                  : targetGridY
                const altKey = `h-${altGridY}`
                const isAltOccupied = lineOccupancyRef.current.has(altKey)
                const altReaches = Math.abs(altGridY - ty) < gridSize * 1.5

                let shouldTurn = false
                if (!isOccupied) {
                  shouldTurn = true
                } else if (distToMouse < 160) {
                  if (altReaches && !isAltOccupied && altGridY !== nextGridY) {
                    shouldTurn = false
                  } else {
                    shouldTurn = true
                  }
                }

                if (shouldTurn) {
                  const nextMoveSignX = Math.sign(targetGridX - star.headX) || 1
                  if (distToMouse > 80 || nextMoveSignX === star.moveSignX || star.waypoints.length < 2) {
                    if (star.occupancyKey) lineOccupancyRef.current.delete(star.occupancyKey)
                    star.headY = nextGridY
                    star.waypoints.unshift({ x: star.headX, y: star.headY })
                    star.dir = 'h'
                    star.moveSignX = nextMoveSignX
                    star.lastTurnDist = star.totalDist
                    star.occupancyKey = targetKey
                    lineOccupancyRef.current.add(targetKey)
                  }
                }
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
            star.headX += star.moveSignX * step
          } else {
            star.headY += star.moveSignY * step
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
      } else {
        lastTimeRef.current = 0
        animRef.current = requestAnimationFrame(frame)
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
