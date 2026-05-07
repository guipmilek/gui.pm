import { staticDataProvider } from '@/providers'

export async function GET() {
  const about = await staticDataProvider.getAbout()
  return Response.json(about)
}
