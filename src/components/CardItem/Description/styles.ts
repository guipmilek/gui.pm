import { styled } from '@/styled-system/jsx'

export const ParagraphCardItemContainer = styled('div', {
  base: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.75rem',

    '& > div': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      marginBottom: '0.5rem',

      transition: 'height 0.5s, mask-position 0.5s, -webkit-mask-position 0.5s',

      '& p': {
        textStyle: 'sm',

        '& + p': {
          marginTop: '0.25rem',
        },
      },

      '&[data-overflow="true"]': {
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 50%, transparent 100%)',
        maskSize: 'auto 200%',
        WebkitMaskSize: 'auto 200%',
        maskPosition: 'center 100%',
        WebkitMaskPosition: 'center 100%',
      },

      '&[data-expanded="true"]': {
        maskPosition: 'center 0%',
        WebkitMaskPosition: 'center 0%',
      },
    },
  },
})
