'use client'

import { useState, useEffect, useRef } from 'react'
import { TechnologyCardProps } from '@/specs/002-tech-showcase-redesign/contracts/component-interfaces'
import {
  getAnimationClasses,
  optimizeForPerformance,
  cleanupPerformanceOptimizations,
} from '@/lib/animations'

/**
 * TechnologyCard - Individual technology display component
 *
 * Features:
 * - Hover effects and animations
 * - Performance optimization
 * - Accessibility support
 * - Responsive design
 */
export default function TechnologyCard({
  technology,
  isVisible,
  animationDelay = 0,
  className = '',
  onClick,
}: TechnologyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Handle visibility and animation
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, animationDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, isLoaded, animationDelay])

  // Performance optimization
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    if (isVisible) {
      optimizeForPerformance(card)
    } else {
      cleanupPerformanceOptimizations(card)
    }
  }, [isVisible])

  // Handle click events
  const handleClick = () => {
    onClick?.(technology)
  }

  // Handle keyboard events
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  // Animation classes based on state
  const animationClasses = isLoaded
    ? getAnimationClasses(1)
    : getAnimationClasses(0)

  // Get category-based styling
  const getCategoryStyling = (category: string) => {
    switch (category) {
      case 'FRONTEND':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200'
      case 'BACKEND':
        return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200'
      case 'CLOUD_DEVOPS':
        return 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`
        technology-card group cursor-pointer
        ${animationClasses}
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role='button'
      aria-label={`${technology.name} technology`}
      aria-describedby={
        technology.description ? `tech-${technology.id}-desc` : undefined
      }
      data-technology-item
    >
      <div
        className={`
          relative w-24 h-24 rounded-2xl
          flex flex-col items-center justify-center
          transition-all duration-300 ease-out
          ${getCategoryStyling(technology.category)}
          ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
          ${isHovered ? 'shadow-xl' : 'shadow-sm'}
        `}
        style={{
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Technology Icon */}
        <div
          className={`
            text-white bg-gradient-to-br ${technology.color} p-2 rounded-xl mb-2
            transition-transform duration-300 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        >
          {technology.icon}
        </div>

        {/* Technology Name */}
        <span
          className={`
            text-xs font-medium text-gray-700 text-center
            transition-colors duration-300
            ${isHovered ? 'text-blue-600' : 'text-gray-700'}
          `}
        >
          {technology.name}
        </span>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <div
            className='absolute inset-0 bg-blue-500/10 rounded-2xl pointer-events-none'
            style={{
              animation: 'fadeIn 0.2s ease-out',
            }}
          />
        )}

        {/* Loading State */}
        {!isLoaded && (
          <div className='absolute inset-0 bg-gray-100 rounded-2xl animate-pulse' />
        )}
      </div>

      {/* Description Tooltip (if available) */}
      {technology.description && (
        <div
          id={`tech-${technology.id}-desc`}
          className={`
            absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
            bg-gray-900 text-white text-xs rounded-lg px-3 py-2
            opacity-0 pointer-events-none
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            z-10 max-w-48 text-center
          `}
          style={{
            animation: isHovered ? 'fadeIn 0.3s ease-out' : undefined,
          }}
        >
          {technology.description}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900' />
        </div>
      )}

      {/* Focus Indicator */}
      <div
        className={`
          absolute inset-0 rounded-2xl border-2 border-transparent
          transition-all duration-200
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        `}
        style={{
          outline: 'none',
        }}
      />
    </div>
  )
}
