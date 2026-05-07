import '../styles/panda.css'

import { Analytics } from '@vercel/analytics/react'
import type { Viewport } from 'next'
import { ReactNode } from 'react'
import { seoConfig } from 'seo.config'

import { Cursor } from '@/components/(cursor)/Cursor'
import { Background } from '@/components/Background'
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={fontClassName}>
      <body>
        <MouseProvider>
          <Cursor />

          <BodyContent>{children}</BodyContent>

          <Background />
        </MouseProvider>

        <Analytics />
      </body>
    </html>
  )
}

