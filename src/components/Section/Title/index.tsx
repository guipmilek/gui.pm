'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { SectionTitleContainer } from './styles'

interface SectionTitleProps {
  sectionId: string
  sectionTitle: string
}

export function SectionTitle({ sectionId, sectionTitle }: SectionTitleProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const { ref: observerRef, entry } = useIntersectionObserver({
    threshold: 1,
    rootMargin: '-1px 0px 0px 0px',
  })
  const [isPinned, setIsPinned] = useState(false)

  const isStickyDetectionReady = entry !== undefined

  const sectionLink = `#${sectionId}`

  useEffect(() => {
    if (isStickyDetectionReady && entry) {
      const elementVisibilityPercentage = entry.intersectionRatio

      setIsPinned(elementVisibilityPercentage < 1)
    }
  }, [entry, isStickyDetectionReady])

  const setRefs = (node: HTMLAnchorElement | null) => {
    ref.current = node
    observerRef(node)
  }

  return (
    <SectionTitleContainer
      ref={setRefs}
      href={sectionLink}
      className={isPinned ? 'pinned' : undefined}
      isSticky={isStickyDetectionReady}
    >
      <h2>{sectionTitle}</h2>
    </SectionTitleContainer>
  )
}
