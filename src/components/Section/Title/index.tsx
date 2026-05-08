'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { GlassWrapper } from '../../CardItem/GlassWrapper'
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
  const isPinned = entry !== undefined && entry.intersectionRatio < 1

  const sectionLink = `#${sectionId}`

  const setRefs = (node: HTMLAnchorElement | null) => {
    ref.current = node
    observerRef(node)
  }

  return (
    <Link
      ref={setRefs}
      href={sectionLink}
      className={`${sectionTitleContainerStyles()}${isPinned ? ' pinned' : ''}`}
    >
      {isPinned ? (
        <GlassWrapper
          distortion={10}
          blur={8}
          backgroundOpacity={1}
          backgroundColor="var(--colors-section-title-background)"
          borderSize={0}
          padding="0"
          className="header-glass-card"
        >
          <h2>{sectionTitle}</h2>
        </GlassWrapper>
      ) : (
        <h2>{sectionTitle}</h2>
      )}
    </Link>
  )
}
