'use client'

import { useRef, useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { AnimatedBeam } from '@/components/ui/animated-beam'
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
  Star,
  Award,
  Zap,
  Monitor,
  Database,
  Cloud,
  Brain,
  FileCode,
  Server,
  BarChart3,
  Layers,
  GitBranch,
  Settings,
  Cpu,
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

  // Get R2 assets for our work page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS['our-work'].hero)
  const project1Image = getAssetByFilename(
    R2_ASSET_MAPPINGS['our-work'].project1
  )
  const project2Image = getAssetByFilename(
    R2_ASSET_MAPPINGS['our-work'].project2
  )
  const project3Image = getAssetByFilename(
    R2_ASSET_MAPPINGS['our-work'].project3
  )

  // Refs for animated beam nodes
  const containerRef = useRef<HTMLDivElement>(null!)
  const node1Ref = useRef<HTMLDivElement>(null!)
  const node2Ref = useRef<HTMLDivElement>(null!)
  const node3Ref = useRef<HTMLDivElement>(null!)
  const node4Ref = useRef<HTMLDivElement>(null!)
  const node5Ref = useRef<HTMLDivElement>(null!)
  const node6Ref = useRef<HTMLDivElement>(null!)
  const node7Ref = useRef<HTMLDivElement>(null!)
  const node8Ref = useRef<HTMLDivElement>(null!)
  const centerNodeRef = useRef<HTMLDivElement>(null!)

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

    return (
      <div className='relative w-full h-full overflow-hidden'>
        <img
          src={validImages[index]}
          alt={alt}
          className='w-full h-full object-cover transition-opacity duration-700'
        />
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
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            {/* Main gradient background with shifting animation */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 bg-[length:200%_200%] animate-gradient-shift'></div>

            {/* Floating orbs with different animations */}
            <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-ambient-pulse'></div>
            <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>

            {/* Additional floating particles */}
            <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-purple-400/10 to-transparent rounded-full animate-particle-float parallax-float'></div>
            <div
              className='absolute top-3/4 right-1/3 w-24 h-24 bg-gradient-radial from-cyan-300/15 to-transparent rounded-full animate-particle-float gentle-rotate'
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className='absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-radial from-blue-400/10 to-transparent rounded-full animate-particle-float breathe'
              style={{ animationDelay: '4s' }}
            ></div>

            {/* Subtle wave animation */}
            <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent animate-wave'></div>

            {/* Glowing accent elements */}
            <div className='absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-glow soft-glow'></div>
            <div
              className='absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-glow gentle-rotate'
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className='absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-glow breathe'
              style={{ animationDelay: '2s' }}
            ></div>
          </div>

          {/* Animated Beam Background */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none z-10'>
            <div className='relative h-full w-full' ref={containerRef}>
              {/* Technology nodes for animated beams - positioned on far right to avoid content overlap */}
              <div
                className='absolute top-1/5 right-1/6 w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400/30 flex items-center justify-center'
                ref={node1Ref}
              >
                <Brain className='h-8 w-8 text-blue-300' />
              </div>
              <div
                className='absolute top-1/3 right-1/5 w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400/30 flex items-center justify-center'
                ref={node2Ref}
              >
                <FileCode className='h-8 w-8 text-cyan-300' />
              </div>
              <div
                className='absolute bottom-1/3 right-1/6 w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400/30 flex items-center justify-center'
                ref={node3Ref}
              >
                <Server className='h-8 w-8 text-purple-300' />
              </div>
              <div
                className='absolute bottom-1/5 right-1/5 w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400/30 flex items-center justify-center'
                ref={node4Ref}
              >
                <BarChart3 className='h-8 w-8 text-green-300' />
              </div>
              <div
                className='absolute top-1/6 right-1/8 w-14 h-14 rounded-full bg-orange-500/20 border-2 border-orange-400/30 flex items-center justify-center'
                ref={node5Ref}
              >
                <Layers className='h-6 w-6 text-orange-300' />
              </div>
              <div
                className='absolute top-2/3 right-1/8 w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-400/30 flex items-center justify-center'
                ref={node6Ref}
              >
                <GitBranch className='h-6 w-6 text-red-300' />
              </div>
              <div
                className='absolute bottom-1/6 right-1/5 w-14 h-14 rounded-full bg-indigo-500/20 border-2 border-indigo-400/30 flex items-center justify-center'
                ref={node7Ref}
              >
                <Settings className='h-6 w-6 text-indigo-300' />
              </div>
              <div
                className='absolute top-1/2 right-1/8 w-14 h-14 rounded-full bg-pink-500/20 border-2 border-pink-400/30 flex items-center justify-center'
                ref={node8Ref}
              >
                <Cpu className='h-6 w-6 text-pink-300' />
              </div>
              <div
                className='absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-white/20 flex items-center justify-center'
                ref={centerNodeRef}
              >
                <Target className='h-10 w-10 text-white' />
              </div>

              {/* Animated Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node1Ref}
                toRef={centerNodeRef}
                curvature={50}
                duration={4}
                delay={0}
                gradientStartColor='#93c5fd'
                gradientStopColor='#1e40af'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node2Ref}
                toRef={centerNodeRef}
                curvature={-50}
                duration={4}
                delay={0.5}
                gradientStartColor='#67e8f9'
                gradientStopColor='#0e7490'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node3Ref}
                toRef={centerNodeRef}
                curvature={50}
                duration={4}
                delay={1.0}
                gradientStartColor='#c084fc'
                gradientStopColor='#6b21a8'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node4Ref}
                toRef={centerNodeRef}
                curvature={-50}
                duration={4}
                delay={1.5}
                gradientStartColor='#6ee7b7'
                gradientStopColor='#047857'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node5Ref}
                toRef={centerNodeRef}
                curvature={30}
                duration={4}
                delay={2.0}
                gradientStartColor='#fed7aa'
                gradientStopColor='#c2410c'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node6Ref}
                toRef={centerNodeRef}
                curvature={-30}
                duration={4}
                delay={2.5}
                gradientStartColor='#fca5a5'
                gradientStopColor='#b91c1c'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node7Ref}
                toRef={centerNodeRef}
                curvature={40}
                duration={4}
                delay={3.0}
                gradientStartColor='#a5b4fc'
                gradientStopColor='#3730a3'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node8Ref}
                toRef={centerNodeRef}
                curvature={-40}
                duration={4}
                delay={3.5}
                gradientStartColor='#f9a8d4'
                gradientStopColor='#be185d'
              />
            </div>
          </div>

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
                    <Card className='group h-full overflow-hidden rounded-xl bg-white border-0 shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 flex flex-col !gap-0 !py-0'>
                      {/* Image First - No margin, extends to card edges */}
                      <div className='relative w-full aspect-video overflow-hidden'>
                        {/* Project Image */}
                        <div className='w-full h-full transition-transform duration-300 group-hover:scale-[1.2]'>
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
                              <R2CardImage
                                src={randomJimeng}
                                alt={project.title}
                                className='w-full h-full object-cover !rounded-none'
                                animation='fade'
                                delay={0.2}
                                hover={true}
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
                            ) : (
                              <div className='w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center'>
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
                        {/* Category Badge Overlay on Image */}
                        <div className='absolute top-4 right-4 z-10'>
                          <Badge
                            variant='secondary'
                            className='bg-blue-100/90 backdrop-blur-sm text-blue-800 border-blue-200 whitespace-nowrap'
                          >
                            {project.category}
                          </Badge>
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

                      {/* Content */}
                      <CardContent className='flex flex-col h-full p-6'>
                        {/* Title */}
                        <CardHeader className='p-0 pb-3'>
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

                        <p className='text-gray-600 mb-4 leading-relaxed flex-grow'>
                          {project.description}
                        </p>
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex flex-wrap gap-2'>
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
                          <MoreHorizontal className='w-5 h-5 text-gray-400' />
                        </div>
                        <Button
                          asChild
                          className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
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
