import { NextRequest, NextResponse } from 'next/server'

/**
 * Placeholder image API endpoint
 * Generates placeholder images with specified dimensions
 * Usage: /api/placeholder/400/300
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  try {
    const [width, height] = params.params

    // Validate dimensions
    const w = parseInt(width) || 400
    const h = parseInt(height) || 300

    // Limit dimensions to prevent abuse
    const maxDimension = 2000
    const validWidth = Math.min(Math.max(w, 1), maxDimension)
    const validHeight = Math.min(Math.max(h, 1), maxDimension)

    // Create SVG placeholder
    const svg = `
      <svg width="${validWidth}" height="${validHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#1e40af" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${validWidth} × ${validHeight}
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Placeholder API error:', error)
    return new NextResponse('Error generating placeholder', { status: 500 })
  }
}
