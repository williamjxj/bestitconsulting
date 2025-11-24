'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import {
  Users,
  Award,
  Target,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Briefcase,
  Lightbulb,
  Zap,
  Building,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import DisplayCards from '@/components/ui/display-cards'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  R2Image,
  R2ProfileImage,
  R2CardImage,
  R2HeroImage,
} from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'
import { useI18n } from '@/lib/i18n'

const R2_BASE_URL =
  process.env.NEXT_PUBLIC_R2_BASE_URL ||
  'https://pub-3b3f23afc5404f20b2081d34fa4c87b8.r2.dev'

/**
 * GSAP Animated Headline Component
 * Animates text with color gradient and reveal effects
 */
function GSAPAnimatedHeadline({
  text,
  className = '',
  size = 'large',
}: {
  text: string
  className?: string
  size?: 'large' | 'small'
}) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!headlineRef.current) return

    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(headlineRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  useEffect(() => {
    if (!headlineRef.current || !isVisible) return

    const words = text.split(' ')
    const wordElements: HTMLSpanElement[] = []

    // Clear and rebuild structure
    headlineRef.current.innerHTML = ''
    words.forEach((word, index) => {
      const span = document.createElement('span')
      span.textContent = word
      span.className = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px)'
      span.style.marginRight = index < words.length - 1 ? '0.25em' : '0'
      headlineRef.current?.appendChild(span)
      wordElements.push(span)
    })

    // GSAP animation timeline
    const tl = gsap.timeline()

    // Animate each word with stagger and color change
    wordElements.forEach((wordSpan, index) => {
      tl.to(
        wordSpan,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          color:
            size === 'large'
              ? '#1e40af' // blue-800 for large
              : '#2563eb', // blue-600 for small
        },
        index * 0.1
      ).to(
        wordSpan,
        {
          color: '#111827', // gray-900
          duration: 0.8,
          ease: 'power2.inOut',
        },
        index * 0.1 + 0.3
      )
    })

    return () => {
      tl.kill()
    }
  }, [text, size, isVisible])

  const Tag = size === 'large' ? 'h2' : 'h3'

  return (
    <Tag ref={headlineRef} className={className}>
      {text}
    </Tag>
  )
}

const founderInfo = {
  name: 'William Jiang',
  role: 'Founder & Lead Developer',
  image: '/william.jpg',
  bio: 'Full-stack developer with 20+ years of experience building scalable web applications and digital solutions.',
  expertise: [
    'Full-Stack Development',
    'AI/ML',
    'Cloud Architecture',
    'DevOps',
    'UI/UX Design',
  ],
  experience: '20+ years',
  education: 'Computer Science & Software Engineering',
  specialties: [
    'React/Next.js',
    'Node.js',
    'AI/ML',
    'Python',
    'AWS/GCP/Azure',
    'PostgreSQL/MongoDB',
  ],
}

