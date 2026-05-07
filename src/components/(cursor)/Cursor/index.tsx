'use client'

import { useMouseEvent } from '@/hooks/useMouseEvent'

import { CursorContainer, CursorPart } from './styles'

export function Cursor() {
  const cursorRef = useMouseEvent()

  return (
    <CursorContainer ref={cursorRef}>
      <CursorPart className="dot" />
      <CursorPart className="solidOutline" />
      <CursorPart className="dashedOutline" />
    </CursorContainer>
  )
}
