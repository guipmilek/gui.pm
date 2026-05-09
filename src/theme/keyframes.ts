import { defineKeyframes } from '@pandacss/dev'

export const keyframes = defineKeyframes({
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.4' },
  },
  fadeSlideUp: {
    from: {
      opacity: '0',
      transform: 'translate3d(0, 1rem, 0)',
      filter: 'blur(6px)',
    },
    to: {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
      filter: 'blur(0)',
    },
  },
  fadeSlideRight: {
    from: {
      opacity: '0',
      transform: 'translate3d(-1rem, 0, 0)',
      filter: 'blur(6px)',
    },
    to: {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)',
      filter: 'blur(0)',
    },
  },
  logoGlow: {
    '0%, 100%': { opacity: '0.08', transform: 'scale(0.95)' },
    '50%': { opacity: '0.15', transform: 'scale(1.05)' },
  },
  shake: {
    '0%, 100%': { marginLeft: '0' },
    '10%, 30%, 50%, 70%, 90%': { marginLeft: '-4px' },
    '20%, 40%, 60%, 80%': { marginLeft: '4px' },
  },
})


