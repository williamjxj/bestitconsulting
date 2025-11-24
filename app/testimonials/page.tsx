'use client'

import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Star,
  Quote,
  TrendingUp,
  Users,
  Award,
  Globe,
  CheckCircle,
  ArrowRight,
  Rocket,
  Heart,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'
import { R2Image, R2CardImage, R2HeroImage } from '@/components/R2Image'
import IconCloudDemo from '@/components/ui/IconCloudDemo'
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

export default function TestimonialsPage() {
  const { t } = useI18n()
  const { getImages, getAssetByFilename } = useR2Assets()

  // Get R2 assets for testimonials page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.testimonials.hero)
  const client1Image = getAssetByFilename(
    R2_ASSET_MAPPINGS.testimonials.client1
  )
  const client2Image = getAssetByFilename(
    R2_ASSET_MAPPINGS.testimonials.client2
  )
  const successImage = getAssetByFilename(
    R2_ASSET_MAPPINGS.testimonials.success
  )

  const stats = [
    {
      icon: <Users className='h-8 w-8 text-blue-500' />,
      number: 500,
      suffix: '+',
      label: t('stats.happyClients', 'testimonials'),
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: <Star className='h-8 w-8 text-yellow-500' />,
      number: 4.9,
      suffix: '/5',
      decimals: 1,
      label: t('stats.averageRating', 'testimonials'),
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <CheckCircle className='h-8 w-8 text-green-500' />,
      number: 98,
      suffix: '%',
      label: t('stats.satisfactionRate', 'testimonials'),
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: <Globe className='h-8 w-8 text-purple-500' />,
      number: 50,
      suffix: '+',
      label: t('stats.countriesServed', 'testimonials'),
      gradient: 'from-purple-400 to-pink-500',
    },
  ]

  const achievements = [
    {
      icon: <Award className='h-12 w-12 text-yellow-500' />,
      title: '100% Client Satisfaction Rate',
      organization: 'Client Feedback 2024',
      description:
        'Every client has rated our services 5 stars, demonstrating our commitment to excellence',
    },
    {
      icon: <TrendingUp className='h-12 w-12 text-green-500' />,
      title: 'Rapid Growth Achievement',
      organization: 'Business Milestones',
      description:
        'Successfully delivered 50+ projects with consistent quality and on-time delivery',
    },
    {
      icon: <Heart className='h-12 w-12 text-red-500' />,
      title: 'Trusted Technology Partner',
      organization: 'Client Testimonials',
      description:
        'Clients consistently recommend us for our personalized service and technical expertise',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Enhanced Hero Section */}
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
          <div className='container mx-auto px-4 relative'>
            {/* Icon Cloud positioned inside container, to the left of heading */}
            <div className='pointer-events-none absolute right-0 md:right-4 top-1/2 -translate-y-1/2 opacity-70'>
              <IconCloudDemo size={360} radius={130} />
            </div>

            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <ThumbsUp className='h-4 w-4 text-cyan-300' />
                <span>{t('hero.badge', 'testimonials')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <AnimatedHeadline
                  text={t('hero.title', 'testimonials')}
                  className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'
                />
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed'>
                {t('subtitle', 'testimonials')}
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact#contact-form'>
                    <MessageSquare className='mr-2 h-5 w-5' />
                    {t('hero.shareStory', 'testimonials')}
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/case-studies'>
                    <Rocket className='mr-2 h-5 w-5' />
                    {t('hero.viewWork', 'testimonials')}
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
                {stats.map((stat, index) => (
                  <SlideIn
                    key={index}
                    direction='up'
                    delay={0.2 + index * 0.1}
                    duration={0.6}
                  >
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
                          decimals={stat.decimals}
                        />
                      </div>
                      <div className='text-gray-600 font-medium'>
                        {stat.label}
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Featured Testimonials */}
        <TestimonialsSection
          title='What Our Clients Say'
          description='Real stories from real clients who have transformed their businesses with our solutions'
          autoPlay={true}
          autoPlayInterval={5000}
        />

        {/* Awards & Recognition */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <GSAPAnimatedHeadline
                text='Awards & Recognition'
                className='text-4xl font-bold text-gray-900 mb-6'
              />
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Our commitment to excellence has been recognized by industry
                leaders and client organizations
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className='group'
                >
                  <Card
                    className='border-0 shadow-lg bg-white text-center overflow-hidden relative'
                    animated={false}
                    hover={false}
                  >
                    {/* Subtle gradient overlay on hover - no background rectangle */}
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
                        {achievement.icon}
                      </motion.div>
                      <GSAPAnimatedHeadline
                        text={achievement.title}
                        className='text-xl font-bold text-gray-900 mb-2'
                        size='small'
                      />
                      <p className='text-blue-600 font-medium mb-3'>
                        {achievement.organization}
                      </p>
                      <p className='text-gray-600 text-sm leading-relaxed'>
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className='py-20 px-4 bg-white'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Video Testimonials
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Watch our clients share their success stories and transformation
                journeys
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  image: client1Image,
                  title: 'TechFlow Solutions',
                  description: 'Cloud Migration Success',
                },
                {
                  image: client2Image,
                  title: 'HealthVital Medical',
                  description: 'Healthcare Platform',
                },
                {
                  image: successImage,
                  title: 'RetailMax Enterprise',
                  description: 'E-commerce Transformation',
                },
              ].map((video, index) => (
                <div
                  key={index}
                  className='group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  {video.image ? (
                    <R2CardImage
                      src={video.image.url}
                      alt={video.title}
                      className='w-full aspect-video'
                      animation='scale'
                      delay={0.2 + index * 0.1}
                      hover={true}
                      overlay={true}
                      overlayContent={
                        <div className='text-white text-center'>
                          <div className='w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                            <div className='w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1'></div>
                          </div>
                          <p className='text-sm font-medium'>Play Video</p>
                        </div>
                      }
                    />
                  ) : (
                    <div className='aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center'>
                      <div className='text-center'>
                        <div className='w-16 h-16 mx-auto mb-2 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                          <div className='w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1'></div>
                        </div>
                        <p className='text-gray-600 text-sm'>{video.title}</p>
                      </div>
                    </div>
                  )}
                  <div className='p-4'>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      {video.title}
                    </h4>
                    <p className='text-gray-600 text-sm'>{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>
              Join Our Success Stories
            </h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Ready to become our next success story? Let's discuss how we can
              help transform your business with cutting-edge technology
              solutions.
            </p>

            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='/contact?title=Start%20Your%20Project#contact-form'>
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
                <Link href='/portfolio'>
                  <Award className='mr-2 h-5 w-5' />
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
