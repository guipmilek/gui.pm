'use client'

import { useEffect } from 'react'

import { css } from '@/styled-system/css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'background',
          color: 'text',
          gap: '1rem',
          fontFamily: 'sans',
        })}
      >
        <h2
          className={css({
            color: 'title',
            textStyle: 'xl',
            fontWeight: 'bold',
          })}
        >
          Algo deu errado.
        </h2>

        <p className={css({ textStyle: 'sm', color: 'subtitle' })}>
          Tente recarregar a página.
        </p>

        <button
          onClick={reset}
          className={css({
            padding: '0.5rem 1.25rem',
            borderRadius: '6px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'title',
            color: 'title',
            textStyle: 'sm',
            cursor: 'pointer',
            marginTop: '0.5rem',
            transition: 'color 0.2s, background-color 0.2s',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover:not(:where(.hover-stale *)), &.scroll-hover': {
                backgroundColor: 'title',
                color: 'background',
              },
            },
          })}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  )
}
