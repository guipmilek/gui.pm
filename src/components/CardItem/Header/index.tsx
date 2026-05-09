import Image from 'next/image'

import {
  CertificationItem,
  EducationItem,
  Experience,
  Project,
} from '@/interfaces/cardItem'

import { HeaderCardItemContainer, ProjectImagePlaceholder } from './styles'

type HeaderCardItemProps =
  | { type: 'experience'; data: Experience }
  | { type: 'project'; data: Project }
  | { type: 'certification'; data: CertificationItem }
  | { type: 'education'; data: EducationItem }

function getMonthName(monthNumber: number) {
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')
}

export function HeaderCardItem({ type, data }: HeaderCardItemProps) {
  switch (type) {
    case 'experience': {
      const { startMonthYear, endMonthYear } = data

      let headerContent = `${getMonthName(startMonthYear.month)} de ${
        startMonthYear.year
      }`

      if (endMonthYear !== null) {
        headerContent += ` — ${getMonthName(endMonthYear.month)} de ${
          endMonthYear.year
        }`
      } else {
        headerContent += ' — atualmente'
      }

      return (
        <HeaderCardItemContainer type="experience">
          <span>{headerContent}</span>
        </HeaderCardItemContainer>
      )
    }

    case 'project': {
      const { imagePath } = data

      return (
        <HeaderCardItemContainer type="project">
          {imagePath ? (
            <Image
              src={imagePath}
              alt={`${data.title} preview`}
              width={200}
              height={112.5}
            />
          ) : (
            <ProjectImagePlaceholder>interno</ProjectImagePlaceholder>
          )}
        </HeaderCardItemContainer>
      )
    }

    case 'certification': {
      return (
        <HeaderCardItemContainer type="experience">
          <span>{data.date}</span>
        </HeaderCardItemContainer>
      )
    }

    case 'education': {
      return (
        <HeaderCardItemContainer type="experience">
          <span>{data.period}</span>
        </HeaderCardItemContainer>
      )
    }
  }
}
