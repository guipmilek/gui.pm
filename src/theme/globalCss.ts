import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    color: 'text',
    fontFamily: 'sans',
    fontSize: '1rem',
    lineHeight: '1.5rem',

    scrollBehavior: 'smooth',
    lg: { scrollPaddingTop: 'clamp(3rem, 8svh, 6rem)' },

    '@media (prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },

    '& svg, a *:not(.hoverable)': {
      pointerEvents: 'none',
    },
  },

  '[data-reveal].reveal-pending': {
    opacity: 0,
    transform: 'translate3d(0, 1.125rem, 0) scale(0.985)',
    filter: 'blur(8px)',

    transition:
      'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
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
      transform: 'translate3d(0, 1rem, 0) scale(0.975)',
      transition:
        'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: 'var(--reveal-delay, 0ms)',
      willChange: 'opacity, transform',

      lg: {
        transform: 'translate3d(1.1rem, 0, 0) scale(0.975)',
      },
    },

    '& .glass-ui-card-content': {
      opacity: 0,
      transform: 'translate3d(0, 0.875rem, 0) scale(0.99)',
      filter: 'blur(8px)',
      transition:
        'opacity 0.82s cubic-bezier(0.16, 1, 0.3, 1), transform 0.88s cubic-bezier(0.16, 1, 0.3, 1), filter 0.88s cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: 'calc(var(--reveal-delay, 0ms) + 70ms)',
      willChange: 'opacity, transform, filter',

      lg: {
        transform: 'translate3d(0.85rem, 0, 0) scale(0.99)',
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

    userSelect: 'none',
    WebkitUserSelect: 'none',
  },

})
