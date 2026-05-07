import type { Metadata } from 'next'

const SITE_URL = 'https://guipm.dev'
const SITE_TITLE = 'guipm.dev - Full-stack | React/Next.js | Node.js'
const SITE_DESCRIPTION =
  'Portfolio de Guilherme Milék — desenvolvedor full-stack especializado em React, Next.js e Node.js.'

const defineMetadata = <T extends Metadata>(metadata: T) => metadata

export const seoConfig = defineMetadata({
  title: {
    template: '%s - guipm.dev',
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  manifest: '/site.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'mask-icon', url: '/favicon.ico' },
    { rel: 'image/x-icon', url: '/favicon.ico' },
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'guipm.dev',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
})

