import { cva } from '@/styled-system/css'

export const sectionTitleContainerStyles = cva({
  base: {
    display: 'block',
    position: 'sticky',
    isolation: 'isolate',
    top: 0,
    zIndex: 10,

    lg: { display: 'none' },

    width: '100%',

    padding: 0,

    color: 'title',
    textStyle: 'sm',
    fontWeight: 'bold',

    // Text sits above the blur layer
    '& h2': {
      position: 'relative',
      zIndex: 1,
    },

    '& .header-glass-card': {
      '--section-header-glass-opacity': '0',
      '--section-header-glass-y': '-0.375rem',

      width: 'calc(100% + (1.5rem * 2))',
      marginLeft: '-1.5rem',
      borderRadius: '0 !important',

      md: {
        width: 'calc(100% + (3rem * 2))',
        marginLeft: '-3rem',
      },

      '& .glass-liquid-surface': {
        opacity: 'var(--section-header-glass-opacity)',
        transform: 'translate3d(0, var(--section-header-glass-y), 0)',
        willChange: 'opacity, transform',
      },

      '& .glass-ui-card-content': {
        position: 'relative',
        zIndex: 1,
        padding: '1.25rem 1.5rem',
        md: { padding: '1.25rem 3rem' },
        overflow: 'hidden !important',
      },
    },

    '&.pinned .header-glass-card': {
      '--section-header-glass-opacity': '1',
      '--section-header-glass-y': '0',
    },

    '@media (prefers-reduced-motion: reduce)': {
      '& .header-glass-card .glass-liquid-surface': {
        transition: 'none !important',
        transform: 'none',
        willChange: 'auto',
      },
    },
  },
})
