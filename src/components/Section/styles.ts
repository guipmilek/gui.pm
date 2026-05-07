import { cva } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'

export const SectionContainer = styled('section', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      base: 'center',
      sm: 'start',
    },
    gap: '1rem',
  },
})

export const customLinkStyles = cva({
  base: {
    width: 'fit-content',

    color: 'title',
    fontWeight: 'semibold',

    lg: {
      marginTop: '1.5rem',
    },

    '& span': {
      position: 'relative',

      '&::before': {
        position: 'absolute',
        inset: 0,

        width: 0,
        height: '100%',

        borderBottom: '1px solid',
        borderColor: 'primary',

        content: '""',

        transition: 'width 0.2s',
      },
    },

    '& svg': {
      position: 'relative',

      display: 'inline',

      marginLeft: '0.25rem',

      transition: 'transform 0.2s',
    },

    '&:hover': {
      '& span::before': {
        width: '100%',
      },

      '& svg': {
        transform: 'translateX(4px)',
      },
    },
  },
})
