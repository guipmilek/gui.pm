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
      gap: '0.875rem',

      minHeight: '1.5rem',
      marginLeft: '-0.25rem',
      padding: '0.125rem 0.25rem',
      borderRadius: '0.375rem',

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
        transition:
          'color 0.18s ease-out, width 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s ease-out',
      },

      '&:nth-of-type(1)': { animationDelay: '300ms' },
      '&:nth-of-type(2)': { animationDelay: '380ms' },
      '&:nth-of-type(3)': { animationDelay: '460ms' },
      '&:nth-of-type(4)': { animationDelay: '540ms' },
      '&:nth-of-type(5)': { animationDelay: '620ms' },
      '&:nth-of-type(6)': { animationDelay: '700ms' },

      '& + a': {
        marginTop: '0.5rem',
      },

      '& span': {
        display: 'block',

        backgroundColor: 'subtitle',
        width: '2rem',
        height: '1px',
        flexShrink: 0,
      },

      '&.active': {
        color: 'primary',

        '& span': {
          backgroundColor: 'primary',
          width: '4rem',
        },

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
            color: 'primary',

            '& span': {
              backgroundColor: 'primary',
              width: '5rem',
            },
          },
        },
      },

      '&:focus-visible': {
        color: 'title',
        outline: '1px solid',
        outlineColor: 'primary',
        outlineOffset: '0.2rem',

        '& span': {
          backgroundColor: 'primary',
          width: '4rem',
        },
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'title',

          '& span': {
            backgroundColor: 'title',
            width: '4rem',
          },
        },
      },
    },
  },
})
