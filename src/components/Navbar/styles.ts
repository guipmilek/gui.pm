import { styled } from '@/styled-system/jsx'

export const NavbarContainer = styled('nav', {
  base: {
    display: {
      base: 'none',
      lg: 'block',
    },

    width: 'fit-content',

    '& a': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      textStyle: 'xs',
      fontWeight: 'bold',

      '&, & span': {
        transition: 'color 0.2s, width 0.2s, background-color 0.2s',
      },

      '& + a': {
        marginTop: '1.5rem',
      },

      '& span': {
        display: 'block',

        backgroundColor: 'subtitle',
        width: '32px',
        height: '1px',
      },

      '&:hover, &.active': {
        color: 'title',

        '& span': {
          backgroundColor: 'title',
          width: '64px',
        },
      },
    },
  },
})
