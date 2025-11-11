'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import {
  Rocket,
  CheckCircle,
  Code2,
  Target,
  Globe,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Github,
  MoreHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  R2Image,
  R2CardImage,
  R2GalleryImage,
  R2HeroImage,
} from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'
import { useI18n } from '@/lib/i18n'

export default function OurWorkPage() {
  const { t } = useI18n()
  const { getImages, getAssetByFilename } = useR2Assets()
  const BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || ''

  const projects = [
    {
      id: 1,
      title: 'Face Fusion Agent',
      description: 'AI-powered face fusion and manipulation tool',
      url: 'https://face-fusion-agent.vercel.app',
      category: 'AI/ML',
      status: 'Live',
      technologies: ['Next.js', 'AI/ML', 'Computer Vision'],
      image: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Images Synthesis & Online Subscription',
      description: 'Full-stack web application with authentication',
      url: 'https://nextjs-supabase-kappa-nine.vercel.app',
      category: 'Development',
      status: 'Live',
      technologies: ['Next.js', 'Supabase', 'TypeScript'],
      image: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'AI Images Cart & Purchase',
      description: 'AI-powered e-commerce platform',
      url: 'https://manus-ai-shop.vercel.app',
      category: 'E-commerce',
      status: 'Live',
      technologies: ['Next.js', 'AI', 'E-commerce'],
      image: '/placeholder.svg',
    },
    {
      id: 4,
      title: 'BidMaster Hub',
      description: 'Project bidding management platform',
      url: 'https://bidmaster-hub.vercel.app',
      category: 'Business',
      status: 'Live',
      technologies: ['Next.js', 'Business Logic', 'Management'],
      image: '/placeholder.svg',
    },
    {
      id: 5,
      title: 'Cart & Online Payment',
      description: 'Model Context Protocol template application',
      url: 'https://nextjs-mcp-template.vercel.app',
      category: 'Development',
      status: 'Live',
      technologies: ['Next.js', 'MCP', 'Template'],
      image: '/placeholder.svg',
    },
    {
      id: 6,
      title: 'Friendship Daycare',
      description: 'Childcare and daycare management system',
      url: 'https://friendship-daycare.vercel.app',
      category: 'Business',
      status: 'Live',
      technologies: ['Next.js', 'Management', 'Childcare'],
      image: '/placeholder.svg',
    },
  ]

  function LocalImageCarousel({
    images,
    alt,
  }: {
    images: string[]
    alt: string
  }) {
    const [index, setIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const validImages = images.filter(Boolean)

    useEffect(() => {
      if (validImages.length <= 1) return
      const id = setInterval(() => {
        setIndex(prev => (prev + 1) % validImages.length)
      }, 4000)
      return () => clearInterval(id)
    }, [validImages.length])

    if (validImages.length === 0) {
      return (
        <div className='w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100' />
      )
    }

    const goToPrevious = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIndex(prev => (prev - 1 + validImages.length) % validImages.length)
    }

    const goToNext = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIndex(prev => (prev + 1) % validImages.length)
    }

    const goToSlide = (e: React.MouseEvent, slideIndex: number) => {
      e.stopPropagation()
      setIndex(slideIndex)
    }

    return (
      <div
        className='relative w-full h-full overflow-hidden'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image with scale transform - separate from indicators */}
        <div className='absolute inset-0 w-full h-full z-0'>
          <Image
            src={validImages[index]}
            alt={alt}
            fill
            className='object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
            style={{
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        {/* Navigation Arrows - Fixed position, only visible when hovering carousel */}
        {validImages.length > 1 && (
          <>
            {/* Left Arrow - Light gray, semi-transparent, rounded square, only visible on carousel hover */}
            <button
              onClick={goToPrevious}
              className='absolute left-2 top-1/2 z-30 bg-gray-200/80 hover:bg-gray-300/90 text-gray-700 rounded-md p-1.5 transition-opacity duration-200 pointer-events-auto'
              aria-label='Previous image'
              style={{
                transform: 'translateY(-50%)',
                willChange: 'opacity',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <ArrowRight className='h-4 w-4 rotate-180' />
            </button>

            {/* Right Arrow - Light gray, semi-transparent, rounded square, only visible on carousel hover */}
            <button
              onClick={goToNext}
              className='absolute right-2 top-1/2 z-30 bg-gray-200/80 hover:bg-gray-300/90 text-gray-700 rounded-md p-1.5 transition-opacity duration-200 pointer-events-auto'
              aria-label='Next image'
              style={{
                transform: 'translateY(-50%)',
                willChange: 'opacity',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <ArrowRight className='h-4 w-4' />
            </button>

            {/* Pagination Dots - Always visible, fixed position at bottom */}
            <div
              className='absolute bottom-2 left-1/2 z-30 flex gap-1.5 pointer-events-auto'
              style={{ transform: 'translateX(-50%)', willChange: 'auto' }}
            >
              {validImages.map((_, i) => (
                <button
                  key={i}
                  onClick={e => goToSlide(e, i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  const stats = [
    {
      icon: <Rocket className='h-8 w-8 text-blue-500' />,
      label: 'Live Projects',
      value: 19,
      suffix: '+',
    },
    {
      icon: <Users className='h-8 w-8 text-green-500' />,
      label: 'Happy Clients',
      value: 50,
      suffix: '+',
    },
    {
      icon: <TrendingUp className='h-8 w-8 text-purple-500' />,
      label: 'Success Rate',
      value: 100,
      suffix: '%',
    },
    {
      icon: <Clock className='h-8 w-8 text-orange-500' />,
      label: 'Years Experience',
      value: 20,
      suffix: '+',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          <Image
            src='/optimized/global.webp'
            alt='Global technology background'
            fill
            className='object-cover object-center opacity-20 pointer-events-none'
            priority={false}
          />


          <div className='max-w-7xl mx-auto px-4 relative z-30'>
            <div className='text-left mb-20 max-w-2xl'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30 animate-fade-in backdrop-blur-sm'>
                <Rocket className='h-4 w-4 text-cyan-300 animate-float' />
                <span>Live Projects Portfolio • Interactive Demos</span>
              </div>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-8'>
                <AnimatedHeadline
                  text={t('title', 'case-studies')}
                  className='text-5xl md:text-6xl lg:text-7xl font-bold'
                />
              </h1>
              <p className='text-xl md:text-2xl text-blue-100/90 max-w-2xl leading-relaxed mb-8'>
                {t('subtitle', 'case-studies')}
              </p>
              <div className='flex flex-wrap gap-6 text-sm text-blue-200/80'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>9+ Live Projects</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>Multiple Industries</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>Modern Tech Stack</span>
                </div>
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
                  <div key={stat.label} className='text-center'>
                    <div className='flex justify-center mb-4'>{stat.icon}</div>
                    <div className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                      <AnimatedCounter
                        value={stat.value}
                        duration={2}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className='text-sm text-gray-600 font-medium'>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Projects Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-20 bg-gradient-to-br from-blue-50 to-cyan-50'>
            <div className='container mx-auto px-4'>
              <div className='text-center mb-16'>
                <FadeIn delay={0.2} duration={0.8}>
                  <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                    Our Live Projects
                  </h2>
                  <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                    We believe in transparency. Below are public-facing
                    prototypes (MVPs and PoCs) built from our successful
                    enterprise applications, demonstrating our capabilities and
                    innovative approach.
                  </p>
                </FadeIn>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {projects.map((project, index) => (
                  <SlideIn
                    key={project.id}
                    direction='up'
                    delay={index * 0.1}
                    duration={0.6}
                  >
                    <Card
                      hover={false}
                      animated={false}
                      className='group h-[500px] overflow-hidden rounded-xl bg-white border-0 shadow-lg hover:shadow-xl hover:shadow-gray-900/20 transition-[shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col !gap-0 !py-0'
                    >
                      {/* Image First - 60% of card height (300px), extends to card edges */}
                      <div className='relative w-full h-[300px] overflow-hidden flex-shrink-0'>
                        {/* Project Image */}
                        <div className='w-full h-full'>
                          {(() => {
                            // Local folder carousels by project id
                            const idToLocalImages: Record<number, string[]> = {
                              1: [
                                `${BASE_URL}/face-fusion-agent/f1.png`,
                                `${BASE_URL}/face-fusion-agent/f2.png`,
                                `${BASE_URL}/face-fusion-agent/f3.png`,
                                `${BASE_URL}/face-fusion-agent/f5.png`,
                                `${BASE_URL}/face-fusion-agent/f6.png`,
                              ],
                              2: [
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n1.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n2.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n3.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n4.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n5.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n6.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n7.png`,
                                `${BASE_URL}/nextjs-supabase-kappa-nine/n8.png`,
                              ],
                              3: [
                                `${BASE_URL}/manus-ai-shop/m1.png`,
                                `${BASE_URL}/manus-ai-shop/m2.png`,
                                `${BASE_URL}/manus-ai-shop/m3.png`,
                                `${BASE_URL}/manus-ai-shop/m4.png`,
                                `${BASE_URL}/manus-ai-shop/m5.png`,
                                `${BASE_URL}/manus-ai-shop/m6.png`,
                                `${BASE_URL}/manus-ai-shop/m7.png`,
                              ],
                              6: [
                                `${BASE_URL}/friendshipdaycare/f1.png`,
                                `${BASE_URL}/friendshipdaycare/f10.png`,
                              ],
                            }

                            const carouselImages =
                              idToLocalImages[project.id as number]

                            if (carouselImages && carouselImages.length > 0) {
                              return (
                                <LocalImageCarousel
                                  images={carouselImages}
                                  alt={project.title}
                                />
                              )
                            }

                            const jimengImages = getImages()
                              .filter(a => a.filename.startsWith('jimeng-'))
                              .map(a => a.url)

                            // Use specific 4-image carousels for BidMaster Hub (id 4) and NextJS MCP Template (id 5)
                            if (project.id === 4 || project.id === 5) {
                              const assets = getImages()
                              const wantedFilenames =
                                project.id === 4
                                  ? [
                                      'jimeng-1.png',
                                      'jimeng-2.png',
                                      'jimeng-3.png',
                                      'jimeng-4.png',
                                    ]
                                  : [
                                      'jimeng-6.png',
                                      'jimeng-7.png',
                                      'jimeng-8.png',
                                      'jimeng-9.png',
                                    ]

                              const selected = wantedFilenames
                                .map(
                                  name =>
                                    assets.find(a => a.filename === name)?.url
                                )
                                .filter(Boolean) as string[]

                              if (selected.length > 0) {
                                return (
                                  <LocalImageCarousel
                                    images={selected}
                                    alt={project.title}
                                  />
                                )
                              }
                            }

                            const randomJimeng =
                              jimengImages.length > 0
                                ? jimengImages[
                                    (project.id + project.title).length %
                                      jimengImages.length >>>
                                      0
                                  ]
                                : null

                            return randomJimeng ? (
                              <div className='w-full h-full'>
                                <R2CardImage
                                  src={randomJimeng}
                                  alt={project.title}
                                  className='w-full h-full object-cover !rounded-none group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
                                  animation='fade'
                                  delay={0.2}
                                  hover={false}
                                  overlay={true}
                                  overlayContent={
                                    <div className='text-white text-center'>
                                      <div className='w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center'>
                                        <ArrowRight className='w-4 h-4' />
                                      </div>
                                      <p className='text-xs font-medium'>
                                        View Project
                                      </p>
                                    </div>
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className='w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center'
                                style={{ height: '100%' }}
                              >
                                <div className='text-center'>
                                  <Code2 className='w-8 h-8 text-blue-400 mx-auto mb-2' />
                                  <p className='text-gray-600 text-sm'>
                                    {project.title}
                                  </p>
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                        {/* Status Badge Overlay on Image */}
                        <div className='absolute top-4 left-4 z-10'>
                          <div className='flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full'>
                            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                            <span className='text-sm font-medium text-green-700'>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content - Compressed to fit in remaining 40% (200px) */}
                      <CardContent className='flex flex-col flex-1 p-4 min-h-0 overflow-hidden'>
                        {/* Title */}
                        <CardHeader className='p-0 pb-2'>
                          <CardTitle className='text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 break-words'>
                            <Link
                              href={project.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='hover:underline'
                              title={project.url}
                              onClick={e => {
                                e.preventDefault()
                              }}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                }
                              }}
                            >
                              {project.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>

                        <p className='text-gray-600 mb-3 leading-tight text-sm flex-grow line-clamp-2'>
                          {project.description}
                        </p>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex flex-wrap gap-1.5'>
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant='outline'
                                  className='text-xs bg-gray-50 text-gray-700 border-gray-200'
                                >
                                  {tech}
                                </Badge>
                              ))}
                          </div>
                          <MoreHorizontal className='w-4 h-4 text-gray-400' />
                        </div>
                        <Button
                          asChild
                          className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm py-2'
                        >
                          <Link
                            href={project.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center justify-center gap-2'
                            title={project.url}
                            onClick={e => {
                              e.preventDefault()
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                              }
                            }}
                          >
                            <Github className='h-4 w-4' />
                            <span>View Project</span>
                            <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </SlideIn>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>
              Ready to Build Your Next Project?
            </h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Let's discuss your project requirements and create a solution that
              drives your business forward with cutting-edge technology.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3'
              >
                <Link href='/contact' className='flex items-center gap-2'>
                  <span>Start Your Project</span>
                  <ArrowRight className='h-5 w-5' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-white/30 text-white hover:bg-white/10 px-8 py-3'
              >
                <Link href='/portfolio' className='flex items-center gap-2'>
                  <span>View Portfolio</span>
                  <Globe className='h-5 w-5' />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
