'use client'

import { useState, useEffect } from 'react'
import EmbeddedGoogleMap from './EmbeddedGoogleMap'
import { MapPin, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SmartMapProps {
  addresses: Array<{
    city: string
    address: string
    postal: string
    coordinates: string
    isHeadquarters: boolean
    phone: string
  }>
  height?: string
  className?: string
}

export default function SmartGoogleMap({
  addresses,
  height = '400px',
  className = '',
}: SmartMapProps) {
  const [mapError, setMapError] = useState(false)
  const [apiKeyValid, setApiKeyValid] = useState(true)

  useEffect(() => {
    // Check if API key is available
    if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
      setApiKeyValid(false)
    }
  }, [])

  // Fallback: Static Map URLs for each office
  const StaticMapFallback = () => (
    <div className={`${className} space-y-4`}>
      <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4'>
        <div className='flex items-start gap-3'>
          <AlertCircle className='h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0' />
          <div>
            <h4 className='font-medium text-amber-800'>
              Interactive Map Unavailable
            </h4>
            <p className='text-sm text-amber-700 mt-1'>
              The interactive map is temporarily unavailable. You can still view
              individual office locations below.
            </p>
          </div>
        </div>
      </div>

      <div className='grid gap-4'>
        {addresses.map((office, index) => (
          <Card key={index} className='border border-gray-200'>
            <CardContent className='p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <MapPin className='h-4 w-4 text-blue-600' />
                    <h3 className='font-semibold text-gray-900'>
                      {office.city} {office.isHeadquarters && '(Headquarters)'}
                    </h3>
                  </div>
                  <p className='text-gray-600 text-sm mb-2'>
                    {office.address}
                    <br />
                    {office.postal}
                    <br />
                    <span className='text-blue-600 font-medium'>
                      {office.phone}
                    </span>
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          office.address + ', ' + office.postal
                        )}`,
                        '_blank'
                      )
                    }
                  >
                    <ExternalLink className='h-3 w-3 mr-1' />
                    View on Maps
                  </Button>
                  <Button
                    size='sm'
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          office.address + ', ' + office.postal
                        )}`,
                        '_blank'
                      )
                    }
                  >
                    <MapPin className='h-3 w-3 mr-1' />
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // If API key is missing or there's an error, show fallback
  if (!apiKeyValid || mapError) {
    return <StaticMapFallback />
  }

  return (
    <div className={className} style={{ height }}>
      <div onError={() => setMapError(true)} className='h-full'>
        <EmbeddedGoogleMap
          addresses={addresses}
          height={height}
          className='w-full h-full'
        />
      </div>
    </div>
  )
}
