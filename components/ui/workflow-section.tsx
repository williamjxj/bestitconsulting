'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WorkflowStep {
  title: string
  description: string
  icon: React.ReactNode
}

interface WorkflowSectionProps {
  steps: WorkflowStep[]
  className?: string
}

/**
 * WorkflowSection - Dynamic SVG workflow component with animated connections
 * Enhanced with premium RAGflow-style orchestration visualization
 */
export function WorkflowSection({ steps, className }: WorkflowSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const [pathData, setPathData] = useState<string>('')
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [isMobile, setIsMobile] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)

  // Cycle active step for sequential animation
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, 4000) // 4 seconds per step cycle
    return () => clearInterval(interval)
  }, [isInView, steps.length])

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate SVG path based on node positions
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[]

      if (nodes.length < steps.length) return

      // Wait for nodes to be properly positioned
      const allNodesReady = nodes.every(node => {
        const rect = node.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      })

      if (!allNodesReady) {
        setTimeout(updatePath, 50)
        return
      }

      if (isMobile) {
        // Vertical path for mobile
        const nodePositions = nodes.map(node => {
          const rect = node.getBoundingClientRect()
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          }
        })

        let path = `M ${nodePositions[0].x} ${nodePositions[0].y}`
        for (let i = 1; i < nodePositions.length; i++) {
          const prev = nodePositions[i - 1]
          const curr = nodePositions[i]
          const midY = (prev.y + curr.y) / 2

          // Refined S-curve for mobile
          path += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`
        }

        setPathData(path)
        setSvgDimensions({
          width: containerRect.width,
          height: Math.max(...nodePositions.map(p => p.y)) + 100,
        })
      } else {
        // Curved horizontal path for desktop
        const nodePositions = nodes.map(node => {
          const rect = node.getBoundingClientRect()
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          }
        })

        let path = `M ${nodePositions[0].x} ${nodePositions[0].y}`
        for (let i = 1; i < nodePositions.length; i++) {
          const prev = nodePositions[i - 1]
          const curr = nodePositions[i]
          const midX = (prev.x + curr.x) / 2

          // Advanced orchestration curve: Cubic Bézier with offset control points
          const cpOffset = 150
          path += ` C ${prev.x + cpOffset} ${prev.y}, ${curr.x - cpOffset} ${curr.y}, ${curr.x} ${curr.y}`
        }

        setPathData(path)
        setSvgDimensions({
          width: Math.max(...nodePositions.map(p => p.x)) + 100,
          height: Math.max(...nodePositions.map(p => p.y)) + 100,
        })
      }
    }

    const timer = setTimeout(updatePath, 150)
    window.addEventListener('resize', updatePath)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePath)
    }
  }, [isMobile, steps.length])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative py-12 md:py-24 rounded-3xl overflow-hidden min-h-[500px]',
        'bg-slate-50/50 dark:bg-slate-950/20',
        'border border-slate-200 dark:border-slate-800/50',
        className
      )}
    >
      {/* Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.1]"
           style={{
             backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
             backgroundSize: '32px 32px'
           }}
      />

      {/* Dynamic Background Glows following the sequence */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{
            x: isMobile ? '0%' : `${activeIndex * 25}%`,
            y: isMobile ? `${activeIndex * 25}%` : '20%',
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"
          animate={{
            right: isMobile ? '0%' : `${(3 - activeIndex) * 20}%`,
            bottom: isMobile ? `${(3 - activeIndex) * 20}%` : '20%',
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* SVG Background with advanced animations */}
      {pathData && svgDimensions.width > 0 && (
        <svg
          className='absolute inset-0 pointer-events-none overflow-visible z-10'
          width={svgDimensions.width}
          height={svgDimensions.height}
          viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        >
          <defs>
            <linearGradient id='workflow-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.1' />
              <stop offset='50%' stopColor='#6366f1' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#3b82f6' stopOpacity='0.1' />
            </linearGradient>

            <filter id='comet-glow'>
              <feGaussianBlur stdDeviation='3' result='blur' />
              <feComposite in='SourceGraphic' in2='blur' operator='over' />
            </filter>

            <filter id='glow-particle-lg'>
              <feGaussianBlur stdDeviation='4' result='coloredBlur' />
              <feMerge>
                <feMergeNode in='coloredBlur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Path Base */}
          <path
            id='workflow-connector'
            d={pathData}
            stroke='url(#workflow-gradient)'
            strokeWidth={1.5}
            fill='none'
            strokeLinecap='round'
            className="opacity-40"
          />

          {/* Glow Wave - High frequency pulse traveling along the line */}
          <path
            d={pathData}
            stroke='#3b82f6'
            strokeWidth={2}
            fill='none'
            strokeDasharray='100 800'
            className="opacity-60"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="900"
              to="0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Advanced Comet Trails - Staggered particles for tail effect */}
          {isInView && [0, 1, 2].map((particleGroup) => (
             <g key={`group-${particleGroup}`}>
               {[0, 1, 2, 3].map((trailIndex) => (
                  <circle
                    key={`trail-${particleGroup}-${trailIndex}`}
                    r={3 - trailIndex * 0.5}
                    fill={particleGroup % 2 === 0 ? '#3b82f6' : '#6366f1'}
                    opacity={1 - trailIndex * 0.25}
                    filter='url(#comet-glow)'
                  >
                    <animateMotion
                      dur={`${5 + particleGroup * 1.5}s`}
                      repeatCount='indefinite'
                      begin={`${particleGroup * 2.5 + trailIndex * 0.1}s`}
                      calcMode='spline'
                      keySplines='0.4 0 0.2 1'
                    >
                      <mpath href='#workflow-connector' />
                    </animateMotion>
                  </circle>
               ))}
             </g>
          ))}

          {/* Subtle static glowing dust points along path for texture */}
          <path
            d={pathData}
            stroke='white'
            strokeWidth={1}
            fill='none'
            strokeDasharray='1 150'
            className="opacity-20"
          />
        </svg>
      )}

      {/* Process Steps Grid */}
      <div className='container mx-auto px-6 relative z-20'>
        <div
          className={cn(
            'grid gap-12 md:gap-8 lg:gap-12',
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {steps.map((step, index) => {
            const isActive = activeIndex === index

            return (
              <motion.div
                key={index}
                ref={el => { nodeRefs.current[index] = el }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className='relative group cursor-default'
              >
                {/* Node Card - Glassmorphism */}
                <div className={cn(
                  "relative p-8 rounded-2xl h-full transition-all duration-700",
                  "bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl",
                  "border border-slate-200/50 dark:border-slate-800/50",
                  isActive
                    ? "border-blue-500/70 shadow-[0_12px_48px_rgba(59,130,246,0.2)] bg-white/60 dark:bg-slate-900/60 scale-[1.02]"
                    : "shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
                  "group-hover:border-blue-500/50 group-hover:bg-white/60 dark:group-hover:bg-slate-900/60",
                  "group-hover:shadow-[0_12px_48px_rgba(59,130,246,0.15)] group-hover:-translate-y-1"
                )}>
                  {/* Active Indicator Glow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeHighlight"
                        className="absolute inset-0 rounded-2xl bg-blue-500/5 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Container */}
                  <div className='relative mb-6 z-10'>
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500",
                      isActive ? "scale-110 shadow-xl shadow-blue-500/40" : "shadow-lg shadow-blue-500/10",
                      "bg-gradient-to-br from-blue-500 to-indigo-600 text-white group-hover:scale-110"
                    )}>
                      {step.icon}

                      {/* Ring Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-blue-400/50"
                        animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] } : { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: isActive ? 1.5 : 3, repeat: Infinity }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={cn(
                      "text-lg font-bold mb-3 transition-colors duration-500",
                      isActive ? "text-blue-600 dark:text-blue-400" : "dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    )}>
                      <span className={cn(
                        "text-blue-500 mr-2 font-mono text-sm transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-40"
                      )}>
                        0{index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
