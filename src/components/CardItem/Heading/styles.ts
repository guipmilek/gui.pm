import { styled } from '@/styled-system/jsx'

export const HeadingCardItemContainer = styled('h2', {
  base: {
    '& a': {
      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',

      color: 'title',
      fontWeight: 'medium',
      textDecoration: 'none',
      transform: 'translate3d(0, 0, 0)',

      transition:
        'color 0.2s ease-out, transform 0.34s cubic-bezier(0.16, 1, 0.3, 1)',

      '& > span:first-of-type': {
        position: 'relative',

        '&::after': {
          content: "''",
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-0.125rem',

          height: '1px',
          backgroundColor: 'currentColor',
          opacity: 0.55,
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },

      '& span.icon': {
        display: 'inline-block',

        width: '0.75rem',
        height: '0.75rem',

        '& div': {
          position: 'relative',

          width: '100%',
          height: '100%',

          display: 'flex',
          alignItems: 'center',

          marginLeft: '0.25rem',

          '& svg': {
            position: 'absolute',

            transition: 'transform 0.34s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },

      '& > span:last-of-type': {
        display: 'none',

        lg: {
          display: 'block',

          position: 'absolute',
          inset: '-1.5rem',

          width: 'calc(100% + (1.5rem * 2))',
          height: 'calc(100% + (1.5rem * 2))',

          pointerEvents: 'none',
        },
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
          color: 'primary',
          transform: 'translate3d(0.125rem, -0.0625rem, 0)',

          '& > span:first-of-type::after': {
            transform: 'scaleX(1)',
          },

          '& span svg': {
            transform: 'translate(50%, -25%) rotate(-8deg)',
          },
        },
      },

      '&:focus-visible': {
        color: 'primary',
        outline: '1px solid',
        outlineColor: 'primary',
        outlineOffset: '0.25rem',
        transform: 'translate3d(0.125rem, -0.0625rem, 0)',

        '& > span:first-of-type::after': {
          transform: 'scaleX(1)',
        },

        '& span svg': {
          transform: 'translate(50%, -25%) rotate(-8deg)',
        },
      },

      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',

        '& > span:first-of-type::after, & span svg': {
          transition: 'none',
        },
      },
    },

    '& > span': {
      color: 'title',
      fontWeight: 'medium',
    },
  },

  variants: {
    type: {
      experience: {
        '& p': {
          color: 'subtitle',
          fontWeight: 'medium',
        },
      },
    },
  },
})
