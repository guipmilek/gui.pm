import { styled } from '@/styled-system/jsx'

export const AboutMeContainer = styled('div', {
  base: {
    '& p + p': {
      marginTop: '1rem',
    },
  },
})
