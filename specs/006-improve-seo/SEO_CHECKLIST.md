# SEO Testing Checklist

Use this checklist when adding new pages or updating existing pages to ensure complete SEO coverage.

---

## ✅ Pre-Deployment Checklist

### Page Metadata

- [ ] Unique page title (10-60 characters)
  - [ ] Includes target keyword naturally
  - [ ] Compelling and descriptive
  - [ ] Uses template: "Page Title | Best IT Consulting"

- [ ] Unique meta description (50-160 characters)
  - [ ] Summarizes page content accurately
  - [ ] Includes call-to-action
  - [ ] Contains target keywords naturally
  - [ ] Compelling for click-through

- [ ] Canonical URL configured
  - [ ] Points to preferred URL version
  - [ ] Absolute URL format
  - [ ] No trailing slash inconsistencies

- [ ] Open Graph metadata
  - [ ] og:title set (can differ from page title)
  - [ ] og:description set
  - [ ] og:image configured (1200x630px)
  - [ ] og:type set appropriately (website/article)
  - [ ] og:url matches canonical

- [ ] Twitter Card metadata
  - [ ] twitter:card set to 'summary_large_image'
  - [ ] twitter:site set to @bestitconsulting
  - [ ] Image displays correctly

- [ ] hreflang tags
  - [ ] x-default configured (English)
  - [ ] Additional languages added if translated

---

### Structured Data (if applicable)

- [ ] Appropriate schema.org type selected
  - [ ] Organization (site-wide) - Already in root layout
  - [ ] Service (for service pages)
  - [ ] Review (for testimonials)
  - [ ] Article (for blog posts)
  - [ ] FAQPage (for FAQ sections)

- [ ] Required fields populated
  - [ ] @context: "https://schema.org"
  - [ ] @type: Appropriate type
  - [ ] All required properties per schema type

- [ ] Validated with Google Rich Results Test
  - [ ] No errors
  - [ ] No warnings (or acceptable warnings documented)
  - [ ] Preview shows expected rich result

---

### Content Optimization

- [ ] Heading hierarchy optimized
  - [ ] Single H1 per page (main topic)
  - [ ] H2s for major sections
  - [ ] H3s for subsections
  - [ ] Logical hierarchy (no skipping levels)
  - [ ] Keywords in headings where natural

- [ ] Image optimization
  - [ ] All images have descriptive alt attributes
  - [ ] Alt text includes keywords where natural
  - [ ] Alt text describes image content accurately
  - [ ] No "image of" or "picture of" prefix
  - [ ] Empty alt="" for decorative images only

- [ ] Semantic HTML5
  - [ ] `<header>` for page header
  - [ ] `<nav>` for navigation
  - [ ] `<main>` for main content
  - [ ] `<article>` for self-contained content
  - [ ] `<section>` for thematic grouping
  - [ ] `<aside>` for sidebar content
  - [ ] `<footer>` for page footer

- [ ] Internal linking
  - [ ] Links to related pages (where appropriate)
  - [ ] Descriptive anchor text (avoid "click here")
  - [ ] Links to higher-priority pages
  - [ ] No broken links

- [ ] Content quality
  - [ ] Minimum 300 words for substantial pages
  - [ ] Clear, valuable content for users
  - [ ] Keywords used naturally (no stuffing)
  - [ ] Proper grammar and spelling

---

### Performance & Mobile

- [ ] Core Web Vitals
  - [ ] LCP (Largest Contentful Paint) <2.5s
  - [ ] FID (First Input Delay) <100ms
  - [ ] CLS (Cumulative Layout Shift) <0.1

- [ ] Mobile optimization
  - [ ] Viewport meta tag configured
  - [ ] Responsive design (all breakpoints)
  - [ ] Touch targets ≥48×48px
  - [ ] No horizontal scrolling
  - [ ] Fast loading on 3G networks

- [ ] Page speed
  - [ ] Images optimized (WebP format, lazy loading)
  - [ ] Minimal JavaScript on critical path
  - [ ] CSS inlined or minimized
  - [ ] No render-blocking resources

---

### Technical SEO

- [ ] URL structure
  - [ ] Clean, descriptive URLs
  - [ ] Lowercase letters
  - [ ] Hyphens for word separation (not underscores)
  - [ ] No unnecessary parameters
  - [ ] HTTPS enabled

- [ ] Sitemap
  - [ ] Page included in sitemap.xml
  - [ ] Proper lastmod timestamp
  - [ ] Appropriate changefreq
  - [ ] Priority set (0.0-1.0)

- [ ] Robots directives
  - [ ] Index: true (unless private page)
  - [ ] Follow: true
  - [ ] No accidental noindex

- [ ] Security
  - [ ] HTTPS everywhere
  - [ ] No mixed content warnings
  - [ ] Secure external links (rel="noopener")
  - [ ] No sensitive data in metadata

