import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  xs: {
    value: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },

  sm: {
    value: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },

  xl: {
    value: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },

  '3xl': {
    value: {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
  },

  '5xl': {
    value: {
      fontSize: '3rem',
      lineHeight: '1',
    },
  },
})

