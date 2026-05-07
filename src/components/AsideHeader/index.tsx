import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'

import guipmdevLogo from '@/assets/guipmdev-logo.svg'
import { icons } from '@/libs/reactIcons'
import { staticDataProvider } from '@/providers'

import { Navbar } from '../Navbar'
import { AsideHeaderContainer, Bio, SocialLinks } from './styles'

export async function AsideHeader() {
  const profile = await staticDataProvider.getProfile()

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
