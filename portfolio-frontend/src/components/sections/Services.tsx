import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Layout, Server, Cloud, Paintbrush, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Layout,
    title: 'Frontend Development',
    description: 'Developing high-fidelity, responsive frontend systems using React, Next.js, TypeScript, and Tailwind CSS. Focused on performance, accessibility, and micro-interactions.',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    icon: Server,
    title: 'Backend & API Design',
    description: 'Engineering secure, highly concurrent backend architectures, RESTful APIs, and GraphQL endpoints using Node.js, Express, Go, PostgreSQL, and Redis.',
    techs: ['Node.js', 'Go', 'PostgreSQL', 'GraphQL'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Setting up automated continuous integration and delivery pipelines (CI/CD), Docker containers, Kubernetes orchestrations, and deploying on AWS/Vercel.',
    techs: ['Docker', 'AWS', 'GitHub Actions', 'Vercel'],
  },
  {
    icon: Paintbrush,
    title: 'UI/UX Prototyping',
    description: 'Translating design concepts and workflows into clean wireframes and prototype interfaces in Figma, keeping user journeys intuitive and conversion-oriented.',
    techs: ['Figma', 'Wireframing', 'Prototyping', 'Design System'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Improving core web vitals, bundle size optimization, server-side caching, and static generation mechanisms to ensure fast execution and page speed.',
    techs: ['Core Web Vitals', 'Lighthouse', 'Lazy Loading', 'CDN'],
  },
  {
    icon: ShieldCheck,
    title: 'Security Auditing',
    description: 'Implementing token-based authorization protocols, data encryptions, rate limiting, and CORS restrictions to keep data transactions and server runtimes secure.',
    techs: ['JWT', 'OAuth2', 'HTTPS', 'Helmet.js'],
  },
];

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-testid="services-section"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">My Services</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Services I Offer</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="glass p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 hover-gradient-border flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
              {service.techs.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
