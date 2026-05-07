import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,

  images: {
    remotePatterns: process.env.API_REMOTEPATTERNS_HOSTNAME
      ? [
          {
            protocol: (process.env.API_REMOTEPATTERNS_PROTOCOL as
              | 'http'
              | 'https') || 'https',
            hostname: process.env.API_REMOTEPATTERNS_HOSTNAME,
            pathname: process.env.API_REMOTEPATTERNS_PATHNAME || '/**',
          },
        ]
      : [],
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
