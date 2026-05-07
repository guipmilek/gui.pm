import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

const baseUrl = process.env.API_BASE_URL

export const api = baseUrl
  ? wretch(baseUrl, {
      next: {
        revalidate: 60 * 60 * 24 * 7, // 7 days
      },
    }).addon(QueryStringAddon)
  : null

export const isApiAvailable = !!baseUrl
