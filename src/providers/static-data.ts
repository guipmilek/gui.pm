import { about } from '@/data/about'
import { experiences } from '@/data/experiences'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

import type { DataProvider } from './types'

export function createStaticDataProvider(): DataProvider {
  return {
    getProfile: () => Promise.resolve(profile),
    getAbout: () => Promise.resolve(about),
    getExperiences: (options) => {
      let result = [...experiences]

      if (options?.sort && options.sort in result[0]!) {
        result.sort((a, b) => {
          const aVal = a[options.sort as keyof typeof a]
          const bVal = b[options.sort as keyof typeof b]
          if (typeof aVal === 'object' || typeof bVal === 'object') return 0
          const cmp = String(aVal).localeCompare(String(bVal))
          return options.order === 'asc' ? cmp : -cmp
        })
      }

      if (options?.limit) {
        result = result.slice(0, options.limit)
      }

      return Promise.resolve(result)
    },
    getProjects: (options) => {
      let result = [...projects]

      if (options?.sort && options.sort in result[0]!) {
        result.sort((a, b) => {
          const aVal = a[options.sort as keyof typeof a]
          const bVal = b[options.sort as keyof typeof b]
          if (typeof aVal === 'object' || typeof bVal === 'object') return 0
          const cmp = String(aVal).localeCompare(String(bVal))
          return options.order === 'asc' ? cmp : -cmp
        })
      }

      if (options?.limit) {
        result = result.slice(0, options.limit)
      }

      return Promise.resolve(result)
    },
  }
}

export const staticDataProvider = createStaticDataProvider()
