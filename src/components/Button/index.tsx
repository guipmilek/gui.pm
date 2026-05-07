import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'

import { ButtonContainer } from './styles'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  rotateIcon?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, rotateIcon, ...rest }, ref) {
    return (
      <ButtonContainer ref={ref} rotateIcon={rotateIcon} {...rest}>
        {children}
      </ButtonContainer>
    )
  },
)
