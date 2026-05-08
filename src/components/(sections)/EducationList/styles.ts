import { styled } from '@/styled-system/jsx'

export const EducationCardStatus = styled('span', {
  base: {
    display: 'inline-block',
    width: 'fit-content',

    textStyle: 'xs',
    color: 'primary',
    fontWeight: 'medium',

    border: '1px solid',
    borderColor: 'primary',
    borderRadius: '3.125rem',
    opacity: 0.75,
    padding: '0.125rem 0.5rem',
  },
})

export const EducationDescription = styled('p', {
  base: {
    color: 'subtitle',
    textStyle: 'sm',
    lineHeight: '1.6',
    opacity: 0.8,
  },
})
