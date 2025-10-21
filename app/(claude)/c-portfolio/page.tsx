'use client'

import React, { useState } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import {
  ArrowRight, ExternalLink, Code, Cloud, ShoppingCart,
  TrendingUp, Users, Zap, Award, CheckCircle2, BarChart3,
  Smartphone, Globe, Database, Lock, X
} from 'lucide-react';

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

const StaggerChildren = ({ children, staggerDelay = 0.1 }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

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
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'cloud', label: 'Cloud' }
  ];

  const projects = [
    {
      id: 1,
      title: "MedTech AI Assistant",
      category: "ai",
      client: "Healthcare SaaS",
      icon: "🏥",
      tagline: "AI-powered patient care platform",
      challenge: "Manual patient data entry was taking nurses 3+ hours per shift, reducing time for actual patient care.",
      solution: "Built an AI assistant that extracts data from medical forms, integrates with EHR systems, and reduces data entry by 90%.",
      results: [
        { metric: "90%", label: "Less Data Entry" },
        { metric: "3hrs", label: "Saved Per Shift" },
        { metric: "99.8%", label: "Accuracy Rate" }
      ],
      tech: ["Python", "OpenAI GPT-4", "LangChain", "AWS", "React"],
      features: [
        "Natural language processing for medical forms",
        "Real-time EHR integration",
        "HIPAA-compliant data handling",
        "Multi-language support"
      ],
      testimonial: {
        quote: "This AI assistant gave our nurses their time back. Patient satisfaction scores increased 40%.",
        author: "Dr. Sarah Johnson",
        role: "Chief Medical Officer"
      }
    },
    {
      id: 2,
      title: "E-Commerce Platform Modernization",
      category: "web",
      client: "Retail Chain",
      icon: "🛒",
      tagline: "Legacy to modern stack migration",
      challenge: "10-year-old e-commerce platform couldn't handle Black Friday traffic. Site crashed every major sale.",
      solution: "Rebuilt from scratch using Next.js, implemented edge caching, and migrated to serverless architecture.",
      results: [
        { metric: "15x", label: "Traffic Capacity" },
        { metric: "60%", label: "Faster Load Times" },
        { metric: "$2M", label: "Extra Revenue" }
      ],
      tech: ["Next.js", "React", "Node.js", "AWS Lambda", "DynamoDB"],
      features: [
        "Server-side rendering for SEO",
        "Edge caching with CloudFront",
        "Real-time inventory management",
        "Progressive Web App (PWA)"
      ],
      testimonial: {
        quote: "First Black Friday without a crash in 5 years. Sales were up 200%.",
        author: "Mike Chen",
        role: "CTO"
      }
    },
    {
      id: 3,
      title: "Financial Analytics Dashboard",
      category: "web",
      client: "Credit Suisse",
      icon: "📊",
      tagline: "Real-time stock market insights",
      challenge: "Traders needed real-time market data but legacy systems had 15+ second delays.",
      solution: "Built real-time data pipeline with WebSockets, React frontend, and microservices architecture.",
      results: [
        { metric: "<100ms", label: "Data Latency" },
        { metric: "500K", label: "Events/Second" },
        { metric: "99.99%", label: "Uptime" }
      ],
      tech: ["React", "Node.js", "WebSockets", "MongoDB", "Kafka"],
      features: [
        "Real-time WebSocket connections",
        "Custom charting library",
        "Multi-currency support",
        "Advanced filtering and alerts"
      ],
      testimonial: {
        quote: "Game-changer for our trading desk. Decisions are now data-driven and instant.",
        author: "James Williams",
        role: "Head of Trading"
      }
    },
    {
      id: 4,
      title: "Cloud Migration & DevOps",
      category: "cloud",
      client: "HSBC Banking",
      icon: "☁️",
      tagline: "On-premise to AWS migration",
      challenge: "Legacy on-premise infrastructure costing $500K/year with frequent outages.",
      solution: "Migrated to AWS with Kubernetes, implemented CI/CD, and reduced infrastructure costs by 60%.",
      results: [
        { metric: "60%", label: "Cost Reduction" },
        { metric: "10x", label: "Faster Deploys" },
        { metric: "Zero", label: "Downtime" }
      ],
      tech: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
      features: [
        "Auto-scaling infrastructure",
        "Blue-green deployments",
        "Automated backup and recovery",
        "24/7 monitoring and alerts"
      ],
      testimonial: {
        quote: "ROI was visible in month one. Best technical investment we've made.",
        author: "Lisa Park",
        role: "VP Engineering"
      }
    },
    {
      id: 5,
      title: "Mobile Banking App",
      category: "mobile",
      client: "FinTech Startup",
      icon: "📱",
      tagline: "Consumer banking reimagined",
      challenge: "Needed to launch MVP in 8 weeks to secure Series A funding.",
      solution: "React Native app with biometric auth, real-time transactions, and AI-powered insights.",
      results: [
        { metric: "8 weeks", label: "To Launch" },
        { metric: "4.8★", label: "App Store Rating" },
        { metric: "100K", label: "Downloads in 3mo" }
      ],
      tech: ["React Native", "Node.js", "PostgreSQL", "AWS", "Plaid API"],
      features: [
        "Biometric authentication",
        "Real-time push notifications",
        "AI spending insights",
        "Instant money transfers"
      ],
      testimonial: {
        quote: "They delivered in 8 weeks what others quoted 6 months for. Incredible team.",
        author: "Tom Anderson",
        role: "Founder & CEO"
      }
    },
    {
      id: 6,
      title: "ML Data Pipeline Platform",
      category: "ai",
      client: "Xperi Corporation",
      icon: "🤖",
      tagline: "GPU cluster management system",
      challenge: "Data scientists wasting hours setting up experiments. GPU utilization under 30%.",
      solution: "Built self-service ML platform with automated provisioning, monitoring, and cost optimization.",
      results: [
        { metric: "85%", label: "GPU Utilization" },
        { metric: "5x", label: "More Experiments" },
        { metric: "40%", label: "Cost Savings" }
      ],
      tech: ["Python", "Kubernetes", "React", "Node.js", "TensorFlow"],
      features: [
        "One-click experiment setup",
        "Real-time GPU monitoring",
        "Automated cost optimization",
        "Experiment versioning"
      ],
      testimonial: {
        quote: "Our data science team is now 5x more productive. This platform is phenomenal.",
        author: "Dr. Emily Zhang",
        role: "VP of AI Research"
      }
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Our Work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Real Projects.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Real Results.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
            >
              From Fortune 500 companies to fast-growing startups, here's how we've helped
              businesses transform with AI and modern technology.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <StaggerChildren staggerDelay={0.1}>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl">{project.icon}</div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                        {project.client}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-blue-600 font-medium mb-4">{project.tagline}</p>
                    <p className="text-slate-600 mb-6 leading-relaxed">{project.challenge}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{result.metric}</div>
                          <div className="text-xs text-slate-600">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      View Case Study <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to See Similar Results?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss how we can transform your business with proven strategies
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl inline-flex items-center gap-3"
              >
                Start Your Project
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{selectedProject.icon}</div>
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      {selectedProject.client}
                    </span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-2">{selectedProject.title}</h2>
                    <p className="text-xl text-blue-600 font-medium">{selectedProject.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">The Challenge</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{selectedProject.challenge}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Solution</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{selectedProject.solution}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Results</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">{result.metric}</div>
                        <div className="text-slate-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 text-white">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xl italic mb-4">"{selectedProject.testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    <div>
                      <div className="font-semibold">{selectedProject.testimonial.author}</div>
                      <div className="text-slate-400 text-sm">{selectedProject.testimonial.role}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Start Similar Project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg font-semibold"
                  >
                    Schedule Call
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
