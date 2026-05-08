'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'
const REVEAL_PRELOAD_CLASS = 'reveal-preload'
const REVEAL_PENDING_CLASS = 'reveal-pending'
const REVEALED_CLASS = 'is-revealed'
const STAGGER_MS = 80
const INITIAL_STAGGER_MS = 140

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
    const root = document.documentElement
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    )

    if (elements.length === 0) {
      root.classList.remove(REVEAL_PRELOAD_CLASS)
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    elements.forEach(setRevealDelay)

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add(REVEALED_CLASS))
      root.classList.remove(REVEAL_PRELOAD_CLASS)
      return
    }

    const initiallyVisibleElements: HTMLElement[] = []

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
      element.classList.add(REVEAL_PENDING_CLASS)

      if (isInitiallyVisible(element)) {
        initiallyVisibleElements.push(element)
        return
      }

      observer.observe(element)
    })

    root.classList.remove(REVEAL_PRELOAD_CLASS)

    const revealTimeouts: Array<ReturnType<typeof setTimeout>> = []
    let revealFrame = 0
    const pendingFrame = requestAnimationFrame(() => {
      revealFrame = requestAnimationFrame(() => {
        initiallyVisibleElements.forEach((element, index) => {
          element.style.setProperty('--reveal-delay', '0ms')

          const timeout = setTimeout(() => {
            element.classList.add(REVEALED_CLASS)
          }, index * INITIAL_STAGGER_MS)

          revealTimeouts.push(timeout)
        })
      })
    })

    return () => {
      cancelAnimationFrame(pendingFrame)
      cancelAnimationFrame(revealFrame)
      revealTimeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  return null
}
