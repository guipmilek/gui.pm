/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },

  images: {
    remotePatterns: process.env.API_REMOTEPATTERNS_HOSTNAME
      ? [
          {
            protocol: process.env.API_REMOTEPATTERNS_PROTOCOL || 'https',
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
}

module.exports = nextConfig
