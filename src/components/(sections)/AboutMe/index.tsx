import { api, isApiAvailable } from '@/libs/wretch'

import { AboutMeContainer } from './styles'

type About = string[]

const fallbackAbout: About = [
  'Sou um desenvolvedor full-stack apaixonado por tecnologia e inovacao.',
  'Tenho experiencia em desenvolvimento web com React, Next.js, Node.js e TypeScript.',
  'Estou sempre buscando aprender novas tecnologias e melhorar minhas habilidades.',
]

export async function AboutMe() {
  const about: About = isApiAvailable && api
    ? await api.get('/about').json()
    : fallbackAbout

  return (
    <AboutMeContainer>
      {about.map((paragraph, index) => {
        return <p key={paragraph + index}>{paragraph}</p>
      })}
    </AboutMeContainer>
  )
}
