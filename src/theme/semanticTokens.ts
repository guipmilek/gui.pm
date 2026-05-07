import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    primary: { value: '{colors.skyDark.sky11}' },
    primaryDark: { value: '{colors.skyDark.sky2}' },

    background: { value: '{colors.slateDark.slate1}' },
    sectionTitleBackground: { value: '{colors.slateDarkA.slateA1-50}' },
    cardBackground: { value: '{colors.slateDarkA.slateA4-25}' },

    cardTopBorder: {
      value: '{colors.slateDarkA.slateA11-10}',
    },
    imageBorder: {
      base: { value: '{colors.slateDarkA.slateA12-10}' },
      hover: { value: '{colors.slateDarkA.slateA12-30}' },
    },

    title: { value: '{colors.slateDark.slate12}' },
    subtitle: { value: '{colors.slateDark.slate10}' },
    text: { value: '{colors.slateDark.slate11}' },

    gridLines: {
      small: { value: '{colors.slateDarkA.slateA2-35}' },
      big: { value: '{colors.slateDarkA.slateA2-75}' },
    },

    cursorGradient: { value: '{colors.slateDarkA.slateA2-50}' },
    cursor: { value: '{colors.slateDarkA.slateA12-30}' },
  },

  gradients: {
    grid: {
      small: {
        value: `linear-gradient({colors.gridLines.small} 1px, transparent 1px),
                linear-gradient(to right, {colors.gridLines.small} 1px, transparent 1px)`,
      },
      big: {
        value: `linear-gradient({colors.gridLines.big} 1px, transparent 1px),
                linear-gradient(to right, {colors.gridLines.big} 1px, transparent 1px)`,
      },
    },

    cursor: {
      value: 'radial-gradient(300px, {colors.cursorGradient}, transparent 80%)',
    },
  },
})
