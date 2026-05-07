import { styled } from '@/styled-system/jsx'

export const CursorContainer = styled('div', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,

    display: {
      base: 'none',
      lg: 'block',
    },

    width: '110px',
    height: '110px',

    pointerEvents: 'none',

    opacity: 0,
    transition: 'opacity 0.2s',

    '@media (prefers-reduced-motion: reduce)': {
      '& .dashedOutline': {
        animation: 'none',
      },
      '& .dot, & .solidOutline': {
        transition: 'none',
      },
    },

    '@media (pointer: coarse)': {
      display: 'none',
    },

    '&.visible': {
      opacity: 1,
    },

    '&.hover': {
      '& .dot': {
        width: '18px',
        height: '18px',

        borderColor: 'title',

        backgroundColor: 'cursor',
      },

      '& .solidOutline': {
        transform: 'scale(0%)',
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
        'width 0.5s, height 0.5s, border-color 0.5s, background-color 0.5s, transform 0.15s',
    },

    '&.solidOutline': {
      border: '1px solid',
      borderColor: 'subtitle',

      width: '85px',
      height: '85px',

      zIndex: 2,

      transition: 'transform 0.75s, border-color 0.3s',
    },

    '&.dashedOutline': {
      width: '105px',
      height: '105px',

      border: '1px dashed',
      borderColor: 'subtitle',

      zIndex: 1,

      transition: 'width 0.75s, height 0.75s',

      animation: 'spin 15s infinite linear',
    },
  },
})
