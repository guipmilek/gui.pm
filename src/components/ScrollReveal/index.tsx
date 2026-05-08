'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'
const REVEAL_PENDING_CLASS = 'reveal-pending'
const REVEALED_CLASS = 'is-revealed'
const STAGGER_MS = 80

function setRevealDelay(element: HTMLElement) {
  const delayIndex = Number(element.dataset.revealDelay ?? 0)

  if (!Number.isFinite(delayIndex) || delayIndex <= 0) return

  element.style.setProperty('--reveal-delay', `${delayIndex * STAGGER_MS}ms`)
}

function isInitiallyVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  return rect.top < window.innerHeight && rect.bottom > 0
}

export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    )

    if (elements.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    elements.forEach(setRevealDelay)

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add(REVEALED_CLASS))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add(REVEALED_CLASS)
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.1,
      },
    )

    elements.forEach((element) => {
      if (isInitiallyVisible(element)) {
        element.classList.add(REVEALED_CLASS)
        return
      }

      element.classList.add(REVEAL_PENDING_CLASS)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
