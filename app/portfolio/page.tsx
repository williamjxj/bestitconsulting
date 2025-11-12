'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import Layout from '@/components/Layout'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import './animations.css'
import {
  Rocket,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Globe,
  Monitor,
} from 'lucide-react'
import {
  R2Image,
  R2CardImage,
  R2GalleryImage,
  R2HeroImage,
} from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'
import { useI18n } from '@/lib/i18n'

export default function PortfolioPage() {
  const { t } = useI18n()
  const { getImages, getAssetByFilename } = useR2Assets()

  // Get R2 assets for portfolio page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.portfolio.hero)
  const gallery1Image = getAssetByFilename(R2_ASSET_MAPPINGS.portfolio.gallery1)
  const gallery2Image = getAssetByFilename(R2_ASSET_MAPPINGS.portfolio.gallery2)
  const gallery3Image = getAssetByFilename(R2_ASSET_MAPPINGS.portfolio.gallery3)

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Enhanced Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          <Image
            src='/optimized/global.webp'
            alt='Global technology background'
            fill
            className='object-cover object-center opacity-20 pointer-events-none'
            priority={false}
          />


          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30 animate-fade-in backdrop-blur-sm'>
                <Rocket className='h-4 w-4 text-cyan-300 animate-float' />
                <span>{t('badge', 'portfolio')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <AnimatedHeadline
                  text={t('title', 'portfolio')}
                  className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'
                />
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up'>
                {t('subtitle', 'portfolio')}
              </p>

              <div
                className='flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in'
                style={{ animationDelay: '0.5s' }}
              >
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact#contact-form'>
                    <Rocket className='mr-2 h-5 w-5' />
                    {t('startProject', 'portfolio')}
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
                    {t('ourServices', 'portfolio')}
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
                    number: 50,
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

        {/* Portfolio Gallery Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50'>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-16'>
                <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                  Portfolio Gallery
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                  A visual showcase of our work across different industries and
                  technologies
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[
                  {
                    image: gallery1Image,
                    title: 'E-Commerce Platform',
                    description: 'Modern online shopping experience',
                  },
                  {
                    image: gallery2Image,
                    title: 'Healthcare Management',
                    description: 'Patient care optimization system',
                  },
                  {
                    image: gallery3Image,
                    title: 'Financial Analytics',
                    description: 'Real-time data visualization dashboard',
                  },
                ].map((item, index) => (
                  <ScaleIn key={index} delay={0.2 + index * 0.1} duration={0.6}>
                    <div className='group'>
                      {item.image ? (
                        <R2GalleryImage
                          src={item.image.url}
                          alt={item.title}
                          className='w-full h-64 rounded-xl shadow-lg'
                          animation='scale'
                          delay={0.4 + index * 0.1}
                        />
                      ) : (
                        <div className='w-full h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center'>
                          <div className='text-center'>
                            <Monitor className='w-12 h-12 text-blue-400 mx-auto mb-2' />
                            <p className='text-gray-600 text-sm'>
                              {item.title}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className='mt-4 text-center'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                          {item.title}
                        </h3>
                        <p className='text-gray-600 text-sm'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

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
                  {t('startProject', 'portfolio')}
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
