import type { NextConfig } from 'next'

const r2Base = process.env.NEXT_PUBLIC_R2_BASE_URL
const r2Hostname = r2Base ? new URL(r2Base).hostname : undefined

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons**',
      },
      ...(r2Hostname
        ? [
            {
              protocol: 'https' as const,
              hostname: r2Hostname,
              pathname: '/**',
            },
          ]
        : []),
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three', 'lottie-react'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }
    return config
  },
}

export default nextConfig
