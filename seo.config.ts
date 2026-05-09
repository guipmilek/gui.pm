import type { Metadata } from 'next'

const SITE_URL = 'https://gui.pm'
const SITE_TITLE = 'gui.pm — Guilherme Milék'
const SITE_DESCRIPTION =
  'Currículo digital de Guilherme Milék — suporte técnico, desenvolvimento interno, diagnóstico, SQL, automações e sistemas internos.'

const defineMetadata = <T extends Metadata>(metadata: T) => metadata

export const seoConfig = defineMetadata({
  title: {
    template: '%s — Guilherme Milék',
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
    siteName: 'gui.pm — Guilherme Milék',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
})


