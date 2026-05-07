import { cva } from '@/styled-system/css'

export const sectionTitleContainerStyles = cva({
  base: {
    display: 'block',
    position: 'relative',
    top: 0,
    zIndex: 10,

    lg: { display: 'none' },

    width: '100%',

    padding: '1.25rem 0',

    color: 'title',
    textStyle: 'sm',
    fontWeight: 'bold',

    // Text sits above the blur layer
    '& h2': {
      position: 'relative',
      zIndex: 1,
    },

    '&.pinned::before': {
      position: 'absolute',
      inset: 0,
      zIndex: 0,

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
