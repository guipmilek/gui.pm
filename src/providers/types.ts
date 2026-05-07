import type { Experience, Link, Project } from '@/interfaces/cardItem'

export interface Profile {
  headline: string
  bio: string
  links: Link[]
}

export interface DataProvider {
  getProfile(): Promise<Profile>
  getAbout(): Promise<string[]>
  getExperiences(): Promise<Experience[]>
  getProjects(): Promise<Project[]>
}
