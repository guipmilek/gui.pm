import { CardItem } from '@/components/CardItem'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function CertificationList() {
  const items = await staticDataProvider.getCertifications()

  return (
    <CardList>
      {items.map((item, index) => (
        <CardItem
          key={item.id}
          type="certification"
          data={item}
          revealDelay={index}
        />
      ))}
    </CardList>
  )
}
