import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

export const api = wretch(process.env.API_BASE_URL, {
  next: {
    revalidate: 60 * 60 * 24 * 7, // 7 day
  },
}).addon(QueryStringAddon)
