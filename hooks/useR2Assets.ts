'use client'

import { useState, useEffect } from 'react'

interface R2Asset {
  filename: string
  type: 'image' | 'video' | 'document' | 'other'
  url: string
  isVideo: boolean
  isImage: boolean
  isDocument: boolean
}

interface R2AssetsResponse {
  assets: R2Asset[]
  count: number
  configured: boolean
  error?: string
}

export function useR2Assets() {
  const [assets, setAssets] = useState<R2Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configured, setConfigured] = useState(false)

  const fetchAssets = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/r2-assets')
      const data: R2AssetsResponse = await response.json()

      if (data.error) {
        setError(data.error)
        setConfigured(false)
      } else {
        setAssets(data.assets)
        setConfigured(data.configured)
      }
    } catch (err) {
      setError('Failed to fetch assets')
      setConfigured(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  const getAssetsByType = (type: 'image' | 'video' | 'document' | 'other') => {
    return assets.filter(asset => asset.type === type)
  }

  const getImages = () => getAssetsByType('image')
  const getVideos = () => getAssetsByType('video')
  const getDocuments = () => getAssetsByType('document')

  const getAssetByFilename = (filename: string) => {
    return assets.find(asset => asset.filename === filename)
  }

  const refreshAssets = () => {
    fetchAssets()
  }

  return {
    assets,
    loading,
    error,
    configured,
    getImages,
    getVideos,
    getDocuments,
    getAssetByFilename,
    refreshAssets,
  }
}

// Predefined asset mappings for different pages
export const R2_ASSET_MAPPINGS = {
  home: {
    hero: 'jimeng-1.png',
    demo: 'jimeng-5.mp4',
    demoPoster: 'jimeng-5-poster.jpg',
    technology: 'jimeng-2.png',
    team: 'jimeng-3.png',
    gammaC1: 'home-page/gamma-c1.png',
    gammaC2: 'home-page/gamma-c2.png',
    gammaC3: 'home-page/gamma-c3.png',
    gammaC4: 'home-page/gamma-c4.png',
    unsplash: 'home-page/unsplash.avif',
  },
  services: {
    hero: 'jimeng-4.png',
    process: 'jimeng-6.png',
    technology: 'jimeng-7.png',
    team: 'jimeng-8.png',
  },
  about: {
    hero: 'jimeng-1.png',
    team: 'jimeng-2.png',
    office: 'jimeng-3.png',
    culture: 'jimeng-4.png',
  },
  'our-work': {
    hero: 'jimeng-5.png',
    project1: 'jimeng-6.png',
    project2: 'jimeng-7.png',
    project3: 'jimeng-8.png',
  },
  portfolio: {
    hero: 'jimeng-1.png',
    gallery1: 'jimeng-2.png',
    gallery2: 'jimeng-3.png',
    gallery3: 'jimeng-4.png',
  },
  contact: {
    hero: 'jimeng-5.png',
    office: 'jimeng-6.png',
    team: 'jimeng-7.png',
  },
  testimonials: {
    hero: 'jimeng-8.png',
    client1: 'jimeng-1.png',
    client2: 'jimeng-2.png',
    success: 'jimeng-3.png',
  },
} as const

export type PageKey = keyof typeof R2_ASSET_MAPPINGS
export type AssetKey<T extends PageKey> = keyof (typeof R2_ASSET_MAPPINGS)[T]
