import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@lobehub/fluent-emoji'],

  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [],
  },

  async redirects() {
    return [
      {
        source: '/curriculo',
        destination: '/curriculo.pdf',
        permanent: true,
      },
    ]
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
