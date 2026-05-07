'use client'

import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/contexts/MouseContext'

export function useMouseEvent() {
  const positionRef = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip the rAF loop entirely on touch/coarse devices — the cursor
    // element is already hidden via CSS but there's no point burning CPU.
    if (!window.matchMedia('(pointer: fine)').matches) return

    let animId = 0
    let running = true
    let prevX = -1
    let prevY = -1

    function loop() {
      if (!running) return
      if (cursorRef.current) {
        const { x, y } = positionRef.current
        if (x !== prevX || y !== prevY) {
          prevX = x
          prevY = y
          cursorRef.current.style.transform =
            `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
        }
      }
      animId = requestAnimationFrame(loop)
    }

    // Pause the loop when the tab is hidden, resume when visible.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(loop)
      }
    }

    const onMouseEnter = () => {
      cursorRef.current?.classList.add('visible')
    }
    const onMouseLeave = () => {
      cursorRef.current?.classList.remove('visible')
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        running = true
        prevX = -1
        prevY = -1
        document.documentElement.addEventListener('mouseenter', onMouseEnter)
        document.documentElement.addEventListener('mouseleave', onMouseLeave)
        // Restore visibility class if mouse was inside before bfcache
        cursorRef.current?.classList.add('visible')
        animId = requestAnimationFrame(loop)
      }
    }

    // Start hidden — add 'visible' only when mouse enters the viewport.
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    animId = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [positionRef])

  return cursorRef
}
