import Link from 'next/link'

import { css } from '@/styled-system/css'

export default function NotFound() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1rem',
        textAlign: 'center',
        padding: '2rem',
      })}
    >
      <span
        className={css({
          color: 'primary',
          textStyle: '3xl',
          fontWeight: 'bold',
          lineHeight: '1',
        })}
      >
        404
      </span>

      <h1
        className={css({
          color: 'title',
          textStyle: 'xl',
          fontWeight: 'bold',
        })}
      >
        Página não encontrada
      </h1>

      <p className={css({ textStyle: 'sm', color: 'subtitle', maxWidth: '24rem' })}>
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        href="/"
        className={css({
          marginTop: '0.5rem',
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'title',
          color: 'title',
          textStyle: 'sm',
          fontWeight: 'medium',
          transition: 'color 0.2s, background-color 0.2s',
          _hover: {
            backgroundColor: 'title',
            color: 'background',
          },
        })}
      >
        Voltar ao início
      </Link>
    </div>
  )
}
