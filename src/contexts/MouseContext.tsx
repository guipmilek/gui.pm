'use client'

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface MouseContextValue {
  positionRef: React.MutableRefObject<MousePosition>
}

const INITIAL_POSITION: MousePosition = { x: -52.5, y: -52.5 }

const MouseContext = createContext<MouseContextValue | null>(null)

export function MouseProvider({ children }: { children: ReactNode }) {
  const positionRef = useRef<MousePosition>(INITIAL_POSITION)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    let clientX = INITIAL_POSITION.x
    let clientY = INITIAL_POSITION.y

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

    const onMouseMove = (event: MouseEvent) => {
      clientX = event.clientX
      clientY = event.clientY
      positionRef.current = { x: clientX, y: clientY }
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
      window.addEventListener('mousemove', onMouseMove)
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        clientX = positionRef.current.x
        clientY = positionRef.current.y
        restore()
      }
    }

    restore()
    window.addEventListener('pageshow', onPageShow)

    return () => {
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousemove', onMouseMove)
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
