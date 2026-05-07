import Image from 'next/image'

import { Experience, Project } from '@/interfaces/cardItem'

import { HeaderCardItemContainer } from './styles'

type HeaderCardItemProps =
  | { type: 'experience'; data: Experience }
  | { type: 'project'; data: Project }

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
      }

      return (
        <HeaderCardItemContainer type="experience">
          <span>{headerContent}</span>
        </HeaderCardItemContainer>
      )
    }

    case 'project': {
      const { imagePath } = data
      const baseUrl = process.env.API_BASE_URL
      const src = baseUrl ? `${baseUrl}${imagePath}` : imagePath

      return (
        <HeaderCardItemContainer type="project">
          <Image
            src={src}
            alt={`${data.title} preview`}
            width={200}
            height={112.5}
          />
        </HeaderCardItemContainer>
      )
    }
  }
}
