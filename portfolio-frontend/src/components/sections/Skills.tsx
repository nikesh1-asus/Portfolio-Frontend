import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = ['Frontend', 'Backend', 'Tools'];

const skillsData = {
  Frontend: [
    { name: 'React / Next.js', percentage: 95 },
    { name: 'TypeScript', percentage: 90 },
    { name: 'Tailwind CSS', percentage: 95 },
    { name: 'HTML5 & CSS3', percentage: 95 },
    { name: 'Framer Motion', percentage: 80 },
  ],
  Backend: [
    { name: 'Node.js / Express', percentage: 90 },
    { name: 'Go (Golang)', percentage: 75 },
    { name: 'REST & GraphQL APIs', percentage: 90 },
    { name: 'PostgreSQL / MongoDB', percentage: 85 },
    { name: 'Redis Caching', percentage: 80 },
  ],
  Tools: [
    { name: 'Git & Version Control', percentage: 95 },
    { name: 'Docker Containers', percentage: 80 },
    { name: 'AWS Cloud Services', percentage: 75 },
    { name: 'CI/CD Pipelines', percentage: 80 },
    { name: 'Figma Design', percentage: 70 },
  ],
};

type CategoryName = keyof typeof skillsData;

export default function Skills() {
  const [activeTab, setActiveTab] = useState<CategoryName>('Frontend');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-24 px-6 md:px-12 max-w-5xl mx-auto"
      data-testid="skills-section"
    >
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">My Skills</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Professional Capabilities</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-12" data-testid="skills-tabs">
        {skillCategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as CategoryName)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === tab ? 'bg-violet-600 text-white shadow-md' : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Skills Grid with Animated Progress Bars */}
      <div className="glass p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-lg">
        <motion.div 
          layout
          className="flex flex-col gap-6"
          data-testid="skills-list"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {skillsData[activeTab].map((skill, index) => (
                <div key={skill.name} className="w-full">
                  {/* Label & Value */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-heading font-bold text-zinc-800 dark:text-white text-sm sm:text-base">
                      {skill.name}
                    </span>
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
