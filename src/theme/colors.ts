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
      colorName: 'slateA1-50',
      baseColor: slateDark.slate1,
      transparencyLevel: 50,
    },

    // ===== slate2 =====
    {
      colorName: 'slateA2-35',
      baseColor: slateDark.slate2,
      transparencyLevel: 35,
    },
    {
      colorName: 'slateA2-50',
      baseColor: slateDark.slate2,
      transparencyLevel: 50,
    },
    {
      colorName: 'slateA2-75',
      baseColor: slateDark.slate2,
      transparencyLevel: 75,
    },

    // ===== slate4 =====
    {
      colorName: 'slateA4-25',
      baseColor: slateDark.slate4,
      transparencyLevel: 25,
    },
    {
      colorName: 'slateA4-50',
      baseColor: slateDark.slate4,
      transparencyLevel: 50,
    },

    // ===== slate10 =====
    {
      colorName: 'slateA10-0',
      baseColor: slateDark.slate10,
      transparencyLevel: 0,
    },

    // ===== slate11 =====
    {
      colorName: 'slateA11-10',
      baseColor: slateDark.slate11,
      transparencyLevel: 10,
    },

    // ===== slate12 =====
    {
      colorName: 'slateA12-5',
      baseColor: slateDark.slate12,
      transparencyLevel: 5,
    },
    {
      colorName: 'slateA12-10',
      baseColor: slateDark.slate12,
      transparencyLevel: 10,
    },
    {
      colorName: 'slateA12-30',
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
