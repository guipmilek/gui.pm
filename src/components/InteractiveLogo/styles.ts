import { styled } from '@/styled-system/jsx'

export const LogoWrapper = styled('button', {
  base: {
    '--logo-pointer-x': '50%',
    '--logo-pointer-y': '45%',
    '--logo-tilt-x': '0deg',
    '--logo-tilt-y': '0deg',

    appearance: 'none',
    WebkitAppearance: 'none',
    position: 'relative',
    isolation: 'isolate',

    display: 'grid',
    placeItems: 'center',

    width: {
      base: '2.8125rem',
      sm: '4.0625rem',
    },
    aspectRatio: '1',

    padding: 0,
    border: 0,
    borderRadius: '999px',
    background: 'transparent',

    color: 'title',

    cursor: 'pointer',
    transform:
      'perspective(520px) rotateX(var(--logo-tilt-x)) rotateY(var(--logo-tilt-y)) translate3d(0, 0, 0)',
    transformStyle: 'preserve-3d',
    transition:
      'transform 0.56s cubic-bezier(0.16, 1, 0.3, 1), filter 0.56s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',

    '& .logo-field': {
      position: 'absolute',
      inset: '-48%',
      zIndex: 0,

      borderRadius: 'inherit',
      background: `
        radial-gradient(circle at var(--logo-pointer-x) var(--logo-pointer-y), rgba(236, 253, 255, 0.22), transparent 34%),
        radial-gradient(circle at 74% 72%, rgba(125, 211, 252, 0.2), transparent 28%),
        radial-gradient(circle at 48% 46%, rgba(148, 163, 184, 0.16), transparent 44%)
      `,
      filter: 'blur(16px)',
      opacity: 0,
      transform: 'scale(0.84)',
      transition:
        'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none',
    },

    '& .logo-svg': {
      position: 'relative',
      zIndex: 1,

      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'visible',

      color: 'inherit',
      filter: 'drop-shadow(0 0 0 rgba(125, 211, 252, 0))',
      transition: 'filter 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '& .logo-mark, & .logo-helmet-details path': {
      fill: 'currentColor',
    },

    '& .logo-mark': {
      transition:
        'filter 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '& .logo-light-layer': {
      pointerEvents: 'none',
    },

    '& .logo-helmet-glow': {
      fill: 'url(#logo-helmet-glow)',
      opacity: 0.16,
      transformOrigin: '200px 200px',
      transform: 'scale(0.9)',
      transition:
        'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '& .logo-spark-glow': {
      fill: 'url(#logo-spark-glow)',
      opacity: 0.24,
      transformOrigin: '295.09px 298.75px',
      transform: 'scale(0.82)',
      transition:
        'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '& .logo-helmet-orbit': {
      fill: 'none',
      stroke: 'rgba(226, 232, 240, 0.68)',
      strokeWidth: 5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      opacity: 0.18,
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: 'logoHelmetDrift 7s ease-in-out infinite',
      transition:
        'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '& .logo-helmet-glint': {
      fill: 'rgba(255, 255, 255, 0.92)',
      stroke: 'none',
    },

    '& .logo-rim': {
      fill: 'none',
      stroke: 'rgba(255, 255, 255, 0.42)',
      strokeWidth: 2.4,
      opacity: 0,
      mixBlendMode: 'screen',
      transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
        filter: 'drop-shadow(0 0 18px rgba(125, 211, 252, 0.14))',

        '& .logo-field': {
          opacity: 1,
          transform: 'scale(1)',
        },

        '& .logo-svg': {
          filter: 'drop-shadow(0 0 13px rgba(236, 253, 255, 0.2))',
        },

        '& .logo-mark': {
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.16))',
        },

        '& .logo-helmet-glow': {
          opacity: 0.58,
          transform: 'scale(1.1)',
        },

        '& .logo-spark-glow': {
          opacity: 0.9,
          transform: 'scale(1.18)',
        },

        '& .logo-helmet-orbit': {
          opacity: 0.72,
          stroke: 'rgba(240, 249, 255, 0.88)',
          animation: 'logoHelmetSpin 2.4s linear infinite',
        },

        '& .logo-rim': {
          opacity: 0.2,
        },
      },
    },

    '&:focus-visible': {
      outline: '1px solid',
      outlineColor: 'title',
      outlineOffset: '0.375rem',

      '& .logo-field': {
        opacity: 1,
        transform: 'scale(1)',
      },

      '& .logo-helmet-glow': {
        opacity: 0.58,
        transform: 'scale(1.1)',
      },

      '& .logo-spark-glow': {
        opacity: 0.9,
        transform: 'scale(1.18)',
      },

      '& .logo-helmet-orbit': {
        opacity: 0.72,
        stroke: 'rgba(240, 249, 255, 0.88)',
        animation: 'logoHelmetSpin 2.4s linear infinite',
      },
    },

    '&:active': {
      transform:
        'perspective(520px) rotateX(var(--logo-tilt-x)) rotateY(var(--logo-tilt-y)) translate3d(0, 0, 0) scale(0.96)',
    },

    '&.is-igniting': {
      '& .logo-field': {
        animation: 'logoFieldIgnite 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },

      '& .logo-helmet-glow': {
        animation: 'logoHelmetPulse 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },

      '& .logo-spark-glow': {
        animation: 'logoSparkIgnite 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },

      '& .logo-helmet-orbit': {
        animation: 'logoHelmetIgnite 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        opacity: 0.9,
      },

      '& .logo-rim': {
        animation: 'logoRimIgnite 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },

    '@media (prefers-reduced-motion: reduce)': {
      transform: 'none !important',
      transition: 'none !important',

      '& .logo-field, & .logo-svg, & .logo-mark, & .logo-helmet-glow, & .logo-spark-glow, & .logo-helmet-orbit, & .logo-rim': {
        transition: 'none !important',
        animation: 'none !important',
      },

      '& .logo-helmet-orbit': {
        opacity: 0.22,
      },

      '&.is-igniting .logo-field, &.is-igniting .logo-helmet-glow, &.is-igniting .logo-spark-glow': {
        opacity: 0.72,
      },
    },
  },
})
