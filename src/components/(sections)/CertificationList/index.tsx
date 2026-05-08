import Link from 'next/link'
import { RxExternalLink } from 'react-icons/rx'

import { CardItemContainer, CardItemContent } from '@/components/CardItem/styles'
import { HeaderCardItemContainer } from '@/components/CardItem/Header/styles'
import { HeadingCardItemContainer } from '@/components/CardItem/Heading/styles'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function CertificationList() {
  const items = await staticDataProvider.getCertifications()

  return (
    <CardList>
      {items.map((item, index) => (
        <CardItemContainer
          key={item.id}
          data-reveal=""
          data-reveal-delay={index}
        >
          <CardItemContent>
            <HeaderCardItemContainer type="experience">
              <span>{item.date}</span>
            </HeaderCardItemContainer>

            <div>
              <HeadingCardItemContainer type="experience">
                {item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      {item.name}

                      <span className="icon">
                        <div>
                          <RxExternalLink size={9} />
                        </div>
                      </span>
                    </span>

                    <span className="hoverable"></span>
                  </Link>
                ) : (
                  <span>{item.name}</span>
                )}

                <p>{item.issuer}</p>
              </HeadingCardItemContainer>
            </div>
          </CardItemContent>
        </CardItemContainer>
      ))}
    </CardList>
  )
}
