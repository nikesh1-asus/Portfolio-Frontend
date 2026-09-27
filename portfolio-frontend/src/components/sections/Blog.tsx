import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogSectionProps) {
  // If no posts are provided, display placeholders
  const displayPosts = posts && posts.length > 0 ? posts : [
    {
      slug: 'nextjs15-tailwind4-guide',
      title: 'Building Stunning Portfolios with Next.js & Tailwind CSS v4',
      excerpt: 'Explore how to leverage Tailwind CSS v4 CSS-first theme directives and CSS variables to craft high-fidelity modern UI interfaces.',
      date: '2026-05-15',
      tags: ['Next.js', 'Tailwind', 'CSS'],
    },
    {
      slug: 'framer-motion-micro-interactions',
      title: 'Enhancing UX with Subtle Framer Motion Animations',
      excerpt: 'Learn how to write elegant, performant micro-animations using framer-motion without overloading page load speed or causing rendering jank.',
      date: '2026-05-08',
      tags: ['Framer Motion', 'React', 'UX'],
    }
  ];

  return (
    <section 
      id="blog" 
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-testid="blog-section"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">My Insights</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Recent Articles</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="blog-grid">
        {displayPosts.map((post, index) => (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={post.slug}
            className="glass rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800/80 hover-gradient-border flex flex-col justify-between"
          >
            <div>
              {/* Category tags & Date */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100/40 dark:border-violet-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-2xl text-zinc-900 dark:text-white mb-4 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            {/* Read Link */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-650 dark:text-violet-400 hover:gap-2.5 transition-all duration-200 focus:outline-none"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
