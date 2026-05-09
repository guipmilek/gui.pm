import { CardItem } from '@/components/CardItem'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function EducationList() {
  const educationItems = await staticDataProvider.getEducation()

  return (
    <CardList>
      {educationItems.map((item, index) => (
        <CardItem
          key={item.id}
          type="education"
          data={item}
          revealDelay={index}
        />
      ))}
    </CardList>
  )
}
