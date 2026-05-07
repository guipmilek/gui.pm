import { staticDataProvider } from '@/providers'

import { AboutMeContainer } from './styles'

export async function AboutMe() {
  const about = await staticDataProvider.getAbout()

  return (
    <AboutMeContainer>
      {about.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>
      })}
    </AboutMeContainer>
  )
}
