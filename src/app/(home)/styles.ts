import { styled } from '@/styled-system/jsx'

export const HomeContainer = styled('div', {
  base: {
    display: 'grid',
    rowGap: '1rem',
    columnGap: '2rem',
    alignItems: 'start',

    lg: {
      gridTemplateAreas: `"a b"
                          "a c"`,
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: 'minmax(22rem, 34%) minmax(0, 1fr)',
      columnGap: 'clamp(2rem, 4vw, 4.5rem)',
    },

    xl: {
      gridTemplateColumns: 'minmax(24rem, 32%) minmax(0, 1fr)',
    },

    '@media (min-width: 1920px)': {
      gridTemplateColumns: 'minmax(26rem, 30%) minmax(0, 1fr)',
      columnGap: 'clamp(4rem, 5vw, 6rem)',
    },

    '@media (min-width: 2200px)': {
      gridTemplateColumns: 'minmax(28rem, 34rem) minmax(0, 1fr)',
      columnGap: 'clamp(5rem, 7vw, 8rem)',
    },

    '& main': {
      display: 'flex',
      flexDirection: 'column',
      gap: 0,

      paddingBottom: 'clamp(4rem, 10svh, 6rem)',

      lg: {
        gridArea: 'b',
        gap: 'clamp(5rem, 12svh, 9rem)',
        paddingBottom: 'clamp(4rem, 10svh, 7rem)',
      },
    },

    '& footer': {
      lg: {
        gridArea: 'c',
        justifySelf: 'center',
        width: '100%',
      },

      textAlign: 'center',

      '& .footer-link': {
        transition: 'color 0.2s',

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
            color: 'title',
          },
        },
      },

      '& p:first-child, & div:first-child': {
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

          '@media (hover: hover) and (pointer: fine)': {
            '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
              color: 'text',
            },
          },
        },
      },
    },
  },
})
