import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Folder } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';

const categories = ['All', 'Web', 'Mobile', 'Backend'];

const projects = [
  {
    title: 'DevFlow: Developer Q&A Platform',
    category: 'Web',
    description: 'A full-stack question and answer platform for developers. Includes voting systems, AI-generated answers, user reputation, and custom search filters.',
    techs: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB'],
    github: 'https://github.com/nikesh/devflow',
    live: 'https://devflow.nikesh.dev',
  },
  {
    title: 'FinTracer: Personal Finance Tracker',
    category: 'Mobile',
    description: 'A mobile budget tracking app designed for automated bank sync, categorized transaction logging, visual spend analytics, and budget limits alerts.',
    techs: ['React Native', 'Expo', 'NestJS', 'PostgreSQL'],
    github: 'https://github.com/nikesh/fintracer',
    live: '#',
  },
  {
    title: 'MicroStore: Distributed E-commerce API',
    category: 'Backend',
    description: 'A highly scalable, containerized backend engine for an e-commerce platform using microservices, gRPC messaging, and message queues.',
    techs: ['Go', 'gRPC', 'PostgreSQL', 'Docker', 'RabbitMQ'],
    github: 'https://github.com/nikesh/microstore',
    live: '#',
  },
  {
    title: 'SyncBoard: Realtime Workspace Tool',
    category: 'Web',
    description: 'A collaborative real-time digital kanban board. Allows teams to create workspaces, chat, manage projects, and sync card updates instantly.',
    techs: ['React', 'Node.js', 'Socket.io', 'Redis', 'Express'],
    github: 'https://github.com/nikesh/syncboard',
    live: 'https://syncboard.nikesh.dev',
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      ref={ref}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-testid="portfolio-section"
    >
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">My Work</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Recent Projects</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap" data-testid="portfolio-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === cat ? 'bg-violet-600 text-white shadow-md shadow-violet-600/10' : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        data-testid="portfolio-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project.title}
              className="glass rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 hover:shadow-xl hover:shadow-violet-600/5 transition-all group flex flex-col justify-between p-8"
            >
              <div>
                {/* Header Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-violet-600 dark:text-violet-400">
                    <Folder className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-2xl text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techs.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                  {project.live !== '#' && (
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
