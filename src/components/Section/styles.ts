import { cva } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'

export const SectionContainer = styled('section', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      base: 'center',
      sm: 'start',
    },
    gap: '1rem',

    scrollMarginTop: { base: 0, lg: 'clamp(3rem, 8svh, 6rem)' },
    paddingBottom: { base: 'clamp(4.5rem, 12svh, 6rem)', lg: '0' },
  },
})

export const customLinkStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',

    width: 'fit-content',

    color: 'title',
    fontWeight: 'semibold',
    textDecoration: 'none',

    marginTop: '1.5rem',

    transform: 'translate3d(0, 0, 0)',
    transition:
      'color 0.2s ease-out, transform 0.34s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)',

    '&:where(.reveal-pending)': {
      opacity: 0,
      transform: 'translate3d(0, 1.125rem, 0) scale(0.985)',
      filter: 'blur(8px)',
      transitionDelay: 'var(--reveal-delay, 0ms)',
      willChange: 'opacity, transform, filter',

      lg: {
        transform: 'translate3d(1.25rem, 0, 0) scale(0.985)',
      },

      '@media (prefers-reduced-motion: reduce)': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        transition: 'none !important',
        willChange: 'auto',
      },
    },

    '&:where(.reveal-pending.is-revealed)': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      filter: 'none',
      willChange: 'auto',
    },

    '& span': {
      position: 'relative',
      display: 'inline-block',

      '&::before': {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '-0.125rem',

        height: '1px',

        backgroundColor: 'primary',

        content: "''",

        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },

    '& svg': {
      position: 'relative',

      display: 'inline',

      marginLeft: '0.25rem',

      transition: 'transform 0.34s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '&:focus-visible': {
      outline: '1px solid',
      outlineColor: 'primary',
      outlineOffset: '0.25rem',
      color: 'primary',
      transform: 'translate3d(0.125rem, -0.0625rem, 0)',

      '& span::before': {
        transform: 'scaleX(1)',
      },

      '& svg': {
        transform: 'translateX(4px)',
      },
    },

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
        color: 'primary',
        transform: 'translate3d(0.125rem, -0.0625rem, 0)',

        '& span::before': {
          transform: 'scaleX(1)',
        },

        '& svg': {
          transform: 'translateX(4px)',
        },
      },
    },

    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',

      '& span::before, & svg': {
        transition: 'none',
      },
    },
  },
})
