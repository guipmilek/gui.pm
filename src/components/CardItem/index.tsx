import Link from 'next/link'
import { IconType } from 'react-icons'
import { RxExternalLink } from 'react-icons/rx'

import { Experience, Project } from '@/interfaces/cardItem'
import { icons } from '@/libs/reactIcons'

import { DescriptionCardItem } from './Description'
import { HeaderCardItem } from './Header'
import { HeadingCardItem } from './Heading'
import { CardItemContainer, CardItemContent, Infos, PositioningTag, Tags } from './styles'

type CardItemProps = { revealDelay?: number } & (
  | {
      type: 'experience'
      data: Experience
    }
  | {
      type: 'project'
      data: Project
    }
)

export function CardItem(props: CardItemProps) {
  const { type, data } = props
  const { revealDelay } = props
  const { title, link, description, additionalLinks } = data

  let headingTitle = title
  if (type === 'experience' && data.companyName !== null) {
    headingTitle += ` · ${data.companyName}`
  }

  const hasLink = link !== null
  const hasDescription = description !== null
  const hasAdditionalLinks = additionalLinks !== null

  const tags = type === 'experience' ? data.skills : data.tags
  const hasTags = tags !== null

  return (
    <CardItemContainer data-reveal="" data-reveal-delay={revealDelay}>
      <CardItemContent {...(type === 'project' && { type })}>
        <HeaderCardItem {...props} />

        <div>
          <HeadingCardItem {...props}>
            {hasLink ? (
              <Link href={link} target="_blank" rel="noopener noreferrer">
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

          <Infos>
            {type === 'experience' && data.positioning && (
              <PositioningTag>{data.positioning}</PositioningTag>
            )}

            {type === 'experience' && data.summary && (
              <p>{data.summary}</p>
            )}

            {hasDescription && (
              <DescriptionCardItem description={description} />
            )}

            {hasAdditionalLinks && (
              <ul>
                {additionalLinks.map((link) => {
                  const Icon: IconType = icons[link.type]

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

          {hasTags && (
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
    </CardItemContainer>
  )
}
