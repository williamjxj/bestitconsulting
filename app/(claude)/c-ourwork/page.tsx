'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { StaggerContainer } from '@/components/StaggerContainer'
import { AnimatedButton } from '@/components/AnimatedButton'
import { AnimatedCard } from '@/components/AnimatedCard'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and analytics.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web Development',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description:
      'Secure mobile banking application with biometric authentication and real-time transaction monitoring.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'AWS'],
    category: 'Mobile Development',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'AI-Powered Analytics Dashboard',
    description:
      'Intelligent business analytics platform with machine learning insights and predictive modeling.',
    image: '/api/placeholder/600/400',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    category: 'Data Science',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Migration',
    description:
      'Complete cloud migration strategy and implementation for enterprise-scale applications.',
    image: '/api/placeholder/600/400',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    category: 'DevOps',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
]

const categories = [
  'All',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'DevOps',
]

export default function OurWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter(project => project.category === category)
      )
    }
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
                Our Work
              </h1>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Explore our portfolio of successful projects and see how we've
                helped businesses transform their digital presence.
              </p>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Category Filter */}
      <ScrollReveal>
        <section className='py-8 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-wrap justify-center gap-4'>
              {categories.map(category => (
                <AnimatedButton
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category}
                </AnimatedButton>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Projects Grid */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <StaggerContainer>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredProjects.map((project, index) => (
                <AnimatedCard
                  key={project.id}
                  className='bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300'
                  hover
                >
                  <div className='relative'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-48 object-cover'
                    />
                    {project.featured && (
                      <div className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                        Featured
                      </div>
                    )}
                  </div>
                  <div className='p-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-sm text-blue-600 font-medium'>
                        {project.category}
                      </span>
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-3'>
                      {project.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{project.description}</p>
                    <div className='flex flex-wrap gap-2 mb-6'>
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className='flex space-x-4'>
                      <AnimatedButton
                        className='flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium'
                        onClick={() => console.log('View project')}
                      >
                        <Eye className='w-4 h-4' />
                        <span>View Project</span>
                      </AnimatedButton>
                      <AnimatedButton
                        className='flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium'
                        onClick={() => console.log('View code')}
                      >
                        <Github className='w-4 h-4' />
                        <span>Code</span>
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className='py-20 px-4 sm:px-6 lg:px-8 bg-blue-600'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                Ready to Start Your Project?
              </h2>
              <p className='text-xl text-blue-100 mb-8'>
                Let's discuss how we can help bring your vision to life with our
                expertise and proven track record.
              </p>
              <AnimatedButton
                className='bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
                onClick={() => console.log('Get started')}
              >
                Get Started Today
              </AnimatedButton>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
