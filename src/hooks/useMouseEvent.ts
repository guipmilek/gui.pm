'use client'

import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/contexts/MouseContext'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [contenteditable="true"], .hoverable'

export function useMouseEvent() {
  const positionRef = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let animId = 0
    let running = true
    let prevX = -1
    let prevY = -1
    let isHovering = false
    let isClicking = false

    function loop() {
      if (!running) return
      const container = cursorRef.current
      if (!container) {
        animId = requestAnimationFrame(loop)
        return
      }

      const { x, y } = positionRef.current
      if (x !== prevX || y !== prevY) {
        prevX = x
        prevY = y
        container.style.transform =
          `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      }

      // Hover detection — cheaper than a document-wide mouseover listener.
      if (x >= 0 && y >= 0) {
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
        prevX = -1
        prevY = -1
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
