'use client'

import React, { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Code,
  Play,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Image,
  Video,
  Music,
  Palette,
  Zap,
  Star,
  Award,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Shield,
  Target,
  Eye,
  Bug,
  TestTube,
  Smartphone,
  Monitor,
  Globe,
} from 'lucide-react'

interface VisualEnhancementDocumentationProps extends HTMLMotionProps<'div'> {
  components: Array<{
    id: string
    name: string
    category: 'animation' | 'interaction' | 'layout' | 'media' | 'utility'
    description: string
    usage: string
    props: Array<{
      name: string
      type: string
      required: boolean
      description: string
    }>
    examples: Array<{
      title: string
      code: string
      description: string
    }>
    icon: React.ReactNode
  }>
  onComponentSelect?: (componentId: string) => void
  onCodeCopy?: (code: string) => void
  className?: string
}

const VisualEnhancementDocumentation: React.FC<
  VisualEnhancementDocumentationProps
> = ({ components, onComponentSelect, onCodeCopy, className, ...rest }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  )
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'visual-documentation',
      name: 'Visual Documentation',
      type: 'interaction',
      duration: 600,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-documentation',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    'visual-documentation'
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'animation':
        return 'bg-blue-100 text-blue-800'
      case 'interaction':
        return 'bg-green-100 text-green-800'
      case 'layout':
        return 'bg-purple-100 text-purple-800'
      case 'media':
        return 'bg-orange-100 text-orange-800'
      case 'utility':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'animation':
        return <Zap className='h-4 w-4' />
      case 'interaction':
        return <Target className='h-4 w-4' />
      case 'layout':
        return <Monitor className='h-4 w-4' />
      case 'media':
        return <Image className='h-4 w-4' />
      case 'utility':
        return <Code className='h-4 w-4' />
      default:
        return <FileText className='h-4 w-4' />
    }
  }

  const filteredComponents = components.filter(component => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      !selectedCategory || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCodeCopy = (code: string) => {
    setCopiedCode(code)
    if (onCodeCopy) {
      onCodeCopy(code)
    }
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const categories = [
    { id: 'animation', name: 'Animations', icon: <Zap className='h-4 w-4' /> },
    {
      id: 'interaction',
      name: 'Interactions',
      icon: <Target className='h-4 w-4' />,
    },
    { id: 'layout', name: 'Layout', icon: <Monitor className='h-4 w-4' /> },
    { id: 'media', name: 'Media', icon: <Image className='h-4 w-4' /> },
    { id: 'utility', name: 'Utilities', icon: <Code className='h-4 w-4' /> },
  ]

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Header */}
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center gap-2 mb-4'>
            <BookOpen className='h-5 w-5 text-blue-500' />
            <h3 className='text-lg font-semibold'>
              Visual Enhancement Documentation
            </h3>
          </div>

          {/* Search */}
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search components...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Categories */}
          <div className='flex flex-wrap gap-2'>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className='ml-1'>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className='space-y-4'>
          {filteredComponents.map(component => (
            <div
              key={component.id}
              className='bg-white p-4 rounded-lg shadow-sm border'
            >
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  {component.icon}
                  <h4 className='font-semibold'>{component.name}</h4>
                </div>
                <Badge className={getCategoryColor(component.category)}>
                  {component.category}
                </Badge>
              </div>
              <p className='text-gray-600 mb-3'>{component.description}</p>
              <div className='text-sm text-gray-500'>
                Usage: {component.usage}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  const codeVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-6 ${className}`}
      {...(rest as any)}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center gap-2 mb-4'>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className='h-5 w-5 text-blue-500' />
          </motion.div>
          <h3 className='text-lg font-semibold'>
            Visual Enhancement Documentation
          </h3>
        </div>

        {/* Search */}
        <motion.div variants={itemVariants} className='mb-4'>
          <input
            type='text'
            placeholder='Search components...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          className='flex flex-wrap gap-2'
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 flex items-center gap-1 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Components */}
      <motion.div variants={containerVariants} className='space-y-4'>
        {filteredComponents.map((component, index) => (
          <motion.div
            key={component.id}
            variants={itemVariants}
            whileHover='hover'
            className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
            onClick={() => {
              setSelectedComponent(
                selectedComponent === component.id ? null : component.id
              )
              if (onComponentSelect) {
                onComponentSelect(component.id)
              }
            }}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Category indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`absolute top-0 left-0 h-1 ${
                component.category === 'animation'
                  ? 'bg-blue-500'
                  : component.category === 'interaction'
                    ? 'bg-green-500'
                    : component.category === 'layout'
                      ? 'bg-purple-500'
                      : component.category === 'media'
                        ? 'bg-orange-500'
                        : 'bg-gray-500'
              }`}
            />

            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'
                >
                  <motion.div
                    animate={{
                      rotate: selectedComponent === component.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {component.icon}
                  </motion.div>
                </motion.div>
                <div>
                  <h4 className='font-semibold'>{component.name}</h4>
                  <div className='text-sm text-gray-600'>
                    {component.description}
                  </div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge className={getCategoryColor(component.category)}>
                  {getCategoryIcon(component.category)}
                  <span className='ml-1'>{component.category}</span>
                </Badge>
              </motion.div>
            </div>

            <div className='text-sm text-gray-500 mb-3'>
              Usage: {component.usage}
            </div>

            {/* Expanded details */}
            {selectedComponent === component.id && (
              <motion.div
                variants={codeVariants}
                initial='hidden'
                animate='visible'
                className='space-y-4'
              >
                {/* Props */}
                <div>
                  <h5 className='font-medium mb-2'>Props</h5>
                  <div className='space-y-1'>
                    {component.props.map((prop, propIndex) => (
                      <motion.div
                        key={propIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: propIndex * 0.05 }}
                        className='flex items-center justify-between text-sm'
                      >
                        <div className='flex items-center gap-2'>
                          <span className='font-mono text-blue-600'>
                            {prop.name}
                          </span>
                          <span className='text-gray-500'>({prop.type})</span>
                          {prop.required && (
                            <Badge
                              variant='secondary'
                              className='bg-red-100 text-red-800 text-xs'
                            >
                              required
                            </Badge>
                          )}
                        </div>
                        <span className='text-gray-600'>
                          {prop.description}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h5 className='font-medium mb-2'>Examples</h5>
                  <div className='space-y-3'>
                    {component.examples.map((example, exampleIndex) => (
                      <motion.div
                        key={exampleIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: exampleIndex * 0.1 }}
                        className='bg-gray-50 rounded-lg p-3'
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <h6 className='font-medium text-sm'>
                            {example.title}
                          </h6>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={e => {
                              e.stopPropagation()
                              handleCodeCopy(example.code)
                            }}
                            className='p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                          >
                            {copiedCode === example.code ? (
                              <Check className='h-3 w-3' />
                            ) : (
                              <Copy className='h-3 w-3' />
                            )}
                          </motion.button>
                        </div>
                        <p className='text-sm text-gray-600 mb-2'>
                          {example.description}
                        </p>
                        <pre className='bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto'>
                          <code>{example.code}</code>
                        </pre>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4'
      >
        <div className='flex items-center gap-2 mb-2'>
          <Star className='h-5 w-5 text-yellow-500' />
          <span className='font-semibold text-blue-800'>
            Documentation Summary
          </span>
        </div>
        <p className='text-sm text-blue-700'>
          {components.length} visual enhancement components available across{' '}
          {categories.length} categories. Use the search and filters to find the
          perfect component for your needs.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default VisualEnhancementDocumentation
