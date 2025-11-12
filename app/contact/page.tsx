'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import SmartGoogleMap from '@/components/SmartGoogleMap'
import { AnimatedForm } from '@/components/ui/animated-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  MessageSquare,
  ArrowRight,
  Building,
  Shield,
  Award,
  HeadphonesIcon,
  Rocket,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CustomerInquiriesList } from '@/components/ui/customer-inquiries-list'
// Removed autoplay plugin; use custom LTR playback

/**
 * Contact page component with hero carousel
 *
 * Features:
 * - Hero section with animated text carousel (3 slides)
 * - Contact form with validation
 * - Office information and map
 * - Benefits banner
 * - Full internationalization support
 *
 * Carousel Implementation:
 * - Uses shadcn/ui Carousel component with embla-carousel-autoplay
 * - Autoplay: 4-second intervals, stops on interaction
 * - Three slides with translated content from i18n
 * - Full accessibility support (ARIA labels, keyboard navigation)
 * - Responsive navigation buttons
 */
export default function ContactPage() {
  const { t } = useI18n()
  const [emblaApi, setEmblaApi] = useState<any>(null)
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)

  // Get subject from URL query param - read immediately on client side
  const [initialSubject, setInitialSubject] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const title = params.get('title')
      return title ? decodeURIComponent(title) : ''
    }
    return ''
  })

  // Update subject when URL changes (e.g., browser back/forward or navigation)
  useEffect(() => {
    const checkSubject = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        const title = params.get('title')
        const newSubject = title ? decodeURIComponent(title) : ''
        setInitialSubject(newSubject)
      }
    }

    // Check immediately and on navigation
    checkSubject()
    window.addEventListener('popstate', checkSubject)

    return () => {
      window.removeEventListener('popstate', checkSubject)
    }
  }, [])

  // Auto-play left-to-right: advance to the previous slide so content flows to the right
  useEffect(() => {
    if (!emblaApi || isCarouselHovered) return // Pause when hovered
    const id = setInterval(() => {
      try {
        emblaApi.scrollPrev()
      } catch {}
    }, 4000)
    return () => clearInterval(id)
  }, [emblaApi, isCarouselHovered])
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      placeholder: 'Enter your full name',
      required: true,
      width: 'full' as const,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'Enter your email address',
      required: true,
      width: 'half' as const,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      placeholder: 'Enter your phone number',
      required: false,
      width: 'half' as const,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text' as const,
      placeholder: 'Enter your company name',
      required: false,
      width: 'full' as const,
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text' as const,
      placeholder: 'Enter subject',
      required: false,
      width: 'full' as const,
    },
    {
      name: 'service',
      label: 'Service Interest',
      type: 'select' as const,
      placeholder: 'Select a service',
      required: false,
      options: [
        { value: 'web-development', label: 'Web Development' },
        { value: 'mobile-apps', label: 'Mobile Apps' },
        { value: 'cloud-solutions', label: 'Cloud Solutions' },
        { value: 'ai-ml', label: 'AI & Machine Learning' },
        { value: 'devops', label: 'DevOps' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'other', label: 'Other (specify in message)' },
      ],
      width: 'full' as const,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea' as const,
      placeholder: 'Tell us about your project requirements...',
      required: true,
      width: 'full' as const,
    },
  ]

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      throw new Error('Failed to submit form')
    }
  }

  const [submitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const openGoogleMaps = (address: string, postal: string) => {
    const fullAddress = `${address}, ${postal}`
    const encodedAddress = encodeURIComponent(fullAddress)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  const offices = [
    {
      city: 'Surrey Guildford',
      country: 'Canada',
      address: '10355 152 St',
      postal: 'Surrey, BC V3R 7C3',
      phone: '+1 (236) 992-3846',
      isHeadquarters: false,
      coordinates: '49.189201, -122.804169',
    },
  ]

  const benefits = [
    {
      icon: <Rocket className='h-5 w-5' />,
      title: 'Free Consultation',
      description: '30-minute strategy session',
    },
    {
      icon: <Shield className='h-5 w-5' />,
      title: 'NDA Protection',
      description: 'Your ideas are safe with us',
    },
    {
      icon: <Award className='h-5 w-5' />,
      title: 'Expert Team',
      description: '50+ certified professionals',
    },
    {
      icon: <HeadphonesIcon className='h-5 w-5' />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Compact Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          <Image
            src='/optimized/global.webp'
            alt='Global technology background'
            fill
            className='object-cover object-center opacity-20 pointer-events-none'
            priority={false}
          />
          <div className='container mx-auto px-4 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
              {/* Left Column - Hero Content */}
              <div className='text-center lg:text-left max-w-4xl mx-auto lg:mx-0'>
                <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30'>
                  <MessageSquare className='h-4 w-4 text-cyan-300' />
                  <span>{t('hero.badge', 'contact')}</span>
                </div>

                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                  <AnimatedHeadline
                    text={t('hero.title', 'contact')}
                    className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'
                  />
                </h1>

                {/* Carousel for Hero Text */}
                <div
                  className='mb-8 max-w-2xl mx-auto lg:mx-0 relative'
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                >
                  <Carousel
                    setApi={setEmblaApi}
                    opts={{
                      align: 'start',
                      loop: true,
                      direction: 'ltr',
                    }}
                    className='w-full'
                    role='region'
                    aria-roledescription='carousel'
                  >
                    <CarouselContent>
                      <CarouselItem
                        role='group'
                        aria-roledescription='slide'
                        aria-label='Slide 1 of 3'
                      >
                        <p className='text-lg md:text-xl text-blue-100/90 text-center lg:text-left px-4 lg:px-0'>
                          {t('carousel.slide1', 'contact')}
                        </p>
                      </CarouselItem>
                      <CarouselItem
                        role='group'
                        aria-roledescription='slide'
                        aria-label='Slide 2 of 3'
                      >
                        <p className='text-lg md:text-xl text-blue-100/90 text-center lg:text-left px-4 lg:px-0'>
                          {t('carousel.slide2', 'contact')}
                        </p>
                      </CarouselItem>
                      <CarouselItem
                        role='group'
                        aria-roledescription='slide'
                        aria-label='Slide 3 of 3'
                      >
                        <p className='text-lg md:text-xl text-blue-100/90 text-center lg:text-left px-4 lg:px-0'>
                          {t('carousel.slide3', 'contact')}
                        </p>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious
                      className='left-0 md:-left-12 text-white border-white/30 hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm'
                      aria-label='Previous slide'
                    />
                    <CarouselNext
                      className='right-0 md:-right-12 text-white border-white/30 hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm'
                      aria-label='Next slide'
                    />
                  </Carousel>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center'>
                  <Button
                    size='lg'
                    className='group text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    asChild
                  >
                    <Link href='#contact-form'>
                      <Send className='mr-2 h-5 w-5' />
                      {t('hero.getConsultation', 'contact')}
                      <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                    </Link>
                  </Button>
                  <Button
                    size='lg'
                    variant='outline'
                    className='text-lg px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20'
                    asChild
                  >
                    <Link href='#contact-methods'>
                      <Phone className='mr-2 h-5 w-5' />
                      {t('hero.callNow', 'contact')}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column - Customer Inquiries List */}
              <div className='flex justify-end items-start'>
                <CustomerInquiriesList />
              </div>
            </div>
          </div>
        </section>

        {/* Compact Benefits Banner */}
        <section className='py-8 px-4 bg-white/50 border-b border-gray-200/50'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center gap-3 justify-center text-center'
                >
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0'>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 text-sm'>
                      {benefit.title}
                    </h4>
                    <p className='text-gray-600 text-xs'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section - Form + Info */}
        <section id='contact-form' className='py-16 px-4'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Contact Form */}
              <div className='lg:col-span-2'>
                <Card
                  className='border-0 shadow-xl bg-white'
                  hover={false}
                  animated={false}
                >
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>
                      {t('form.title', 'contact')}
                    </CardTitle>
                    <p className='text-gray-600'>
                      {t('form.description', 'contact')}
                    </p>
                  </CardHeader>
                  <CardContent className='p-6 pt-0'>
                    {submitStatus === 'success' && (
                      <div className='mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <CheckCircle className='h-5 w-5 text-green-600' />
                          <div>
                            <h4 className='font-semibold text-green-800'>
                              {t('form.success.title', 'contact')}
                            </h4>
                            <p className='text-green-700 text-sm'>
                              {t('form.success.description', 'contact')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className='mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <AlertCircle className='h-5 w-5 text-red-600' />
                          <div>
                            <h4 className='font-semibold text-red-800'>
                              {t('form.error.title', 'contact')}
                            </h4>
                            <p className='text-red-700 text-sm'>
                              {t('form.error.description', 'contact')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <AnimatedForm
                      key={initialSubject}
                      fields={formFields}
                      onSubmit={handleFormSubmit}
                      submitText='Send Message'
                      initialValues={
                        initialSubject ? { subject: initialSubject } : {}
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information - Compact Sidebar */}
              <div className='space-y-6'>
                {/* Contact Methods */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='text-lg font-bold text-gray-900'>
                      Get In Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                      <Phone className='h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-semibold text-gray-900'>
                          +1 (236) 992-3846
                        </p>
                        <p className='text-sm text-gray-600'>
                          Mon-Fri 9AM-6PM EST
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 bg-green-50 rounded-lg'>
                      <Mail className='h-5 w-5 text-green-600' />
                      <div>
                        <p className='font-semibold text-gray-900'>
                          service@bestitconsulting.ca
                        </p>
                        <p className='text-sm text-gray-600'>
                          Response within 24 hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Location */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                      <Building className='h-5 w-5 text-blue-600' />
                      Our Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-start gap-3'>
                      <div
                        className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300'
                        onClick={() =>
                          openGoogleMaps(offices[0].address, offices[0].postal)
                        }
                        title='Open in Google Maps'
                      >
                        <MapPin className='h-5 w-5 text-white' />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-900 mb-1'>
                          {offices[0].city}
                        </h4>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                          <span
                            className='cursor-pointer hover:text-blue-600 transition-colors duration-300'
                            onClick={() =>
                              openGoogleMaps(
                                offices[0].address,
                                offices[0].postal
                              )
                            }
                            title='Open in Google Maps'
                          >
                            {offices[0].address}
                            <br />
                            {offices[0].postal}
                          </span>
                          <br />
                          <span className='text-blue-600'>
                            {offices[0].phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                      <Clock className='h-5 w-5 text-green-600' />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>
                          Monday - Friday
                        </span>
                        <span className='font-semibold text-gray-900 text-sm'>
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Saturday</span>
                        <span className='font-semibold text-gray-900 text-sm'>
                          10:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Sunday</span>
                        <span className='font-semibold text-gray-900 text-sm'>
                          Closed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='text-lg font-bold text-gray-900'>
                      Follow Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-2'>
                      {[
                        {
                          icon: <Linkedin className='h-4 w-4' />,
                          name: 'LinkedIn',
                          gradient: 'from-blue-600 to-blue-700',
                        },
                        {
                          icon: <Twitter className='h-4 w-4' />,
                          name: 'Twitter',
                          gradient: 'from-blue-400 to-blue-500',
                        },
                        {
                          icon: <Github className='h-4 w-4' />,
                          name: 'GitHub',
                          gradient: 'from-gray-700 to-gray-800',
                        },
                        {
                          icon: <Youtube className='h-4 w-4' />,
                          name: 'YouTube',
                          gradient: 'from-red-600 to-red-700',
                        },
                      ].map((social, index) => (
                        <Button
                          key={index}
                          variant='outline'
                          className={`flex items-center gap-2 justify-center bg-gradient-to-r ${social.gradient} text-white border-0 hover:shadow-lg transition-all duration-300 text-xs py-2`}
                          size='sm'
                        >
                          {social.icon}
                          {social.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Find Our Office Section */}
        <section className='py-16 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Find Our Office
              </h2>
              <p className='text-lg text-gray-600'>
                Visit us at our location in Great Vancouver, Canada
              </p>
            </div>

            {/* Google Maps Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Map */}
              <div className='lg:col-span-2'>
                <div className='border-0 shadow-xl bg-white overflow-hidden rounded-lg'>
                  <SmartGoogleMap
                    addresses={offices}
                    height='400px'
                    className='w-full'
                  />
                </div>
              </div>

              {/* Office Details */}
              <div>
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                      <MapPin className='h-5 w-5 text-blue-600' />
                      Office Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div>
                        <h4 className='font-semibold text-gray-900 mb-2'>
                          {offices[0].city}
                        </h4>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                          {offices[0].address}
                          <br />
                          {offices[0].postal}
                          <br />
                          <span className='text-blue-600 font-medium'>
                            {offices[0].phone}
                          </span>
                        </p>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full text-xs'
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                              offices[0].address + ', ' + offices[0].postal
                            )}`,
                            '_blank'
                          )
                        }
                      >
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className='py-12 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>
              {t('cta.title', 'contact')}
            </h2>
            <p className='text-lg text-blue-100/90 mb-6 max-w-2xl mx-auto'>
              {t('cta.description', 'contact')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='#contact-form'>
                  <Send className='mr-2 h-5 w-5' />
                  {t('cta.startProject', 'contact')}
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20'
                asChild
              >
                <Link href='/portfolio'>
                  <Building className='mr-2 h-5 w-5' />
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
