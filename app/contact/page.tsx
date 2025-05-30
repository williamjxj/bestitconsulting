'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
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

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
        {/* Hero Section */}
        <section className='py-20 px-4 text-center'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-5xl font-bold text-gray-900 mb-6'>
              Get In Touch
            </h1>
            <p className='text-xl text-gray-600 mb-8'>
              Ready to transform your business? Let's start the conversation.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className='py-16 px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {/* Contact Form */}
              <div>
                <Card>
                  <CardContent className='p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                      Send us a message
                    </h2>

                    {submitStatus === 'success' && (
                      <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                        <p className='text-green-800'>
                          Thank you for your message! We'll get back to you
                          within 24 hours.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-red-800'>
                          There was an error sending your message. Please try
                          again.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700 mb-2'
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
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            placeholder='John Doe'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 mb-2'
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
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            placeholder='john@company.com'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label
                            htmlFor='company'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            Company
                          </label>
                          <input
                            type='text'
                            id='company'
                            name='company'
                            value={formData.company}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            placeholder='Company Name'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            Phone Number
                          </label>
                          <input
                            type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            placeholder='+1 (555) 123-4567'
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='service'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Service Interest
                        </label>
                        <select
                          id='service'
                          name='service'
                          value={formData.service}
                          onChange={handleChange}
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                          <option value='ai-solutions'>AI Solutions</option>
                          <option value='cybersecurity'>Cybersecurity</option>
                          <option value='data-analytics'>Data Analytics</option>
                          <option value='iot-solutions'>IoT Solutions</option>
                          <option value='digital-transformation'>
                            Digital Transformation
                          </option>
                          <option value='consultation'>
                            General Consultation
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor='message'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Message *
                        </label>
                        <textarea
                          id='message'
                          name='message'
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          placeholder='Tell us about your project and requirements...'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3'
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className='space-y-8'>
                {/* Office Locations */}
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Our Offices
                    </h3>

                    <div className='space-y-6'>
                      <div>
                        <h4 className='font-semibold text-gray-900 mb-2'>
                          New York (Headquarters)
                        </h4>
                        <p className='text-gray-600'>
                          123 Tech Avenue, Suite 500
                          <br />
                          New York, NY 10001
                          <br />
                          Phone: +1 (555) 123-4567
                          <br />
                          Email: ny@bestitconsulting.com
                        </p>
                      </div>

                      <div>
                        <h4 className='font-semibold text-gray-900 mb-2'>
                          San Francisco
                        </h4>
                        <p className='text-gray-600'>
                          456 Innovation Drive
                          <br />
                          San Francisco, CA 94105
                          <br />
                          Phone: +1 (555) 234-5678
                          <br />
                          Email: sf@bestitconsulting.com
                        </p>
                      </div>

                      <div>
                        <h4 className='font-semibold text-gray-900 mb-2'>
                          London
                        </h4>
                        <p className='text-gray-600'>
                          789 Digital Street
                          <br />
                          London EC2A 4QJ, UK
                          <br />
                          Phone: +44 20 7123 4567
                          <br />
                          Email: london@bestitconsulting.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Business Hours
                    </h3>
                    <div className='space-y-2 text-gray-600'>
                      <div className='flex justify-between'>
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                    <p className='text-sm text-gray-500 mt-4'>
                      * Times shown in local office timezone
                    </p>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      24/7 Emergency Support
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      For urgent technical issues with existing clients:
                    </p>
                    <div className='space-y-2'>
                      <p className='font-semibold text-gray-900'>
                        Emergency Hotline: +1 (555) 911-TECH
                      </p>
                      <p className='text-gray-600'>
                        Email: emergency@bestitconsulting.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Follow Us
                    </h3>
                    <div className='flex space-x-4'>
                      <a href='#' className='text-blue-600 hover:text-blue-800'>
                        LinkedIn
                      </a>
                      <a href='#' className='text-blue-400 hover:text-blue-600'>
                        Twitter
                      </a>
                      <a href='#' className='text-gray-800 hover:text-gray-600'>
                        GitHub
                      </a>
                      <a href='#' className='text-red-600 hover:text-red-800'>
                        YouTube
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-16 px-4 bg-white'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
              Frequently Asked Questions
            </h2>

            <div className='space-y-6'>
              <Card>
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    What's your typical project timeline?
                  </h3>
                  <p className='text-gray-600'>
                    Project timelines vary based on scope and complexity. Small
                    projects typically take 2-4 weeks, while enterprise
                    solutions can take 3-6 months. We provide detailed timelines
                    during our initial consultation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    Do you offer ongoing support and maintenance?
                  </h3>
                  <p className='text-gray-600'>
                    Yes, we offer comprehensive support packages including 24/7
                    monitoring, regular updates, security patches, and technical
                    support. Our maintenance plans are tailored to your specific
                    needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    What industries do you specialize in?
                  </h3>
                  <p className='text-gray-600'>
                    We serve clients across various industries including
                    healthcare, finance, e-commerce, manufacturing, education,
                    and startups. Our solutions are customized to meet
                    industry-specific requirements and compliance standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    How do you ensure project security and data privacy?
                  </h3>
                  <p className='text-gray-600'>
                    We follow strict security protocols including signed NDAs,
                    secure development practices, encrypted communications, and
                    compliance with GDPR, HIPAA, and other relevant standards.
                    All team members undergo background checks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
