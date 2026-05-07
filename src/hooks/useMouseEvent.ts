'use client'

import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/contexts/MouseContext'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [contenteditable="true"], .hoverable'

const HALF = 55

export function useMouseEvent() {
  const positionRef = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let animId = 0
    let running = true
    let frameCount = 2
    let cx = positionRef.current.x
    let cy = positionRef.current.y
    let isHovering = false
    let isClicking = false

    const SPRING = 0.38

    function loop() {
      if (!running) return
      const container = cursorRef.current
      if (!container) {
        animId = requestAnimationFrame(loop)
        return
      }

      const { x, y } = positionRef.current
      cx += (x - cx) * SPRING
      cy += (y - cy) * SPRING

      container.style.transform =
        `translate3d(${(cx - HALF).toFixed(1)}px, ${(cy - HALF).toFixed(1)}px, 0)`

      // Hover detection — throttled to every 3rd frame (~20Hz, imperceptible).
      frameCount += 1
      if (frameCount % 3 === 0 && x >= 0 && y >= 0) {
        const el = document.elementFromPoint(x, y)
        const interactive = el?.closest(INTERACTIVE_SELECTOR) ?? null
        if (interactive && !isHovering) {
          isHovering = true
          container.classList.add('hover')
        } else if (!interactive && isHovering) {
          isHovering = false
          container.classList.remove('hover')
        }
      }

      animId = requestAnimationFrame(loop)
    }

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return
      isClicking = true
      cursorRef.current?.classList.add('clicking')
    }

    const onMouseUp = () => {
      if (isClicking) {
        isClicking = false
        cursorRef.current?.classList.remove('clicking')
      }
    }

    const onMouseEnter = () => {
      cursorRef.current?.classList.add('visible')
    }
    const onMouseLeave = () => {
      cursorRef.current?.classList.remove('visible')
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(loop)
      }
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        running = true
        cx = positionRef.current.x
        cy = positionRef.current.y
        document.documentElement.addEventListener('mouseenter', onMouseEnter)
        document.documentElement.addEventListener('mouseleave', onMouseLeave)
        cursorRef.current?.classList.add('visible')
        animId = requestAnimationFrame(loop)
      }
    }

    // Immediately show on fine-pointer devices so the cursor is visible even
    // when the mouse was already inside the viewport on first load.
    cursorRef.current?.classList.add('visible')
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    animId = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [positionRef])

  return cursorRef
}
