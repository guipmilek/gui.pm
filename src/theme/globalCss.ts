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

  body: {
    position: 'relative',

    backgroundColor: 'background',

    width: '100vw',
    maxWidth: '100%',
    minHeight: '100vh',
  },

  /* ── liquid-glass-react Tailwind compat ── */
  '.relative': { position: 'relative' },
  '.bg-black': { background: 'black' },
  '.text-white': { color: 'white' },
  '.pointer-events-none': { pointerEvents: 'none' },
  '.cursor-pointer': { cursor: 'pointer' },
  '.transition-all': { transitionProperty: 'all' },
  '.duration-150': { transitionDuration: '150ms' },
  '.ease-in-out': { transitionTimingFunction: 'ease-in-out' },
  '.opacity-0': { opacity: '0' },
  '.opacity-20': { opacity: '0.2' },
  '.opacity-100': { opacity: '1' },
  '.mix-blend-overlay': { mixBlendMode: 'overlay' },
})
