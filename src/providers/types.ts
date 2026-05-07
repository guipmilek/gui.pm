import type { Experience, Link, Project } from '@/interfaces/cardItem'

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
}