---

## 🧪 Testing Procedures

### Local Testing (Development)

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm run start
   ```

3. **View page source** (Right-click → View Page Source):
   - Verify `<title>` tag
   - Verify `<meta name="description">`
   - Verify `og:*` tags
   - Verify `twitter:*` tags
   - Verify `<link rel="canonical">`
   - Verify JSON-LD `<script type="application/ld+json">`

4. **Check sitemap:**
   - Visit `http://localhost:3000/sitemap.xml`
   - Verify page is listed
   - Check lastmod timestamp

5. **Check robots.txt:**
   - Visit `http://localhost:3000/robots.txt`
   - Verify environment-appropriate rules

---

### External Tool Testing

**1. Lighthouse SEO Audit:**
```bash
lighthouse http://localhost:3000/your-page --only-categories=seo --view
```
- Target score: >95
- Check for issues/warnings

**2. Google Rich Results Test:**
- URL: https://search.google.com/test/rich-results
- Test URL or paste HTML
- Verify no errors
- Check preview display

**3. Facebook Sharing Debugger:**
- URL: https://developers.facebook.com/tools/debug/
- Enter page URL
- Verify OG image displays
- Check title and description

**4. Twitter Card Validator:**
- URL: https://cards-dev.twitter.com/validator
- Enter page URL
- Verify card preview
- Check image and text

**5. Mobile-Friendly Test:**
- URL: https://search.google.com/test/mobile-friendly
- Test page URL
- Verify passes

**6. Schema.org Validator:**
- URL: https://validator.schema.org/
- Paste JSON-LD
- Verify no errors

---

## 📋 Post-Deploy Checklist

After deploying to production:

- [ ] Submit sitemap to Google Search Console
  - [ ] URL: https://search.google.com/search-console
  - [ ] Add property if not already added
  - [ ] Submit sitemap.xml
  - [ ] Monitor indexing status

- [ ] Verify production environment
  - [ ] robots.txt allows crawling (production rules)
  - [ ] Sitemap accessible publicly
  - [ ] All metadata renders correctly
  - [ ] HTTPS working properly
  - [ ] No mixed content warnings

- [ ] Monitor initial indexing (48-72 hours)
  - [ ] Check Google Search Console coverage report
  - [ ] Verify pages being indexed
  - [ ] Check for errors or warnings
  - [ ] Monitor rich results appearance

- [ ] Performance validation
  - [ ] Run Lighthouse on production URL
  - [ ] Verify Core Web Vitals
  - [ ] Check PageSpeed Insights

---

## 🔧 Troubleshooting

### Metadata Not Showing

**Issue:** Metadata doesn't appear in view source

**Solutions:**
- Verify layout.tsx exports metadata (not page.tsx for client components)
- Check TypeScript compilation succeeds
- Rebuild the project: `npm run build`
- Clear Next.js cache: `rm -rf .next`

---

### Structured Data Errors

**Issue:** Rich Results Test shows errors

**Solutions:**
- Validate JSON-LD syntax (check for commas, quotes)
- Verify all required fields present per schema type
- Use schema-dts types for type safety
- Test with Schema.org validator

---

### Sitemap Missing Pages

**Issue:** Page not in sitemap.xml

**Solutions:**
- Check next-sitemap.config.js exclusions
- Verify page is not noindex
- For dynamic routes, add to additionalPaths function
- Rebuild: `npm run build`
- Check public/sitemap-0.xml

---

### OG Image Not Displaying

**Issue:** Social media preview doesn't show image

**Solutions:**
- Verify image exists at specified path
- Check image dimensions (1200x630px)
- Ensure URL is absolute (includes domain)
- Use Facebook Debugger to clear cache
- Verify image is publicly accessible

---

## 📚 Quick Reference

### Adding Metadata to New Page

```typescript
// app/your-page/layout.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = buildPageMetadata(
  'Your Page Title',
  'Your compelling page description that summarizes the content and includes a call-to-action.',
  '/your-page'
);

export default function YourPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

### Adding Structured Data

```typescript
// app/your-page/layout.tsx
import { createServiceSchema, structuredDataScript } from '@/lib/structured-data';

const yourSchema = createServiceSchema({
  name: 'Your Service',
  description: 'Service description',
  serviceType: 'Service Type',
  provider: 'Best IT Consulting',
  areaServed: 'Canada',
});

export default function YourPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(yourSchema),
        }}
      />
      {children}
    </>
  );
}
```

---

## 📞 Support

For questions about SEO implementation:
- Review `/specs/006-improve-seo/research.md` for technical decisions
- Check `/specs/006-improve-seo/quickstart.md` for setup guide
- See `/specs/006-improve-seo/IMPLEMENTATION_STATUS.md` for current status

---

**Last Updated:** 2026-01-23  
**Version:** 1.0.0  
**Maintained By:** Best IT Consulting Development Team
