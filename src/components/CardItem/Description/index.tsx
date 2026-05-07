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

  const defaultDivMaxHeight = `calc(${lineHeightInRem}rem * ${initialVisibleLinesNumber})`
  const defaultButtonMarginTop = 'calc((2.625rem + 0.75rem) * -1)'

  const [maxHeight, setMaxHeight] = useState<string>(defaultDivMaxHeight)

  function handleToggleDescription() {
    if (!divRef.current) return

    if (isExpanded) {
      setMaxHeight(defaultDivMaxHeight)
    } else {
      const remSizeInPx = parseInt(
        getComputedStyle(document.documentElement).fontSize,
      )

      const divHeightInPx = divRef.current.scrollHeight
      const lineHeightInPx = lineHeightInRem * remSizeInPx
      const linesNumber = Math.ceil(divHeightInPx / lineHeightInPx)

      setMaxHeight(`calc(${lineHeightInRem}rem * ${linesNumber})`)
    }

    setIsExpanded((prev) => !prev)
  }

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const overflow = div.scrollHeight > div.clientHeight

    setHasOverflow(overflow)

    if (!overflow) {
      setMaxHeight('auto')
    }
  }, [])

  return (
    <ParagraphCardItemContainer>
      <div
        ref={divRef}
        style={{ maxHeight }}
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
