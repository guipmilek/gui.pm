import { staticDataProvider } from '@/providers'
import type { Project } from '@/interfaces/cardItem'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('_sort') as keyof Project | null
  const order = searchParams.get('_order') as 'asc' | 'desc' | null
  const limit = searchParams.get('_limit')

  const result = await staticDataProvider.getProjects({
    sort: sort ?? undefined,
    order: order ?? undefined,
    limit: limit ? parseInt(limit) : undefined,
  })

  return Response.json(result)
}
