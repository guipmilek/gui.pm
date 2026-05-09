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
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  logoHelmetDrift: {
    '0%, 100%': { transform: 'rotate(-8deg)' },
    '50%': { transform: 'rotate(10deg)' },
  },
  logoHelmetSpin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  logoHelmetIgnite: {
    '0%': { opacity: '0.35', transform: 'rotate(0deg) scale(0.94)' },
    '62%': { opacity: '0.95', transform: 'rotate(360deg) scale(1.08)' },
    '100%': { opacity: '0.72', transform: 'rotate(420deg) scale(1)' },
  },
  logoHelmetPulse: {
    '0%': { opacity: '0.18', transform: 'scale(0.9)' },
    '42%': { opacity: '0.86', transform: 'scale(1.18)' },
    '100%': { opacity: '0.58', transform: 'scale(1.1)' },
  },
  logoSparkIgnite: {
    '0%': { opacity: '0.26', transform: 'scale(0.82)' },
    '34%': { opacity: '1', transform: 'scale(1.55)' },
    '100%': { opacity: '0.9', transform: 'scale(1.18)' },
  },
  logoFieldIgnite: {
    '0%': { opacity: '0', transform: 'scale(0.84)' },
    '35%': { opacity: '1', transform: 'scale(1.12)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  logoRimIgnite: {
    '0%': { opacity: '0', strokeWidth: '2.4' },
    '32%': { opacity: '0.46', strokeWidth: '4.4' },
    '100%': { opacity: '0.2', strokeWidth: '2.4' },
  },
  shake: {
    '0%, 100%': { marginLeft: '0' },
    '10%, 30%, 50%, 70%, 90%': { marginLeft: '-4px' },
    '20%, 40%, 60%, 80%': { marginLeft: '4px' },
  },
})


