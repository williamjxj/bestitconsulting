'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import R2Image from '@/components/R2Image'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  videoUrl?: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Chief Technology Officer',
    company: 'TechStart Inc.',
    content: 'BestIT Consulting transformed our entire infrastructure in just 6 months. Their expertise in cloud migration saved us 40% in operational costs while improving performance by 200%.',
    rating: 5,
    avatar: '/bestit-imgs/william-jiang.jpeg',
    featured: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'VP of Engineering',
    company: 'DataFlow Solutions',
    content: 'The team at BestIT delivered our MVP in record time. Their agile approach and technical excellence helped us secure Series A funding. Truly professional partners.',
    rating: 5,
    avatar: '/bestit-imgs/william-jiang.jpg',
    videoUrl: '/api/placeholder/400/300',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder & CEO',
    company: 'InnovateLab',
    content: 'Working with BestIT was a game-changer. They helped us implement a robust cybersecurity framework that protected us from multiple attack attempts. Highly recommended!',
    rating: 5,
    avatar: '/bestit-imgs/william.jiang.png',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'IT Director',
    company: 'GlobalCorp',
    content: 'BestIT\'s team augmentation services allowed us to scale our development team quickly. The developers they provided were top-notch and integrated seamlessly.',
    rating: 5,
    avatar: '/bestit-imgs/william-jiang.jpeg',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Operations Manager',
    company: 'ScaleUp Technologies',
    content: 'Their digital transformation strategy helped us modernize our legacy systems. The ROI was evident within the first quarter. Exceptional service and results.',
    rating: 5,
    avatar: '/bestit-imgs/william-jiang.jpg',
    featured: true,
  },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection
      if (newIndex >= testimonials.length) return 0
      if (newIndex < 0) return testimonials.length - 1
      return newIndex
    })
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Say About Us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with BestIT Consulting.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main testimonial card */}
            <div className="relative h-[500px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                    <CardContent className="h-full flex flex-col lg:flex-row p-0">
                      {/* Video/Image Section */}
                      <div className="lg:w-1/2 relative overflow-hidden">
                        {currentTestimonial.videoUrl ? (
                          <div className="relative h-full">
                            <R2Image
                              src={currentTestimonial.avatar}
                              alt={currentTestimonial.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <Button
                                size="lg"
                                className="rounded-full w-16 h-16 bg-white/90 hover:bg-white"
                              >
                                <Play className="h-6 w-6 text-blue-600 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            <R2Image
                              src={currentTestimonial.avatar}
                              alt={currentTestimonial.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <Quote className="h-12 w-12 text-blue-500 mb-4" />
                          <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                            "{currentTestimonial.content}"
                          </blockquote>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <R2Image
                              src={currentTestimonial.avatar}
                              alt={currentTestimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                            <div className="text-gray-600">{currentTestimonial.role}</div>
                            <div className="text-blue-600 font-medium">{currentTestimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12"
                onClick={() => paginate(-1)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12"
                onClick={() => paginate(1)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Additional testimonials grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  "{testimonial.content.substring(0, 120)}..."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <R2Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
