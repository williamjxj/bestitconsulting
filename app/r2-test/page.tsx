'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Play,
  Image as ImageIcon,
  FileText,
  Download,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
} from 'lucide-react'

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

export default function R2TestPage() {
  const [assets, setAssets] = useState<R2Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configured, setConfigured] = useState(false)
  const [newAssetName, setNewAssetName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

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

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className='h-6 w-6' />
      case 'image':
        return <ImageIcon className='h-6 w-6' />
      case 'document':
        return <FileText className='h-6 w-6' />
      default:
        return <FileText className='h-6 w-6' />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'image':
        return 'bg-green-100 text-green-800'
      case 'document':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (asset: R2Asset) => {
    const link = document.createElement('a')
    link.href = asset.url
    link.download = asset.filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = (asset: R2Asset) => {
    window.open(asset.url, '_blank')
  }

  const handleAddAsset = async () => {
    if (!newAssetName.trim()) return

    const base = process.env.NEXT_PUBLIC_R2_BASE_URL || ''
    const testUrl = `${base}/${newAssetName}`

    try {
      const response = await fetch(testUrl, { method: 'HEAD' })
      if (response.ok) {
        // Asset exists, add it to the list
        const newAsset = {
          filename: newAssetName,
          type: getAssetType(newAssetName),
          url: testUrl,
          isVideo: getAssetType(newAssetName) === 'video',
          isImage: getAssetType(newAssetName) === 'image',
          isDocument: getAssetType(newAssetName) === 'document',
        }
        setAssets(prev => [...prev, newAsset])
        setNewAssetName('')
        setShowAddForm(false)
      } else {
        setError(`Asset "${newAssetName}" not found in R2 bucket`)
      }
    } catch (err) {
      setError(`Failed to check asset "${newAssetName}"`)
    }
  }

  const getAssetType = (
    filename: string
  ): 'image' | 'video' | 'document' | 'other' => {
    const ext = filename.toLowerCase().split('.').pop()

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return 'image'
    }

    if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext || '')) {
      return 'video'
    }

    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) {
      return 'document'
    }

    return 'other'
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <RefreshCw className='h-8 w-8 animate-spin mx-auto mb-4 text-blue-600' />
            <h2 className='text-xl font-semibold text-gray-900'>
              Loading R2 Assets...
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                R2 Assets Test Page
              </h1>
              <p className='mt-2 text-gray-600'>
                Testing Cloudflare R2 bucket integration and asset display
              </p>
            </div>
            <div className='flex items-center gap-4'>
              {configured ? (
                <div className='flex items-center gap-2 text-green-600'>
                  <CheckCircle className='h-5 w-5' />
                  <span className='text-sm font-medium'>R2 Configured</span>
                </div>
              ) : (
                <div className='flex items-center gap-2 text-red-600'>
                  <AlertCircle className='h-5 w-5' />
                  <span className='text-sm font-medium'>R2 Not Configured</span>
                </div>
              )}
              <Button onClick={fetchAssets} variant='outline' size='sm'>
                <RefreshCw className='h-4 w-4 mr-2' />
                Refresh
              </Button>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                variant='outline'
                size='sm'
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Asset
              </Button>
            </div>
          </div>
        </div>

        {/* Manual Asset Addition Form */}
        {showAddForm && (
          <div className='mb-6 rounded-md bg-blue-50 p-4'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium text-blue-800'>
                Add Asset Manually
              </h3>
              <Button
                onClick={() => setShowAddForm(false)}
                variant='ghost'
                size='sm'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex gap-2'>
              <input
                type='text'
                value={newAssetName}
                onChange={e => setNewAssetName(e.target.value)}
                placeholder='Enter asset filename (e.g., image.jpg, video.mp4)'
                className='flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <Button onClick={handleAddAsset} size='sm'>
                Add
              </Button>
            </div>
            <p className='text-xs text-blue-600 mt-2'>
              Enter the exact filename as it appears in your R2 bucket
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='mb-6 rounded-md bg-red-50 p-4'>
            <div className='flex'>
              <AlertCircle className='h-5 w-5 text-red-400' />
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>Error</h3>
                <div className='mt-2 text-sm text-red-700'>{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center'>
                    <FileText className='h-4 w-4 text-blue-600' />
                  </div>
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>
                    Total Assets
                  </p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {assets.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-8 w-8 rounded-md bg-green-100 flex items-center justify-center'>
                    <ImageIcon className='h-4 w-4 text-green-600' />
                  </div>
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>Images</p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {assets.filter(asset => asset.isImage).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-8 w-8 rounded-md bg-red-100 flex items-center justify-center'>
                    <Play className='h-4 w-4 text-red-600' />
                  </div>
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>Videos</p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {assets.filter(asset => asset.isVideo).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Grid */}
        {assets.length === 0 ? (
          <Card>
            <CardContent className='p-12 text-center'>
              <FileText className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No Assets Found
              </h3>
              <p className='text-gray-500'>
                No assets were found in the R2 bucket. Make sure your bucket
                contains files.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {assets.map((asset, index) => (
              <Card
                key={index}
                className='overflow-hidden hover:shadow-lg transition-shadow'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      {getAssetIcon(asset.type)}
                      <CardTitle className='text-sm font-medium truncate'>
                        {asset.filename}
                      </CardTitle>
                    </div>
                    <Badge className={getTypeColor(asset.type)}>
                      {asset.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className='pt-0'>
                  {/* Asset Preview */}
                  <div className='mb-4 aspect-video bg-gray-100 rounded-lg overflow-hidden'>
                    {asset.isImage ? (
                      <img
                        src={asset.url}
                        alt={asset.filename}
                        className='w-full h-full object-cover'
                        onError={e => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : asset.isVideo ? (
                      <video
                        src={asset.url}
                        className='w-full h-full object-cover'
                        muted
                        onError={e => {
                          const target = e.target as HTMLVideoElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}

                    {/* Fallback for failed loads */}
                    <div
                      className='w-full h-full items-center justify-center bg-gray-200'
                      style={{ display: 'none' }}
                    >
                      <div className='text-center'>
                        {getAssetIcon(asset.type)}
                        <p className='text-xs text-gray-500 mt-1'>
                          Preview unavailable
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleOpenInNewTab(asset)}
                      className='flex-1'
                    >
                      <ExternalLink className='h-3 w-3 mr-1' />
                      View
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleDownload(asset)}
                      className='flex-1'
                    >
                      <Download className='h-3 w-3 mr-1' />
                      Download
                    </Button>
                  </div>

                  {/* URL (truncated) */}
                  <div className='mt-3'>
                    <p
                      className='text-xs text-gray-500 truncate'
                      title={asset.url}
                    >
                      {asset.url}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
