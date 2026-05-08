'use client'

import { useEffect, useRef } from 'react'

import { useExpand } from '../ExpandContext'
import { ExtraTags, TagsBadge, TagsList, TagsWrapper } from '../styles'

interface TagsCardItemProps {
  tags: string[]
}

const VISIBLE_LIMIT = 6

export function TagsCardItem({ tags }: TagsCardItemProps) {
  const { isTagsExpanded, toggleTags } = useExpand()
  const extraRef = useRef<HTMLUListElement | null>(null)

  const visibleTags = tags.slice(0, VISIBLE_LIMIT)
  const hiddenTags = tags.slice(VISIBLE_LIMIT)
  const hasOverflow = hiddenTags.length > 0

  useEffect(() => {
    if (!extraRef.current) return
    if (isTagsExpanded) {
      extraRef.current.style.height = `${extraRef.current.scrollHeight}px`
    } else {
      extraRef.current.style.height = '0'
    }
  }, [isTagsExpanded])

  return (
    <TagsWrapper>
      <TagsList>
        {visibleTags.map((tag) => (
          <li key={tag}>
            <span>{tag}</span>
          </li>
        ))}

        {hasOverflow && (
          <li>
            <TagsBadge onClick={toggleTags} data-expanded={isTagsExpanded}>
              {isTagsExpanded ? '−' : `+${hiddenTags.length}`}
            </TagsBadge>
          </li>
        )}
      </TagsList>

      {hasOverflow && (
        <ExtraTags ref={extraRef} style={{ height: '0' }}>
          {hiddenTags.map((tag) => (
            <li key={tag}>
              <span>{tag}</span>
            </li>
          ))}
        </ExtraTags>
      )}
    </TagsWrapper>
  )
}
