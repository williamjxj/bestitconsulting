# Open Graph Images - Complete Guide

**Purpose:** Create custom social media preview images for Best IT Consulting  
**Target:** 8 images at 1200×630px  
**Impact:** +20-30% social media click-through rate

---

## Table of Contents

1. [What Are OG Images?](#what-are-og-images)
2. [Technical Requirements](#technical-requirements)
3. [Method Comparison](#method-comparison)
4. [Recommended Approach](#recommended-approach)
5. [Method 1: Canva (Easiest & Recommended)](#method-1-canva-easiest--recommended)
6. [Method 2: Figma (Professional)](#method-2-figma-professional)
7. [Method 3: Screenshots (Quick but Not Ideal)](#method-3-screenshots-quick-but-not-ideal)
8. [Method 4: SVG/Code (Advanced)](#method-4-svgcode-advanced)
9. [Design Guidelines](#design-guidelines)
10. [Integration Steps](#integration-steps)
11. [Testing & Validation](#testing--validation)

---

## What Are OG Images?

Open Graph (OG) images are preview images that appear when your website is shared on social media platforms like:

- **Facebook** - Shows in news feed when link shared
- **LinkedIn** - Appears in post previews
- **Twitter** - Displays as Twitter Card
- **Slack** - Shows in link previews
- **WhatsApp** - Appears when link shared

**Example:**
```
When someone shares: https://bestitconsulting.ca/services
Social media shows: Custom "Services" image with branding
Without custom image: Generic website screenshot or blank
```

---

## Technical Requirements

### Mandatory Specifications

| Specification | Requirement | Why |
|--------------|-------------|-----|
| **Dimensions** | 1200×630px | Facebook/LinkedIn standard (1.91:1 ratio) |
| **File Size** | <200KB | Fast loading, platform limits |
| **Format** | PNG or JPEG | Universal support, PNG preferred for text |
| **Color Mode** | RGB | Web standard |
| **Resolution** | 72 DPI | Web standard (higher unnecessary) |

### Safe Zone

**Important:** Some platforms crop edges differently!

- **Full Canvas:** 1200×630px
- **Safe Zone:** 1200×600px (center area)
- **Keep Important Content:** Within center 1200×600px
- **Avoid Edges:** Don't put text/logo in outer 15px on top/bottom

### Platform-Specific Display

| Platform | Display Size | Notes |
|----------|--------------|-------|
| Facebook | ~1200×630 | Full size in news feed |
| LinkedIn | ~1200×627 | Very similar to Facebook |
| Twitter | ~1200×628 | Summary large image card |
| Slack | ~360×189 | Thumbnail, scales down |
| WhatsApp | Variable | Mobile display |

---

## Method Comparison

### Quick Comparison Table

| Method | Difficulty | Quality | Time | Cost | Best For |
|--------|-----------|---------|------|------|----------|
| **Canva** | ⭐ Easy | ⭐⭐⭐⭐ High | 1-2 hrs | Free-$13/mo | **RECOMMENDED** - Non-designers |
| **Figma** | ⭐⭐ Medium | ⭐⭐⭐⭐⭐ Pro | 2-4 hrs | Free-$15/mo | Designers, team collaboration |
| **Screenshots** | ⭐ Easy | ⭐⭐ Low | 30 min | Free | Quick placeholder only |
| **SVG/Code** | ⭐⭐⭐⭐ Hard | ⭐⭐⭐⭐ High | 4-8 hrs | Free | Developers, dynamic content |

### Detailed Comparison

#### ✅ Canva - **RECOMMENDED FOR YOU**

**Pros:**
- ✅ Super easy, drag-and-drop interface
- ✅ 1000+ templates specifically for OG images
- ✅ Built-in 1200×630px preset
- ✅ Brand colors, fonts, logo upload
- ✅ Export optimization built-in
- ✅ Professional results without design skills
- ✅ Free tier available

**Cons:**
- ⚠️ Some premium elements require subscription ($12.99/mo)
- ⚠️ Can look "template-y" if not customized

**Best For:** You! Non-designers who want professional results quickly

---

#### ✅ Figma

**Pros:**
- ✅ Professional-grade tool
- ✅ Complete design control
- ✅ Team collaboration features
- ✅ Reusable components
- ✅ Version history
- ✅ Free tier available

**Cons:**
- ⚠️ Steeper learning curve
- ⚠️ More time investment
- ⚠️ Overkill for simple images

**Best For:** Professional designers, teams, reusable design systems

---

#### ⚠️ Screenshots - NOT RECOMMENDED

**Pros:**
- ✅ Extremely fast (5 min/image)
- ✅ Shows actual website content
- ✅ Zero design work needed

**Cons:**
- ❌ Low quality, unprofessional look
- ❌ Generic, not eye-catching
- ❌ Text often too small to read
- ❌ No branding emphasis
- ❌ Doesn't stand out in social feeds
- ❌ Poor mobile display

**Best For:** Temporary placeholders only, not production

---

#### 🔧 SVG/Code - ADVANCED

**Pros:**
- ✅ Fully automated
- ✅ Dynamic content possible
- ✅ Perfect quality
- ✅ Easy bulk updates

**Cons:**
- ❌ Complex setup (React, Next.js API routes, Satori/Vercel OG)
- ❌ Long development time (4-8 hours)
- ❌ Requires coding skills
- ❌ Overkill for 8 static images
- ❌ Harder to customize visually

**Best For:** Large sites with 100+ dynamic pages, developer-heavy teams

---

## Recommended Approach

### For Best IT Consulting: **Use Canva** ⭐

**Why Canva is best for you:**

1. **Quick Results** - Create all 8 images in 1-2 hours
2. **Professional Quality** - Templates designed by pros
3. **No Design Skills Needed** - Drag and drop interface
4. **Brand Consistency** - Upload logo once, use everywhere
5. **Cost Effective** - Free tier sufficient, Pro optional
6. **Easy Iterations** - Quick to make changes

**Time Investment:**
- Setup: 15 minutes (account, upload logo/colors)
- Per Image: 10-15 minutes
- **Total:** 1.5-2 hours for all 8 images

**Cost:**
- Free tier: Sufficient for basic needs
- Pro tier ($12.99/mo): Access to premium templates/photos
- **Recommendation:** Start free, upgrade if needed

---

## Method 1: Canva (Easiest & Recommended)

### Step-by-Step Guide

#### Setup (One-Time, 15 minutes)

1. **Create Free Account**
   - Go to: https://www.canva.com
   - Sign up with email or Google
   - Select "For myself" → "Small business"

2. **Upload Brand Assets**
   - Click "Brand Kit" (left sidebar)
   - **Upload Logo:** Your `public/logo.png` or `public/b22f-logo.webp`
   - **Add Brand Colors:**
     - Primary Blue: `#2563eb` (blue-600)
     - Secondary Indigo: `#4f46e5` (indigo-600)
     - Dark Gray: `#1f2937` (gray-800)
     - Light Gray: `#f3f4f6` (gray-100)
   - **Add Fonts:** (if Pro)
     - Primary: Inter or similar
     - Heading: Geist Sans or similar

3. **Create Custom Dimensions**
   - Click "Create a design"
   - Click "Custom size"
   - Enter: **1200 × 630 px**
   - Click "Create new design"

#### Creating Each Image (10-15 min each)

**Template Approach (Easier):**

1. **Find Template**
   - Search: "Facebook post" or "social media banner"
   - Filter: 1200×630px size
   - Look for: Professional, tech-focused templates
   - Categories to try:
     - "Technology"
     - "Business"
     - "Professional Services"

2. **Customize Template**
   - Replace text with your content
   - Change colors to your brand colors
   - Add your logo
   - Adjust layout as needed

3. **Export**
   - Click "Share" → "Download"
   - Format: PNG (for text clarity) or JPG (smaller file)
   - Quality: Standard (200KB limit)
   - Download and rename

**From-Scratch Approach (More Control):**

1. **Background**
   - Add gradient: Blue (#2563eb) to Indigo (#4f46e5)
   - Or: Use solid color + subtle pattern
   - Or: Upload company photos/office images

2. **Add Logo**
   - Drag logo from "Uploads"
   - Position: Top-left or center
   - Size: 150-200px width

3. **Add Text**
   - Main Headline: 48-72pt, Bold, White
   - Subheadline: 24-36pt, Regular, White/Light
   - Keep text in safe zone (center)

4. **Add Visual Elements**
   - Icons (from Canva library)
   - Shapes/lines for structure
   - Photos (if relevant)

5. **Polish**
   - Check alignment (use guides)
   - Ensure contrast (text readable)
   - Add drop shadow if needed

6. **Export** (same as template approach)

#### Image-Specific Content

**1. default.png** (Branded Fallback)
```
Headline: "Best IT Consulting"
Subline: "Modern Web Solutions & Digital Transformation"
Visual: Logo + gradient background
Style: Simple, clean, professional
```

**2. home.png**
```
Headline: "Transform Your Business"
Subline: "With Modern Technology Solutions"
Visual: Hero imagery, tech icons, or abstract shapes
CTA: "Get Started" badge
```

**3. about.png**
```
Headline: "Expert IT Consultants"
Subline: "20+ Years Experience | 50+ Projects Delivered"
Visual: Team photo, office, or professional headshots
Trust elements: Badges, certifications
```

**4. services.png**
```
Headline: "Comprehensive IT Services"
Subline: "Web Development • Cloud • DevOps • AI Integration"
Visual: Service icons in grid/circle layout
Style: Professional, organized
```

**5. portfolio.png**
```
Headline: "Our Work"
Subline: "Success Stories & Case Studies"
Visual: Project screenshots montage or device mockups
Style: Showcase, visual-heavy
```

**6. contact.png**
```
Headline: "Get Your Free Consultation"
Subline: "We Respond Within 24 Hours"
Visual: Contact imagery, calendar, or CTA visual
CTA: "Contact Us" prominent
```

**7. case-studies.png**
```
Headline: "Client Success Stories"
Subline: "Real Results, Real Impact"
Visual: Before/after, metrics, testimonial quote
Style: Results-focused, data visualization
```

**8. testimonials.png**
```
Headline: "What Our Clients Say"
Subline: "★★★★★ 98% Satisfaction Rate"
Visual: Quote bubble, client logos, star ratings
Style: Social proof, trust-building
```

#### Pro Tips for Canva

**Text Best Practices:**
- Use max 2-3 fonts (consistency)
- High contrast (white text on dark, dark text on light)
- Large sizes (48-72pt headlines readable on mobile)
- Short phrases (3-7 words max per line)

**Visual Hierarchy:**
- Logo: Small, top corner
- Headline: Largest, center/upper-third
- Subline: Medium, below headline
- CTA: Small badge/button, lower area

**Color Strategy:**
- Use brand colors consistently
- Add contrast (light on dark or vice versa)
- Test readability on mobile preview

**File Optimization:**
- Export as PNG for text-heavy images
- Export as JPG for photo-heavy images
- If >200KB, reduce quality slightly or use JPG

---

## Method 2: Figma (Professional)

### When to Use Figma

Choose Figma if:
- You have design experience
- You need team collaboration
- You want a reusable design system
- You're creating many variations

### Quick Setup

1. **Create Account:** https://figma.com (free tier)
2. **New File:** File → New design file
3. **Set Frame:** Press F, enter 1200×630px
4. **Design:** Use tools (rectangle, text, image, etc.)
5. **Export:** Select frame → Export → PNG/JPG

### Figma Advantages

- **Components:** Create reusable elements
- **Auto Layout:** Responsive design
- **Plugins:** Icons, images, compression
- **Collaboration:** Real-time team editing
- **Version History:** Track all changes

### Export Settings

```
Format: PNG or JPG
Scale: 1x (1200×630px)
Quality: 80-90% (for JPG)
Optimize: Use TinyPNG plugin
```

---

## Method 3: Screenshots (Quick but Not Ideal)

### When Screenshots Make Sense

**Only use for:**
- ⚠️ Temporary placeholders
- ⚠️ Quick testing before designing real images
- ⚠️ Internal staging environments

**DO NOT use for:**
- ❌ Production/live site
- ❌ Marketing campaigns
- ❌ Professional brand image

### How to Take Better Screenshots (If You Must)

1. **Prepare Page**
   - Remove scroll bars (hide overflow)
   - Zoom to 100%
   - Clear browser toolbars (F11 fullscreen)

2. **Take Screenshot**
   - Mac: Cmd+Shift+4 (select area)
   - Windows: Snipping Tool or Win+Shift+S
   - Browser: DevTools → Device toolbar → Screenshot

3. **Crop & Resize**
   - Open in Preview/Photoshop/Photopea
   - Crop to focus area
   - Resize to 1200×630px
   - Export as PNG/JPG <200KB

4. **Enhance (Optional)**
   - Add company logo overlay
   - Add text headline overlay
   - Apply slight blur to background, sharpen foreground
   - Add border/frame

**Result:** Better than nothing, but still unprofessional

---

## Method 4: SVG/Code (Advanced)

### When Code Makes Sense

**Use programmatic generation for:**
- ✅ 100+ dynamic pages (blog, products, etc.)
- ✅ Automated content updates
- ✅ User-generated content pages
- ✅ Real-time data display

**DON'T use for:**
- ❌ 8 static pages (overkill)
- ❌ Simple designs (faster with Canva)
- ❌ Non-technical teams

### Technology Options

#### Option A: Vercel OG (Next.js)

**Best for:** Next.js apps (like yours)

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
      }}>
        <h1 style={{ fontSize: 72, color: 'white' }}>
          Best IT Consulting
        </h1>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

**Pros:** Native Next.js, edge rendering, dynamic  
**Cons:** Complex setup, limited styling

#### Option B: Satori + Sharp

**Best for:** Full control, custom rendering

```bash
npm install satori sharp
```

**Pros:** Complete control, any design possible  
**Cons:** Most complex, requires build pipeline

#### Option C: Puppeteer

**Best for:** Screenshot automation

**Pros:** Renders actual HTML/CSS  
**Cons:** Slow, resource-heavy, deployment complexity

### Recommendation

**For 8 static images:** Don't use code! Use Canva.  
**For 100+ dynamic pages:** Consider Vercel OG later.

---

## Design Guidelines

### Visual Best Practices

#### Text Readability
- **Minimum Font Size:** 24pt (smaller unreadable on mobile)
- **Headline Size:** 48-72pt
- **Line Length:** 40-60 characters max
- **Contrast Ratio:** 4.5:1 minimum (use WebAIM contrast checker)

#### Brand Consistency
- **Logo:** Always include, consistent placement
- **Colors:** Stick to brand palette (2-3 colors max)
- **Fonts:** Match website typography
- **Style:** Consistent across all 8 images

#### Composition
- **Rule of Thirds:** Place key elements at intersection points
- **Focal Point:** One clear focus per image
- **White Space:** Don't overcrowd (60% content, 40% space)
- **Balance:** Distribute visual weight evenly

### Examples of Good OG Images

**Strong Examples:**
- Stripe: Simple gradient + clear headline + logo
- GitHub: Iconic logo + repo name + stats
- Medium: Article title + author + featured image
- Shopify: Product + bold headline + brand colors

**Common Mistakes to Avoid:**
- ❌ Too much text (keep it 5-10 words max)
- ❌ Tiny fonts (unreadable on mobile)
- ❌ Cluttered design (too many elements)
- ❌ Poor contrast (can't read text)
- ❌ Logo too large (should be secondary)
- ❌ Generic stock photos (use custom imagery)

---

## Integration Steps

### After Creating Images

1. **Optimize File Size**
   - Use TinyPNG: https://tinypng.com
   - Target: <200KB per image
   - Format: PNG for text, JPG for photos

2. **Rename & Organize**
   ```
   public/og-images/
   ├── default.png
   ├── home.png
   ├── about.png
   ├── services.png
   ├── portfolio.png
   ├── contact.png
   ├── case-studies.png
   └── testimonials.png
   ```

3. **Replace Placeholders**
   - Delete `public/og-images/default.png.txt`
   - Upload your designed images
   - Verify file names match exactly

4. **Test Build**
   ```bash
   npm run build
   ```

5. **Verify Metadata**
   - Check each page's `layout.tsx`
   - Ensure paths match: `/og-images/[page].png`
   - No changes needed if names match

### File Checklist

Before going live:

- [ ] All 8 images created and optimized
- [ ] All files <200KB
- [ ] All files 1200×630px exactly
- [ ] Files named correctly (match code)
- [ ] Files in correct directory (`public/og-images/`)
- [ ] Build succeeds with no errors
- [ ] Images display in local preview

---

## Testing & Validation

### Local Testing

1. **Build Site**
   ```bash
   npm run build
   npm run start
   ```

2. **View Page Source**
   - Visit: http://localhost:3000
   - Right-click → "View Page Source"
   - Search for: `og:image`
   - Verify: Full URL to image

3. **Check File Access**
   - Visit: http://localhost:3000/og-images/home.png
   - Should display image directly
   - If 404: Check file path

### External Validation Tools

#### 1. Facebook Sharing Debugger
- **URL:** https://developers.facebook.com/tools/debug/
- **Steps:**
  1. Enter your page URL
  2. Click "Debug"
  3. Check "Preview" section
  4. If not showing: Click "Scrape Again"
- **What to Check:**
  - Image displays correctly
  - Title and description match
  - No errors/warnings

#### 2. Twitter Card Validator
- **URL:** https://cards-dev.twitter.com/validator
- **Steps:**
  1. Enter your page URL
  2. Click "Preview card"
  3. Check display
- **What to Check:**
  - Card type: summary_large_image
  - Image displays full size
  - Text readable

#### 3. LinkedIn Post Inspector
- **URL:** https://www.linkedin.com/post-inspector/
- **Steps:**
  1. Enter your page URL
  2. Click "Inspect"
  3. Review preview
- **What to Check:**
  - Image displays correctly
  - Professional appearance
  - No cropping issues

#### 4. OpenGraph.xyz
- **URL:** https://www.opengraph.xyz/
- **What it does:** Shows how your OG image looks on multiple platforms
- **Benefit:** See FB, Twitter, LinkedIn previews at once

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Image not showing | Path incorrect | Check file name matches code |
| Old image cached | Platform cache | Use sharing debugger to re-scrape |
| Image too large | >200KB | Compress with TinyPNG |
| Image cropped | Wrong dimensions | Verify 1200×630px exactly |
| Image blurry | Low quality/upscaled | Design at 1200×630, don't upscale |
| Text unreadable | Too small/low contrast | Increase font size, improve contrast |

---

## Quick Start Checklist

### For You: Canva Method

**Time:** 1.5-2 hours total

- [ ] **Setup (15 min)**
  - [ ] Create Canva account (free)
  - [ ] Upload Best IT Consulting logo
  - [ ] Add brand colors (#2563eb, #4f46e5)
  - [ ] Set custom size: 1200×630px

- [ ] **Create Images (10-15 min each)**
  - [ ] default.png - Branded fallback
  - [ ] home.png - Hero message
  - [ ] about.png - Team/expertise
  - [ ] services.png - Service offerings
  - [ ] portfolio.png - Work showcase
  - [ ] contact.png - CTA
  - [ ] case-studies.png - Success stories
  - [ ] testimonials.png - Social proof

- [ ] **Optimize (15 min)**
  - [ ] Download all as PNG
  - [ ] Run through TinyPNG
  - [ ] Verify all <200KB
  - [ ] Verify all 1200×630px

- [ ] **Integration (5 min)**
  - [ ] Upload to `public/og-images/`
  - [ ] Delete placeholder files
  - [ ] Test build

- [ ] **Validation (15 min)**
  - [ ] Test locally
  - [ ] Deploy to staging/production
  - [ ] Test with Facebook Debugger
  - [ ] Test with Twitter Validator

**Total Time:** ~2 hours  
**Cost:** Free (or $12.99 for Pro features)

---

## Resources & Tools

### Design Tools
- **Canva:** https://canva.com (recommended)
- **Figma:** https://figma.com (pro option)
- **Photopea:** https://photopea.com (free Photoshop alternative)
- **Pixlr:** https://pixlr.com (simple editor)

### Optimization
- **TinyPNG:** https://tinypng.com (compress images)
- **Squoosh:** https://squoosh.app (Google's compressor)
- **ImageOptim:** https://imageoptim.com (Mac app)

### Testing
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Inspector:** https://www.linkedin.com/post-inspector/
- **OpenGraph.xyz:** https://www.opengraph.xyz/ (multi-platform preview)

### Inspiration
- **OG Image Gallery:** https://ogimage.gallery
- **Screely:** https://screely.com (device mockups)
- **Landingfolio:** https://landingfolio.com (design examples)

### Learning
- **Canva Tutorials:** https://www.canva.com/learn/
- **OG Spec:** https://ogp.me (technical reference)
- **Facebook Best Practices:** https://developers.facebook.com/docs/sharing/webmasters/images

---

## Next Steps

1. **Choose Your Method**
   - **Recommended:** Canva (fastest, easiest, professional)
   - **Alternative:** Figma (if you have design skills)

2. **Set Aside Time**
   - Block 2 hours
   - Fewer interruptions = better consistency

3. **Follow Checklist**
   - Use the Quick Start Checklist above
   - Check off items as you complete

4. **Get Feedback**
   - Show to colleagues before deploying
   - Test on multiple devices (desktop, mobile)

5. **Deploy & Monitor**
   - Upload images
   - Test with validation tools
   - Monitor social media engagement

---

## Questions?

**Need help?**
- Review `public/og-images/README.md` for specs
- Check `specs/006-improve-seo/SEO_CHECKLIST.md` for validation
- Refer back to this guide for step-by-step instructions

**Ready to start?**
- Open Canva → Create account → Start with `default.png`
- Follow the "Creating Each Image" section above
- You've got this! 🚀

---

**Last Updated:** 2026-01-23  
**For:** Best IT Consulting SEO Implementation  
**Difficulty:** Easy (Canva) to Advanced (Code)  
**Recommended:** Canva method (1.5-2 hours total)
