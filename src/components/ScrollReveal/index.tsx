'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'
const STAGGER_MS = 80

function setRevealDelay(element: HTMLElement) {
  const delayIndex = Number(element.dataset.revealDelay ?? 0)

  if (!Number.isFinite(delayIndex) || delayIndex <= 0) return

  element.style.setProperty('--reveal-delay', `${delayIndex * STAGGER_MS}ms`)
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
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.1,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return null
}
