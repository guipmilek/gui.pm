import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'

import guipmdevLogo from '@/assets/guipmdev-logo.svg'
import { icons } from '@/libs/reactIcons'
import { api } from '@/libs/wretch'

import { Navbar } from '../Navbar'
import { AsideHeaderContainer, Bio, SocialLinks } from './styles'

type LinkType = typeof icons

interface Link {
  type: keyof LinkType
  title: string
  url: string
}

interface Profile {
  headline: string
  bio: string
  links: Link[]
}

export async function AsideHeader() {
  const profile: Profile = await api.get('/profile').json()

  const { bio, links } = profile

  const hasLinks = links.length > 0

  return (
    <AsideHeaderContainer>
      <Bio>
        <div className="logo">
          <Image src={guipmdevLogo} alt="" title="Logotipo por graphitepoint" />

          <div>
            <h1>GUIPM.DEV</h1>
            <strong>
              <span>&lt;</span>Full-stack developer <span>/&gt;</span>
            </strong>
          </div>
        </div>

        <p>{bio}</p>
      </Bio>

      <Navbar />

      {hasLinks && (
        <SocialLinks>
          {links.map((link, index) => {
            const Icon: IconType = icons[link.type]

            return (
              <li key={index}>
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
