import { styled } from '@/styled-system/jsx'

export const BodyContent = styled('div', {
  base: {
    position: 'relative',
    zIndex: 1,

    '--layout-x': 'clamp(1.25rem, 5vw, 1.5rem)',
    '--layout-y': 'clamp(2.5rem, 6svh, 3rem)',
    '--layout-max-width': '100%',

    maxWidth: 'min(100%, var(--layout-max-width))',

    padding: 'var(--layout-y) var(--layout-x)',
    margin: '0 auto',

    sm: {
      '--layout-x': 'clamp(2rem, 6vw, 3rem)',
      '--layout-y': 'clamp(3.5rem, 8svh, 5rem)',
    },

    lg: {
      '--layout-x': 'clamp(4rem, 5vw, 6rem)',
      '--layout-y': 'clamp(3rem, 8svh, 6rem)',
      '--layout-max-width': '90rem',
    },

    xl: {
      '--layout-max-width': '96rem',
    },

    '2xl': {
      '--layout-x': 'clamp(5rem, 6vw, 8rem)',
      '--layout-max-width': '112rem',
    },

    '@media (min-width: 2200px)': {
      '--layout-max-width': '120rem',
    },
  },
})
