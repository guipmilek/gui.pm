import { defineTokens } from '@pandacss/dev'
import { skyDark, slateDark } from '@radix-ui/colors'

interface RadixColorPalette {
  [key: string]: string
}

interface RadixColorPaletteToken {
  [key: string]: {
    value: string
  }
}

function createRadixColorPaletteToken(
  radixColorPalette: RadixColorPalette,
): RadixColorPaletteToken {
  return Object.keys(radixColorPalette).reduce((acc, color) => {
    return {
      ...acc,
      [color]: {
        value: radixColorPalette[color],
      },
    }
  }, {})
}

function createRadixColorWithTransparency(
  radixColor: string,
  transparencyLevel: number,
) {
  const colorWithoutCommas = radixColor.replaceAll(',', '')

  const transparencyLevelSuffix = ` / ${transparencyLevel / 100})`

  return colorWithoutCommas.replace(')', transparencyLevelSuffix)
}

export const colors = defineTokens.colors({
  slateDark: createRadixColorPaletteToken(slateDark),
  skyDark: createRadixColorPaletteToken(skyDark),

  slateDarkA: [
    // ===== slate1 =====
    {
      colorName: 'slateA1_50',
      baseColor: slateDark.slate1,
      transparencyLevel: 50,
    },

    // ===== slate4 =====
    {
      colorName: 'slateA4_25',
      baseColor: slateDark.slate4,
      transparencyLevel: 25,
    },

    // ===== slate11 =====
    {
      colorName: 'slateA11_10',
      baseColor: slateDark.slate11,
      transparencyLevel: 10,
    },

    // ===== slate12 =====
    {
      colorName: 'slateA12_10',
      baseColor: slateDark.slate12,
      transparencyLevel: 10,
    },
    {
      colorName: 'slateA12_30',
      baseColor: slateDark.slate12,
      transparencyLevel: 30,
    },
  ].reduce((colors, currentColor) => {
    const { colorName, baseColor, transparencyLevel } = currentColor

    return {
      ...colors,
      [colorName]: {
        value: createRadixColorWithTransparency(baseColor, transparencyLevel),
      },
    }
  }, {}),
})
