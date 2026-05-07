import { CardItem } from '@/components/CardItem'
import { Project } from '@/interfaces/cardItem'
import { api, isApiAvailable } from '@/libs/wretch'
import { CardList } from '@/theme/recipes/cardListRecipe'

const fallbackProjects: Project[] = [
  {
    id: '1',
    imagePath: '/placeholder.png',
    title: 'Portfolio Website',
    link: 'https://github.com/guipmilek/gui.pm',
    description: ['Site de portfolio pessoal desenvolvido com Next.js e PandaCSS.'],
    additionalLinks: [{ type: 'github', title: 'GitHub', url: 'https://github.com/guipmilek/gui.pm' }],
    tags: ['Next.js', 'React', 'TypeScript', 'PandaCSS'],
  },
]

export async function ProjectList() {
  const projects: Project[] = isApiAvailable && api
    ? await api
        .query({ _sort: 'id', _order: 'desc', _limit: 3 })
        .get('/projects')
        .json()
    : fallbackProjects

  return (
    <CardList>
      {projects.map((project) => (
        <CardItem key={project.id} type="project" data={project} />
      ))}
    </CardList>
  )
}
