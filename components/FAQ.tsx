'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'What services does BestIT Consulting offer?',
    answer:
      'We offer comprehensive IT consulting services including cloud migration, cybersecurity, software development, digital transformation, team augmentation, and strategic IT planning. Our services are tailored to meet the specific needs of businesses of all sizes.',
    category: 'Services',
    tags: ['services', 'consulting', 'overview'],
  },
  {
    id: '2',
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on scope and complexity. A typical assessment takes 1-2 weeks, implementation projects range from 2-6 months, and ongoing support is continuous. We provide detailed timelines during our initial consultation.',
    category: 'Timeline',
    tags: ['timeline', 'duration', 'project'],
  },
  {
    id: '3',
    question: 'Do you work with small businesses?',
    answer:
      'Absolutely! We work with businesses of all sizes, from startups to enterprise organizations. Our flexible service models ensure that small businesses can access enterprise-level IT expertise at an affordable price point.',
    category: 'Business Size',
    tags: ['small business', 'startup', 'enterprise'],
  },
  {
    id: '4',
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in modern cloud platforms (AWS, Azure, GCP), cybersecurity frameworks, DevOps practices, microservices architecture, AI/ML integration, and emerging technologies. Our team stays current with the latest industry trends and best practices.',
    category: 'Technology',
    tags: ['cloud', 'security', 'devops', 'ai'],
  },
  {
    id: '5',
    question: 'How do you ensure data security?',
    answer:
      'We implement industry-standard security protocols including encryption, secure communication channels, regular security audits, and compliance with GDPR, HIPAA, and SOC 2 standards. All team members undergo security training and background checks.',
    category: 'Security',
    tags: ['security', 'compliance', 'data protection'],
  },
  {
    id: '6',
    question: 'What is your pricing model?',
    answer:
      'We offer flexible pricing models including project-based, retainer, and hourly rates. Pricing depends on project scope, complexity, and duration. We provide transparent quotes with no hidden fees and can work within your budget constraints.',
    category: 'Pricing',
    tags: ['pricing', 'cost', 'budget'],
  },
  {
    id: '7',
    question: 'Do you provide ongoing support?',
    answer:
      'Yes, we offer comprehensive ongoing support including 24/7 monitoring, regular maintenance, security updates, performance optimization, and emergency response. Our support plans are customizable to your specific needs.',
    category: 'Support',
    tags: ['support', 'maintenance', 'monitoring'],
  },
  {
    id: '8',
    question: 'Can you help with legacy system modernization?',
    answer:
      'Absolutely! Legacy system modernization is one of our core specialties. We help businesses modernize outdated systems while maintaining business continuity, improving performance, and reducing maintenance costs.',
    category: 'Modernization',
    tags: ['legacy', 'modernization', 'migration'],
  },
  {
    id: '9',
    question: 'What makes BestIT different from other consultants?',
    answer:
      'Our combination of deep technical expertise, business acumen, and proven methodologies sets us apart. We focus on delivering measurable ROI, maintain long-term partnerships, and provide transparent communication throughout the engagement.',
    category: 'Differentiation',
    tags: ['expertise', 'roi', 'partnership'],
  },
  {
    id: '10',
    question: 'How do I get started?',
    answer:
      "Getting started is easy! Contact us for a free consultation where we'll assess your needs, discuss your goals, and provide a customized proposal. We typically respond within 24 hours and can schedule a call within 48 hours.",
    category: 'Getting Started',
    tags: ['consultation', 'contact', 'start'],
  },
]

const categories = [
  'All',
  'Services',
  'Timeline',
  'Business Size',
  'Technology',
  'Security',
  'Pricing',
  'Support',
  'Modernization',
  'Differentiation',
  'Getting Started',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const answerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredItems = faqItems.filter(item => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4'>
            <HelpCircle className='h-4 w-4' />
            Frequently Asked Questions
          </div>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Got Questions? We Have
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              {' '}
              Answers
            </span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Find answers to common questions about our services, processes, and
            how we can help your business succeed.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='max-w-4xl mx-auto mb-12'
        >
          <div className='relative mb-6'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
            <Input
              type='text'
              placeholder='Search questions...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-12 h-12 text-lg'
            />
          </div>

          <div className='flex flex-wrap gap-2 justify-center'>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='max-w-4xl mx-auto'
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className='mb-4'
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className='bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className='w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Badge variant='secondary' className='text-xs'>
                          {item.category}
                        </Badge>
                        <div className='flex gap-1'>
                          {item.tags.slice(0, 2).map(tag => (
                            <Badge
                              key={tag}
                              variant='outline'
                              className='text-xs'
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItems.includes(item.id) ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className='ml-4 flex-shrink-0'
                    >
                      {openItems.includes(item.id) ? (
                        <Minus className='h-5 w-5 text-blue-600' />
                      ) : (
                        <Plus className='h-5 w-5 text-gray-400' />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        variants={answerVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className='overflow-hidden'
                      >
                        <div className='px-6 pb-6'>
                          <div className='border-t border-gray-100 pt-4'>
                            <p className='text-gray-700 leading-relaxed'>
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-12'
            >
              <HelpCircle className='h-16 w-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                No questions found
              </h3>
              <p className='text-gray-500'>
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-16'
        >
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white'>
            <h3 className='text-2xl font-bold mb-4'>Still have questions?</h3>
            <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
              Our team is here to help. Contact us for personalized answers to
              your specific questions.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors'>
                Contact Us
              </button>
              <button className='border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors'>
                Schedule a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
