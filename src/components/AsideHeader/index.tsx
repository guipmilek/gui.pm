import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { IconType } from 'react-icons'
import { RxDownload } from 'react-icons/rx'

import guipmdevLogo from '@/assets/guipmdev-logo.svg'
import { icons } from '@/libs/reactIcons'
import { staticDataProvider } from '@/providers'

import { Navbar } from '../Navbar'
import { SafeFluentEmoji } from '../SafeFluentEmoji'
import { AsideHeaderContainer, Bio, ResumeButton, SocialLinks } from './styles'

export async function AsideHeader() {
  const profile = await staticDataProvider.getProfile()

  const { headline, bio, links } = profile

  const hasLinks = links.length > 0

  // Replace 👋 with SafeFluentEmoji
  const bioParts = bio.split('👋')

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

        <div className="bio-text">
          {bioParts.map((part, index) => (
            <Fragment key={index}>
              {part}
              {index < bioParts.length - 1 && (
                <SafeFluentEmoji
                  emoji="👋"
                  type="anim"
                  size={20}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '0.25rem',
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>
      </Bio>

      <Navbar />

      <ResumeButton
        href="/curriculo.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        <RxDownload size={14} />
        Baixar currículo
      </ResumeButton>

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
