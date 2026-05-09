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
  logoEntranceField: {
    '0%': { opacity: '0', transform: 'scale(0.42)' },
    '34%': { opacity: '0.85', transform: 'scale(1.28)' },
    '100%': { opacity: '0', transform: 'scale(1.42)' },
  },
  logoEntranceMark: {
    '0%': {
      opacity: '0',
      transform: 'rotate(-18deg) scale(0.42)',
      filter: 'blur(8px) drop-shadow(0 0 18px rgba(125, 211, 252, 0.42))',
    },
    '58%': {
      opacity: '1',
      transform: 'rotate(5deg) scale(1.08)',
      filter: 'blur(0) drop-shadow(0 0 18px rgba(236, 253, 255, 0.26))',
    },
    '100%': {
      opacity: '1',
      transform: 'rotate(0deg) scale(1)',
      filter: 'blur(0) drop-shadow(0 0 0 rgba(125, 211, 252, 0))',
    },
  },
  logoHelmetGlowEntrance: {
    '0%': { opacity: '0', transform: 'scale(0.28)' },
    '42%': { opacity: '0.74', transform: 'scale(1.26)' },
    '100%': { opacity: '0.16', transform: 'scale(0.9)' },
  },
  logoSparkGlowEntrance: {
    '0%': { opacity: '0', transform: 'scale(0.2)' },
    '54%': { opacity: '0.9', transform: 'scale(1.34)' },
    '100%': { opacity: '0.24', transform: 'scale(0.82)' },
  },
  logoHelmetBoot: {
    '0%': { opacity: '0', transform: 'rotate(-110deg) scale(0.64)' },
    '54%': { opacity: '0.86', transform: 'rotate(250deg) scale(1.16)' },
    '100%': { opacity: '0.18', transform: 'rotate(-8deg) scale(1)' },
  },
  logoRimTrace: {
    '0%': { opacity: '0', strokeDashoffset: '1080', strokeWidth: '1.2' },
    '30%': { opacity: '0.56', strokeDashoffset: '640', strokeWidth: '3.4' },
    '100%': { opacity: '0', strokeDashoffset: '0', strokeWidth: '2.4' },
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
  stickySectionLogoIn: {
    '0%': {
      opacity: '0',
      transform: 'translate3d(0.75rem, -0.125rem, 0) scale(0.76)',
      filter: 'blur(6px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)',
    },
  },
  stickySectionArrowIn: {
    '0%': {
      opacity: '0',
      transform: 'translate3d(-0.25rem, 0, 0) scale(0.7)',
      filter: 'blur(4px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)',
    },
  },
  mobileSectionPickerIn: {
    '0%': {
      opacity: '0',
      transform: 'translate3d(0, -0.375rem, 0) scale(0.98)',
      filter: 'blur(6px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0)',
    },
  },
  shake: {
    '0%, 100%': { marginLeft: '0' },
    '10%, 30%, 50%, 70%, 90%': { marginLeft: '-4px' },
    '20%, 40%, 60%, 80%': { marginLeft: '4px' },
  },
})


