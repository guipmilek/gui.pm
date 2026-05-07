import { styled } from '@/styled-system/jsx'

export const AsideHeaderContainer = styled('header', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    gridArea: 'auto',

    width: '100%',

    marginBottom: '6rem',

    lg: {
      position: 'sticky',
      top: '6rem',

      gridArea: 'a',
      gap: '4rem',

      height: '100%',
      maxHeight: 'calc(100vh - (6rem * 2))',

      marginBottom: 0,
    },
  },
})

export const Bio = styled('div', {
  base: {
    '& .logo': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      width: 'fit-content',

      margin: '0 auto 1rem',

      color: 'title',

      cursor: 'default',

      sm: {
        width: '100%',

        margin: '0 0 1rem',
      },

      '& img': {
        width: {
          base: '2.8125rem',
          sm: '4.0625rem',
        },
        height: 'auto',

        transform: 'rotate(0deg)',

        transition: 'transform 1s',
      },

      '& h1': {
        position: 'relative',

        textStyle: {
          base: '3xl',
          sm: '5xl',
        },
        fontWeight: 'black',

        animation: 'glitchAnimation1 2s infinite linear 0s alternate-reverse',

        '&::before, &::after': {
          visibility: 'hidden',

          position: 'absolute',
          inset: 0,

          overflow: 'hidden',
          width: '100%',
          height: '100%',

          content: '"GUIPM.DEV"',
        },
      },

      '& strong': {
        fontFamily: 'mono',
        textStyle: {
          base: 'sm',
          sm: 'xl',
        },
        fontWeight: 'medium',

        '& span': {
          color: 'primary',
        },
      },

      '&:hover': {
        '& img': {
          transform: 'rotate(-15deg) scale(105%)',
        },

        '& h1::before': {
          visibility: 'visible',

          left: '1px',

          textShadow: '1px 0 red',

          animation: 'glitchAnimation1 2s infinite linear 0s',
        },

        '& h1::after': {
          visibility: 'visible',

          left: '-1px',

          textShadow: '-1px 0 blue',

          animation: 'glitchAnimation2 2s infinite linear 0s',
        },
      },
    },
  },
})

export const SocialLinks = styled('ul', {
  base: {
    display: 'flex',
    justifyContent: {
      base: 'center',
      sm: 'flex-start',
    },
    gap: '1.5rem',

    marginTop: 'auto',

    '& li a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      transition: 'color 0.2s',

      '&:hover': {
        color: 'title',
      },
    },
  },
})
