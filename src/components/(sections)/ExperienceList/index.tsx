import { CardItem } from '@/components/CardItem'
import { Experience } from '@/interfaces/cardItem'
import { api } from '@/libs/wretch'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function ExperienceList() {
  const experiences: Experience[] = await api
    .query({ _sort: 'id', _order: 'desc', _limit: 3 })
    .get('/experiences')
    .json()

  return (
    <CardList>
      {experiences.map((experience) => (
        <CardItem key={experience.id} type="experience" data={experience} />
      ))}
    </CardList>
  )
}
