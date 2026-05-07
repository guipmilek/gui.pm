'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { sectionTitleContainerStyles } from './styles'

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
    <Link
      ref={setRefs}
      href={sectionLink}
      className={`${sectionTitleContainerStyles({ isSticky: isStickyDetectionReady })}${isPinned ? ' pinned' : ''}`}
    >
      <h2>{sectionTitle}</h2>
    </Link>
  )
}
