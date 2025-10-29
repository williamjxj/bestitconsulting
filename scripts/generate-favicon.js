#!/usr/bin/env node

/**
 * Script to generate favicon.ico from the SVG favicon
 * This script uses sharp to convert the SVG to ICO format
 */

const fs = require('fs')
const path = require('path')

// Check if sharp is available
let sharp
try {
  sharp = require('sharp')
} catch (error) {
  console.log('Sharp not found. Installing...')
  const { execSync } = require('child_process')
  execSync('npm install sharp --save-dev', { stdio: 'inherit' })
  sharp = require('sharp')
}

async function generateFavicon() {
  try {
    const svgPath = path.join(__dirname, '../public/favicon.svg')
    const icoPath = path.join(__dirname, '../public/favicon.ico')

    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath)

    // Convert SVG to PNG first (32x32)
    const pngBuffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer()

    // Convert PNG to ICO
    await sharp(pngBuffer).resize(32, 32).png().toFile(icoPath)

    console.log('✅ Favicon.ico generated successfully!')
    console.log('📁 Location:', icoPath)
  } catch (error) {
    console.error('❌ Error generating favicon:', error.message)
    console.log('\n💡 Alternative: You can use an online converter like:')
    console.log('   https://convertio.co/svg-ico/')
    console.log('   Upload favicon.svg and download as favicon.ico')
  }
}

generateFavicon()
