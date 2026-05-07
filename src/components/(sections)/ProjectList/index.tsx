import { CardItem } from '@/components/CardItem'
import { staticDataProvider } from '@/providers'
import { CardList } from '@/theme/recipes/cardListRecipe'

export async function ProjectList() {
  const projects = await staticDataProvider.getProjects({
    sort: 'id',
    order: 'desc',
    limit: 3,
  })

  return (
    <CardList>
      {projects.map((project) => (
        <CardItem key={project.id} type="project" data={project} />
      ))}
    </CardList>
  )
}
