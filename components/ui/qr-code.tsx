'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'qrcode'
import { Smartphone, Download, Share2 } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface QRCodeProps {
  url: string
  size?: number
  className?: string
  showDownload?: boolean
  showShare?: boolean
  title?: string
  description?: string
}

export function QRCodeComponent({
  url,
  size = 200,
  className,
  showDownload = true,
  showShare = true,
  title = 'Scan with your phone',
  description = 'Use your camera to scan this QR code and access our website on your mobile device',
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return

      try {
        setIsGenerating(true)

        // Generate QR code with high quality settings
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: '#1e293b', // slate-800
            light: '#ffffff', // white
          },
          errorCorrectionLevel: 'M',
        })

        setQrDataUrl(qrDataUrl)

        // Draw on canvas for download functionality
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const img = new Image()
          img.onload = () => {
            canvas.width = size
            canvas.height = size
            ctx.drawImage(img, 0, 0, size, size)
          }
          img.src = qrDataUrl
        }
      } catch (error) {
        console.error('Error generating QR code:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    generateQR()
  }, [url, size])

  const handleDownload = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `bestitconsulting-qr-code-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share && qrDataUrl) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrDataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'bestitconsulting-qr-code.png', {
          type: 'image/png',
        })

        await navigator.share({
          title: 'Best IT Consulting - QR Code',
          text: 'Scan this QR code to access our website',
          files: [file],
        })
      } catch (error) {
        console.log('Error sharing:', error)
        // Fallback to copying URL
        navigator.clipboard.writeText(url)
        alert('URL copied to clipboard!')
      }
    } else if (navigator.clipboard) {
      // Fallback to copying URL
      navigator.clipboard.writeText(url)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <motion.div
      className={cn('flex flex-col items-center space-y-4', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* QR Code Display */}
      <div className='relative'>
        <div className='p-4 bg-white rounded-xl shadow-lg border-2 border-gray-200'>
          {isGenerating ? (
            <div className='w-48 h-48 flex items-center justify-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
          ) : (
            <img
              src={qrDataUrl}
              alt='QR Code for Best IT Consulting'
              className='w-48 h-48'
            />
          )}
        </div>

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} className='hidden' />
      </div>

      {/* Title and Description */}
      <div className='text-center space-y-2'>
        <h3 className='text-lg font-semibold text-gray-900 flex items-center justify-center gap-2'>
          <Smartphone className='h-5 w-5 text-blue-600' />
          {title}
        </h3>
        <p className='text-sm text-gray-600 max-w-xs'>{description}</p>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-2'>
        {showDownload && (
          <Button
            variant='outline'
            size='sm'
            onClick={handleDownload}
            disabled={isGenerating}
            className='flex items-center gap-2'
          >
            <Download className='h-4 w-4' />
            Download
          </Button>
        )}

        {showShare && (
          <Button
            variant='outline'
            size='sm'
            onClick={handleShare}
            disabled={isGenerating}
            className='flex items-center gap-2'
          >
            <Share2 className='h-4 w-4' />
            Share
          </Button>
        )}
      </div>

      {/* URL Display */}
      <div className='text-xs text-gray-500 text-center max-w-xs break-all'>
        {url}
      </div>
    </motion.div>
  )
}

// Compact version for footer
export function QRCodeCompact({
  url,
  size = 120,
  className,
}: {
  url: string
  size?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsGenerating(true)

        const qrDataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 1,
          color: {
            dark: '#1e293b',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        })

        setQrDataUrl(qrDataUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    generateQR()
  }, [url, size])

  return (
    <motion.div
      className={cn('flex flex-col items-center space-y-2', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='p-2 bg-white rounded-lg shadow-md border border-gray-200'>
        {isGenerating ? (
          <div className='w-24 h-24 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
          </div>
        ) : (
          <img
            src={qrDataUrl}
            alt='QR Code for Best IT Consulting'
            className='w-24 h-24'
          />
        )}
      </div>

      <div className='text-center'>
        <p className='text-xs font-medium text-white mb-1'>Mobile Access</p>
        <p className='text-xs text-gray-300'>Scan to visit</p>
      </div>
    </motion.div>
  )
}
