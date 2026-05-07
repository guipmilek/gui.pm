import { cva } from '@/styled-system/css'

export const sectionTitleContainerStyles = cva({
  base: {
    display: 'block',
    top: 0,
    zIndex: 2,

    lg: { display: 'none' },

    width: '100%',

    padding: '1.25rem 0',

    color: 'title',
    textStyle: 'sm',
    fontWeight: 'bold',

    '&.pinned::before': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: -1,

      backgroundColor: 'sectionTitleBackground',
      width: 'calc(100% + (1.5rem * 2))',

      marginLeft: '-1.5rem',

      content: "''",

      backdropFilter: 'blur(8px)',

      md: {
        width: 'calc(100% + (3rem * 2))',

        marginLeft: '-3rem',
      },
    },
  },
  variants: {
    isSticky: {
      true: {
        position: 'sticky',
      },
    },
  },
})
