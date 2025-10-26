'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import SmartGoogleMap from '@/components/SmartGoogleMap'
import { AnimatedForm } from '@/components/ui/animated-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
} from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'Enter your email address',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      placeholder: 'Enter your phone number',
      required: false,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text' as const,
      placeholder: 'Enter your company name',
      required: false,
    },
    {
      name: 'service',
      label: 'Service Interest',
      type: 'select' as const,
      placeholder: 'Select a service',
      required: true,
      options: [
        { value: 'web-development', label: 'Web Development' },
        { value: 'mobile-apps', label: 'Mobile Apps' },
        { value: 'cloud-solutions', label: 'Cloud Solutions' },
        { value: 'ai-ml', label: 'AI & Machine Learning' },
        { value: 'devops', label: 'DevOps' },
        { value: 'consulting', label: 'Consulting' },
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea' as const,
      placeholder: 'Tell us about your project requirements...',
      required: true,
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

  const faqs = [
    {
      question: 'What is your typical project timeline?',
      answer:
        'Project timelines vary based on complexity, but most projects range from 2-6 months. We provide detailed timelines during our initial consultation.',
    },
    {
      question: 'Do you offer ongoing support and maintenance?',
      answer:
        'Yes, we provide comprehensive support packages including 24/7 monitoring, regular updates, and technical assistance to ensure your solution runs smoothly.',
    },
    {
      question: 'Can you work with our existing technology stack?',
      answer:
        'Absolutely! We specialize in integrating with existing systems and can work with virtually any technology stack to enhance your current infrastructure.',
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
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16'>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='text-center max-w-4xl mx-auto'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30'>
                <MessageSquare className='h-4 w-4 text-cyan-300' />
                <span>Free Consultation • Response within 24 hours</span>
              </div>

              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                <span className='block'>Let's Start Your</span>
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400'>
                  Digital Journey
                </span>
              </h1>

              <p className='text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
                Ready to transform your business with cutting-edge technology?
                Our expert team is here to turn your vision into reality.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='#contact-form'>
                    <Send className='mr-2 h-5 w-5' />
                    Get Free Consultation
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
                    Call Now
                  </Link>
                </Button>
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
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>
                      Start Your Project
                    </CardTitle>
                    <p className='text-gray-600'>
                      Tell us about your project requirements and we'll get back
                      to you within 24 hours with a detailed proposal.
                    </p>
                  </CardHeader>
                  <CardContent className='p-6 pt-0'>
                    {submitStatus === 'success' && (
                      <div className='mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <CheckCircle className='h-5 w-5 text-green-600' />
                          <div>
                            <h4 className='font-semibold text-green-800'>
                              Message sent successfully!
                            </h4>
                            <p className='text-green-700 text-sm'>
                              We'll get back to you within 24 hours.
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
                              Error sending message
                            </h4>
                            <p className='text-red-700 text-sm'>
                              Please try again or contact us directly.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <AnimatedForm
                      fields={formFields}
                      onSubmit={handleFormSubmit}
                      submitText='Send Message'
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
                          contact@bestitconsulting.ca
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

        {/* Compact Google Maps Section */}
        <section className='py-12 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Find Our Office
              </h2>
              <p className='text-lg text-gray-600'>
                Visit us at our Surrey Guildford location. Click on the map to
                get directions.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Map */}
              <div className='lg:col-span-2'>
                <Card className='border-0 shadow-xl bg-white overflow-hidden'>
                  <CardContent className='p-0'>
                    <SmartGoogleMap
                      addresses={offices}
                      height='400px'
                      className='w-full'
                    />
                  </CardContent>
                </Card>
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

        {/* Compact FAQ Section */}
        <section className='py-12 px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Frequently Asked Questions
              </h2>
              <p className='text-lg text-gray-600'>
                Quick answers to common questions about our services
              </p>
            </div>

            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'
                >
                  <CardContent className='p-4'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      {faq.question}
                    </h3>
                    <p className='text-gray-600 leading-relaxed'>
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className='py-12 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>Ready to Get Started?</h2>
            <p className='text-lg text-blue-100/90 mb-6 max-w-2xl mx-auto'>
              Don't let technology challenges hold your business back. Contact
              us today and let's build something amazing together.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='#contact-form'>
                  <Send className='mr-2 h-5 w-5' />
                  Start Your Project
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
