'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [contenteditable="true"], .hoverable'

const HALF = 55

export function useMouseEvent() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let rafPending = false
    let pendingX = 0
    let pendingY = 0
    let isHovering = false
    let isClicking = false

    // Drive cursor position directly from pointermove, committed once per
    // animation frame. No spring accumulation = no multi-frame lag buildup.
    const onPointerMove = (event: PointerEvent) => {
      pendingX = event.clientX
      pendingY = event.clientY

      if (!rafPending) {
        rafPending = true
        requestAnimationFrame(() => {
          rafPending = false
          const container = cursorRef.current
          if (!container) return
          container.style.transform =
            `translate3d(${pendingX - HALF}px, ${pendingY - HALF}px, 0)`
        })
      }
    }

    // Use pointerover delegation instead of elementFromPoint() inside a rAF
    // loop. elementFromPoint() forces a synchronous layout flush every frame,
    // which blocks all concurrent CSS transitions (cards, etc.) in Firefox.
    // pointerover uses event.target — already resolved, zero layout cost.
    const onPointerOver = (event: PointerEvent) => {
      const el = event.target as Element | null
      const interactive = el?.closest(INTERACTIVE_SELECTOR) ?? null
      if (interactive && !isHovering) {
        isHovering = true
        cursorRef.current?.classList.add('hover')
      } else if (!interactive && isHovering) {
        isHovering = false
        cursorRef.current?.classList.remove('hover')
      }
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

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        document.documentElement.addEventListener('mouseenter', onMouseEnter)
        document.documentElement.addEventListener('mouseleave', onMouseLeave)
        cursorRef.current?.classList.add('visible')
      }
    }

    // Immediately show on fine-pointer devices so the cursor is visible even
    // when the mouse was already inside the viewport on first load.
    cursorRef.current?.classList.add('visible')
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return cursorRef
}
