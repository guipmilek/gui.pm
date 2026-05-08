import { CardItemContainer, CardItemContent } from '@/components/CardItem/styles'
import { HeaderCardItemContainer } from '@/components/CardItem/Header/styles'
import { HeadingCardItemContainer } from '@/components/CardItem/Heading/styles'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

import { EducationCardStatus, EducationDescription } from './styles'

export async function EducationList() {
  const educationItems = await staticDataProvider.getEducation()

  return (
    <CardList>
      {educationItems.map((item, index) => (
        <CardItemContainer
          key={item.id}
          data-reveal=""
          data-reveal-delay={index}
        >
          <CardItemContent>
            <HeaderCardItemContainer type="experience">
              <span>{item.period}</span>
            </HeaderCardItemContainer>

            <div>
              <HeadingCardItemContainer type="experience">
                <span>
                  {item.course} · {item.institution}
                </span>

                <p>{item.locationText || item.focus}</p>
              </HeadingCardItemContainer>

              {item.status === 'Em andamento' && (
                <EducationCardStatus>{item.status}</EducationCardStatus>
              )}

              <EducationDescription>
                {item.description}
              </EducationDescription>
            </div>
          </CardItemContent>
        </CardItemContainer>
      ))}
    </CardList>
  )
}
