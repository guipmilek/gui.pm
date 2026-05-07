import { projects } from '@/data/projects'
import type { Project } from '@/interfaces/cardItem'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('_sort')
  const order = searchParams.get('_order')
  const limit = searchParams.get('_limit')

  let result = [...projects]

  if (sort && sort in result[0]!) {
    result.sort((a, b) => {
      const aVal = a[sort as keyof Project]
      const bVal = b[sort as keyof Project]
      if (typeof aVal === 'object' || typeof bVal === 'object') return 0
      const cmp = String(aVal).localeCompare(String(bVal))
      return order === 'asc' ? cmp : -cmp
    })
  }

  if (limit) {
    result = result.slice(0, parseInt(limit))
  }

  return Response.json(result)
}
