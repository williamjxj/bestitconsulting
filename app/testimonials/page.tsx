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
      title: 'Best Technology Partner 2024',
      organization: 'Canadian Business Awards',
      description:
        'Recognized for outstanding innovation and client satisfaction',
    },
    {
      icon: <TrendingUp className='h-12 w-12 text-green-500' />,
      title: 'Top 10 IT Consulting Firms',
      organization: 'Tech Review Magazine',
      description:
        'Ranked among the leading technology consulting companies in Canada',
    },
    {
      icon: <Heart className='h-12 w-12 text-red-500' />,
      title: 'Client Choice Award',
      organization: 'Industry Excellence Awards',
      description: 'Voted by clients as the most trusted technology partner',
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
                  <Link href='/contact#contact-form'>
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
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Awards & Recognition
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Our commitment to excellence has been recognized by industry
                leaders and client organizations
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white text-center'
                >
                  <CardContent className='p-8'>
                    <div className='mb-6'>{achievement.icon}</div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      {achievement.title}
                    </h3>
                    <p className='text-blue-600 font-medium mb-3'>
                      {achievement.organization}
                    </p>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
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
