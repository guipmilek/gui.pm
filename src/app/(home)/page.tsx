import Link from 'next/link'
import { Suspense } from 'react'

import { AboutMe } from '@/components/(sections)/AboutMe'
import { ExperienceList } from '@/components/(sections)/ExperienceList'
import { ProjectList } from '@/components/(sections)/ProjectList'
import { AsideHeader } from '@/components/AsideHeader'
import { Section } from '@/components/Section'
import {
  AboutMeSkeleton,
  AsideHeaderSkeleton,
  ExperienceListSkeleton,
  ProjectListSkeleton,
} from '@/components/Skeletons'

import { HomeContainer } from './styles'

export default function Home() {
  return (
    <HomeContainer>
      <Suspense fallback={<AsideHeaderSkeleton />}>
        <AsideHeader />
      </Suspense>

      <main>
        <Section id="about" sectionTitle="SOBRE">
          <Suspense fallback={<AboutMeSkeleton />}>
            <AboutMe />
          </Suspense>
        </Section>

        <Section
          id="experience"
          sectionTitle="EXPERIÊNCIA"
          link={{
            text: 'Ver currículo completo',
            url: '/curriculo.pdf',
          }}
        >
          <Suspense fallback={<ExperienceListSkeleton />}>
            <ExperienceList />
          </Suspense>
        </Section>

        <Section
          id="projects"
          sectionTitle="PROJETOS"
          link={{
            text: 'Ver todos os projetos',
            url: 'https://github.com/guipmilek?tab=repositories',
          }}
        >
          <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectList />
          </Suspense>
        </Section>
      </main>

      <footer>
        <p>
          Design e desenvolvimento feito com 💙 por <strong>guipm.dev</strong>.
        </p>

        <p>
          Inspirado em{' '}
          <Link
            href="https://brittanychiang.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Brittany Chiang</strong>
          </Link>{' '}
          e{' '}
          <Link
            href="https://www.codewonders.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Adenekan Wonderful</strong>
          </Link>
        </p>
      </footer>
    </HomeContainer>
  )
}
