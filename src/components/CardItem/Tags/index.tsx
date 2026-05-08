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
    const wasExpanded = prevExpandedRef.current
    prevExpandedRef.current = isTagsExpanded

    if (wasExpanded === isTagsExpanded) return
    if (!badgeRef.current || !hasOverflow || lastWidthRef.current === null) return

    const el = badgeRef.current
    const oldWidth = lastWidthRef.current

    // Mede a largura com o novo texto (DOM já atualizado pelo React)
    el.style.transition = 'none'
    el.style.width = 'auto'
    const newWidth = el.getBoundingClientRect().width

    if (Math.abs(oldWidth - newWidth) < 0.5) return

    // Congela na largura ANTIGA — isso é o que o browser vai pintar no próximo frame
    el.style.width = `${oldWidth}px`

    // Double rAF: garante que o browser pintou o estado "congelado"
    // antes de iniciar a transição para a nova largura
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!badgeRef.current) return
        badgeRef.current.style.transition = 'width 0.3s ease'
        badgeRef.current.style.width = `${newWidth}px`
      })
    })
  }, [isTagsExpanded, hasOverflow])

  // Captura a largura a cada renderização para estar pronto para o próximo toggle
  useLayoutEffect(() => {
    if (badgeRef.current) {
      // Importante: medir sem o override de width do FLIP se ele estiver rodando
      // mas como useLayoutEffect roda síncrono, o valor aqui será o pós-render
      lastWidthRef.current = badgeRef.current.getBoundingClientRect().width
    }
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
