'use client'

import { useEffect, useRef, useState } from 'react'
import { RxChevronDown } from 'react-icons/rx'

import { Button } from '@/components/Button'

import { ParagraphCardItemContainer } from './styles'

interface DescriptionCardItemProps {
  description: string[]
}

export function DescriptionCardItem({ description }: DescriptionCardItemProps) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const estimatedChars = description.reduce((acc, p) => acc + p.length, 0)
  const isLikelyToOverflow = estimatedChars > 350 || description.length > 5

  const [hasOverflow, setHasOverflow] = useState(isLikelyToOverflow)
  const [isExpanded, setIsExpanded] = useState(false)

  const lineHeightInRem = 1.25
  const initialVisibleLinesNumber = 10
  const defaultButtonMarginTop = 'calc((2.625rem + 0.75rem) * -1)'

  // Use concrete px values so Firefox interpolates numbers, not calc() exprs.
  // calc() heights force a full layout recalc every animation frame.
  function getCollapsedHeight() {
    if (typeof window === 'undefined') {
      return `calc(${lineHeightInRem}rem * ${initialVisibleLinesNumber})`
    }
    const remSizeInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    )
    return `${lineHeightInRem * initialVisibleLinesNumber * remSizeInPx}px`
  }

  const [height, setHeight] = useState<string>(() => getCollapsedHeight())

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            marginTop: isExpanded ? '0' : defaultButtonMarginTop,
            transition: 'color 0.2s, background-color 0.2s, margin 0.5s',
          }}
        >
          {isExpanded ? 'Ocultar' : 'Expandir'}
          <RxChevronDown size={12} />
        </Button>
      )}
    </ParagraphCardItemContainer>
  )
}
