import { styled } from '@/styled-system/jsx'

export const HeadingCardItemContainer = styled('h2', {
  base: {
    '& a': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',

      color: 'title',
      fontWeight: 'medium',

      transition: 'color 0.2s',

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

            transition: 'transform 0.2s',
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
        },
      },

      '&:hover': {
        color: 'primary',

        '& span svg': {
          transform: 'translate(50%, -25%)',
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
