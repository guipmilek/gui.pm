import Link from 'next/link'
import { IconType } from 'react-icons'
import { RxExternalLink } from 'react-icons/rx'

import { LIQUID_GLASS_RADIUS } from '@/components/LiquidGlass/engine'
import {
  CertificationItem,
  EducationItem,
  Experience,
  Project,
} from '@/interfaces/cardItem'
import { icons } from '@/libs/reactIcons'

import { DescriptionCardItem } from './Description'
import { ExpandProvider } from './ExpandContext'
import { GlassWrapper } from './GlassWrapper'
import { HeaderCardItem } from './Header'
import { HeadingCardItem } from './Heading'
import {
  CardItemContainer,
  CardItemContent,
  EducationCardStatus,
  EducationDescription,
  Infos,
  Tags,
} from './styles'
import { TagsCardItem } from './Tags'

type CardItemProps = { revealDelay?: number } & (
  | {
      type: 'experience'
      data: Experience
    }
  | {
      type: 'project'
      data: Project
    }
  | {
      type: 'certification'
      data: CertificationItem
    }
  | {
      type: 'education'
      data: EducationItem
    }
)

export function CardItem(props: CardItemProps) {
  const { type, data } = props
  const { revealDelay } = props

  let headingTitle = ''
  let link: string | null = null
  let description: string[] | null = null
  let additionalLinks: { type: string; title: string; url: string }[] | null =
    null

  switch (type) {
    case 'experience':
      headingTitle = data.title
      if (data.companyName !== null) {
        headingTitle += ` · ${data.companyName}`
      }
      link = data.link
      description = data.description
      additionalLinks = data.additionalLinks as any
      break
    case 'project':
      headingTitle = data.title
      link = data.link
      description = data.description
      additionalLinks = data.additionalLinks as any
      break
    case 'certification':
      headingTitle = data.name
      link = data.url ?? null
      break
    case 'education':
      headingTitle = `${data.course} · ${data.institution}`
      break
  }

  const hasLink = link !== null
  const hasDescription = description !== null && description.length > 0
  const hasAdditionalLinks = additionalLinks !== null && additionalLinks.length > 0

  const tags =
    type === 'experience'
      ? data.skills
      : type === 'project'
      ? data.tags
      : null
  const hasTags = tags !== null && tags.length > 0

  return (
    <CardItemContainer data-reveal="" data-reveal-delay={revealDelay}>
      <GlassWrapper
        borderRadius={LIQUID_GLASS_RADIUS}
        className="glass-card-wrapper"
      >
        <CardItemContent {...(type === 'project' && { type })}>
          <HeaderCardItem {...props} />

          <div>
            <HeadingCardItem {...props}>
              {hasLink ? (
                <Link href={link!} target="_blank" rel="noopener noreferrer">
                  <span>
                    {headingTitle}

                    <span className="icon">
                      <div>
                        <RxExternalLink size={9} />
                      </div>
                    </span>
                  </span>

                  <span className="hoverable"></span>
                </Link>
              ) : (
                <span>{headingTitle}</span>
              )}
            </HeadingCardItem>

            <ExpandProvider>
              <Infos>
                {type === 'experience' && data.summary && (
                  <p>{data.summary}</p>
                )}

                {type === 'education' && data.status === 'Em andamento' && (
                  <EducationCardStatus>{data.status}</EducationCardStatus>
                )}

                {type === 'education' && (
                  <EducationDescription>
                    {data.description}
                  </EducationDescription>
                )}

                {hasDescription && (
                  <DescriptionCardItem description={description!} />
                )}

                {hasAdditionalLinks && (
                  <ul>
                    {additionalLinks!.map((link) => {
                      const Icon: IconType = icons[link.type as keyof typeof icons]

                      return (
                        <li key={link.url}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon size={12} /> {link.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </Infos>

              {hasTags && type === 'experience' && (
                <TagsCardItem tags={tags} />
              )}
            </ExpandProvider>

            {hasTags && type === 'project' && (
              <Tags>
                {tags.map((tag) => (
                  <li key={tag}>
                    <span>{tag}</span>
                  </li>
                ))}
              </Tags>
            )}
          </div>
        </CardItemContent>
      </GlassWrapper>
    </CardItemContainer>
  )
}
