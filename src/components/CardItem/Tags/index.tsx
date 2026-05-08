'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { useExpand } from '../ExpandContext'
import { ExtraTags, TagsBadge, TagsList, TagsWrapper } from '../styles'

interface TagsCardItemProps {
  tags: string[]
}

const VISIBLE_LIMIT = 6

export function TagsCardItem({ tags }: TagsCardItemProps) {
  const { isTagsExpanded, toggleTags } = useExpand()

  const extraRef = useRef<HTMLUListElement | null>(null)
  const badgeRef = useRef<HTMLButtonElement | null>(null)

  // Estados para controle da animação FLIP
  const lastWidthRef = useRef<number | null>(null)
  const prevExpandedRef = useRef(isTagsExpanded)

  const visibleTags = tags.slice(0, VISIBLE_LIMIT)
  const hiddenTags = tags.slice(VISIBLE_LIMIT)
  const hasOverflow = hiddenTags.length > 0

  const badgeText = isTagsExpanded ? '−' : `+${hiddenTags.length}`

  // Anima a altura da lista extra
  useEffect(() => {
    if (!extraRef.current) return
    if (isTagsExpanded) {
      extraRef.current.style.height = `${extraRef.current.scrollHeight}px`
    } else {
      extraRef.current.style.height = '0'
    }
  }, [isTagsExpanded])

  // FLIP da largura: detecta mudança no estado e anima do valor capturado no render anterior
  useLayoutEffect(() => {
    if (!badgeRef.current || !hasOverflow) return
    const el = badgeRef.current

    // 1. Mede a largura natural do NOVO estado (DOM já atualizado pelo React)
    const originalWidth = el.style.width
    const originalTransition = el.style.transition

    el.style.transition = 'none'
    el.style.width = 'auto'
    const naturalWidth = el.getBoundingClientRect().width

    const wasExpanded = prevExpandedRef.current
    prevExpandedRef.current = isTagsExpanded

    // 2. Se o estado mudou, inicia a animação FLIP
    if (wasExpanded !== isTagsExpanded && lastWidthRef.current !== null) {
      const oldWidth = lastWidthRef.current

      if (Math.abs(oldWidth - naturalWidth) > 0.5) {
        // Congela na largura ANTIGA
        el.style.width = `${oldWidth}px`

        // Double rAF para garantir que o browser pintou a largura antiga antes de transicionar
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!badgeRef.current) return
            badgeRef.current.style.transition = 'width 0.3s ease'
            badgeRef.current.style.width = `${naturalWidth}px`
          })
        })
      } else {
        // Se a largura não mudou significativamente, restaura o estado
        el.style.width = originalWidth
        el.style.transition = originalTransition
      }
    } else {
      // 3. Se não mudou o estado, restaura o que estava (para não interferir com outros renders)
      el.style.width = originalWidth
      el.style.transition = originalTransition
    }

    // 4. Salva a largura natural (estável) para o próximo ciclo
    lastWidthRef.current = naturalWidth
  })

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
            <TagsBadge
              ref={badgeRef}
              onClick={toggleTags}
              data-expanded={isTagsExpanded}
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {badgeText}
            </TagsBadge>
          </li>
        )}
      </TagsList>

      {hasOverflow && (
        <ExtraTags ref={extraRef}>
          {hiddenTags.map((tag, index) => (
            <li
              key={tag}
              style={{
                opacity: isTagsExpanded ? 1 : 0,
                transform: isTagsExpanded ? 'translateY(0)' : 'translateY(-8px)',
                transition: isTagsExpanded
                  ? `opacity 0.4s ease ${index * 0.04 + 0.05}s, transform 0.4s ease ${index * 0.04 + 0.05}s`
                  : 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <span>{tag}</span>
            </li>
          ))}
        </ExtraTags>
      )}
    </TagsWrapper>
  )
}
