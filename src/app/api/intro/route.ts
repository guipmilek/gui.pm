import { staticDataProvider } from '@/providers'

export async function GET() {
  const { name, fullName, headline, bio } = await staticDataProvider.getProfile()
  return Response.json({ name, fullName, headline, bio })
}
