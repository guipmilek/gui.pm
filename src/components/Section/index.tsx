import Link from 'next/link'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { RxArrowRight } from 'react-icons/rx'

import { customLinkStyles, SectionContainer } from './styles'
import { SectionTitle } from './Title'

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  id: string
  sectionTitle: string
  link?: {
    text: string
    url: string
  }
  children: ReactNode
}

export function Section({
  id,
  sectionTitle,
  link,
  children,
  ...rest
}: SectionProps) {
  const hasLink = !!link

  const isExternalURL = hasLink && link.url.startsWith('http')

  return (
    <SectionContainer id={id} {...rest}>
      <SectionTitle sectionId={id} sectionTitle={sectionTitle} />

      {children}

      {hasLink && (
        <Link
          href={link.url}
          className={customLinkStyles()}
          {...(isExternalURL && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        >
          <span>{link.text}</span> <RxArrowRight size={12} />
        </Link>
      )}
    </SectionContainer>
  )
}
