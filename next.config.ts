import type { NextConfig } from 'next'

const r2Host = process.env.NEXT_PUBLIC_R2_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname
  : process.env.R2_PUBLIC_BASE_URL
    ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
    : undefined

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons**',
      },
      ...(r2Host
        ? [
            {
              protocol: 'https',
              hostname: r2Host,
            } as const,
          ]
        : []),
    ],
  },
}

export default nextConfig
