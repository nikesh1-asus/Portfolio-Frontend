import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Code, Sparkles, Terminal, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../SocialIcons';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const typingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  const titleText = "Full-Stack Web Architect";

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 md:px-12"
      data-testid="hero-section"
    >
      {/* Background Gradients and Glowing Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Floating Decorative Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/5 left-[15%] text-violet-500/30 dark:text-violet-500/40 animate-float-slow">
          <Code className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-[12%] text-indigo-500/30 dark:text-indigo-500/40 animate-float-medium [animation-delay:1s]">
          <Terminal className="w-10 h-10" />
        </div>
        <div className="absolute bottom-1/5 left-[10%] text-purple-500/30 dark:text-purple-500/40 animate-float-medium [animation-delay:3s]">
          <Cpu className="w-8 h-8" />
        </div>
        <div className="absolute bottom-1/3 right-[18%] text-violet-500/30 dark:text-violet-500/40 animate-float-slow [animation-delay:2s]">
          <Sparkles className="w-9 h-9" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Greeting Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-zinc-200 dark:border-zinc-800 text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WELCOME TO MY CREATIVE SPACE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] text-zinc-900 dark:text-white"
          >
            Design. Code. Build.<br />
            <span className="text-gradient">
              {titleText}
            </span>
          </motion.h1>

          {/* Subtitle with typing delay or staggered reveal */}
          <motion.div
            variants={typingContainerVariants}
            className="h-8 flex items-center justify-center font-mono text-zinc-500 dark:text-zinc-400 text-sm sm:text-lg max-w-xl"
          >
            {titleText.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed mt-2"
          >
            I build responsive, performance-driven web applications combining elegant engineering with beautiful interface designs. Let's make something amazing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a 
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-lg shadow-violet-600/20 dark:shadow-violet-600/10 hover:shadow-violet-600/30 transition-all duration-300 gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl glass hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white font-medium border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-5 mt-10"
          >
            {[
              { icon: GithubIcon, link: "https://github.com/nikesh", label: "GitHub" },
              { icon: LinkedinIcon, link: "https://linkedin.com/in/nikesh", label: "LinkedIn" },
              { icon: TwitterIcon, link: "https://twitter.com/nikesh_dev", label: "Twitter" },
              { icon: Mail, link: "mailto:contact@nikesh.dev", label: "Email" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50 hover:bg-white dark:hover:bg-zinc-850 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
