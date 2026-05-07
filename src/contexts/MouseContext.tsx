'use client'

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface MouseContextValue {
  positionRef: React.MutableRefObject<MousePosition>
}

const MouseContext = createContext<MouseContextValue | null>(null)

export function MouseProvider({ children }: { children: ReactNode }) {
  const positionRef = useRef<MousePosition>({ x: -52.5, y: -52.5 })

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

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

    const onPointerMove = (event: PointerEvent) => {
      const last =
        'getCoalescedEvents' in event
          ? (event.getCoalescedEvents().at(-1) ?? event)
          : event
      positionRef.current.x = last.clientX
      positionRef.current.y = last.clientY
    }

    const onMouseEnter = () => {
      hideNativeCursor()
    }
    const onMouseLeave = () => {
      showNativeCursor()
    }

    function restore() {
      hideNativeCursor()
      document.documentElement.addEventListener('mouseenter', onMouseEnter)
      document.documentElement.addEventListener('mouseleave', onMouseLeave)
      window.addEventListener('pointermove', onPointerMove)
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        restore()
      }
    }

    restore()
    window.addEventListener('pageshow', onPageShow)

    return () => {
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pageshow', onPageShow)
      showNativeCursor()
    }
  }, [])

  return (
    <MouseContext.Provider value={{ positionRef }}>
      {children}
    </MouseContext.Provider>
  )
}

export function useMousePosition() {
  const context = useContext(MouseContext)
  if (!context) {
    throw new Error('useMousePosition must be used within a MouseProvider')
  }
  return context.positionRef
}
