import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'

import guipmdevLogo from '@/assets/guipmdev-logo.svg'
import { icons } from '@/libs/reactIcons'
import { api, isApiAvailable } from '@/libs/wretch'

import { Navbar } from '../Navbar'
import { AsideHeaderContainer, Bio, SocialLinks } from './styles'

type LinkType = typeof icons

interface LinkItem {
  type: keyof LinkType
  title: string
  url: string
}

interface Profile {
  headline: string
  bio: string
  links: LinkItem[]
}

const fallbackProfile: Profile = {
  headline: 'Full-stack developer',
  bio: 'Desenvolvedor full-stack apaixonado por criar experiencias digitais incriveis.',
  links: [
    { type: 'github', title: 'GitHub', url: 'https://github.com/guipmilek' },
    { type: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com/in/guipmilek' },
  ],
}

export async function AsideHeader() {
  const profile: Profile = isApiAvailable && api
    ? await api.get('/profile').json()
    : fallbackProfile

  const { headline, bio, links } = profile

  const hasLinks = links.length > 0

  return (
    <AsideHeaderContainer>
      <Bio>
        <div className="logo">
          <Image src={guipmdevLogo} alt="" title="Logotipo por graphitepoint" priority />

          <div>
            <h1>GUIPM.DEV</h1>
            <strong>
              <span>&lt;</span>{headline} <span>/&gt;</span>
            </strong>
          </div>
        </div>

        <p>{bio}</p>
      </Bio>

      <Navbar />

      {hasLinks && (
        <SocialLinks>
          {links.map((link) => {
            const Icon: IconType = icons[link.type]

            return (
              <li key={link.url}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.title}
                >
                  <Icon size={24} />
                </Link>
              </li>
            )
          })}
        </SocialLinks>
      )}
    </AsideHeaderContainer>
  )
}
