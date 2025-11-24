'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Users,
  Cloud,
  Brain,
  Shield,
  Star,
  Building,
  Trophy,
} from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { CredibilitySection } from '@/components/sections/CredibilitySection'
import TechnologyShowcase from '@/components/sections/TechnologyShowcase'
import { DemoVideo } from '@/components/DemoVideo'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { R2Image, R2Video, R2HeroImage } from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'
import { useI18n } from '@/lib/i18n'
import ChatWidget from '@/components/chat-widget/chat-widget-lazy'

export default function HomePage() {
  const { t } = useI18n()
  const { getImages, getVideos, getAssetByFilename } = useR2Assets()

  // Get R2 assets for home page
  const images = getImages()
  const videos = getVideos()
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.home.hero)
  const demoVideo = getAssetByFilename(R2_ASSET_MAPPINGS.home.demo)
  const demoPoster = getAssetByFilename(R2_ASSET_MAPPINGS.home.demoPoster)
  const teamImage = getAssetByFilename(R2_ASSET_MAPPINGS.home.team)

  const features = [
    {
      icon: <Code2 className='h-8 w-8' />,
      title: t('features.fullStack.title', 'home'),
      description: t('features.fullStack.description', 'home'),
    },
    {
      icon: <Cloud className='h-8 w-8' />,
      title: t('features.cloud.title', 'home'),
      description: t('features.cloud.description', 'home'),
    },
    {
      icon: <Brain className='h-8 w-8' />,
      title: t('features.cybersecurity.title', 'home'),
      description: t('features.cybersecurity.description', 'home'),
    },
    {
      icon: <Users className='h-8 w-8' />,
      title: t('features.teamAugmentation.title', 'home'),
      description: t('features.teamAugmentation.description', 'home'),
    },
  ]

  const stats = [
    {
      number: '50+',
      label: t('stats.projectsDelivered', 'home'),
      icon: <Trophy className='h-6 w-6' />,
    },
    {
      number: '50+',
      label: t('stats.enterpriseClients', 'home'),
      icon: <Building className='h-6 w-6' />,
    },
    {
      number: '98%',
      label: t('stats.clientSatisfaction', 'home'),
      icon: <Star className='h-6 w-6' />,
    },
    {
      number: '247',
      label: t('stats.supportAvailable', 'home'),
      icon: <Brain className='h-6 w-6' />,
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen'>
        <HeroSection />

        {/* Video/Demo Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-12 bg-background'>
            <div className='w-full px-4 sm:px-6 lg:px-8'>
              <div className='w-full lg:max-w-7xl lg:mx-auto'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                  <ScrollTrigger
                    animation='slide'
                    direction='right'
                    delay={0.2}
                  >
                    <div>
                      <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                        {t('video.badge', 'home')}
                      </span>
                      <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                        {t('video.title', 'home')}
                        <span className='text-blue-600'>
                          {t('video.titleHighlight', 'home')}
                        </span>
                      </h2>
                      <p className='text-lg text-muted-foreground mb-8'>
                        {t('video.description', 'home')}
                      </p>
                      <div className='flex gap-4'>
                        <Button size='lg' asChild>
                          <Link href='/contact#contact-form'>
                            {t('video.startJourney', 'home')}
                            <ArrowRight className='ml-2 h-4 w-4' />
                          </Link>
                        </Button>
                        <Button size='lg' variant='outline' asChild>
                          <Link href='/case-studies'>
                            {t('video.viewCaseStudies', 'home')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollTrigger>

                  <ScrollTrigger animation='slide' direction='left' delay={0.4}>
                    <div className='relative group'>
                      {demoVideo ? (
                        <R2Video
                          src={demoVideo.url}
                          poster={demoPoster?.url}
                          className='w-full aspect-video rounded-xl overflow-hidden shadow-2xl'
                          controls={true}
                          autoPlay={false}
                          loop={false}
                          muted={true}
                          playsInline={true}
                          animation='scale'
                          delay={0.6}
                        />
                      ) : (
                        <div className='w-full aspect-video'>
                          <DemoVideo className='w-full h-full' />
                        </div>
                      )}
                      {/* Overlay for better visual appeal */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none'></div>
                    </div>
                  </ScrollTrigger>
                </div>
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Features Overview */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                {t('features.badge', 'home')}
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                {t('features.title', 'home')}
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                {t('features.subtitle', 'home')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {features.map((feature, index) => (
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
                    className='border-0 shadow-lg bg-white text-center overflow-hidden relative h-full'
                    animated={false}
                    hover={false}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl'
                      transition={{ duration: 0.3 }}
                    />

                    <CardContent className='p-6 relative z-10'>
                      <motion.div
                        className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-500/20 transition-colors'
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        <div className='text-blue-500'>{feature.icon}</div>
                      </motion.div>
                      <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                        {feature.title}
                      </h3>
                      <p className='text-gray-600 text-sm leading-relaxed'>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className='text-center mt-12'>
              <Button size='lg' asChild>
                <Link href='/services' className='group'>
                  {t('features.exploreAll', 'home')}
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Credibility Section */}
        <CredibilitySection />

        {/* Stats Section */}
        <section className='py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
          <div className='w-full px-4 sm:px-6 lg:px-8'>
            <div className='w-full lg:max-w-7xl lg:mx-auto'>
              <div className='text-center mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                  {t('stats.title', 'home')}
                </h2>
                <p className='text-xl text-blue-100 max-w-2xl mx-auto'>
                  {t('stats.subtitle', 'home')}
                </p>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                {stats.map((stat, index) => (
                  <div key={index} className='text-center group'>
                    <div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors'>
                      <div className='text-cyan-300'>{stat.icon}</div>
                    </div>
                    <AnimatedCounter
                      value={parseInt(stat.number.replace(/[^\d]/g, ''))}
                      duration={2}
                      delay={0.6 + index * 0.2}
                      suffix={
                        stat.number.includes('%')
                          ? '%'
                          : stat.number.includes('+')
                            ? '+'
                            : ''
                      }
                      className='text-3xl md:text-4xl font-bold mb-2'
                    >
                      <></>
                    </AnimatedCounter>
                    <div className='text-blue-100'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Showcase */}
        <TechnologyShowcase />

        {/* CTA Section */}
        <section className='py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
          <div className='w-full px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              {t('cta.title', 'home')}
            </h2>
            <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-8'>
              {t('cta.description', 'home')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='bg-white text-blue-700 hover:bg-blue-50'
                asChild
              >
                <Link href='/contact?title=Get%20a%20Free%20Consultation#contact-form'>
                  {t('cta.getConsultation', 'home')}
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-white/30 hover:bg-white/10'
                asChild
              >
                <Link href='/case-studies'>{t('cta.viewWork', 'home')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <ChatWidget />
    </Layout>
  )
}
