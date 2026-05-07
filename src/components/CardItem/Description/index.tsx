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

  const [hasOverflow, setHasOverflow] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const lineHeightInRem = 1.25
  const initialVisibleLinesNumber = 10

  const defaultDivMaxHeight = `calc(${lineHeightInRem}rem * ${initialVisibleLinesNumber})`
  const defaultButtonMarginTop = 'calc((2.625rem + 0.75rem) * -1)'

  function handleToggleDescription() {
    if (!divRef.current) return

    const remSizeInPx = parseInt(
      getComputedStyle(document.documentElement).fontSize,
    )

    const divHeightInPx = divRef.current.scrollHeight
    const lineHeightInPx = lineHeightInRem * remSizeInPx
    const linesNumber = Math.ceil(divHeightInPx / lineHeightInPx)

    divRef.current.style.maxHeight = isExpanded
      ? defaultDivMaxHeight
      : `calc(${lineHeightInRem}rem * ${linesNumber})`

    divRef.current.dataset.expanded = isExpanded ? 'false' : 'true'

    setIsExpanded((prev) => !prev)
  }

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    div.style.maxHeight = defaultDivMaxHeight
    const overflow = div.scrollHeight > div.clientHeight

    setHasOverflow(overflow)

    if (overflow) {
      div.dataset.overflow = 'true'
    } else {
      div.style.maxHeight = 'auto'
    }
  }, [defaultDivMaxHeight])

  return (
    <ParagraphCardItemContainer>
      <div ref={divRef}>
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
