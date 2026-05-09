'use client'

import Link from 'next/link'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'

import { useActiveItem } from '@/hooks/useActiveItem'

import { NavbarContainer } from './styles'

interface SectionInfo {
  id: string
  text: string
}

const sectionInfos: SectionInfo[] = [
  { id: 'about', text: 'SOBRE' },
  { id: 'experience', text: 'EXPERIÊNCIA' },
  { id: 'education', text: 'FORMAÇÃO' },
  { id: 'certifications', text: 'CERTIFICAÇÕES' },
  { id: 'languages', text: 'IDIOMAS' },
  { id: 'projects', text: 'PROJETOS' },
]
const sectionsIds = sectionInfos.map((sectionInfo) => sectionInfo.id)

export function Navbar() {
  const activeSection = useActiveItem(sectionsIds)

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
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

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches

          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <NavbarContainer aria-label="Navegação principal">
      {sectionInfos.map((sectionInfo) => {
        const { id, text } = sectionInfo

        const sectionId = `#${id}`
        const isActive = activeSection === id

        return (
          <Link
            href={sectionId}
            aria-current={isActive ? 'location' : undefined}
            className={isActive ? 'active' : ''}
            onClick={(event) => handleNavClick(event, id)}
            key={id}
          >
            <span></span> {text}
          </Link>
        )
      })}
    </NavbarContainer>
  )
}
