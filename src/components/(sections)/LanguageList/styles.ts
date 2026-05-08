import { styled } from '@/styled-system/jsx'

export const LanguageListContainer = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
})

export const LanguageItemContainer = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
  },
})

export const LanguageName = styled('span', {
  base: {
    color: 'title',
    fontWeight: 'medium',
  },
})

export const LanguageProficiency = styled('span', {
  base: {
    color: 'subtitle',
    fontWeight: 'medium',
  },
})
