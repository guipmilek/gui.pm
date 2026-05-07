import { cva } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'

export const cardListRecipe = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',

    width: '100%',

    lg: {
      '& > li': {
        transition: 'opacity 0.2s',
      },

      '&:hover > li:not(:hover)': {
        opacity: '50%',
      },
    },
  },
})

export const CardList = styled('ol', cardListRecipe)
