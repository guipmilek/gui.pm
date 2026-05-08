import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    color: 'text',
    fontFamily: 'sans',
    fontSize: '1rem',
    lineHeight: '1.5rem',

    scrollBehavior: 'smooth',
    lg: { scrollPaddingTop: '6rem' },

    '& svg, a *:not(.hoverable)': {
      pointerEvents: 'none',
    },
  },

  'html.reveal-ready [data-reveal]': {
    opacity: 0,
    transform: 'translate3d(0, 1rem, 0)',
    filter: 'blur(6px)',

    transition:
      'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: 'var(--reveal-delay, 0ms)',
    willChange: 'opacity, transform, filter',

    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      filter: 'none',
      transition: 'none',
      willChange: 'auto',
    },
  },

  'html.reveal-ready [data-reveal].is-revealed': {
    opacity: 1,
    transform: 'none',
    filter: 'none',
    willChange: 'auto',
  },

  body: {
    position: 'relative',

    backgroundColor: 'background',

    width: '100vw',
    maxWidth: '100%',
    minHeight: '100vh',
  },
})
