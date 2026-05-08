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
      gap: '2rem',

      height: '100%',
      maxHeight: 'calc(100vh - (6rem * 2))',

      marginBottom: 0,
    },
  },
})

export const Bio = styled('div', {
  base: {
    '& .logo': {
      opacity: 0,

      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      width: 'fit-content',

      margin: '0 auto 1rem',

      color: 'title',

      cursor: 'default',

      animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: '80ms',

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        animation: 'none !important',

        '& img': {
          transition: 'none',
        },

        '& h1::before, & h1::after': {
          animation: 'none !important',
        },
      },

      lg: {
        animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },

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

        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },

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
          sm: 'base',
        },
        fontWeight: 'medium',

        '& span': {
          color: 'primary',
        },
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
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

    '& > p': {
      opacity: 0,

      animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: '180ms',

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        animation: 'none !important',
      },

      lg: {
        animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
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

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'title',
        },
      },
    },

    '& li': {
      opacity: 0,

      animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        animation: 'none !important',
      },

      lg: {
        animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },

      '&:nth-of-type(1)': {
        animationDelay: '360ms',
        lg: { animationDelay: '560ms' },
      },
      '&:nth-of-type(2)': {
        animationDelay: '420ms',
        lg: { animationDelay: '640ms' },
      },
      '&:nth-of-type(3)': {
        animationDelay: '480ms',
        lg: { animationDelay: '720ms' },
      },
      '&:nth-of-type(4)': {
        animationDelay: '540ms',
        lg: { animationDelay: '800ms' },
      },
      '&:nth-of-type(5)': {
        animationDelay: '600ms',
        lg: { animationDelay: '880ms' },
      },
    },
  },
})
