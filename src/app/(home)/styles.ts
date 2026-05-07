import { styled } from '@/styled-system/jsx'

export const HomeContainer = styled('div', {
  base: {
    display: 'grid',
    lg: {
      gridTemplate: `"a b" auto
                     "c c" auto / minmax(420px, 40%) 1fr`,
    },
    rowGap: '1rem',
    columnGap: '2rem',
    alignItems: 'start',

    '& main': {
      display: 'flex',
      flexDirection: 'column',
      gap: '6rem',

      paddingBottom: '5rem',

      lg: {
        gridArea: 'b',
        gap: '9rem',
      },
    },

    '& footer': {
      lg: { gridArea: 'c' },

      textAlign: 'center',

      '& p:first-child': {
        marginBottom: '0.5rem',

        textStyle: 'sm',
      },

      '& p:last-child': {
        color: 'subtitle',
        textStyle: 'xs',

        '& strong': {
          fontWeight: 'medium',
        },

        '& a': {
          transition: 'color 0.2s',

          '&:hover': {
            color: 'text',
          },
        },
      },
    },
  },
})
