import type { Experience, Link, Project } from '@/interfaces/cardItem'
import type { CertificationItem } from '@/interfaces/certification'
import type { EducationItem } from '@/interfaces/education'
import type { LanguageItem } from '@/interfaces/language'

export interface Profile {
  headline: string
  bio: string
  links: Link[]
}

export interface QueryOptions<T> {
  sort?: keyof T
  order?: 'asc' | 'desc' | null
  limit?: number | null
}

export interface DataProvider {
  getProfile(): Promise<Profile>
  getAbout(): Promise<string[]>
  getExperiences(options?: QueryOptions<Experience>): Promise<Experience[]>
  getProjects(options?: QueryOptions<Project>): Promise<Project[]>
  getEducation(): Promise<EducationItem[]>
  getCertifications(): Promise<CertificationItem[]>
  getLanguages(): Promise<LanguageItem[]>
}
