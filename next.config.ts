import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@lobehub/fluent-emoji'],

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
