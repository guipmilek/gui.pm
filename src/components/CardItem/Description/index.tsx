'use client'

import { useEffect, useRef, useState } from 'react'
import { RxChevronDown } from 'react-icons/rx'

import { Button } from '@/components/Button'

import { ParagraphCardItemContainer } from './styles'

interface DescriptionCardItemProps {
  description: string[]
}

const LINE_HEIGHT_IN_REM = 1.25
const INITIAL_VISIBLE_LINES_NUMBER = 10
const DEFAULT_COLLAPSED_HEIGHT = `calc(${LINE_HEIGHT_IN_REM}rem * ${INITIAL_VISIBLE_LINES_NUMBER})`
const DEFAULT_BUTTON_MARGIN_TOP = 'calc((2.625rem + 0.75rem) * -1)'

// Use concrete px values so Firefox interpolates numbers, not calc() exprs.
// calc() heights force a full layout recalc every animation frame.
function getCollapsedHeight() {
  if (typeof window === 'undefined') {
    return DEFAULT_COLLAPSED_HEIGHT
  }
  const remSizeInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  )
  return `${LINE_HEIGHT_IN_REM * INITIAL_VISIBLE_LINES_NUMBER * remSizeInPx}px`
}

export function DescriptionCardItem({ description }: DescriptionCardItemProps) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const estimatedChars = description.reduce((acc, p) => acc + p.length, 0)
  const isLikelyToOverflow = estimatedChars > 350 || description.length > 5

  const [hasOverflow, setHasOverflow] = useState(isLikelyToOverflow)
  const [isExpanded, setIsExpanded] = useState(false)

  const [height, setHeight] = useState<string>(DEFAULT_COLLAPSED_HEIGHT)

  function handleToggleDescription() {
    if (!divRef.current) return

    if (isExpanded) {
      setHeight(getCollapsedHeight())
    } else {
      setHeight(`${divRef.current.scrollHeight}px`)
    }

    setIsExpanded((prev) => !prev)
  }

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const overflow = div.scrollHeight > div.clientHeight

    setHasOverflow(overflow)

    if (!overflow) {
      setHeight('auto')
    } else {
      // Resolve the initial collapsed height now that fonts are loaded.
      setHeight(getCollapsedHeight())
    }
  }, [])

  return (
    <ParagraphCardItemContainer>
      <div
        ref={divRef}
        style={{ height }}
        data-overflow={hasOverflow}
        data-expanded={isExpanded}
      >
        {description.map((paragraph, index) =>
          paragraph.length ? (
            <p key={paragraph + index}>{paragraph}</p>
          ) : (
            <br key={index} />
          ),
        )}
      </div>

      {hasOverflow && (
        <Button
          onClick={handleToggleDescription}
          rotateIcon={isExpanded}
          style={{
            marginTop: isExpanded ? '0' : DEFAULT_BUTTON_MARGIN_TOP,
          }}
        >
          {isExpanded ? 'Ocultar' : 'Expandir'}
          <RxChevronDown size={12} />
        </Button>
      )}
    </ParagraphCardItemContainer>
  )
}
