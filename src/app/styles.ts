import { styled } from '@/styled-system/jsx'

export const BodyContent = styled('div', {
  base: {
    position: 'relative',
    zIndex: 1,

    maxWidth: 'breakpoint-xl',

    padding: {
      base: '3rem 1.5rem',
      sm: '5rem 3rem',
      lg: '6rem',
    },
    margin: '0 auto',
  },
})
