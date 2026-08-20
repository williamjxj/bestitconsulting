# Open Graph Images

This directory contains Open Graph images for social media sharing.

## Image Specifications

- **Dimensions:** 1200×630px (1.91:1 aspect ratio)
- **Format:** PNG or JPEG (PNG preferred for logos/text)
- **File Size:** Target <200KB for fast loading
- **Safe Zone:** Keep important content in center 1200×600px (some platforms crop edges)

## Required Images

- [x] `default.png` - Default branded fallback for all pages
- [x] `home.png` - Home page custom image
- [x] `about.png` - About page custom image
- [x] `services.png` - Services page custom image
- [x] `portfolio.png` - Portfolio page custom image
- [x] `contact.png` - Contact page custom image
- [x] `case-studies.png` - Case studies page custom image
- [x] `testimonials.png` - Testimonials page custom image
- [x] `faq.png` - FAQ page custom image

## Design Guidelines

1. Include Best IT Consulting logo
2. Use company brand colors
3. Large, high-contrast text (readable on mobile)
4. Professional gradient or solid background
5. Avoid clutter - keep it simple and bold

## Tools

- Figma, Canva, or Adobe Photoshop for design
- TinyPNG or ImageOptim for optimization

## Usage

Images are automatically mapped in `lib/seo-utils.ts` via the `getOGImage()` function.
