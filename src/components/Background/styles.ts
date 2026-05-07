import { styled } from '@/styled-system/jsx'

export const BackgroundContainer = styled('div', {
  base: {
    position: 'absolute',
    inset: 0,
    zIndex: -1,

    overflow: 'hidden',
  },
})

export const GridFallback = styled('div', {
  base: {
    position: 'absolute',
    inset: 0,

    backgroundImage: `
      linear-gradient(to right, rgba(113,113,122,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(113,113,122,0.04) 1px, transparent 1px),
      linear-gradient(to right, rgba(113,113,122,0.12) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(113,113,122,0.12) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px, 20px 20px, 80px 80px, 80px 80px',
  },
})
