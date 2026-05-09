'use client'

import { useIntersectionObserver } from 'usehooks-ts'

import { GlassWrapper } from '../../CardItem/GlassWrapper'
import { InteractiveLogo } from '../../InteractiveLogo'
import { MobileSectionPicker } from './MobileSectionPicker'
import { sectionTitleContainerStyles } from './styles'

interface SectionTitleProps {
  sectionId: string
  sectionTitle: string
}

export function SectionTitle({ sectionId, sectionTitle }: SectionTitleProps) {
  const { ref: observerRef, entry } = useIntersectionObserver({
    threshold: 1,
    rootMargin: '-1px 0px 0px 0px',
  })
  const isPinned = entry !== undefined && entry.intersectionRatio < 1

  const setRefs = (node: HTMLDivElement | null) => {
    observerRef(node)
  }

  return (
    <div
      ref={setRefs}
      className={`${sectionTitleContainerStyles()}${isPinned ? ' pinned' : ''}`}
    >
      <GlassWrapper
        distortion={10}
        blur={6}
        backgroundOpacity={0.86}
        backgroundColor="var(--colors-section-title-background)"
        borderSize={0}
        borderRadius={0}
        padding="0"
        className="header-glass-card"
        enableWebGLEnhancement={false}
        variant="header"
      >
        <div className="mobile-section-header-row">
          <MobileSectionPicker
            currentSectionId={sectionId}
            currentSectionTitle={sectionTitle}
            isPinned={isPinned}
          />

          <div className="mobile-section-logo" aria-hidden={!isPinned}>
            <InteractiveLogo
              variant="compact"
              className="mobile-section-logo-mark"
              tabIndex={isPinned ? 0 : -1}
            />
          </div>
        </div>
      </GlassWrapper>
    </div>
  )
}
