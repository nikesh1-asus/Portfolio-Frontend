import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Nikesh delivered the project ahead of schedule with clean, documented code. His attention to frontend detail and layout performance was outstanding.',
    author: 'Sarah Jenkins',
    role: 'Product Manager at TechCorp',
  },
  {
    quote: 'Working with Nikesh was a game changer for our launch. He migrated our legacy frontend to Next.js, boosting our Lighthouse performance scores to 95+ and raising our search rankings.',
    author: 'David Chen',
    role: 'Founder of FinTech Startup',
  },
  {
    quote: 'Outstanding creative engineering! The animations are incredibly smooth, responsiveness is flawless across all devices, and the communication was professional throughout.',
    author: 'Elena Rostova',
    role: 'Creative Director at DesignStudio',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">Client Love</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Testimonials</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Slider Area */}
      <div className="relative glass p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xl flex flex-col items-center">
        {/* Quote Mark Decoration */}
        <div className="absolute top-6 left-6 text-violet-100 dark:text-violet-950 -z-10">
          <Quote className="w-20 h-20 opacity-40 rotate-180" />
        </div>

        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed italic">
                "{testimonials[index].quote}"
              </p>
              <div>
                <h4 className="font-heading font-bold text-lg text-zinc-900 dark:text-white">
                  {testimonials[index].author}
                </h4>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mt-1">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons and Dots */}
        <div className="flex justify-between items-center w-full mt-8" data-testid="testimonials-controls">
          <button 
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-750 transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Indicator Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${idx === index ? 'bg-violet-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-750 transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
