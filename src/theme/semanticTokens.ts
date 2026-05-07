import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    primary: { value: '{colors.skyDark.sky11}' },
    primaryDark: { value: '{colors.skyDark.sky2}' },

    background: { value: '{colors.slateDark.slate1}' },
    sectionTitleBackground: { value: '{colors.slateDarkA.slateA1_50}' },
    cardBackground: { value: '{colors.slateDarkA.slateA4_25}' },

    cardTopBorder: {
      value: '{colors.slateDarkA.slateA11_10}',
    },
    imageBorder: {
      base: { value: '{colors.slateDarkA.slateA12_10}' },
      hover: { value: '{colors.slateDarkA.slateA12_30}' },
    },

    title: { value: '{colors.slateDark.slate12}' },
    subtitle: { value: '{colors.slateDark.slate10}' },
    text: { value: '{colors.slateDark.slate11}' },

    cursor: { value: '{colors.slateDarkA.slateA12_30}' },
  },
})
