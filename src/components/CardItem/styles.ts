import { styled } from '@/styled-system/jsx'

export const CardItemContainer = styled('li', {
  base: {
    position: 'relative',

    '& .glass-card-wrapper': {
      // Replicate the inset and padding of the old ::before
      margin: { base: '-1rem', md: '-1.5rem' },
      padding: { base: '1rem', md: '1.5rem' },

      opacity: 0,
      transition: 'opacity 0.2s',

      boxShadow: 'card',

      // Ensure the distortion layer is above the background grid but below content
      zIndex: 0,

      '& .glass-ui-card-content': {
        zIndex: 1,
        overflow: 'visible',
      },
    },

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
        '& header img': {
          borderColor: 'imageBorder.hover',
        },

        '& .glass-card-wrapper': {
          opacity: 1,
        },
      },
    },
  },
})

export const CardItemContent = styled('div', {
  base: {
    position: 'relative',
    zIndex: 1,

    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    sm: {
      display: 'grid',
      gridTemplateColumns: 'minmax(200px, 20%) 1fr',
    },

    lg: {
      gridTemplateColumns: 'minmax(120px, 20%) 1fr',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  },

  variants: {
    type: {
      project: {
        flexDirection: 'column-reverse',
      },
    },
  },
})

export const Infos = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',

    '& > p': {
      textStyle: 'sm',
      color: 'subtitle',
      fontStyle: 'italic',
    },

    '& ul': {
      position: 'relative',

      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',

      '& li a': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',

        color: 'title',
        textStyle: 'sm',
        fontWeight: 'medium',

        transition: 'color 0.2s',

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
            color: 'primary',
          },
        },
      },
    },
  },
})

const pillBase = {
  display: 'block',
  background: 'primaryDark',
  border: '1px solid transparent',
  padding: '0.2rem 0.5rem',
  borderRadius: '3.125rem',
  color: 'primary',
  textStyle: 'xs',
  lineHeight: '1.4',
}

export const TagsWrapper = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
  },
})

export const TagsList = styled('ul', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.375rem',

    '& li': {
      display: 'flex',
      alignItems: 'center',
    },

    '& span': pillBase,
  },
})

export const TagsBadge = styled('button', {
  base: {
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    display: 'block',

    background: 'transparent',
    border: '1px solid',
    borderColor: 'subtitle',
    borderRadius: '3.125rem',
    padding: '0.2rem 0.5rem',

    color: 'subtitle',
    textStyle: 'xs',
    lineHeight: '1.4',
    fontWeight: 'medium',
    opacity: 0.65,

    transition: 'opacity 0.2s',

    '@media (hover: hover) and (pointer: fine)': {
      '&:hover:not(:where(.hover-stale *))': {
        opacity: 1,
      },
    },
  },
})

export const ExtraTags = styled('ul', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.375rem',
    overflow: 'hidden',
    height: '0',

    transition: 'height 0.4s ease',

    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },

    '& span': pillBase,
  },
})

// kept for Projects (tags rendered without limit)
export const Tags = styled('ul', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.375rem',

    '& span': pillBase,
  },
})

