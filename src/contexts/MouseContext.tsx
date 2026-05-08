'use client'

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface MouseContextValue {
  positionRef: React.MutableRefObject<MousePosition>
  isHoveringRef: React.MutableRefObject<boolean>
}

const MouseContext = createContext<MouseContextValue | null>(null)

export function MouseProvider({ children }: { children: ReactNode }) {
  const positionRef = useRef<MousePosition>({ x: Number.NaN, y: Number.NaN })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const hideStyle = document.createElement('style')
    hideStyle.id = 'custom-cursor-hide'
    hideStyle.textContent =
      'html :not(input):not(textarea):not([contenteditable]) { cursor: none !important; }'

    function hideNativeCursor() {
      if (!document.getElementById('custom-cursor-hide')) {
        document.head.appendChild(hideStyle)
      }
    }

    function showNativeCursor() {
      if (hideStyle.parentNode) hideStyle.remove()
    }

    let hasPointerPosition = false

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        hasPointerPosition = false
        positionRef.current.x = Number.NaN
        positionRef.current.y = Number.NaN
        showNativeCursor()
        return
      }

      const last =
        'getCoalescedEvents' in event
          ? (event.getCoalescedEvents().at(-1) ?? event)
          : event
      positionRef.current.x = last.clientX
      positionRef.current.y = last.clientY
      hasPointerPosition = true
      hideNativeCursor()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        hasPointerPosition = false
        positionRef.current.x = Number.NaN
        positionRef.current.y = Number.NaN
        showNativeCursor()
      }
    }

    const onMouseEnter = () => {
      if (hasPointerPosition) hideNativeCursor()
    }
    const onMouseLeave = () => {
      hasPointerPosition = false
      showNativeCursor()
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        hasPointerPosition = false
        positionRef.current.x = Number.NaN
        positionRef.current.y = Number.NaN
        showNativeCursor()
      }
    }

    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pageshow', onPageShow)

    return () => {
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pageshow', onPageShow)
      showNativeCursor()
    }
  }, [])

  return (
    <MouseContext.Provider value={{ positionRef, isHoveringRef }}>
      {children}
    </MouseContext.Provider>
  )
}

export function useMouseContext() {
  const context = useContext(MouseContext)
  if (!context) {
    throw new Error('useMouseContext must be used within a MouseProvider')
  }
  return context
}

export function useMousePosition() {
  return useMouseContext().positionRef
}