export default function AboutPage() {
  const { t } = useI18n()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const { getImages, getAssetByFilename } = useR2Assets()

  const values = [
    {
      icon: Target,
      title: t('values.clientFirst.title', 'about'),
      description: t('values.clientFirst.description', 'about'),
    },
    {
      icon: Shield,
      title: t('values.quality.title', 'about'),
      description: t('values.quality.description', 'about'),
    },
    {
      icon: Lightbulb,
      title: t('values.innovation.title', 'about'),
      description: t('values.innovation.description', 'about'),
    },
    {
      icon: Users,
      title: t('values.collaboration.title', 'about'),
      description: t('values.collaboration.description', 'about'),
    },
  ]

  const stats = [
    {
      number: '50+',
      label: t('stats.projectsCompleted', 'about'),
      icon: Briefcase,
    },
    {
      number: '98%',
      label: t('stats.clientSatisfaction', 'about'),
      icon: Star,
    },
    {
      number: '20+',
      label: t('stats.yearsExperience', 'about'),
      icon: Award,
    },
    {
      number: '24/7',
      label: t('stats.supportAvailable', 'about'),
      icon: Zap,
    },
  ]

  // Get R2 assets for about page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.hero)
  const teamImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.team)
  const officeImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.office)
  const cultureImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.culture)

  return (
    <Layout>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
        <div
          className='absolute inset-0 overflow-hidden pointer-events-none'
          style={{
            backgroundImage: `url(${R2_BASE_URL}/home-page/unsplash.avif)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
          }}
        />
        {/* Animated background elements */}
        <div className='absolute inset-0'>
          <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
          <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-4 items-center'>
            <motion.div
              className='text-center lg:text-left'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <span>{t('hero.badge', 'about')}</span>
              </div>
              <h1 className='text-4xl lg:text-6xl font-bold mb-6'>
                <AnimatedHeadline
                  text={t('hero.title', 'about')}
                  className='text-4xl lg:text-6xl font-bold leading-tight'
                />
              </h1>
              <motion.p
                className='text-xl text-blue-100/90 mb-8 leading-relaxed max-w-3xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('description', 'about')}
              </motion.p>
              <motion.div
                className='flex flex-col sm:flex-row gap-6 justify-center mb-12'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/services'>
                    {t('hero.ourServices', 'about')}
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/portfolio'>
                    {t('hero.viewPortfolio', 'about')}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Display Cards as Background Element */}
            <motion.div
              className='hidden lg:flex justify-center items-center relative'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className='relative w-80 h-80 flex items-center justify-center'>
                <DisplayCards
                  cards={[
                    {
                      icon: <Briefcase className='size-4 text-blue-200' />,
                      title: '50+ Projects',
                      description: 'Successfully delivered',
                      date: '2024',
                      iconClassName: 'text-blue-400',
                      titleClassName: 'text-blue-400',
                      className: '[grid-area:stack] hover:-translate-y-8',
                    },
                    {
                      icon: <Users className='size-4 text-green-300' />,
                      title: '50+ Clients',
                      description: 'Happy customers worldwide',
                      date: '2024',
                      iconClassName: 'text-green-400',
                      titleClassName: 'text-green-400',
                      className:
                        '[grid-area:stack] translate-x-8 translate-y-6 hover:-translate-y-1',
                    },
                    {
                      icon: <Award className='size-4 text-purple-300' />,
                      title: '20+ Years',
                      description: 'Industry experience',
                      date: 'Since 2014',
                      iconClassName: 'text-purple-400',
                      titleClassName: 'text-purple-400',
                      className:
                        '[grid-area:stack] translate-x-16 translate-y-12 hover:translate-y-8',
                    },
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className={brandClasses.container}>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className='text-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <stat.icon className='h-8 w-8 text-blue-600' />
                </div>
                <div className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Commitment */}
      <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <GSAPAnimatedHeadline
              text='Our Mission, Vision & Commitment'
              className='text-4xl font-bold text-gray-900 mb-6'
            />
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The principles that guide our work and shape how we serve our
              clients
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className='group'
            >
              <Card
                className='border-0 shadow-lg bg-white text-center overflow-hidden relative h-full'
                animated={false}
                hover={false}
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl'
                  transition={{ duration: 0.3 }}
                />

                <CardContent className='p-8 relative z-10'>
                  <motion.div
                    className='mb-6'
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <Target className='h-12 w-12 text-blue-600 mx-auto' />
                  </motion.div>
                  <GSAPAnimatedHeadline
                    text='Our Mission'
                    className='text-xl font-bold text-gray-900 mb-4'
                    size='small'
                  />
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    To empower businesses with cutting-edge technology solutions
                    that drive growth, efficiency, and innovation. We believe
                    technology should be an enabler, not a barrier, to your
                    success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className='group'
            >
              <Card
                className='border-0 shadow-lg bg-white text-center overflow-hidden relative h-full'
                animated={false}
                hover={false}
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl'
                  transition={{ duration: 0.3 }}
                />

                <CardContent className='p-8 relative z-10'>
                  <motion.div
                    className='mb-6'
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <Globe className='h-12 w-12 text-indigo-600 mx-auto' />
                  </motion.div>
                  <GSAPAnimatedHeadline
                    text='Our Vision'
                    className='text-xl font-bold text-gray-900 mb-4'
                    size='small'
                  />
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    To be the leading technology consulting firm that transforms
                    how businesses operate in the digital world. We envision a
                    future where every company has access to world-class
                    technology solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className='group'
            >
              <Card
                className='border-0 shadow-lg bg-white text-center overflow-hidden relative h-full'
                animated={false}
                hover={false}
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl'
                  transition={{ duration: 0.3 }}
                />

                <CardContent className='p-8 relative z-10'>
                  <motion.div
                    className='mb-6'
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <Shield className='h-12 w-12 text-green-600 mx-auto' />
                  </motion.div>
                  <GSAPAnimatedHeadline
                    text='Our Commitment'
                    className='text-xl font-bold text-gray-900 mb-4'
                    size='small'
                  />
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    We're committed to staying at the forefront of technology
                    trends, investing in our team's growth, and continuously
                    improving our processes to deliver exceptional results for
                    our clients.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 lg:py-24 bg-white'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Our Core Values
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              These principles guide everything we do and shape how we work with
              our clients and each other.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className='text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={shouldAnimate ? { y: -5 } : undefined}
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <value.icon className='h-8 w-8 text-blue-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  {value.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className='py-16 lg:py-24 bg-gray-50'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              About the Founder
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Meet the developer behind Best IT Consulting and learn about the
              expertise that drives our success.
            </p>
          </motion.div>

          <div className='max-w-4xl mx-auto'>
            <motion.div
              className='bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={shouldAnimate ? { y: -5 } : undefined}
            >
              <div className='grid lg:grid-cols-3 gap-8 items-start'>
                <div className='lg:col-span-1 text-center lg:text-left'>
                  <div className='relative w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto lg:mx-0 mb-6 overflow-hidden shrink-0'>
                    <Image
                      src={founderInfo.image}
                      alt={founderInfo.name}
                      width={128}
                      height={128}
                      className='w-full h-full object-cover object-center rounded-full'
                      priority
                    />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {founderInfo.name}
                  </h3>
                  <p className='text-blue-600 font-semibold text-lg mb-4'>
                    {founderInfo.role}
                  </p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>
                      <strong>Experience:</strong> {founderInfo.experience}
                    </p>
                    <p>
                      <strong>Education:</strong> {founderInfo.education}
                    </p>
                  </div>
                </div>

                <div className='lg:col-span-2'>
                  <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                    {founderInfo.bio}
                  </p>

                  <div className='mb-6'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3'>
                      Core Expertise
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {founderInfo.expertise.map(skill => (
                        <span
                          key={skill}
                          className='px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3'>
                      Technical Specialties
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {founderInfo.specialties.map(tech => (
                        <span
                          key={tech}
                          className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Philosophy & Approach Section */}
      <section className='py-16 lg:py-24 bg-white'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              How We Work
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Discover our delivery principles—focused on measurable outcomes,
              reduced risk, and lasting impact for your business.
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Our Development Environment
              </h3>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                A modern, well-equipped environment designed for productivity
                and reliability. Our setup prioritizes security, performance,
                and uninterrupted delivery so your project stays on track.
              </p>
              <div className='space-y-4'>
                {[
                  'Dedicated workspace with dual monitors',
                  'High-speed internet and cloud infrastructure',
                  'Professional development tools and software',
                  'Quiet environment for deep focus work',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span className='text-gray-600'>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {officeImage ? (
                <R2CardImage
                  src={officeImage.url}
                  alt='Development workspace'
                  className='w-full rounded-xl shadow-xl'
                  animation='scale'
                  delay={0.2}
                  hover={true}
                  overlay={true}
                  overlayContent={
                    <div className='text-white text-center'>
                      <div className='w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center'>
                        <Building className='w-6 h-6' />
                      </div>
                      <p className='text-sm font-medium'>Our Workspace</p>
                    </div>
                  }
                />
              ) : (
                <div className='w-full h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center'>
                  <div className='text-center'>
                    <Building className='w-16 h-16 text-blue-400 mx-auto mb-4' />
                    <p className='text-gray-600'>Development Workspace</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Values & Commitment Section */}
      <section className='py-16 lg:py-24 bg-gray-50'>
        <div className={brandClasses.container}>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {cultureImage ? (
                <R2CardImage
                  src={cultureImage.url}
                  alt='Work values and commitment'
                  className='w-full rounded-xl shadow-xl'
                  animation='scale'
                  delay={0.2}
                  hover={true}
                  overlay={true}
                  overlayContent={
                    <div className='text-white text-center'>
                      <div className='w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center'>
                        <Users className='w-6 h-6' />
                      </div>
                      <p className='text-sm font-medium'>Our Values</p>
                    </div>
                  }
                />
              ) : (
                <div className='w-full h-80 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center'>
                  <div className='text-center'>
                    <Users className='w-16 h-16 text-green-400 mx-auto mb-4' />
                    <p className='text-gray-600'>Work Values</p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Our Work Values & Commitment
              </h3>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                Exceptional outcomes come from discipline, quality, and true
                partnership. We combine proven engineering practices with a
                consultative approach to deliver solutions that matter.
              </p>
              <div className='space-y-4'>
                {[
                  'Direct communication and transparency',
                  'Continuous learning and skill development',
                  'Flexible scheduling to meet your needs',
                  'Innovation and creative problem-solving',
                ].map((value, index) => (
                  <motion.div
                    key={value}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span className='text-gray-600'>{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center text-white'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold mb-6'>
              Ready to Work Together?
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Let's discuss how we can help transform your business with
              innovative technology solutions tailored to your needs.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100'
                asChild
              >
                <Link href='/contact?title=Start%20Your%20Project#contact-form'>
                  Start Your Project
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-white hover:bg-white hover:text-blue-600'
                asChild
              >
                <Link href='/contact?title=Schedule%20Consultation#contact-form'>
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
