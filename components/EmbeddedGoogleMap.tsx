'use client'

interface EmbeddedMapProps {
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

export default function EmbeddedGoogleMap({
  addresses,
  height = '400px',
  className = '',
}: EmbeddedMapProps) {
  // Get the headquarters address for the main map
  const headquarters =
    addresses.find(addr => addr.isHeadquarters) || addresses[0]
  const mapQuery = encodeURIComponent(
    `${headquarters.address}, ${headquarters.postal}`
  )

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=${mapQuery}&zoom=10`}
        width='100%'
        height='100%'
        style={{ border: 0 }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        className='rounded-xl'
        title='Best IT Consulting Office Locations'
      />

      {/* Overlay with office locations */}
      <div className='absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs'>
        <h4 className='font-semibold text-gray-900 text-sm mb-2'>
          Our Offices
        </h4>
        <div className='space-y-2'>
          {addresses.map((office, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className={`w-2 h-2 rounded-full ${
                  office.isHeadquarters ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
              <span className='text-xs text-gray-600'>{office.city}</span>
              {office.isHeadquarters && (
                <span className='text-xs bg-green-100 text-green-700 px-1 rounded'>
                  HQ
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
