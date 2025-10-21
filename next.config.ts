import type { NextConfig } from 'next'

const r2Host = process.env.NEXT_PUBLIC_R2_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname
  : undefined

const r2MediaHost = process.env.NEXT_PUBLIC_R2_MORE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_MORE_URL).hostname
  : undefined

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      ...(r2Host
        ? [
            {
              protocol: 'https',
              hostname: r2Host,
            } as const,
          ]
        : []),
      ...(r2MediaHost
        ? [
            {
              protocol: 'https',
              hostname: r2MediaHost,
            } as const,
          ]
        : []),
    ],
  },
}

export default nextConfig
