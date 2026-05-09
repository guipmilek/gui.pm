import { styled } from '@/styled-system/jsx'

export const AsideHeaderContainer = styled('header', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    gridArea: 'auto',

    width: '100%',

    marginBottom: 'clamp(3.5rem, 9svh, 5rem)',

    lg: {
      position: 'sticky',
      top: 'var(--layout-y)',

      gridArea: 'a',
      gap: 'clamp(1.5rem, 3svh, 2rem)',

      // Keep a small bottom buffer so sticky never hits its lower boundary.
      height: 'calc(100svh - (var(--layout-y) * 2) - 0.75rem)',
      maxHeight: 'calc(100svh - (var(--layout-y) * 2) - 0.75rem)',

      marginBottom: 0,
    },
  },
})

export const Bio = styled('div', {
  base: {
    '& .logo': {
      opacity: 0,

      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'clamp(0.75rem, 4vw, 1rem)',

      width: '100%',

      margin: '0 0 0.875rem',

      color: 'title',

      cursor: 'default',

      animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: '80ms',

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        animation: 'none !important',
      },

      lg: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 'fit-content',
        animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },

      sm: {
        marginBottom: '1rem',
      },

      '& > div': {
        minWidth: 0,
        flex: '1 1 auto',
      },

      '& h1': {
        overflowWrap: 'break-word',
        lineHeight: 1.05,
        textStyle: {
          base: '2xl',
          sm: '4xl',
        },
        fontWeight: 'black',

        sm: {
          whiteSpace: 'nowrap',
        },
      },

      '& strong': {
        display: 'block',
        maxWidth: 'min(100%, 24rem)',
        marginTop: '0.125rem',

        whiteSpace: 'normal',
        textStyle: {
          base: 'xs',
          sm: 'sm',
        },
        fontWeight: 'medium',
        color: 'text',
      },
    },

    '& .bio-text': {
      opacity: 0,

      animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: '180ms',

      maxWidth: '34rem',

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

export const ResumeButton = styled('a', {
  base: {
    opacity: 0,

    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',

    width: 'fit-content',
    margin: '0 auto',

    padding: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'title',
    borderRadius: '6px',

    color: 'title',
    textStyle: 'xs',
    textTransform: 'uppercase',
    textDecoration: 'none',

    cursor: 'pointer',

    transition: 'color 0.2s, background-color 0.2s',

    animation: 'fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
    animationDelay: '280ms',

    '@media (prefers-reduced-motion: reduce)': {
      opacity: '1 !important',
      transform: 'none !important',
      filter: 'none !important',
      animation: 'none !important',
    },

    lg: {
      margin: 0,
      animation: 'fadeSlideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: '780ms',
    },

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *))': {
        backgroundColor: 'title',
        borderColor: 'title',
        color: 'background',
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
    flexWrap: 'wrap',
    gap: 'clamp(1rem, 5vw, 1.5rem)',

    marginTop: '0.25rem',

    lg: {
      marginTop: 'auto',
    },

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
      '&:nth-of-type(6)': {
        animationDelay: '660ms',
        lg: { animationDelay: '960ms' },
      },
    },
  },
})
