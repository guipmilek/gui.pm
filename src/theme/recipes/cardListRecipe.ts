import { cva } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'

const cardListRecipe = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: { base: '2.5rem', md: '3rem' },

    width: '100%',

    lg: {
      '& > li': {
        transition: 'opacity 0.2s',
      },

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover), &.scroll-hover > li.is-revealed:not(.scroll-hover)': {
          opacity: '50%',
        },
      },
    },
  },
})

export const CardList = styled('ol', cardListRecipe)
