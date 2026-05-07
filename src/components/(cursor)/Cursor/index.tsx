'use client'

import { useEffect, useRef } from 'react'

import { useMouseEvent } from '@/hooks/useMouseEvent'

import { CursorContainer, CursorPart } from './styles'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [contenteditable="true"], .hoverable'

export function Cursor() {
  const cursorRef = useMouseEvent()
  const isHovering = useRef(false)
  const isClicking = useRef(false)

  useEffect(() => {
    const container = cursorRef.current
    if (!container) return

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(INTERACTIVE_SELECTOR)
      if (interactive && !isHovering.current) {
        isHovering.current = true
        container.classList.add('hover')
      } else if (!interactive && isHovering.current) {
        isHovering.current = false
        container.classList.remove('hover')
      }
    }

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return
      isClicking.current = true
      container.classList.add('clicking')
    }

    const onMouseUp = () => {
      if (isClicking.current) {
        isClicking.current = false
        container.classList.remove('clicking')
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [cursorRef])

  return (
    <CursorContainer ref={cursorRef}>
      <CursorPart className="dot" />
      <CursorPart className="solidOutline" />
      <CursorPart className="dashedOutline" />
    </CursorContainer>
  )
}
