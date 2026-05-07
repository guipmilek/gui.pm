import { about } from '@/data/about'
import { experiences } from '@/data/experiences'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

import type { DataProvider } from './types'

export function createStaticDataProvider(): DataProvider {
  return {
    getProfile: () => Promise.resolve(profile),
    getAbout: () => Promise.resolve(about),
    getExperiences: () =>
      Promise.resolve(
        [...experiences]
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, 3),
      ),
    getProjects: () =>
      Promise.resolve(
        [...projects]
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, 3),
      ),
  }
}

export const staticDataProvider = createStaticDataProvider()
