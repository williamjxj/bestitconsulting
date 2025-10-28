'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { AnimatedFAQ } from '@/components/ui/AnimatedFAQ'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function FAQPage() {
  const faqs = [
    {
      id: 'timeline',
      question: 'What is your typical project timeline?',
      answer: 'Depends on the project requirements and details.',
    },
    {
      id: 'support',
      question: 'Do you offer ongoing support and maintenance?',
      answer:
        'Yes, we provide comprehensive support packages including 24/7 monitoring, regular updates, and technical assistance to ensure your solution runs smoothly.',
    },
    {
      id: 'technology',
      question: 'Can you work with our existing technology stack?',
      answer:
        'Absolutely! We specialize in integrating with existing systems and can work with virtually any technology stack to enhance your current infrastructure.',
    },
    {
      id: 'industries',
      question: 'What industries do you serve?',
      answer:
        'We serve clients across healthcare, finance, retail, manufacturing, transportation, education, and technology sectors, adapting our solutions to industry-specific requirements.',
    },
    {
      id: 'pricing',
      question: 'How do you structure your pricing?',
      answer:
        'We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing is based on project scope, complexity, and timeline requirements.',
    },
    {
      id: 'consultation',
      question: 'Is the initial consultation really free?',
      answer:
        'Yes! We offer a completely free 30-minute consultation to discuss your project requirements, provide initial recommendations, and answer any questions you may have.',
    },
    {
      id: 'security',
      question: 'How do you ensure data security and privacy?',
      answer:
        'We implement industry-standard security measures including encryption, secure data transmission, regular security audits, and compliance with GDPR and other privacy regulations.',
    },
    {
      id: 'team',
      question: 'What is the size and expertise of your team?',
      answer:
        'Our team consists of 50+ certified professionals including software engineers, cloud architects, data scientists, UI/UX designers, and project managers with expertise across multiple technologies.',
    },
    {
      id: 'communication',
      question: 'How do you handle project communication and updates?',
      answer:
        "We maintain regular communication through scheduled meetings, progress reports, and real-time collaboration tools. You'll have a dedicated project manager as your primary point of contact.",
    },
    {
      id: 'scalability',
      question: 'Can your solutions scale with our business growth?',
      answer:
        'Absolutely! We design scalable solutions that can grow with your business. Our cloud-based architectures and modular designs ensure your systems can handle increased load and functionality.',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='text-center max-w-4xl mx-auto'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30'>
                <HelpCircle className='h-4 w-4 text-cyan-300' />
                <span>Frequently Asked Questions</span>
              </div>

              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                <AnimatedHeadline
                  text="Got Questions? We've Got Answers"
                  className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'
                />
              </h1>

              <p className='text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
                Find answers to common questions about our services, processes,
                and how we can help transform your business with technology.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='#faq-section'>
                    <HelpCircle className='mr-2 h-5 w-5' />
                    Browse Questions
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/contact'>
                    <MessageSquare className='mr-2 h-5 w-5' />
                    Ask a Question
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id='faq-section'
          className='py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50'
        >
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                  Frequently Asked Questions
                </h2>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                  Quick answers to common questions about our services and
                  process. Click on any question to expand the answer.
                </p>
              </motion.div>
            </div>

            <AnimatedFAQ faqs={faqs} />
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className='py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>Still Have Questions?</h2>
            <p className='text-lg text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Can't find what you're looking for? Our team is here to help. Get
              in touch with us for personalized assistance.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='/contact'>
                  <MessageSquare className='mr-2 h-5 w-5' />
                  Contact Us
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20'
                asChild
              >
                <Link href='tel:+12369923846'>
                  <Phone className='mr-2 h-5 w-5' />
                  Call Us
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20'
                asChild
              >
                <Link href='mailto:service@bestitconsulting.ca'>
                  <Mail className='mr-2 h-5 w-5' />
                  Email Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
