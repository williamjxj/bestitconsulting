'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Filter, Search } from 'lucide-react'

interface ServiceFilterProps extends HTMLMotionProps<'div'> {
  categories: Array<{
    id: string
    name: string
    count: number
    color?: string
  }>
  technologies: Array<{
    id: string
    name: string
    count: number
  }>
  selectedCategories: string[]
  selectedTechnologies: string[]
  onCategoryToggle: (categoryId: string) => void
  onTechnologyToggle: (technologyId: string) => void
  onClearFilters: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  className?: string
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  onCategoryToggle,
  onTechnologyToggle,
  onClearFilters,
  searchQuery,
  onSearchChange,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'service-filter',
      name: 'Service Filter',
      type: 'interaction',
      duration: 400,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-filter',
        staticFallback: true,
      },
      performance: {
        maxDuration: 400,
        targetFPS: 60,
        memoryLimit: 10,
        gpuAcceleration: true,
      },
    },
    'service-filter'
  )

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedTechnologies.length > 0 ||
    searchQuery.length > 0

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Search */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            type='text'
            placeholder='Search services...'
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Categories</h3>
          <div className='flex flex-wrap gap-2'>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Technologies</h3>
          <div className='flex flex-wrap gap-2'>
            {technologies.map(technology => (
              <button
                key={technology.id}
                onClick={() => onTechnologyToggle(technology.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTechnologies.includes(technology.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {technology.name} ({technology.count})
              </button>
            ))}
          </div>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant='outline' size='sm'>
            <X className='h-4 w-4 mr-2' />
            Clear Filters
          </Button>
        )}
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
  }

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut' as const,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
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
      {/* Search */}
      <motion.div variants={itemVariants} className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <input
          type='text'
          placeholder='Search services...'
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
        />
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants}>
        <h3 className='text-lg font-semibold mb-3 flex items-center'>
          <Filter className='h-4 w-4 mr-2' />
          Categories
        </h3>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              variants={filterVariants}
              whileHover='hover'
              whileTap='tap'
              onClick={() => onCategoryToggle(category.id)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedCategories.includes(category.id)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div variants={itemVariants}>
        <h3 className='text-lg font-semibold mb-3'>Technologies</h3>
        <div className='flex flex-wrap gap-2'>
          {technologies.map((technology, index) => (
            <motion.button
              key={technology.id}
              variants={filterVariants}
              whileHover='hover'
              whileTap='tap'
              onClick={() => onTechnologyToggle(technology.id)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedTechnologies.includes(technology.id)
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {technology.name} ({technology.count})
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='space-y-3'
        >
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-medium text-muted-foreground'>
              Active Filters
            </h4>
            <Button
              onClick={onClearFilters}
              variant='outline'
              size='sm'
              className='text-xs'
            >
              <X className='h-3 w-3 mr-1' />
              Clear All
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {selectedCategories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId)
              return (
                <motion.div
                  key={categoryId}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant='secondary'
                    className='bg-blue-100 text-blue-800 hover:bg-blue-200'
                  >
                    {category?.name}
                    <button
                      onClick={() => onCategoryToggle(categoryId)}
                      className='ml-2 hover:text-blue-600'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                </motion.div>
              )
            })}

            {selectedTechnologies.map(technologyId => {
              const technology = technologies.find(t => t.id === technologyId)
              return (
                <motion.div
                  key={technologyId}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant='secondary'
                    className='bg-green-100 text-green-800 hover:bg-green-200'
                  >
                    {technology?.name}
                    <button
                      onClick={() => onTechnologyToggle(technologyId)}
                      className='ml-2 hover:text-green-600'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Filter results counter
interface FilterResultsProps {
  totalCount: number
  filteredCount: number
  className?: string
}

export const FilterResults: React.FC<FilterResultsProps> = ({
  totalCount,
  filteredCount,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        Showing {filteredCount} of {totalCount} services
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`text-sm text-muted-foreground ${className}`}
    >
      <motion.span
        key={filteredCount}
        initial={{ scale: 1.2, color: '#3B82F6' }}
        animate={{ scale: 1, color: 'inherit' }}
        transition={{ duration: 0.3 }}
      >
        {filteredCount}
      </motion.span>{' '}
      of {totalCount} services
    </motion.div>
  )
}

export default ServiceFilter
