import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { User, Briefcase, GraduationCap, Users } from 'lucide-react';

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { value: 5, suffix: '+', label: 'Years Experience', icon: Briefcase },
    { value: 40, suffix: '+', label: 'Projects Done', icon: User },
    { value: 98, suffix: '%', label: 'Success Rate', icon: Users },
    { value: 12, suffix: '', label: 'Tech Stack Certs', icon: GraduationCap },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      data-testid="about-section"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">About Me</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">My Journey & Experience</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Card / Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-64 sm:w-80 aspect-square">
            {/* Outline Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-500 blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
            
            {/* Avatar Container */}
            <div className="w-full h-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 glass flex items-center justify-center relative">
              {/* Inner Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 to-indigo-950/10 dark:from-violet-900/20 dark:to-indigo-950/20" />
              
              {/* Custom SVG Profile Illustration */}
              <svg 
                className="w-2/3 h-2/3 text-violet-600/80 dark:text-violet-400/80" 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="70" r="40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M40 160C40 126.863 66.8629 100 100 100C133.137 100 160 126.863 160 160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <rect x="60" y="65" width="80" height="10" rx="5" fill="currentColor" opacity="0.3" />
              </svg>
              
              {/* Overlay styling */}
              <div className="absolute bottom-4 left-4 right-4 py-3 px-4 rounded-2xl glass text-center">
                <span className="text-xs font-semibold text-zinc-800 dark:text-white">Full-Stack Architect</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio & Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="glass p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/85">
            <h3 className="font-heading font-bold text-2xl text-zinc-900 dark:text-white mb-4">Hello! I'm Nikesh</h3>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              I am a passionate software engineer focused on building highly polished, interactive, and high-performance web systems. Over the years, I've worked across multiple frontend and backend stacks, bridging technical architecture with user experience design.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Whether building accessible single-page web applications or setting up robust microservices, I prioritize scalable, readable code and rich user interactions.
            </p>
          </div>

          {/* Stats Counter Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-4 hover-gradient-border"
              >
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white flex items-center">
                    {inView ? (
                      <CountUp end={stat.value} duration={2.5} />
                    ) : (
                      <span>0</span>
                    )}
                    <span className="text-violet-600">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
