import { styled } from '@/styled-system/jsx'

export const LogoWrapper = styled('div', {
  base: {
    position: 'relative',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 'fit-content',

    cursor: 'default',

    // Glow halo behind the logo
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '-40%',

      borderRadius: '50%',
      background: 'radial-gradient(circle, token(colors.primary) 0%, transparent 70%)',
      opacity: 0,

      transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      transform: 'scale(0.6)',

      pointerEvents: 'none',
      zIndex: -1,
    },

    '&[data-hovering="true"]::after': {
      opacity: 0.12,
      transform: 'scale(1)',
    },

    '& img': {
      width: {
        base: '2.8125rem',
        sm: '4.0625rem',
      },
      height: 'auto',

      transition: 'filter 0.3s ease',
      willChange: 'transform',
    },

    '&[data-hovering="true"] img': {
      filter: 'drop-shadow(0 0 8px token(colors.primary))',
    },

    '@media (prefers-reduced-motion: reduce)': {
      '&::after': {
        display: 'none',
      },

      '& img': {
        transition: 'none',
        transform: 'none !important',
        filter: 'none !important',
      },
    },
  },
})
