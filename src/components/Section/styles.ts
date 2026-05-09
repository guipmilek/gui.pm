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

    scrollMarginTop: { base: '4rem', lg: 'clamp(3rem, 8svh, 6rem)' },
    paddingBottom: { base: 'clamp(4.5rem, 12svh, 6rem)', lg: '0' },
  },
})

export const customLinkStyles = cva({
  base: {
    width: 'fit-content',

    color: 'title',
    fontWeight: 'semibold',

    marginTop: '1.5rem',



    '& span': {
      position: 'relative',

      '&::before': {
        position: 'absolute',
        inset: 0,

        width: 0,
        height: '100%',

        borderBottom: '1px solid',
        borderColor: 'primary',

        content: "''",

        transition: 'width 0.2s',
      },
    },

    '& svg': {
      position: 'relative',

      display: 'inline',

      marginLeft: '0.25rem',

      transition: 'transform 0.2s',
    },

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
        '& span::before': {
          width: '100%',
        },

        '& svg': {
          transform: 'translateX(4px)',
        },
      },
    },
  },
})
