'use client'

import { useEffect, useRef } from 'react'

interface GoogleMapProps {
  addresses: Array<{
    city: string
    address: string
    postal: string
    coordinates: string
    isHeadquarters: boolean
    phone: string
  }>
  apiKey: string
  height?: string
  className?: string
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: any
        Marker: any
        InfoWindow: any
        Size: any
        Point: any
      }
    }
    initGoogleMaps?: () => void
  }
}

export default function GoogleMap({
  addresses,
  apiKey,
  height = '400px',
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      // Create callback function
      window.initGoogleMaps = initializeMap

      // Load Google Maps script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMaps&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      // Cleanup function
      return () => {
        const existingScript = document.querySelector(
          `script[src*="maps.googleapis.com"]`
        )
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript)
        }
        if (window.initGoogleMaps) {
          delete window.initGoogleMaps
        }
      }
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      // Center the map on the first office (Surrey HQ)
      const center = addresses.find(addr => addr.isHeadquarters) || addresses[0]
      const [lat, lng] = center.coordinates
        .split(',')
        .map(coord => parseFloat(coord.trim()))

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat, lng },
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ weight: '2.00' }],
          },
          {
            featureType: 'all',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#9c9c9c' }],
          },
          {
            featureType: 'all',
            elementType: 'labels.text',
            stylers: [{ visibility: 'on' }],
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#f2f2f2' }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#eeeeee' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#7b7b7b' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [{ visibility: 'simplified' }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#46bcec' }, { visibility: 'on' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#c8d7d4' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#070707' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }],
          },
        ],
      })

      mapInstanceRef.current = map

      // Add markers for each office
      addresses.forEach(office => {
        const [lat, lng] = office.coordinates
          .split(',')
          .map(coord => parseFloat(coord.trim()))

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: `${office.city} Office`,
          icon: {
            url: office.isHeadquarters
              ? 'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#059669" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="16" r="4" fill="white"/>
                </svg>
              `)
              : 'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="16" r="4" fill="white"/>
                </svg>
              `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16),
          },
        })

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 8px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                ${office.city} Office ${office.isHeadquarters ? '(HQ)' : ''}
              </h3>
              <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 14px; line-height: 1.4;">
                ${office.address}<br>
                ${office.postal}
              </p>
              <p style="margin: 0; color: #3b82f6; font-size: 14px; font-weight: 500;">
                ${office.phone}
              </p>
              <div style="margin-top: 8px;">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address + ', ' + office.postal)}"
                  target="_blank"
                  style="color: #3b82f6; text-decoration: none; font-size: 12px; font-weight: 500;"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          `,
        })

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        // Open info window for headquarters by default
        if (office.isHeadquarters) {
          infoWindow.open(map, marker)
        }
      })
    }

    loadGoogleMaps()
  }, [addresses, apiKey])

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className={`rounded-xl overflow-hidden shadow-lg ${className}`}
    />
  )
}
