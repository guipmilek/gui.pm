import { cache, ReactNode } from 'react'

import { Experience, Project } from '@/interfaces/cardItem'

import { HeadingCardItemContainer } from './styles'

interface CommonProps {
  children?: ReactNode
}

type ConditionalProps =
  | {
      type: 'experience'
      data: Experience
    }
  | {
      type: 'project'
      data: Project
    }

type HeadingCardItemProps = CommonProps & ConditionalProps

interface Location {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

const states = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
} as const

type States = typeof states

function getStateName(stateAbbr: string) {
  return states[stateAbbr as keyof States]
}

const getCountryName = cache((countryCode: string) => {
  const regionNames = new Intl.DisplayNames(['pt-BR'], { type: 'region' })
  return regionNames.of(countryCode)
})

export async function HeadingCardItem({
  children,
  type,
  data,
}: HeadingCardItemProps) {
  switch (type) {
    case 'experience': {
      const { location, locationName } = data

      const headingSubtitleArray = []

      if (location) {
        const res = await fetch(
          `https://viacep.com.br/ws/${location.postalCode}/json`,
          { next: { revalidate: 60 * 60 * 24 } },
        )
        const detailedLocation: Location = await res.json()

        const headingLocation = `${detailedLocation.localidade}, ${getStateName(
          detailedLocation.uf,
        )}, ${getCountryName(location.countryCode)}`

        headingSubtitleArray.push(headingLocation)
      }

      if (data.locationName) {
        headingSubtitleArray.push(locationName)
      }

      const headingSubtitleText = headingSubtitleArray.join(' · ')
      const hasHeadingSubtitle = headingSubtitleText.length > 0

      return (
        <HeadingCardItemContainer type="experience">
          {children}

          {hasHeadingSubtitle && <p>{headingSubtitleText}</p>}
          {data.positioning && <p>{data.positioning}</p>}
        </HeadingCardItemContainer>
      )
    }

    case 'project':
      return <HeadingCardItemContainer>{children}</HeadingCardItemContainer>
  }
}
