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
  Calendar,
  Users,
  Globe,
  Rocket,
  ArrowRight,
  Building,
  Shield,
  Award,
  HeadphonesIcon,
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', data)
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openGoogleMaps = (address: string, postal: string) => {
    const fullAddress = `${address}, ${postal}`
    const encodedAddress = encodeURIComponent(fullAddress)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  const contactMethods = [
    {
      icon: <Phone className='h-8 w-8 text-blue-500' />,
      title: 'Phone',
      description: 'Call us directly for immediate assistance',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Mail className='h-8 w-8 text-green-500' />,
      title: 'Email',
      description: 'Send us a detailed message',
      contact: 'hello@bestitconsulting.com',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <MessageSquare className='h-8 w-8 text-purple-500' />,
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      contact: 'Available on website',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Start Chat',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Calendar className='h-8 w-8 text-orange-500' />,
      title: 'Schedule Meeting',
      description: 'Book a consultation call',
      contact: 'Free 30-min consultation',
      availability: 'Flexible scheduling',
      action: 'Book Meeting',
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  const offices = [
    {
      city: 'Surrey',
      country: 'Canada',
      address: '9727 152b Street',
      postal: 'Surrey, BC V3R 0G5',
      phone: '+1 (604) 555-0123',
      isHeadquarters: true,
      coordinates: '49.1913,-122.8490', // Surrey coordinates
    },
    {
      city: 'Vancouver',
      country: 'Canada',
      address: '456 Tech Ave, Floor 15',
      postal: 'Vancouver, BC V6B 2W9',
      phone: '+1 (604) 555-0456',
      isHeadquarters: false,
      coordinates: '49.2827,-123.1207', // Vancouver coordinates
    },
    {
      city: 'Toronto',
      country: 'Canada',
      address: '123 Business St, Suite 400',
      postal: 'Toronto, ON M5V 3A8',
      phone: '+1 (416) 555-0123',
      isHeadquarters: false,
      coordinates: '43.6532,-79.3832', // Toronto coordinates
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
    {
      question: 'What industries do you serve?',
      answer:
        'We serve clients across healthcare, finance, retail, manufacturing, transportation, and technology sectors, adapting our solutions to industry-specific requirements.',
    },
  ]

  const benefits = [
    {
      icon: <Rocket className='h-6 w-6' />,
      title: 'Free Consultation',
      description: '30-minute strategy session',
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'NDA Protection',
      description: 'Your ideas are safe with us',
    },
    {
      icon: <Award className='h-6 w-6' />,
      title: 'Expert Team',
      description: '50+ certified professionals',
    },
    {
      icon: <HeadphonesIcon className='h-6 w-6' />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
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
                <MessageSquare className='h-4 w-4 text-cyan-300' />
                <span>Free Consultation • Response within 24 hours</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <span className='block'>Let's Start Your</span>
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400'>
                  Digital Journey
                </span>
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed'>
                Ready to transform your business with cutting-edge technology?
                Our expert team is here to turn your vision into reality.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
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
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
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

        {/* Benefits Banner */}
        <section className='py-12 px-4 bg-white/50 border-b border-gray-200/50'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center gap-3 justify-center text-center md:text-left'
                >
                  <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0'>
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

        {/* Contact Methods */}
        <section id='contact-methods' className='py-20 px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Get In Touch
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Choose the communication method that works best for you. Our
                team is ready to discuss your project requirements.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className='group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white text-center'
                >
                  <CardContent className='p-6'>
                    <div
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${method.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className='w-full h-full bg-white rounded-lg flex items-center justify-center'>
                        {method.icon}
                      </div>
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      {method.title}
                    </h3>
                    <p className='text-gray-600 text-sm mb-4'>
                      {method.description}
                    </p>
                    <div className='space-y-2 mb-6'>
                      <p className='font-semibold text-gray-900'>
                        {method.contact}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        {method.availability}
                      </p>
                    </div>
                    <Button
                      className={`w-full bg-gradient-to-r ${method.gradient} hover:shadow-lg transition-all duration-300`}
                      size='sm'
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section id='contact-form' className='py-20 px-4 bg-white/50'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
              {/* Contact Form */}
              <div className='lg:col-span-2'>
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader className='pb-6'>
                    <CardTitle className='text-3xl font-bold text-gray-900 mb-2'>
                      Start Your Project
                    </CardTitle>
                    <p className='text-gray-600'>
                      Tell us about your project requirements and we'll get back
                      to you within 24 hours with a detailed proposal.
                    </p>
                  </CardHeader>
                  <CardContent className='p-8 pt-0'>
                    {submitStatus === 'success' && (
                      <div className='mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl'>
                        <div className='flex items-center gap-3'>
                          <CheckCircle className='h-6 w-6 text-green-600' />
                          <div>
                            <h4 className='font-semibold text-green-800'>
                              Message sent successfully!
                            </h4>
                            <p className='text-green-700 text-sm mb-2'>
                              We'll get back to you within 24 hours with a
                              detailed response.
                            </p>
                            <p className='text-green-600 text-xs'>
                              📧 Check your email for a confirmation message
                              (including spam/junk folder)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className='mb-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl'>
                        <div className='flex items-center gap-3'>
                          <AlertCircle className='h-6 w-6 text-red-600' />
                          <div>
                            <h4 className='font-semibold text-red-800'>
                              Error sending message
                            </h4>
                            <p className='text-red-700 text-sm'>
                              Please try again or contact us directly at
                              williamjxj@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <AnimatedForm
                      fields={formFields}
                      onSubmit={handleFormSubmit}
                      submitText="Send Message"
                    />
                          <label
                            htmlFor='name'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Full Name *
                          </label>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                            placeholder='John Doe'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Email Address *
                          </label>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                            placeholder='john@company.com'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label
                            htmlFor='company'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Company
                          </label>
                          <input
                            type='text'
                            id='company'
                            name='company'
                            value={formData.company}
                            onChange={handleChange}
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                            placeholder='Company Name'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Phone Number
                          </label>
                          <input
                            type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                            placeholder='+1 (555) 123-4567'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label
                            htmlFor='service'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Service Interest
                          </label>
                          <select
                            id='service'
                            name='service'
                            value={formData.service}
                            onChange={handleChange}
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                          >
                            <option value=''>Select a service</option>
                            <option value='web-development'>
                              Web Development
                            </option>
                            <option value='mobile-apps'>
                              Mobile App Development
                            </option>
                            <option value='cloud-migration'>
                              Cloud Migration
                            </option>
                            <option value='ai-ml'>AI/ML Solutions</option>
                            <option value='iot'>IoT Development</option>
                            <option value='consulting'>
                              Technology Consulting
                            </option>
                            <option value='maintenance'>
                              Support & Maintenance
                            </option>
                            <option value='other'>Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor='budget'
                            className='block text-sm font-bold text-gray-800 mb-2'
                          >
                            Project Budget
                          </label>
                          <select
                            id='budget'
                            name='budget'
                            value={formData.budget}
                            onChange={handleChange}
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                          >
                            <option value=''>Select budget range</option>
                            <option value='under-25k'>Under $25K</option>
                            <option value='25k-50k'>$25K - $50K</option>
                            <option value='50k-100k'>$50K - $100K</option>
                            <option value='100k-250k'>$100K - $250K</option>
                            <option value='250k-plus'>$250K+</option>
                            <option value='discuss'>Let's discuss</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='timeline'
                          className='block text-sm font-bold text-gray-800 mb-2'
                        >
                          Project Timeline
                        </label>
                        <select
                          id='timeline'
                          name='timeline'
                          value={formData.timeline}
                          onChange={handleChange}
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm'
                        >
                          <option value=''>Select timeline</option>
                          <option value='asap'>ASAP (Rush project)</option>
                          <option value='1-3-months'>1-3 months</option>
                          <option value='3-6-months'>3-6 months</option>
                          <option value='6-12-months'>6-12 months</option>
                          <option value='12-plus-months'>12+ months</option>
                          <option value='flexible'>Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor='message'
                          className='block text-sm font-bold text-gray-800 mb-2'
                        >
                          Project Description *
                        </label>
                        <textarea
                          id='message'
                          name='message'
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm resize-none'
                          placeholder='Tell us about your project goals, requirements, and any specific challenges you&#39;re facing...'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform border-0 shadow-lg'
                      >
                        {isSubmitting ? (
                          <>
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                            <span className='text-white font-bold'>
                              Sending Message...
                            </span>
                          </>
                        ) : (
                          <>
                            <Send className='mr-2 h-5 w-5 text-white' />
                            <span className='text-white font-bold'>
                              Send Message
                            </span>
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className='space-y-8'>
                {/* Office Locations */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                      <Building className='h-5 w-5 text-blue-600' />
                      Our Offices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {offices.map((office, index) => (
                      <div key={index} className='relative'>
                        <div className='flex items-start gap-4'>
                          <div
                            className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300 group relative'
                            onClick={() =>
                              openGoogleMaps(office.address, office.postal)
                            }
                            title='Open in Google Maps'
                          >
                            <MapPin className='h-6 w-6 text-white' />
                            {/* Tooltip */}
                            <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none'>
                              Open in Google Maps
                              <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
                            </div>
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h4 className='font-semibold text-gray-900'>
                                {office.city}
                              </h4>
                              {office.isHeadquarters && (
                                <Badge variant='secondary' className='text-xs'>
                                  HQ
                                </Badge>
                              )}
                            </div>
                            <p className='text-gray-600 text-sm leading-relaxed'>
                              <span
                                className='cursor-pointer hover:text-blue-600 transition-colors duration-300'
                                onClick={() =>
                                  openGoogleMaps(office.address, office.postal)
                                }
                                title='Open in Google Maps'
                              >
                                {office.address}
                                <br />
                                {office.postal}
                              </span>
                              <br />
                              <span className='text-blue-600'>
                                {office.phone}
                              </span>
                            </p>
                          </div>
                        </div>
                        {index < offices.length - 1 && (
                          <div className='mt-6 border-b border-gray-100'></div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                      <Clock className='h-5 w-5 text-green-600' />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600'>Monday - Friday</span>
                        <span className='font-semibold text-gray-900'>
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600'>Saturday</span>
                        <span className='font-semibold text-gray-900'>
                          10:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600'>Sunday</span>
                        <span className='font-semibold text-gray-900'>
                          Closed
                        </span>
                      </div>
                      <div className='pt-3 border-t border-gray-100'>
                        <p className='text-sm text-gray-600'>
                          <span className='font-medium'>
                            Emergency Support:
                          </span>{' '}
                          24/7 for enterprise clients
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                      <Globe className='h-5 w-5 text-purple-600' />
                      Follow Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-4'>
                      {[
                        {
                          icon: <Linkedin className='h-5 w-5' />,
                          name: 'LinkedIn',
                          gradient: 'from-blue-600 to-blue-700',
                        },
                        {
                          icon: <Twitter className='h-5 w-5' />,
                          name: 'Twitter',
                          gradient: 'from-blue-400 to-blue-500',
                        },
                        {
                          icon: <Github className='h-5 w-5' />,
                          name: 'GitHub',
                          gradient: 'from-gray-700 to-gray-800',
                        },
                        {
                          icon: <Youtube className='h-5 w-5' />,
                          name: 'YouTube',
                          gradient: 'from-red-600 to-red-700',
                        },
                      ].map((social, index) => (
                        <Button
                          key={index}
                          variant='outline'
                          className={`flex items-center gap-2 justify-center bg-gradient-to-r ${social.gradient} text-white border-0 hover:shadow-lg transition-all duration-300`}
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

        {/* Google Maps Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Find Our Offices
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Visit us at any of our locations across Canada. Click on the
                markers to get directions and contact information.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Map */}
              <div className='lg:col-span-2'>
                <Card className='border-0 shadow-xl bg-white overflow-hidden'>
                  <CardContent className='p-0'>
                    <SmartGoogleMap
                      addresses={offices}
                      height='500px'
                      className='w-full'
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Office Details */}
              <div className='space-y-6'>
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                      <MapPin className='h-5 w-5 text-blue-600' />
                      Office Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {offices.map((office, index) => (
                      <div key={index} className='relative'>
                        <div className='flex items-start gap-4'>
                          <div
                            className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${
                              office.isHeadquarters
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                            }`}
                          ></div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h4 className='font-semibold text-gray-900'>
                                {office.city}
                              </h4>
                              {office.isHeadquarters && (
                                <Badge variant='secondary' className='text-xs'>
                                  HQ
                                </Badge>
                              )}
                            </div>
                            <p className='text-gray-600 text-sm leading-relaxed'>
                              {office.address}
                              <br />
                              {office.postal}
                              <br />
                              <span className='text-blue-600 font-medium'>
                                {office.phone}
                              </span>
                            </p>
                            <Button
                              variant='outline'
                              size='sm'
                              className='mt-3 text-xs'
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                    office.address + ', ' + office.postal
                                  )}`,
                                  '_blank'
                                )
                              }
                            >
                              Get Directions
                            </Button>
                          </div>
                        </div>
                        {index < offices.length - 1 && (
                          <div className='mt-6 border-b border-gray-100'></div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Map Legend */}
                <Card className='border-0 shadow-xl bg-white'>
                  <CardHeader>
                    <CardTitle className='text-lg font-bold text-gray-900'>
                      Map Legend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-gray-600'>
                        Headquarters
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
                      <span className='text-sm text-gray-600'>
                        Branch Office
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-20 px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Frequently Asked Questions
              </h2>
              <p className='text-xl text-gray-600'>
                Quick answers to common questions about our services and process
              </p>
            </div>

            <div className='space-y-6'>
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'
                >
                  <CardContent className='p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-3'>
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

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>Ready to Get Started?</h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Don't let technology challenges hold your business back. Contact
              us today and let's build something amazing together.
            </p>

            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='#contact-form'>
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
                  <Users className='mr-2 h-5 w-5' />
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
