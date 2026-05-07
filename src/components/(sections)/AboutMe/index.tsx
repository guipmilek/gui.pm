import { api } from '@/libs/wretch'

import { AboutMeContainer } from './styles'

type About = string[]

export async function AboutMe() {
  const about: About = await api.get('/about').json()

  return (
    <AboutMeContainer>
      {about.map((paragraph, index) => {
        return <p key={paragraph + index}>{paragraph}</p>
      })}
    </AboutMeContainer>
  )
}
