import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import Layout from '@/components/Layout'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import {
  ExternalLink,
  Github,
  Rocket,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Shield,
  Zap,
} from 'lucide-react'

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      client: 'Online Retail Chain',
      description:
        'A comprehensive e-commerce solution with advanced inventory management, payment processing, and real-time analytics. Built for scalability to handle millions of transactions.',
      image: '/placeholder.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Stripe',
        'Redis',
        'AWS',
      ],
      category: 'Web Application',
      industry: 'Retail',
      results: [
        '40% increase in conversion rates',
        '60% improvement in page load speed',
        '500K+ users served monthly',
        '99.9% uptime achieved',
      ],
      features: [
        'Multi-vendor marketplace',
        'Real-time inventory tracking',
        'Advanced search & filtering',
        'Mobile-responsive design',
        'Integrated payment gateway',
        'Admin dashboard with analytics',
      ],
      icon: <Monitor className='h-6 w-6' />,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      client: 'Regional Healthcare Provider',
      description:
        'HIPAA-compliant patient management system with appointment scheduling, electronic health records, and telemedicine capabilities.',
      image: '/placeholder.svg',
      technologies: [
        'React',
        'Node.js',
        'Express',
        'MongoDB',
        'Socket.io',
        'Docker',
        'Azure',
      ],
      category: 'Healthcare Software',
      industry: 'Healthcare',
      results: [
        '30% reduction in appointment no-shows',
        '50% faster patient check-in process',
        '25% increase in patient satisfaction',
        '100% HIPAA compliance achieved',
      ],
      features: [
        'Patient portal with secure messaging',
        'Telemedicine video consultations',
        'Electronic health records (EHR)',
        'Appointment scheduling system',
        'Prescription management',
        'Insurance claim processing',
      ],
      icon: <Shield className='h-6 w-6' />,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Financial Analytics Dashboard',
      client: 'Investment Firm',
      description:
        'Real-time financial data visualization platform with advanced analytics, portfolio tracking, and automated reporting capabilities.',
      image: '/placeholder.svg',
      technologies: [
        'Vue.js',
        'Python',
        'Django',
        'PostgreSQL',
        'Redis',
        'D3.js',
        'AWS',
      ],
      category: 'Data Visualization',
      industry: 'Finance',
      results: [
        '70% faster data processing',
        '90% reduction in report generation time',
        '45% improvement in decision-making speed',
        '$2M+ in cost savings annually',
      ],
      features: [
        'Real-time market data integration',
        'Interactive charts and graphs',
        'Portfolio performance tracking',
        'Risk assessment algorithms',
        'Automated compliance reporting',
        'Multi-currency support',
      ],
      icon: <TrendingUp className='h-6 w-6' />,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'IoT Fleet Management',
      client: 'Logistics Company',
      description:
        'IoT-powered fleet management system with real-time vehicle tracking, predictive maintenance, and route optimization.',
      image: '/placeholder.svg',
      technologies: [
        'React Native',
        'Node.js',
        'IoT Sensors',
        'MongoDB',
        'GraphQL',
        'AWS IoT',
        'Machine Learning',
      ],
      category: 'IoT Application',
      industry: 'Transportation',
      results: [
        '35% reduction in fuel costs',
        '50% decrease in maintenance expenses',
        '25% improvement in delivery times',
        '99.5% vehicle uptime achieved',
      ],
      features: [
        'Real-time GPS tracking',
        'Predictive maintenance alerts',
        'Route optimization algorithms',
        'Driver behavior monitoring',
        'Fuel consumption analytics',
        'Mobile driver app',
      ],
      icon: <Smartphone className='h-6 w-6' />,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 5,
      title: 'Cloud Migration Platform',
      client: 'Manufacturing Enterprise',
      description:
        'Enterprise-grade cloud migration platform with automated workload assessment, migration planning, and monitoring.',
      image: '/placeholder.svg',
      technologies: [
        'Angular',
        'Spring Boot',
        'Java',
        'MySQL',
        'Kubernetes',
        'Docker',
        'Google Cloud',
      ],
      category: 'Cloud Platform',
      industry: 'Manufacturing',
      results: [
        '60% reduction in infrastructure costs',
        '80% improvement in system reliability',
        '40% faster deployment cycles',
        'Zero-downtime migration achieved',
      ],
      features: [
        'Automated workload discovery',
        'Migration planning dashboard',
        'Cost optimization recommendations',
        'Security compliance monitoring',
        'Performance analytics',
        'Multi-cloud support',
      ],
      icon: <Cloud className='h-6 w-6' />,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      id: 6,
      title: 'AI-Powered Customer Service',
      client: 'Telecommunications Company',
      description:
        'Intelligent customer service platform with AI chatbots, sentiment analysis, and automated ticket routing.',
      image: '/placeholder.svg',
      technologies: [
        'Next.js',
        'Python',
        'TensorFlow',
        'Natural Language Processing',
        'Redis',
        'PostgreSQL',
        'AWS',
      ],
      category: 'AI Application',
      industry: 'Telecommunications',
      results: [
        '75% reduction in response time',
        '50% decrease in support tickets',
        '90% customer satisfaction rate',
        '24/7 automated support coverage',
      ],
      features: [
        'AI-powered chatbot',
        'Sentiment analysis',
        'Automated ticket routing',
        'Knowledge base integration',
        'Multi-language support',
        'Performance analytics dashboard',
      ],
      icon: <Zap className='h-6 w-6' />,
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Enhanced Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
            <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <Rocket className='h-4 w-4 text-cyan-300' />
                <span>500+ Successful Projects • Award-Winning Solutions</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <span className='block'>Our</span>
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400'>
                  Portfolio
                </span>
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed'>
                Explore our collection of successful projects that have
                transformed businesses and delivered measurable results across
                various industries.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact'>
                    <Rocket className='mr-2 h-5 w-5' />
                    Start Your Project
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/services'>
                    <Globe className='mr-2 h-5 w-5' />
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-20 px-4 bg-white/50'>
            <div className='max-w-6xl mx-auto'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                {[
                  {
                    icon: <CheckCircle className='h-8 w-8 text-green-500' />,
                    number: 500,
                    label: 'Projects Completed',
                    gradient: 'from-green-400 to-emerald-500',
                    suffix: '+',
                  },
                  {
                    icon: <Users className='h-8 w-8 text-blue-500' />,
                    number: 50,
                    label: 'Happy Clients',
                    gradient: 'from-blue-400 to-cyan-500',
                    suffix: '+',
                  },
                  {
                    icon: <Clock className='h-8 w-8 text-purple-500' />,
                    number: 98,
                    label: 'On-Time Delivery',
                    gradient: 'from-purple-400 to-pink-500',
                    suffix: '%',
                  },
                  {
                    icon: <TrendingUp className='h-8 w-8 text-orange-500' />,
                    number: 10,
                    label: 'Industries Served',
                    gradient: 'from-orange-400 to-red-500',
                    suffix: '+',
                  },
                ].map((stat, index) => (
                  <ScaleIn key={index} delay={0.2 + index * 0.1} duration={0.6}>
                    <div className='text-center group'>
                      <div
                        className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className='w-full h-full bg-white rounded-lg flex items-center justify-center'>
                          {stat.icon}
                        </div>
                      </div>
                      <div className='text-3xl font-bold text-gray-900 mb-2'>
                        <AnimatedCounter
                          value={stat.number}
                          duration={2}
                          delay={0.4 + index * 0.2}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className='text-gray-600 font-medium'>
                        {stat.label}
                      </div>
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Projects Grid */}
        <PortfolioSection
          title='Featured Projects'
          description="Discover how we've helped businesses across various industries achieve their digital transformation goals"
        />

        {/* Technologies Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Technologies We Use
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                We leverage cutting-edge technologies to build scalable, secure,
                and high-performance solutions
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6'>
                  <Monitor className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Frontend Development
                </h3>
                <div className='space-y-2'>
                  {[
                    'React',
                    'Next.js',
                    'Vue.js',
                    'Angular',
                    'TypeScript',
                    'Tailwind CSS',
                  ].map((tech, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='mr-2 mb-2'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6'>
                  <Database className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Backend Development
                </h3>
                <div className='space-y-2'>
                  {[
                    'Node.js',
                    'Python',
                    'Java',
                    '.NET',
                    'PostgreSQL',
                    'MongoDB',
                  ].map((tech, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='mr-2 mb-2'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6'>
                  <Cloud className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Cloud & DevOps
                </h3>
                <div className='space-y-2'>
                  {['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'].map(
                    (tech, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='mr-2 mb-2'
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>
              Ready to Build Your Next Success Story?
            </h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Let's discuss your project requirements and create a solution that
              delivers measurable results for your business.
            </p>

            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='/contact'>
                  <Rocket className='mr-2 h-5 w-5' />
                  Start Your Project
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                asChild
              >
                <Link href='/about'>
                  <Users className='mr-2 h-5 w-5' />
                  Meet Our Team
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
