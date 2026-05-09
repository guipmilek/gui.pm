'use client'

import Link from 'next/link'
import { type MouseEvent, useEffect, useId, useRef, useState } from 'react'
import { RxChevronDown } from 'react-icons/rx'

import { GlassWrapper } from '@/components/CardItem/GlassWrapper'
import { sectionInfos } from '@/components/Navbar/sections'

interface MobileSectionPickerProps {
  currentSectionId: string
  currentSectionTitle: string
  isPinned: boolean
}

export function MobileSectionPicker({
  currentSectionId,
  currentSectionTitle,
  isPinned,
}: MobileSectionPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) return

    function handleScroll() {
      setIsOpen(false)
    }

    function handlePointerDown(event: PointerEvent) {
      const picker = pickerRef.current

      if (!picker || !(event.target instanceof Node)) return
      if (!picker.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setIsOpen(false)

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.button !== 0) return

    const element = document.getElementById(id)
    if (!element) return

    event.preventDefault()

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.history.pushState(null, '', `#${id}`)
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  function scrollToCurrentSection() {
    const element = document.getElementById(currentSectionId)
    if (!element) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.history.pushState(null, '', `#${currentSectionId}`)
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div
      ref={pickerRef}
      className={`mobile-section-picker${isOpen ? ' is-open' : ''}${
        isPinned ? ' is-pinned' : ''
      }`}
    >
      <h2>
        <button
          type="button"
          className="mobile-section-picker-trigger"
          aria-label={`Escolher seção. Atual: ${currentSectionTitle}`}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => {
            if (!isPinned) {
              scrollToCurrentSection()
              return
            }

            setIsOpen((current) => !current)
          }}
        >
          <span className="mobile-section-picker-title">
            {currentSectionTitle}
          </span>
          <span className="mobile-section-picker-arrow" aria-hidden="true">
            <RxChevronDown size={16} />
          </span>
        </button>
      </h2>

      {isOpen && (
        <div className="mobile-section-picker-menu-shell">
          <GlassWrapper
            distortion={8}
            blur={8}
            backgroundOpacity={0.9}
            backgroundColor="var(--colors-section-title-background)"
            borderSize={1}
            borderRadius={16}
            padding="0"
            className="mobile-section-picker-menu"
            enableWebGLEnhancement={false}
            variant="compact"
          >
            <div id={menuId} className="mobile-section-picker-options">
              {sectionInfos.map(({ id, text }) => {
                const isCurrent = id === currentSectionId

                return (
                  <Link
                    key={id}
                    href={`#${id}`}
                    className={`mobile-section-picker-option${
                      isCurrent ? ' is-active' : ''
                    }`}
                    aria-current={isCurrent ? 'location' : undefined}
                    onClick={(event) => handleSectionClick(event, id)}
                  >
                    <span className="mobile-section-picker-option-line" />
                    <span>{text}</span>
                  </Link>
                )
              })}
            </div>
          </GlassWrapper>
        </div>
      )}
    </div>
  )
}
