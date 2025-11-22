<div align="center">
  <img src="./public/logo.png" alt="Best IT Consulting Logo" width="600"/>
</div>

# Best IT Consulting - Professional IT Services & Software Development

**Live Website:** [https://www.bestitconsulting.ca/](https://www.bestitconsulting.ca/)

A modern, professional website showcasing IT consulting services, software development capabilities, and portfolio of successful projects. Built with Next.js, TypeScript, and Tailwind CSS, featuring multi-language support and a responsive, animated user interface.

---

## 🌐 Website Overview

Best IT Consulting is a Canadian IT consulting firm specializing in full-stack development, cloud solutions, AI integration, and digital transformation services. The website serves as both a marketing platform and a portfolio showcase, demonstrating technical capabilities through live project demonstrations and comprehensive service offerings.

### Key Highlights

- **50+ Projects Delivered** - Proven track record with enterprise clients
- **20+ Years Experience** - Deep expertise in modern software development
- **98% Client Satisfaction** - Commitment to quality and client success
- **24/7 Support** - Round-the-clock assistance for clients
- **Multi-Language Support** - English, French, Spanish, and Chinese

---

## 📸 Website Features & Screenshots

> **Note:** Screenshots of key pages (Homepage, Services, Portfolio, Contact) should be added here to showcase the modern UI and user experience.

### Main Sections

1. **Hero Section** - Animated carousel with compelling value propositions
2. **Services Showcase** - Comprehensive IT services with detailed descriptions
3. **Portfolio/Case Studies** - Live project demonstrations with interactive galleries
4. **Technology Stack** - Modern tech stack visualization
5. **Testimonials** - Client success stories and feedback
6. **Contact Form** - Integrated contact system with Google Maps
7. **About Page** - Company mission, values, and founder information

### Key Features

- ✨ **Modern Animations** - Smooth, performant animations using Framer Motion, GSAP, and Lottie
- 🌍 **Internationalization** - Full i18n support for 4 languages (English, French, Spanish, Chinese)
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ⚡ **Performance Optimized** - Fast loading times with Next.js optimization, code splitting, and lazy loading
- 🎨 **Beautiful UI** - Custom components built with Tailwind CSS and shadcn/ui
- 🔒 **Secure** - Best practices for security and data protection
- 🖼️ **Cloudflare R2 Integration** - Efficient asset storage and delivery
- 📧 **Email Integration** - Contact form with Resend API and automated email responses
- 🗺️ **Google Maps** - Interactive map integration for contact page
- 🎬 **Video Support** - Video playback with poster images and optimized loading
- 🎯 **Accessibility** - WCAG 2.1 AA compliance with keyboard navigation and screen reader support
- 📊 **Analytics Ready** - Structured data and SEO optimization

---

## 💼 For Employers & Software Outsourcing

### Why Choose Best IT Consulting?

We specialize in delivering high-quality software solutions for businesses looking to outsource their development needs. Our approach combines technical excellence with business understanding to deliver solutions that drive real value.

#### Our Expertise

- **Full-Stack Development** - End-to-end web and mobile applications
- **AI Integration & Modernization** - Legacy system upgrades with AI capabilities
- **Cloud Solutions** - Scalable cloud architecture and deployment
- **Team Augmentation** - Expert developers to accelerate your projects
- **Cybersecurity** - Comprehensive security solutions

#### Development Capabilities

**Frontend Technologies:**

- React, Next.js, TypeScript
- Tailwind CSS, shadcn/ui
- Responsive design and mobile optimization
- Modern UI/UX patterns

**Backend Technologies:**

- Node.js, Python, Express, FastAPI
- RESTful and GraphQL APIs
- Database design and optimization
- Microservices architecture

**Cloud & DevOps:**

- AWS, GCP, Azure
- Docker, Kubernetes
- CI/CD pipelines
- Infrastructure as Code

**AI & Machine Learning:**

- LLM integration and RAG systems
- AI agent development
- Computer vision applications
- Data pipeline modernization

#### Our Process

1. **Discovery & Planning** - Understanding your business needs and technical requirements
2. **Architecture Design** - Creating scalable, maintainable system architectures
3. **Agile Development** - Iterative development with regular updates and feedback
4. **Quality Assurance** - Comprehensive testing and code review processes
5. **Deployment & Support** - Smooth deployment and ongoing maintenance

#### Communication & Collaboration

- **Direct Communication** - Transparent, regular updates throughout the project
- **Flexible Scheduling** - Accommodating different time zones and work schedules
- **Professional Environment** - Dedicated workspace with modern development tools
- **NDA Protection** - Your ideas and intellectual property are safe with us

#### Portfolio Highlights

Visit our [Case Studies page](https://www.bestitconsulting.ca/case-studies) to see live examples of our work, including:

- AI-powered applications
- Full-stack web platforms
- E-commerce solutions
- Business management systems
- And more...

### Getting Started

Ready to discuss your project? [Contact us](https://www.bestitconsulting.ca/contact) for a free consultation. We'll discuss your requirements and provide a detailed proposal tailored to your needs.

---

## 🛠️ Technical Stack

### Core Technologies

- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, GSAP, Lottie React
- **Backend:** Supabase
- **Asset Storage:** Cloudflare R2 (via AWS SDK)
- **Email:** Resend
- **Fonts:** Geist Sans & Geist Mono (Next.js fonts)

### Key Libraries & Tools

- **UI Components:** shadcn/ui, Radix UI
- **Form Handling:** Custom animated forms with validation
- **Maps:** Google Maps integration (SmartGoogleMap component)
- **Internationalization:** Custom i18n solution with 4 languages
- **Carousel:** Embla Carousel with autoplay
- **3D Graphics:** Three.js for advanced visualizations
- **QR Codes:** QR code generation for contact information
- **Code Quality:** ESLint, Prettier, TypeScript strict mode, Markdownlint

### Development Tools

- **Package Manager:** npm
- **Version Control:** Git
- **Deployment:** Vercel (recommended)
- **Environment:** Node.js 20+
- **Build Tool:** Next.js built-in bundler with webpack optimizations

---

## 🚀 Getting Started (For Developers)

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd bestitconsulting
```

1. **Install dependencies**

```bash
npm install
```

1. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare R2 Configuration (for asset storage)
NEXT_PUBLIC_R2_BASE_URL=your_r2_base_url
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_ENDPOINT=your_r2_endpoint

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=service@bestitconsulting.ca
BUSINESS_EMAIL=service@bestitconsulting.ca

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Note:** The `.env.local` file is already present in the project root with all required variables. Make sure to update it with your actual credentials.

1. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

```bash
# Development
npm run dev              # Start development server

# Building
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint with auto-fix
npm run format          # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run type-check      # Run TypeScript type checking
npm run lint:md         # Lint markdown files
npm run lint:md:fix     # Fix markdown linting issues
npm run quality         # Run all quality checks (lint, format, type-check, markdown)

# Utilities
npm run setup:email      # Setup email configuration script
npm run generate:favicon # Generate favicon files
```

---

## 📁 Project Structure

```
bestitconsulting/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── case-studies/       # Portfolio/case studies page
│   ├── contact/            # Contact page with form
│   ├── services/           # Services page
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── animations/         # Animation components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── portfolio/          # Portfolio-specific components
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
│   ├── i18n/               # Internationalization
│   ├── animations/         # Animation utilities
│   └── utils.ts            # General utilities
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

---

## 🌍 Internationalization

The website supports multiple languages with a custom i18n solution:

- **English** (en) - Default language
- **French** (fr) - Français
- **Spanish** (es) - Español
- **Chinese** (zh) - 中文

### Features

- **Language Persistence** - Selected language is saved in localStorage
- **Dynamic Translation** - Use `useI18n()` hook for translations
- **Translation Categories** - Organized by page/section (nav, home, services, about, etc.)
- **Language Selector** - Available in the header with flag indicators
- **SEO Support** - Language-specific meta tags and content

Language switching is available through the header language selector. Translations are managed in `lib/i18n/translations/` with separate files for each language.

---

## 🎨 Design System

The project uses a custom design system built on:

- **Tailwind CSS v4** - Utility-first CSS framework with custom configuration
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Headless UI primitives for accessibility
- **Custom Components** - Brand-specific components and animations
- **CSS Variables** - Theme customization with CSS custom properties
- **Responsive Design** - Mobile-first approach with breakpoint system
- **Animation Library** - Custom animation components (FadeIn, SlideIn, ScaleIn, etc.)
- **Magic UI Components** - Pre-built animated components (marquee, animated-beam, etc.)
- **Color System** - Consistent color palette with semantic naming
- **Typography** - Geist font family with variable fonts

---

## 📊 Performance & Optimization

- **Next.js Optimization** - Automatic code splitting, tree shaking, and bundle optimization
- **Image Optimization** - Next.js Image component with Cloudflare R2 CDN
- **Video Optimization** - Lazy loading with poster images and optimized formats
- **Lazy Loading** - Components and assets loaded on demand
- **Animation Performance** - GPU-accelerated animations with reduced motion support
- **Package Optimization** - Optimized imports for Framer Motion, GSAP, Three.js, and Lottie
- **Webpack Configuration** - Custom webpack config for client-side optimizations
- **SEO** - Comprehensive meta tags, structured data, and language-specific SEO
- **Font Optimization** - Next.js font optimization with Geist Sans and Geist Mono
- **R2 Asset Management** - Efficient asset fetching and caching via custom hook

---

## 🔒 Security

- **Environment Variables** - All sensitive data stored in `.env.local` (not committed)
- **Secure API Routes** - Server-side API routes with proper error handling
- **Input Validation** - Email format validation and required field checks
- **HTTPS Enforcement** - Production deployment with HTTPS
- **Supabase Security** - Row-level security policies and service role key protection
- **R2 Access Control** - Secure Cloudflare R2 bucket access with access keys
- **Email Security** - Resend API with verified sender domains
- **XSS Protection** - React's built-in XSS protection
- **CSRF Protection** - Next.js built-in CSRF protection for API routes

---

## 📝 Code Quality

The project maintains high code quality standards:

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting with Next.js, TypeScript, and Prettier rules
- **Prettier** - Consistent code formatting across the project
- **Markdownlint** - Markdown file linting and formatting
- **Type Safety** - Comprehensive TypeScript types and interfaces
- **Code Organization** - Clear separation of concerns (components, hooks, lib, utils)
- **Documentation** - JSDoc comments for exported functions and components
- **Consistent Naming** - kebab-case for files and folders, PascalCase for components

---

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

The project is optimized for Vercel's platform with automatic deployments on push to main branch.

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify** - Similar to Vercel
- **AWS Amplify** - AWS hosting
- **Docker** - Containerized deployment
- **Self-hosted** - Node.js server

---

## 📞 Contact & Support

- **Website:** [https://www.bestitconsulting.ca/](https://www.bestitconsulting.ca/)
- **Email:** [service@bestitconsulting.ca](mailto:service@bestitconsulting.ca)
- **Phone:** +1 (236) 992-3846

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

## 📈 Project Status

**Current Version:** 1.2.9

The project is actively maintained and continuously improved with new features and optimizations.

---

**For business inquiries or project proposals, please visit [https://www.bestitconsulting.ca/contact](https://www.bestitconsulting.ca/contact)**
