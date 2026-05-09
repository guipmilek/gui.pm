import { styled } from '@/styled-system/jsx'

export const CursorContainer = styled('div', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,

    transform: 'translate3d(-9999px, -9999px, 0)',
    willChange: 'transform, opacity',
    contain: 'layout style',

    display: {
      base: 'none',
      lg: 'block',
    },

    width: '110px',
    height: '110px',

    pointerEvents: 'none',

    opacity: 0,
    transition: 'opacity 0.24s ease-out',

    '& .dot': {
      opacity: 0,
      scale: '0.25',
      filter: 'blur(5px)',
    },

    '& .solidOutline': {
      opacity: 0,
      scale: '0.45',
      filter: 'blur(8px)',
    },

    '& .dashedOutline': {
      opacity: 0,
      scale: '0.7',
      clipPath: 'circle(18% at center)',
      filter: 'blur(10px)',
    },

    '@media (prefers-reduced-motion: reduce)': {
      '& .dashedOutline': {
        animation: 'none',
      },
      '&, & .dot, & .solidOutline, & .dashedOutline': {
        transition: 'none',
      },
    },

    '&.visible': {
      opacity: 1,

      '& .dot': {
        opacity: 1,
        scale: '1',
        filter: 'blur(0)',
      },

      '& .solidOutline': {
        opacity: 1,
        scale: '1',
        filter: 'blur(0)',
      },

      '& .dashedOutline': {
        opacity: 0.75,
        scale: '1',
        clipPath: 'circle(50% at center)',
        filter: 'blur(0)',
      },
    },

    '&.hover': {
      '& .dot': {
        width: '18px',
        height: '18px',

        borderColor: 'title',

        backgroundColor: 'cursor',
      },

      '& .solidOutline': {
        transform: 'scale(0)',
      },

      '& .dashedOutline': {
        width: '28px',
        height: '28px',

        animationDirection: 'reverse',
      },
    },

    '&.clicking': {
      '& .dot': {
        transform: 'scale(0.6)',
      },

      '& .solidOutline': {
        transform: 'scale(0.85)',
        borderColor: 'title',
      },
    },

    '&.hover.clicking': {
      '& .dot': {
        transform: 'scale(0.6)',
      },

      '& .solidOutline': {
        transform: 'scale(0.85)',
        borderColor: 'title',
      },
    },
  },
})

export const CursorPart = styled('span', {
  base: {
    display: 'block',
    position: 'absolute',
    inset: 0,
    margin: 'auto',

    borderRadius: '50%',

    '&.dot': {
      backgroundColor: 'subtitle',
      width: '8px',
      height: '8px',

      border: '2px solid transparent',

      zIndex: 3,

      transition:
        'opacity 0.2s ease-out, filter 0.32s ease-out, scale 0.32s cubic-bezier(0.16, 1, 0.3, 1), width 0.5s, height 0.5s, border-color 0.5s, background-color 0.5s, transform 0.15s',
    },

    '&.solidOutline': {
      border: '1px solid',
      borderColor: 'subtitle',

      width: '85px',
      height: '85px',

      zIndex: 2,

      transition:
        'opacity 0.28s ease-out, filter 0.45s ease-out, scale 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s, border-color 0.3s',
    },

    '&.dashedOutline': {
      width: '105px',
      height: '105px',

      border: '1px dashed',
      borderColor: 'subtitle',

      zIndex: 1,

      transition:
        'opacity 0.38s ease-out, filter 0.5s ease-out, scale 0.55s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1), width 0.75s, height 0.75s',

      animation: 'spin 15s infinite linear',
    },
  },
})
