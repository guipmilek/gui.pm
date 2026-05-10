import Link from 'next/link'

import { AboutMe } from '@/components/(sections)/AboutMe'
import { CertificationList } from '@/components/(sections)/CertificationList'
import { EducationList } from '@/components/(sections)/EducationList'
import { ExperienceList } from '@/components/(sections)/ExperienceList'
import { LanguageList } from '@/components/(sections)/LanguageList'
import { ProjectList } from '@/components/(sections)/ProjectList'
import { AsideHeader } from '@/components/AsideHeader'
import { SafeFluentEmoji } from '@/components/SafeFluentEmoji'
import { Section } from '@/components/Section'

import { HomeContainer } from './styles'

export default function Home() {
  return (
    <HomeContainer>
      <AsideHeader />

      <main>
        <Section id="about" sectionTitle="SOBRE">
          <AboutMe />
        </Section>

        <Section
          id="experience"
          sectionTitle="EXPERIÊNCIA"
          link={{
            text: 'Ver currículo completo',
            url: '/curriculo.pdf',
          }}
        >
          <ExperienceList />
        </Section>

        <Section id="education" sectionTitle="FORMAÇÃO">
          <EducationList />
        </Section>

        <Section id="certifications" sectionTitle="CERTIFICAÇÕES">
          <CertificationList />
        </Section>

        <Section id="languages" sectionTitle="IDIOMAS">
          <LanguageList />
        </Section>

        <Section
          id="projects"
          sectionTitle="PROJETOS"
          link={{
            text: 'Ver todos os projetos',
            url: 'https://github.com/guipmilek?tab=repositories',
          }}
        >
          <ProjectList />
        </Section>
      </main>

      <footer data-reveal="" data-reveal-end="">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Design e desenvolvimento feito com{' '}
          <SafeFluentEmoji emoji="💙" type="anim" size={16} /> por{' '}
          <Link
            href="https://guipm.dev"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>guipm.dev</strong>
          </Link>.
        </div>

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
