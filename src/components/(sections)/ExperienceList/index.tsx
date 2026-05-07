import { CardItem } from '@/components/CardItem'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function ExperienceList() {
  const experiences = await staticDataProvider.getExperiences({
    sort: 'id',
    order: 'desc',
    limit: 3,
  })

  return (
    <CardList>
      {experiences.map((experience) => (
        <CardItem key={experience.id} type="experience" data={experience} />
      ))}
    </CardList>
  )
}
