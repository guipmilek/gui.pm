import { defineTokens } from '@pandacss/dev'

import { colors } from './colors'

export const tokens = defineTokens({
  fonts: {
    sans: { value: 'var(--font-inter), sans-serif' },
    mono: { value: 'var(--font-fira-code), monospace' },
  },

  shadows: {
    card: {
      value: ['0 10px 8px 0 rgb(0 0 0 / 4%)', '0 4px 3px 0 rgb(0 0 0 / 10%)'],
    },
  },

  colors,
})
