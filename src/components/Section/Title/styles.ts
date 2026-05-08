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

    padding: '1.25rem 0',

    color: 'title',
    textStyle: 'sm',
    fontWeight: 'bold',

    // Text sits above the blur layer
    '& h2': {
      position: 'relative',
      zIndex: 1,
    },

    '&::before': {
      opacity: 0,

      position: 'absolute',
      inset: 0,
      zIndex: 0,

      backgroundColor: 'sectionTitleBackground',
      width: 'calc(100% + (1.5rem * 2))',

      marginLeft: '-1.5rem',

      content: "''",
      pointerEvents: 'none',

      backdropBlurSafe: '8px',

      transition: 'opacity 0.2s ease-out',

      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
      },

      '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
        backgroundColor: 'background',
      },

      md: {
        width: 'calc(100% + (3rem * 2))',

        marginLeft: '-3rem',
      },
    },

    '&.pinned::before': {
      display: 'none',
    },

    '& .header-glass-card': {
      width: 'calc(100% + (1.5rem * 2))',
      marginLeft: '-1.5rem',

      md: {
        width: 'calc(100% + (3rem * 2))',
        marginLeft: '-3rem',
      },

      '& .glass-ui-card-content': {
        padding: '1.25rem 1.5rem',
        md: { padding: '1.25rem 3rem' },
        overflow: 'hidden !important',
      },
    },
  },
})
