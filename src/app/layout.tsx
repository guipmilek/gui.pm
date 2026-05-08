import '../styles/panda.css'

import { Analytics } from '@vercel/analytics/react'
import type { Viewport } from 'next'
import { ReactNode } from 'react'
import { seoConfig } from 'seo.config'

import { Cursor } from '@/components/(cursor)/Cursor'
import { Background } from '@/components/Background'
import { ScrollReveal } from '@/components/ScrollReveal'
import { MouseProvider } from '@/contexts/MouseContext'
import { fontClassName } from '@/styles/fonts'

import { BodyContent } from './styles'

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = seoConfig

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
}

const revealPreloadScript = `
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reveal-preload')
    setTimeout(function () {
      document.documentElement.classList.remove('reveal-preload')
    }, 4000)
  }
`

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={fontClassName} suppressHydrationWarning>
      <body>
        <style>
          {`
            html.reveal-preload [data-reveal] {
              opacity: 0;
              transform: translate3d(0, 0.75rem, 0);
              filter: none;
            }

            @media (min-width: 1024px) {
              html.reveal-preload [data-reveal] {
                transform: translate3d(0, 1rem, 0);
                filter: blur(6px);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              html.reveal-preload [data-reveal] {
                opacity: 1 !important;
                transform: none !important;
                filter: none !important;
              }
            }
          `}
        </style>
        <script dangerouslySetInnerHTML={{ __html: revealPreloadScript }} />

        <noscript>
          <style>
            {`
              [data-reveal] {
                opacity: 1 !important;
                transform: none !important;
                filter: none !important;
              }
            `}
          </style>
        </noscript>

        <MouseProvider>
          <ScrollReveal />
          <Cursor />

          <BodyContent>{children}</BodyContent>

          <Background />
        </MouseProvider>

        <Analytics />
      </body>
    </html>
  )
}

