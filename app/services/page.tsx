'use client'
import { CldImage } from 'next-cloudinary'
import Layout from '@/components/Layout'

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  return (
    <Layout>
      <CldImage
        src='cld-sample-5' // Use this sample image or upload your own via the Media Explorer
        alt='A sample image from Cloudinary'
        className='rounded-lg'
        width='500' // Transform the image: auto-crop to square aspect_ratio
        height='500'
        crop={{
          type: 'auto',
          source: true,
        }}
      />
    </Layout>
  )
}
