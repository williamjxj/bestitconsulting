# Page Backgrounds, Animations & Components

## Overview Table

| Page | Background Images | Animation Components | Other Notable Features |
|---|---|---|---|
| **Home** (`/`) | `home-page/unsplash.avif` (opacity 0.4) | • Carousel (8s auto-rotate)<br>• FadeIn<br>• SlideIn<br>• ScaleIn<br>• AnimatedButton<br>• ButtonHoverEffects | • HeroSection component<br>• Stats cards (4 items)<br>• Trust badge<br>• Carousel navigation (dots + arrows)<br>• CredibilitySection<br>• TechnologyShowcase<br>• TestimonialsSection<br>• DemoVideo component |
| **Contact** (`/contact`) | None (gradient only) | • Text carousel (4s autoplay)<br>• AnimatedForm<br>• AnimatedHeadline | • SmartGoogleMap<br>• Contact form with validation<br>• Office information cards<br>• Benefits banner (4 items)<br>• Business hours display<br>• Social media links |
| **Testimonials** (`/testimonials`) | None (gradient only) | • IconCloudDemo (360px, radius 130px)<br>• Gradient orbs (pulse-slow, float)<br>• ScrollTrigger<br>• FadeIn<br>• SlideIn<br>• AnimatedCounter<br>• AnimatedHeadline | • TestimonialsSection (autoPlay: true, 5s interval)<br>• Stats section (4 items)<br>• Awards & Recognition (3 cards)<br>• Video testimonials grid<br>• R2CardImage components |
| **Portfolio** (`/portfolio`) | None (gradient only) | • Gradient shift animation<br>• Ambient pulse orbs<br>• Float animations<br>• Particle float animations<br>• Wave animation<br>• Glow animations<br>• ScrollTrigger<br>• ScaleIn<br>• AnimatedCounter<br>• AnimatedHeadline | • PortfolioSection<br>• Portfolio gallery (3 images)<br>• Stats section (4 items)<br>• Custom animations from `animations.css`<br>• R2GalleryImage components |
| **Case Studies** (`/case-studies`) | None (gradient only) | • Same gradient animations as Portfolio<br>• **AnimatedBeam** (8 technology nodes):<br>  - Brain, FileCode, Server, BarChart3<br>  - Layers, GitBranch, Settings, Cpu<br>  - All connect to center Target node<br>• ScrollTrigger<br>• FadeIn<br>• SlideIn | • Project cards with image carousels<br>• LocalImageCarousel component<br>• Stats section (4 items)<br>• Project status badges<br>• Technology badges<br>• R2CardImage components |
| **About** (`/about`) | None (gradient only) | • **DisplayCards** (3 stacked cards)<br>• Gradient orbs (pulse-slow, float)<br>• Framer Motion animations<br>• AnimatedHeadline | • Founder section with profile image<br>• Mission & Vision sections<br>• Core Values (4 items)<br>• Work Philosophy section<br>• Stats section (4 items)<br>• R2ProfileImage<br>• R2CardImage components |
| **Services** (`/services`) | None (gradient + black/20 overlay) | • **AnimatedBeam** (4 service nodes):<br>  - Code2, Cloud, Shield, Server<br>  - All connect to center Target node<br>• ScrollTrigger<br>• FadeIn<br>• SlideIn<br>• AnimatedHeadline | • ServicesSection<br>• Process steps (4 steps with icons)<br>• CTA section<br>• Service cards grid |

## Detailed Breakdown

### Home Page (`/`)
- **Background Image**: `home-page/unsplash.avif` at 40% opacity
- **Gradient Background**: `from-slate-900 via-blue-900 to-indigo-900`
- **Carousel**: 4 slides, auto-rotates every 8 seconds
- **Stats**: 4 animated counter cards (Years Experience, Projects Delivered, Expert Team, Client Satisfaction)

### Contact Page (`/contact`)
- **Background**: Gradient only (`from-slate-50 via-blue-50 to-indigo-50`)
- **Hero Carousel**: 3 text slides, 4-second autoplay interval
- **Form**: AnimatedForm with validation
- **Map**: SmartGoogleMap component with office location
- **Benefits**: 4-item banner (Free Consultation, NDA Protection, Expert Team, 24/7 Support)

### Testimonials Page (`/testimonials`)
- **Background**: Gradient only (`from-slate-900 via-blue-900 to-indigo-900`)
- **Icon Cloud**: IconCloudDemo positioned on right side (360px size, 130px radius)
- **Testimonials**: Auto-playing carousel (5-second intervals)
- **Stats**: 4 animated counters (Happy Clients, Average Rating, Satisfaction Rate, Countries Served)
- **Awards**: 3 recognition cards

### Portfolio Page (`/portfolio`)
- **Background**: Gradient with multiple animation layers
- **Animations**:
  - `animate-gradient-shift` (main gradient)
  - `animate-ambient-pulse` (orbs)
  - `animate-float` (floating elements)
  - `animate-particle-float` (particles)
  - `animate-wave` (wave effect)
  - `animate-glow` (glowing accents)
- **Gallery**: 3 portfolio images (E-Commerce, Healthcare, Financial Analytics)

### Case Studies Page (`/case-studies`)
- **Background**: Same gradient animations as Portfolio
- **AnimatedBeam**: 8 technology icon nodes with animated connections to center
- **Projects**: 6 live project cards with image carousels
- **Image Carousels**: Auto-rotate every 4 seconds, pause on hover
- **Projects Include**: Face Fusion Agent, Images Synthesis, AI Images Cart, BidMaster Hub, Cart & Payment, Friendship Daycare

### About Page (`/about`)
- **Background**: Gradient with animated orbs
- **DisplayCards**: 3 stacked animated cards (50+ Projects, 50+ Clients, 10+ Years)
- **Founder Section**: Profile image, bio, expertise, technical specialties
- **Sections**: Mission, Vision, Core Values (4 items), Work Philosophy, Work Values

### Services Page (`/services`)
- **Background**: Gradient with `bg-black/20` overlay
- **AnimatedBeam**: 4 service icon nodes (Code2, Cloud, Shield, Server) connecting to center Target
- **Process Steps**: 4-step process visualization
- **Services Grid**: ServicesSection component with service cards

## Animation Libraries & Tools Used

- **Framer Motion**: Used across multiple pages for animations
- **Custom Animations**: Defined in `animations.css` (Portfolio page)
- **AnimatedBeam**: Custom component for connecting nodes (Services, Case Studies)
- **IconCloudDemo**: Icon cloud visualization (Testimonials)
- **DisplayCards**: Stacked card animation (About)
- **AnimatedForm**: Form with animations (Contact)
- **ScrollTrigger**: Scroll-based animations (multiple pages)
- **AnimatedCounter**: Number counting animations (multiple pages)

## R2 Asset Usage

- **Home**: `home-page/unsplash.avif` (hero background)
- **Testimonials**: `testimonials/hero`, `testimonials/client1`, `testimonials/client2`, `testimonials/success`
- **Portfolio**: `portfolio/hero`, `portfolio/gallery1`, `portfolio/gallery2`, `portfolio/gallery3`
- **Case Studies**: Project-specific image folders (face-fusion-agent, nextjs-supabase-kappa-nine, manus-ai-shop, friendshipdaycare, jimeng-*)
- **About**: `about/hero`, `about/team`, `about/office`, `about/culture`
- **Services**: `services/hero`, `services/team`


## Landing Page

- Navigation / Header with Primary CTA
- Hero Section
- Value Proposition
- Feature Overview / Demo
- Social Proof & Results
- Pricing Section
- Final CTA Section
- 