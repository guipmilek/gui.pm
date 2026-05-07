import { CardItem } from '@/components/CardItem'
import { Experience } from '@/interfaces/cardItem'
import { api, isApiAvailable } from '@/libs/wretch'
import { CardList } from '@/theme/recipes/cardListRecipe'

const fallbackExperiences: Experience[] = [
  {
    id: '1',
    startMonthYear: { month: 1, year: 2023 },
    endMonthYear: null,
    title: 'Full-stack Developer',
    companyName: 'Empresa Exemplo',
    link: null,
    location: null,
    locationName: 'Remota',
    description: ['Desenvolvimento de aplicacoes web com React e Node.js.'],
    additionalLinks: null,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
]

export async function ExperienceList() {
  const experiences: Experience[] = isApiAvailable && api
    ? await api
        .query({ _sort: 'id', _order: 'desc', _limit: 3 })
        .get('/experiences')
        .json()
    : fallbackExperiences

  return (
    <CardList>
      {experiences.map((experience) => (
        <CardItem key={experience.id} type="experience" data={experience} />
      ))}
    </CardList>
  )
}
