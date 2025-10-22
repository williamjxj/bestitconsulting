'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Star, Zap, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ServiceFeature {
  name: string
  included: boolean
  description?: string
}

interface ServicePlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  features: ServiceFeature[]
  popular?: boolean
  icon: React.ReactNode
  color: string
  cta: string
}

const servicePlans: ServicePlan[] = [
  {
    id: 'basic',
    name: 'Basic Consulting',
    description: 'Essential IT guidance for small businesses',
    price: '$2,500',
    period: 'per month',
    icon: <Users className="h-8 w-8" />,
    color: 'blue',
    cta: 'Get Started',
    features: [
      { name: 'Initial Assessment', included: true, description: 'Comprehensive IT audit' },
      { name: 'Strategic Planning', included: true, description: '3-month roadmap' },
      { name: 'Monthly Check-ins', included: true, description: '2 hours per month' },
      { name: 'Email Support', included: true, description: 'Response within 24h' },
      { name: 'Implementation Support', included: false },
      { name: '24/7 Monitoring', included: false },
      { name: 'Advanced Security', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional Services',
    description: 'Comprehensive IT solutions for growing companies',
    price: '$7,500',
    period: 'per month',
    icon: <Zap className="h-8 w-8" />,
    color: 'purple',
    cta: 'Most Popular',
    popular: true,
    features: [
      { name: 'Initial Assessment', included: true, description: 'Comprehensive IT audit' },
      { name: 'Strategic Planning', included: true, description: '6-month roadmap' },
      { name: 'Weekly Check-ins', included: true, description: '4 hours per week' },
      { name: 'Priority Support', included: true, description: 'Response within 4h' },
      { name: 'Implementation Support', included: true, description: 'Full project management' },
      { name: '24/7 Monitoring', included: true, description: 'Proactive issue detection' },
      { name: 'Advanced Security', included: true, description: 'Multi-layer protection' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Solutions',
    description: 'Full-scale digital transformation for large organizations',
    price: 'Custom',
    period: 'pricing',
    icon: <Shield className="h-8 w-8" />,
    color: 'green',
    cta: 'Contact Sales',
    features: [
      { name: 'Initial Assessment', included: true, description: 'Enterprise-wide audit' },
      { name: 'Strategic Planning', included: true, description: '12-month roadmap' },
      { name: 'Dedicated Team', included: true, description: 'Full-time consultants' },
      { name: '24/7 Support', included: true, description: 'Immediate response' },
      { name: 'Implementation Support', included: true, description: 'Complete project delivery' },
      { name: '24/7 Monitoring', included: true, description: 'Advanced analytics' },
      { name: 'Advanced Security', included: true, description: 'Enterprise-grade security' },
    ],
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

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function ServiceComparison() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getTextColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Service Comparison
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare our service tiers and find the perfect solution for your business needs.
            All plans include our core consulting expertise with varying levels of support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {servicePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-200 shadow-xl ring-2 ring-purple-100' 
                  : 'border-border hover:border-blue-200'
              } ${hoveredPlan === plan.id ? 'shadow-2xl' : 'shadow-lg'}`}>
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getColorClasses(plan.color)} flex items-center justify-center text-white`}
                  >
                    {plan.icon}
                  </motion.div>
                  
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4 mb-8"
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature.name}
                        variants={featureVariants}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.name}
                          </div>
                          {feature.description && (
                            <div className="text-sm text-muted-foreground">
                              {feature.description}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                        : `bg-gradient-to-r ${getColorClasses(plan.color)} hover:opacity-90`
                    }`}
                    size="lg"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Need a custom solution? We're here to help.
          </p>
          <Button variant="outline" size="lg">
            Contact Our Team
          </Button>
        </motion.div>
      </div>
    </section>
  )
}