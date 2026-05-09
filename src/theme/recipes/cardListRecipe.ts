import { cva } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'

const cardListRecipe = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: { base: '3rem', md: '4rem' },

    width: '100%',

    lg: {
      '@media (hover: hover) and (pointer: fine)': {
        '&:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover) .glass-liquid-fill-active, &.scroll-hover > li.is-revealed:not(.scroll-hover) .glass-liquid-fill-active, &:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover) .glass-liquid-frost-active, &.scroll-hover > li.is-revealed:not(.scroll-hover) .glass-liquid-frost-active, &:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover) .glass-liquid-sheen, &.scroll-hover > li.is-revealed:not(.scroll-hover) .glass-liquid-sheen, &:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover) .glass-liquid-rim, &.scroll-hover > li.is-revealed:not(.scroll-hover) .glass-liquid-rim': {
          opacity: '0',
        },

        '&:hover:not(:where(.hover-stale *)) > li.is-revealed:not(:hover), &.scroll-hover > li.is-revealed:not(.scroll-hover)': {
          '--glass-card-dim-opacity': '1',
        },
      },
    },
  },
})

export const CardList = styled('ol', cardListRecipe)
