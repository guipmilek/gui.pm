import { styled } from '@/styled-system/jsx'

export const ButtonContainer = styled('button', {
  base: {
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',

    padding: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'title',
    borderRadius: '6px',

    margin: '0 auto',

    textStyle: 'xs',
    textTransform: 'uppercase',
    color: 'title',

    cursor: 'pointer',

    transition: 'color 0.2s, background-color 0.2s, margin 0.5s',

    '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
      backgroundColor: 'title',

      borderColor: 'title',

      color: 'background',
    },

    '& svg': {
      transition: 'transform 0.5s',
    },
  },
  variants: {
    rotateIcon: {
      true: {
        '& svg': {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
})
