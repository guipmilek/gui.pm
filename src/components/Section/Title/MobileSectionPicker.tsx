'use client'

import Link from 'next/link'
import { type MouseEvent, useCallback, useEffect, useId, useRef, useState } from 'react'
import { RxChevronDown } from 'react-icons/rx'

import { GlassWrapper } from '@/components/CardItem/GlassWrapper'
import { sectionInfos } from '@/components/Navbar/sections'

interface MobileSectionPickerProps {
  currentSectionId: string
  currentSectionTitle: string
  isPinned: boolean
  onOpenChange: (isOpen: boolean) => void
}

const EXIT_TRANSITION_MS = 280

export function MobileSectionPicker({
  currentSectionId,
  currentSectionTitle,
  isPinned,
  onOpenChange,
}: MobileSectionPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const menuId = useId()

  const closeMenu = useCallback(() => {
    clearTimeout(closeTimerRef.current)
    setIsClosing(true)
    setIsOpen(false)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    closeTimerRef.current = setTimeout(() => {
      setMounted(false)
      setIsClosing(false)
      onOpenChange(false)
    }, prefersReducedMotion ? 0 : EXIT_TRANSITION_MS)
  }, [onOpenChange])

  const openMenu = useCallback(() => {
    clearTimeout(closeTimerRef.current)
    setIsClosing(false)
    onOpenChange(true)

    if (!mounted) {
      setMounted(true)
      requestAnimationFrame(() => {
        setIsOpen(true)
      })
    } else {
      requestAnimationFrame(() => setIsOpen(true))
    }
  }, [mounted, onOpenChange])

  useEffect(() => {
    return () => clearTimeout(closeTimerRef.current)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleScroll() {
      closeMenu()
    }

    function handlePointerDown(event: PointerEvent) {
      const picker = pickerRef.current

      if (!picker || !(event.target instanceof Node)) return
      if (!picker.contains(event.target)) {
        closeMenu()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
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
  }, [isOpen, closeMenu])

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    closeMenu()

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
      }${isClosing ? ' is-closing' : ''}`}
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

            if (isOpen) {
              closeMenu()
            } else {
              openMenu()
            }
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

      {mounted && (
        <div className="mobile-section-picker-menu-shell">
          <GlassWrapper
            distortion={8}
            blur={22}
            backgroundOpacity={0.72}
            backgroundColor="var(--colors-background)"
            borderSize={1}
            borderColor="rgba(226, 232, 240, 0.14)"
            borderRadius={16}
            padding="0"
            className="mobile-section-picker-menu"
            enableWebGLEnhancement={false}
            forceActive={mounted}
            preserveCoarseMaterial
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
                    tabIndex={isOpen ? undefined : -1}
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
