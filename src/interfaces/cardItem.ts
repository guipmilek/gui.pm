import { Icons } from '@/libs/reactIcons'

interface CustomDate {
  month: number
  year: number
}

export interface Link {
  type: keyof Icons
  title: string
  url: string
}

export interface Experience {
  id: string
  startMonthYear: CustomDate
  endMonthYear: CustomDate | null
  title: string
  companyName: string | null
  summary?: string | null
  link: string | null
  location: {
    countryCode: string
    postalCode: string
  } | null
  locationName: 'Presencial' | 'Híbrida' | 'Remota' | null
  locationText?: string | null
  description: string[] | null
  additionalLinks: Link[] | null
  skills: string[] | null
}

export interface Project {
  id: string
  imagePath: string
  title: string
  link: string | null
  description: string[] | null
  additionalLinks: Link[] | null
  tags: string[] | null
}
