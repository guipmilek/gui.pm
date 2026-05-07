import { experiences } from '@/data/experiences'
import type { Experience } from '@/interfaces/cardItem'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('_sort')
  const order = searchParams.get('_order')
  const limit = searchParams.get('_limit')

  let result = [...experiences]

  if (sort && sort in result[0]!) {
    result.sort((a, b) => {
      const aVal = a[sort as keyof Experience]
      const bVal = b[sort as keyof Experience]
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
