import { staticDataProvider } from '@/providers'

export async function GET() {
  const profile = await staticDataProvider.getProfile()
  return Response.json(profile)
}
