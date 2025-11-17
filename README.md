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

- ✨ **Modern Animations** - Smooth, performant animations using Framer Motion and GSAP
- 🌍 **Internationalization** - Full i18n support for 4 languages
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ⚡ **Performance Optimized** - Fast loading times with Next.js optimization
- 🎨 **Beautiful UI** - Custom components built with Tailwind CSS and shadcn/ui
- 🔒 **Secure** - Best practices for security and data protection

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
- **Animations:** Framer Motion, GSAP
- **Backend:** Supabase
- **Asset Storage:** Cloudflare R2
- **Email:** Resend

### Key Libraries & Tools

- **UI Components:** shadcn/ui, Radix UI
- **Form Handling:** Custom animated forms
- **Maps:** Google Maps integration
- **Internationalization:** Custom i18n solution
- **Code Quality:** ESLint, Prettier, TypeScript strict mode

### Development Tools

- **Package Manager:** npm
- **Version Control:** Git
- **Deployment:** Vercel (recommended)
- **Environment:** Node.js 20+

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

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare R2 Configuration
NEXT_PUBLIC_R2_BASE_URL=your_r2_base_url
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_ENDPOINT=your_r2_endpoint

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_contact_email

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Run the development server**

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
npm run quality         # Run all quality checks (lint, format, type-check)
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

The website supports multiple languages:

- **English** (en) - Default
- **French** (fr)
- **Spanish** (es)
- **Chinese** (zh)

Language switching is available through the header language selector. Translations are managed in `lib/i18n/translations/`.

---

## 🎨 Design System

The project uses a custom design system built on:

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Custom Components** - Brand-specific components
- **CSS Variables** - Theme customization
- **Responsive Design** - Mobile-first approach

---

## 📊 Performance & Optimization

- **Next.js Optimization** - Automatic code splitting and optimization
- **Image Optimization** - Next.js Image component with Cloudflare R2
- **Lazy Loading** - Components and assets loaded on demand
- **Animation Performance** - Optimized animations with reduced motion support
- **SEO** - Comprehensive meta tags and structured data

---

## 🔒 Security

- Environment variables for sensitive data
- Secure API routes
- Input validation and sanitization
- HTTPS enforcement
- Secure authentication patterns

---

## 📝 Code Quality

The project maintains high code quality standards:

- **TypeScript** - Strict type checking
- **ESLint** - Code linting with Next.js and TypeScript rules
- **Prettier** - Consistent code formatting
- **EditorConfig** - Consistent editor settings
- **Pre-commit Hooks** - Quality checks before commits (recommended)

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
- **Email:** service@bestitconsulting.ca
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
