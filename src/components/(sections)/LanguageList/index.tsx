import { staticDataProvider } from '@/providers'

import {
  LanguageItemContainer,
  LanguageListContainer,
  LanguageName,
  LanguageProficiency,
} from './styles'

export async function LanguageList() {
  const items = await staticDataProvider.getLanguages()

  return (
    <LanguageListContainer>
      {items.map((item, index) => (
        <LanguageItemContainer
          key={item.id}
          data-reveal=""
          data-reveal-delay={index}
        >
          <LanguageName>{item.name}</LanguageName>
          <LanguageProficiency>· {item.proficiency}</LanguageProficiency>
        </LanguageItemContainer>
      ))}
    </LanguageListContainer>
  )
}
