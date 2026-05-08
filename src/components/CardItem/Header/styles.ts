import { styled } from '@/styled-system/jsx'

export const HeaderCardItemContainer = styled('header', {
  variants: {
    type: {
      experience: {
        '& span': {
          color: 'subtitle',
          textStyle: 'xs',
          fontWeight: 'semibold',
        },
      },

      project: {
        '& img': {
          border: '2px solid',
          borderColor: 'imageBorder.base',
          borderRadius: '4px',

          width: '100%',
          height: 'auto',
          maxWidth: '200px',

          transition: 'border-color 0.2s',
        },
      },
    },
  },
})

export const ProjectImagePlaceholder = styled('div', {
  base: {
    border: '2px solid',
    borderColor: 'imageBorder.base',
    borderRadius: '4px',

    width: '100%',
    maxWidth: '200px',
    aspectRatio: '16/9',

    background: 'cardBackground',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: 'subtitle',
    textStyle: 'xs',
    opacity: 0.4,
    fontStyle: 'italic',

    transition: 'border-color 0.2s',
  },
})
