'use client'

import Link from 'next/link'

import { useActiveItem } from '@/hooks/useActiveItem'

import { NavbarContainer } from './styles'

interface SectionInfo {
  id: string
  text: string
}

const sectionInfos: SectionInfo[] = [
  { id: 'about', text: 'SOBRE' },
  { id: 'experience', text: 'EXPERIÊNCIA' },
  { id: 'projects', text: 'PROJETOS' },
]
const sectionsIds = sectionInfos.map((sectionInfo) => sectionInfo.id)

export function Navbar() {
  const activeSection = useActiveItem(sectionsIds, sectionsIds[0])

  return (
    <NavbarContainer>
      {sectionInfos.map((sectionInfo, index) => {
        const { id, text } = sectionInfo

        const sectionId = `#${id}`

        return (
          <Link
            href={sectionId}
            className={activeSection === id ? 'active' : ''}
            key={id}
          >
            <span></span> {text}
          </Link>
        )
      })}
    </NavbarContainer>
  )
}
