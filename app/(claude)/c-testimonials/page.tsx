'use client'

import React, { useState } from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Quote,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Zap,
  Heart,
  ThumbsUp,
  Building2,
  X,
} from 'lucide-react'

const ScrollReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

const StaggerChildren = ({
  children,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  staggerDelay?: number
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const { scrollYProgress } = useScroll()
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'VP of Technology',
      company: 'MedTech Solutions',
      avatar: '👩‍💼',
      rating: 5,
      quote:
        "BestIT didn't just build our platform—they transformed how we think about development.",
      fullStory:
        "Before working with BestIT, our development team was spending 60% of their time on maintenance and firefighting. We had ambitious product goals but couldn't seem to get ahead. The team at BestIT came in and immediately identified bottlenecks in our process. Within the first month, they had automated 70% of our routine tasks using AI pipelines. But what really impressed me was their approach—they didn't just hand us code and leave. They trained our team, documented everything, and made sure we could maintain and extend the system ourselves. Three months in, we've shipped three major features that had been on our backlog for over a year. Our deployment time went from 3 days to 4 hours. The ROI was visible in month one, but the long-term impact on our team's morale and productivity has been transformational.",
      results: [
        { metric: '70%', label: 'Tasks Automated' },
        { metric: '3', label: 'Features Shipped' },
        { metric: '4hrs', label: 'Deploy Time' },
      ],
      industry: 'Healthcare',
      projectType: 'AI Automation',
    },
    {
      id: 2,
      name: 'Mike Anderson',
      role: 'CTO',
      company: 'RetailHub',
      avatar: '👨‍💻',
      rating: 5,
      quote:
        'First Black Friday without a crash in 5 years. Sales were up 200%. This team is incredible.',
      fullStory:
        "Our e-commerce platform was 10 years old and held together with duct tape and prayers. Every Black Friday, we'd brace for impact—and inevitably, the site would crash during peak hours. We were losing millions in revenue and customer trust. BestIT proposed a complete rebuild using Next.js and serverless architecture. I was skeptical about the timeline—they said 8 weeks. But they delivered. The new platform is blazingly fast, scales automatically, and the code is so clean our junior developers can work on it. This past Black Friday was the first time in 5 years we didn't have an emergency. The site handled 15x our normal traffic without breaking a sweat. Sales were up 200%, partly because customers could actually complete their purchases. The investment paid for itself in that one weekend.",
      results: [
        { metric: '15x', label: 'Traffic Capacity' },
        { metric: '60%', label: 'Faster Loads' },
        { metric: '$2M', label: 'Extra Revenue' },
      ],
      industry: 'E-Commerce',
      projectType: 'Platform Modernization',
    },
    {
      id: 3,
      name: 'Dr. Emily Zhang',
      role: 'VP of AI Research',
      company: 'Xperi Corporation',
      avatar: '👩‍🔬',
      rating: 5,
      quote:
        'Our data science team is now 5x more productive. This ML platform is phenomenal.',
      fullStory:
        "We had a team of brilliant data scientists who were wasting 80% of their time on infrastructure and DevOps. Setting up an experiment could take a full day. GPU utilization was under 30% because coordinating resources was a nightmare. BestIT built us a self-service ML platform that changed everything. Now, a data scientist can launch an experiment with a few clicks. The platform handles all the infrastructure provisioning, monitoring, and cost optimization automatically. GPU utilization jumped to 85%. Our team is running 5x more experiments, which means we're iterating faster and shipping better models. The platform also tracks experiment history and reproducibility, which has been crucial for our production deployments. This was exactly what we needed but didn't know how to build ourselves.",
      results: [
        { metric: '85%', label: 'GPU Usage' },
        { metric: '5x', label: 'More Experiments' },
        { metric: '40%', label: 'Cost Savings' },
      ],
      industry: 'AI/ML',
      projectType: 'Data Platform',
    },
    {
      id: 4,
      name: 'James Rodriguez',
      role: 'Founder & CEO',
      company: 'FinFlow',
      avatar: '👨‍💼',
      rating: 5,
      quote:
        'They delivered our MVP in 8 weeks. Others quoted 6 months. We secured Series A funding.',
      fullStory:
        "As a first-time founder, I had a tight timeline and tighter budget. We needed an MVP to show investors before our runway ended. Traditional agencies quoted 6 months and $300K. BestIT quoted 8 weeks. I was skeptical but desperate. They delivered in 7 weeks. The app was production-ready, beautiful, and performed flawlessly. More importantly, they understood the startup mentality—we needed to move fast and pivot when necessary. They built the app in a modular way that made it easy to iterate. When we presented to investors, the app was the star of the pitch. We secured our Series A largely because we had a working product, not just slides. BestIT didn't just build an app; they bought us the credibility and momentum we needed to succeed.",
      results: [
        { metric: '8wks', label: 'To Launch' },
        { metric: '4.8★', label: 'App Rating' },
        { metric: '$5M', label: 'Series A Raised' },
      ],
      industry: 'FinTech',
      projectType: 'Mobile App',
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'VP Engineering',
      company: 'HSBC Digital',
      avatar: '👩‍💻',
      rating: 5,
      quote:
        "Cloud migration ROI was visible in month one. Best technical investment we've made.",
      fullStory:
        "We were spending half a million dollars a year on on-premise infrastructure that was constantly breaking. Deployments took days. Every minor update felt like defusing a bomb. Our board wanted us to move to the cloud, but our team didn't have the expertise. BestIT came in with a clear migration plan. They containerized our applications, set up Kubernetes, implemented CI/CD pipelines, and migrated everything to AWS with zero downtime. The entire migration took 12 weeks. Now our infrastructure costs 60% less, deployments take 10 minutes instead of 3 days, and our uptime is 99.99%. The best part? They trained our team so we can manage everything ourselves. This was the best technical investment we've made in the past decade.",
      results: [
        { metric: '60%', label: 'Cost Reduction' },
        { metric: '10min', label: 'Deploy Time' },
        { metric: '99.99%', label: 'Uptime' },
      ],
      industry: 'Banking',
      projectType: 'Cloud Migration',
    },
    {
      id: 6,
      name: 'Tom Wilson',
      role: 'Head of Product',
      company: 'DataFlow Analytics',
      avatar: '👨‍💼',
      rating: 5,
      quote:
        'Real-time dashboards that actually work. Our customers love the new analytics platform.',
      fullStory:
        'Our analytics platform was a disaster. Data was 24 hours stale, dashboards were slow, and customers were threatening to leave. We needed a complete overhaul but our internal team was underwater. BestIT stepped in and built us a real-time data pipeline with beautiful, responsive dashboards. The transformation was incredible. Data latency went from 24 hours to under 5 seconds. Dashboards load instantly. And the UI is so intuitive our customers stopped calling support. Within 2 months, customer satisfaction scores jumped 45 points. Churn dropped by half. Several customers who were considering leaving actually upgraded their plans. BestIT saved our business.',
      results: [
        { metric: '5sec', label: 'Data Latency' },
        { metric: '45pts', label: 'CSAT Increase' },
        { metric: '50%', label: 'Less Churn' },
      ],
      industry: 'Analytics',
      projectType: 'Real-Time Platform',
    },
  ]

  return (
    <div className='min-h-screen bg-slate-50'>
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left'
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero */}
      <section className='relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm'
            >
              <Heart className='w-4 h-4' />
              <span className='text-sm font-medium'>
                Client Success Stories
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'
            >
              Don't Take Our Word for It.
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                Hear From Our Clients
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'
            >
              Real businesses. Real challenges. Real transformations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className='py-16 bg-white border-b border-slate-200'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {[
                { icon: Users, value: '50+', label: 'Happy Clients' },
                { icon: Star, value: '4.9/5', label: 'Average Rating' },
                { icon: Award, value: '100%', label: 'Success Rate' },
                { icon: TrendingUp, value: '10x', label: 'Avg ROI' },
              ].map((stat, idx) => (
                <div key={idx} className='text-center'>
                  <stat.icon className='w-8 h-8 text-blue-600 mx-auto mb-3' />
                  <div className='text-3xl font-bold text-slate-900 mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-slate-600'>{stat.label}</div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className='py-24 bg-slate-50'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                Success Stories
              </h2>
              <p className='text-xl text-slate-600'>
                These aren't just testimonials—they're transformation stories
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {testimonials.map(testimonial => (
                <motion.div
                  key={testimonial.id}
                  whileHover={{ y: -8 }}
                  className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 cursor-pointer'
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className='flex gap-1 mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 fill-yellow-500 text-yellow-500'
                      />
                    ))}
                  </div>

                  <Quote className='w-10 h-10 text-blue-200 mb-4' />

                  <p className='text-lg text-slate-700 mb-6 leading-relaxed italic'>
                    "{testimonial.quote}"
                  </p>

                  <div className='grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-slate-200'>
                    {testimonial.results.map((result, idx) => (
                      <div key={idx} className='text-center'>
                        <div className='text-xl font-bold text-blue-600'>
                          {result.metric}
                        </div>
                        <div className='text-xs text-slate-600'>
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='text-4xl'>{testimonial.avatar}</div>
                    <div className='flex-1'>
                      <div className='font-semibold text-slate-900'>
                        {testimonial.name}
                      </div>
                      <div className='text-sm text-slate-600'>
                        {testimonial.role}
                      </div>
                      <div className='text-sm text-blue-600 font-medium'>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 flex items-center gap-2 text-blue-600 font-semibold'>
                    Read Full Story <ArrowRight className='w-5 h-5' />
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                Trusted Across Industries
              </h2>
              <p className='text-xl text-slate-600'>
                From healthcare to finance, we've helped businesses transform
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {[
                { icon: '🏥', name: 'Healthcare', count: '12 clients' },
                { icon: '🏦', name: 'Banking & Finance', count: '18 clients' },
                { icon: '🛒', name: 'E-Commerce', count: '15 clients' },
                { icon: '🤖', name: 'AI/ML', count: '10 clients' },
                { icon: '📊', name: 'Analytics', count: '8 clients' },
                { icon: '📱', name: 'Mobile Apps', count: '14 clients' },
              ].map((industry, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 text-center'
                >
                  <div className='text-5xl mb-3'>{industry.icon}</div>
                  <h3 className='text-lg font-bold text-slate-900 mb-1'>
                    {industry.name}
                  </h3>
                  <p className='text-sm text-slate-600'>{industry.count}</p>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 bg-gradient-to-br from-blue-600 to-purple-700'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Ready to Write Your Success Story?
              </h2>
              <p className='text-xl text-blue-100 mb-8'>
                Join 50+ companies who've already transformed their businesses
                with us
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl inline-flex items-center gap-3'
              >
                Start Your Transformation
                <ArrowRight className='w-6 h-6' />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6'
          onClick={() => setSelectedTestimonial(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'
            onClick={e => e.stopPropagation()}
          >
            <div className='p-8 md:p-12'>
              <div className='flex justify-between items-start mb-8'>
                <div className='flex gap-1'>
                  {[...Array(selectedTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-6 h-6 fill-yellow-500 text-yellow-500'
                    />
                  ))}
                </div>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className='text-slate-400 hover:text-slate-600'
                >
                  <X className='w-8 h-8' />
                </button>
              </div>

              <div className='flex items-center gap-4 mb-8'>
                <div className='text-6xl'>{selectedTestimonial.avatar}</div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900'>
                    {selectedTestimonial.name}
                  </h2>
                  <p className='text-slate-600'>{selectedTestimonial.role}</p>
                  <p className='text-blue-600 font-medium'>
                    {selectedTestimonial.company}
                  </p>
                </div>
              </div>

              <div className='mb-8'>
                <div className='flex gap-3 mb-4'>
                  <span className='px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full'>
                    {selectedTestimonial.industry}
                  </span>
                  <span className='px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full'>
                    {selectedTestimonial.projectType}
                  </span>
                </div>
              </div>

              <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8'>
                <h3 className='text-2xl font-bold text-slate-900 mb-6 text-center'>
                  Results
                </h3>
                <div className='grid grid-cols-3 gap-6'>
                  {selectedTestimonial.results.map(
                    (result: any, idx: number) => (
                      <div key={idx} className='text-center'>
                        <div className='text-4xl font-bold text-blue-600 mb-2'>
                          {result.metric}
                        </div>
                        <div className='text-slate-600'>{result.label}</div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className='prose prose-lg max-w-none mb-8'>
                <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                  The Full Story
                </h3>
                <p className='text-slate-600 leading-relaxed'>
                  {selectedTestimonial.fullStory}
                </p>
              </div>

              <div className='flex gap-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold'
                >
                  Start Similar Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-6 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg font-semibold'
                >
                  Schedule Call
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
