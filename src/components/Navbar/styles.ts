import { styled } from '@/styled-system/jsx'

export const NavbarContainer = styled('nav', {
  base: {
    display: {
      base: 'none',
      lg: 'block',
    },

    width: 'fit-content',

    '& a': {
      opacity: 0,

      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      textStyle: 'xs',
      fontWeight: 'bold',

      animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        animation: 'none !important',
      },

      '&, & span': {
        transition: 'color 0.2s, width 0.2s, background-color 0.2s',
      },

      '&:nth-of-type(1)': { animationDelay: '300ms' },
      '&:nth-of-type(2)': { animationDelay: '380ms' },
      '&:nth-of-type(3)': { animationDelay: '460ms' },
      '&:nth-of-type(4)': { animationDelay: '540ms' },
      '&:nth-of-type(5)': { animationDelay: '620ms' },
      '&:nth-of-type(6)': { animationDelay: '700ms' },

      '& + a': {
        marginTop: '1rem',
      },

      '& span': {
        display: 'block',

        backgroundColor: 'subtitle',
        width: '32px',
        height: '1px',
      },

      '&.active': {
        color: 'title',

        '& span': {
          backgroundColor: 'title',
          width: '64px',
        },
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'title',

          '& span': {
            backgroundColor: 'title',
            width: '64px',
          },
        },
      },
    },
  },
})
