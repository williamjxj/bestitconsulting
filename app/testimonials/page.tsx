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
import Image from 'next/image'

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechFlow Solutions',
      industry: 'Software',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'Best IT Consulting transformed our entire digital infrastructure. Their expertise in cloud migration saved us 60% on operational costs while improving our system reliability dramatically. The team was professional, responsive, and delivered beyond our expectations.',
      project: 'Cloud Migration & Infrastructure Modernization',
      results: [
        '60% cost reduction',
        '99.9% uptime achieved',
        '3x faster deployment',
      ],
      date: '2024',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'HealthVital Medical',
      industry: 'Healthcare',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'The healthcare management system BestIT developed for us has revolutionized our patient care process. The HIPAA-compliant solution streamlined our operations and significantly improved patient satisfaction scores.',
      project: 'Healthcare Management System',
      results: [
        '30% faster check-ins',
        '25% higher satisfaction',
        '100% HIPAA compliance',
      ],
      date: '2024',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Director of Operations',
      company: 'RetailMax Enterprise',
      industry: 'Retail',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'Our e-commerce platform built by BestIT has exceeded all performance expectations. The scalable architecture handles millions of transactions seamlessly, and the conversion rate improvements have significantly boosted our revenue.',
      project: 'E-Commerce Platform Development',
      results: [
        '40% conversion increase',
        '500K+ monthly users',
        'Zero downtime',
      ],
      date: '2023',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'VP of Technology',
      company: 'FinanceCore Bank',
      industry: 'Finance',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'The real-time analytics dashboard BestITConsulting created has transformed how we make financial decisions. The insights we gain from their sophisticated data visualization platform have led to better investment strategies and risk management.',
      project: 'Financial Analytics Dashboard',
      results: [
        '70% faster insights',
        '90% report automation',
        '$2M annual savings',
      ],
      date: '2023',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Fleet Manager',
      company: 'LogiTrans Solutions',
      industry: 'Transportation',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'The IoT fleet management system has revolutionized our operations. Real-time tracking, predictive maintenance, and route optimization have significantly reduced our operational costs while improving service quality.',
      project: 'IoT Fleet Management System',
      results: [
        '35% fuel savings',
        '50% maintenance reduction',
        '25% faster deliveries',
      ],
      date: '2023',
    },
    {
      id: 6,
      name: 'Robert Wilson',
      role: 'Manufacturing Director',
      company: 'IndustryMax Corp',
      industry: 'Manufacturing',
      image: '/placeholder.svg',
      rating: 5,
      content:
        "BestIT's cloud migration platform made our digital transformation seamless. The automated assessment and migration tools saved us months of work, and the cost optimization recommendations continue to provide value.",
      project: 'Enterprise Cloud Migration',
      results: [
        '60% infrastructure savings',
        '80% reliability improvement',
        'Zero-downtime migration',
      ],
      date: '2022',
    },
    {
      id: 7,
      name: 'Jennifer Davis',
      role: 'Customer Success Director',
      company: 'TeleConnect Inc',
      industry: 'Telecommunications',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'The AI-powered customer service platform has transformed our support operations. The intelligent chatbot and sentiment analysis have dramatically improved response times and customer satisfaction rates.',
      project: 'AI Customer Service Platform',
      results: [
        '75% faster responses',
        '90% satisfaction rate',
        '50% ticket reduction',
      ],
      date: '2022',
    },
    {
      id: 8,
      name: 'Mark Anderson',
      role: 'Innovation Lead',
      company: 'StartupLaunch',
      industry: 'Technology',
      image: '/placeholder.svg',
      rating: 5,
      content:
        'As a startup, we needed a reliable technology partner who could scale with us. BestIT not only delivered an amazing MVP but also provided ongoing support that helped us secure our Series A funding.',
      project: 'MVP Development & Scaling',
      results: ['Series A secured', '100K+ users acquired', '99.9% uptime'],
      date: '2024',
    },
  ]

  const stats = [
    {
      icon: <Users className='h-8 w-8 text-blue-500' />,
      number: '500+',
      label: 'Happy Clients',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: <Star className='h-8 w-8 text-yellow-500' />,
      number: '4.9/5',
      label: 'Average Rating',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <CheckCircle className='h-8 w-8 text-green-500' />,
      number: '98%',
      label: 'Satisfaction Rate',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: <Globe className='h-8 w-8 text-purple-500' />,
      number: '50+',
      label: 'Countries Served',
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
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
            <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <ThumbsUp className='h-4 w-4 text-cyan-300' />
                <span>4.9/5 Rating • 98% Client Satisfaction</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <span className='block'>Client</span>
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400'>
                  Testimonials
                </span>
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed'>
                Discover why hundreds of businesses trust Best IT Consulting to
                deliver exceptional technology solutions and drive their digital
                transformation success.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact'>
                    <MessageSquare className='mr-2 h-5 w-5' />
                    Share Your Story
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/portfolio'>
                    <Rocket className='mr-2 h-5 w-5' />
                    View Our Work
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
                    icon: <Users className='h-8 w-8 text-blue-500' />,
                    number: 500,
                    label: 'Happy Clients',
                    gradient: 'from-blue-400 to-cyan-500',
                    suffix: '+',
                  },
                  {
                    icon: <Star className='h-8 w-8 text-yellow-500' />,
                    number: 4.9,
                    label: 'Average Rating',
                    gradient: 'from-yellow-400 to-orange-500',
                    suffix: '/5',
                  },
                  {
                    icon: <CheckCircle className='h-8 w-8 text-green-500' />,
                    number: 98,
                    label: 'Satisfaction Rate',
                    gradient: 'from-green-400 to-emerald-500',
                    suffix: '%',
                  },
                  {
                    icon: <Globe className='h-8 w-8 text-purple-500' />,
                    number: 50,
                    label: 'Countries Served',
                    gradient: 'from-purple-400 to-pink-500',
                    suffix: '+',
                  },
                ].map((stat, index) => (
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
                        >
                          {stat.number}
                        </AnimatedCounter>
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
              {[1, 2, 3].map(index => (
                <div
                  key={index}
                  className='group relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  <div className='aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center'>
                    <div className='w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer'>
                      <div className='w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1'></div>
                    </div>
                  </div>
                  <div className='p-4'>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Client Success Story #{index}
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      See how we transformed their business
                    </p>
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
