'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [contenteditable="true"], .hoverable'

const HALF = 55
const SCROLL_HOVER_CLASS = 'scroll-hover'

export function useMouseEvent() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let rafPending = false
    let pendingX = 0
    let pendingY = 0
    let isHovering = false
    let isClicking = false
    let hasPointerPosition = false
    let scrollRafPending = false
    let scrollHoverElements: Element[] = []

    const documentElement = document.documentElement

    const clearScrollHover = () => {
      scrollHoverElements.forEach((element) => {
        element.classList.remove(SCROLL_HOVER_CLASS)
      })
      scrollHoverElements = []
    }

    const setHoverStale = (isStale: boolean) => {
      documentElement.classList.toggle('hover-stale', isStale)
    }

    const setHovering = (nextIsHovering: boolean) => {
      if (nextIsHovering === isHovering) return

      isHovering = nextIsHovering
      cursorRef.current?.classList.toggle('hover', nextIsHovering)
    }

    const getElementAtPoint = () => {
      if (!hasPointerPosition) return null

      return document.elementFromPoint(pendingX, pendingY)
    }

    const applyScrollHoverAtPoint = () => {
      clearScrollHover()

      const target = getElementAtPoint()
      let element = target
      while (element && element !== documentElement) {
        element.classList.add(SCROLL_HOVER_CLASS)
        scrollHoverElements.push(element)
        element = element.parentElement
      }

      return target?.closest(INTERACTIVE_SELECTOR) ?? null
    }

    // Drive cursor position directly from pointermove, committed once per
    // animation frame. No spring accumulation = no multi-frame lag buildup.
    const onPointerMove = (event: PointerEvent) => {
      pendingX = event.clientX
      pendingY = event.clientY
      hasPointerPosition = true
      clearScrollHover()
      setHoverStale(false)

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
      setHovering(Boolean(interactive))
    }

    const onScroll = () => {
      if (!hasPointerPosition || scrollRafPending) return

      scrollRafPending = true
      requestAnimationFrame(() => {
        scrollRafPending = false
        setHoverStale(true)
        setHovering(Boolean(applyScrollHoverAtPoint()))
      })
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
      hasPointerPosition = false
      clearScrollHover()
      setHovering(false)
      setHoverStale(false)
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
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerover', onPointerOver)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      clearScrollHover()
      setHoverStale(false)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return cursorRef
}
