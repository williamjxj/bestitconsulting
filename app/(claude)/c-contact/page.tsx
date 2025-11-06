'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { StaggerContainer } from '@/components/StaggerContainer'
import { AnimatedButton } from '@/components/AnimatedButton'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Hero Section */}
      <ScrollReveal>
        <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center'
            >
              <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
                Get in Touch
              </h1>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Ready to transform your business? Let's discuss your project and
                see how we can help you achieve your goals.
              </p>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Form & Info */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <ScrollReveal>
              <div className='bg-white rounded-2xl shadow-xl p-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <AnimatedButton
                    type='submit'
                    className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
                  >
                    <Send className='w-5 h-5 mr-2' />
                    Send Message
                  </AnimatedButton>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Information */}
            <ScrollReveal>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                    Contact Information
                  </h2>
                  <p className='text-lg text-gray-600 mb-8'>
                    We're here to help and answer any question you might have.
                    We look forward to hearing from you.
                  </p>
                </div>

                <StaggerContainer>
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <Mail className='w-6 h-6 text-blue-600' />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Email
                      </h3>
                      <p className='text-gray-600'>
                        hello@bestitconsulting.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <Phone className='w-6 h-6 text-blue-600' />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Phone
                      </h3>
                      <p className='text-gray-600'>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <MapPin className='w-6 h-6 text-blue-600' />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Address
                      </h3>
                      <p className='text-gray-600'>
                        123 Business Street
                        <br />
                        Suite 100
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
