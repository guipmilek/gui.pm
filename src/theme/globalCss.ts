import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    color: 'text',
    fontFamily: 'sans',
    fontSize: '1rem',
    lineHeight: '1.5rem',

    scrollBehavior: 'smooth',
    lg: { scrollPaddingTop: '6rem' },

    '@media (prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },

    '& svg, a *:not(.hoverable)': {
      pointerEvents: 'none',
    },
  },

  '[data-reveal].reveal-pending': {
    opacity: 0,
    transform: 'translate3d(0, 0.75rem, 0)',
    filter: 'none',

    transition:
      'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: 'var(--reveal-delay, 0ms)',
    willChange: 'opacity, transform',

    lg: {
      transform: 'translate3d(0, 1rem, 0)',
      filter: 'blur(6px)',
      transition:
        'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      willChange: 'opacity, transform, filter',
    },

    '@media (prefers-reduced-motion: reduce)': {
      opacity: '1 !important',
      transform: 'none !important',
      filter: 'none !important',
      transition: 'none !important',
      willChange: 'auto',
    },
  },

  '[data-reveal].reveal-pending.is-revealed': {
    opacity: 1,
    transform: 'none',
    filter: 'none',
    willChange: 'auto',
  },

  '[data-glass-reveal].reveal-pending': {
    opacity: 1,
    transform: 'none',
    filter: 'none',
    transition: 'none',
    willChange: 'auto',

    lg: {
      transform: 'none',
      filter: 'none',
      transition: 'none',
      willChange: 'auto',
    },

    '& .glass-liquid-surface': {
      opacity: 0,
      transform: 'translate3d(0, 0.75rem, 0) scale(0.985)',
      transition:
        'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      transitionDelay: 'var(--reveal-delay, 0ms)',
      willChange: 'opacity, transform',

      lg: {
        transform: 'translate3d(0, 1rem, 0) scale(0.985)',
      },
    },

    '& .glass-ui-card-content': {
      opacity: 0,
      transform: 'translate3d(0, 0.75rem, 0)',
      filter: 'none',
      transition:
        'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      transitionDelay: 'var(--reveal-delay, 0ms)',
      willChange: 'opacity, transform',

      lg: {
        transform: 'translate3d(0, 1rem, 0)',
        filter: 'blur(6px)',
        transition:
          'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform, filter',
      },
    },

    '@media (prefers-reduced-motion: reduce)': {
      '& .glass-liquid-surface, & .glass-ui-card-content': {
        opacity: '1 !important',
        transform: 'none !important',
        filter: 'none !important',
        transition: 'none !important',
        willChange: 'auto',
      },
    },
  },

  '[data-glass-reveal].reveal-pending.is-revealed .glass-liquid-surface': {
    opacity: 1,
    transform: 'none',
    willChange: 'auto',
  },

  '[data-glass-reveal].reveal-pending.is-revealed .glass-ui-card-content': {
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
