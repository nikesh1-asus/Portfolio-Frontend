import React, { useState } from 'react';
import { ArrowUp, Mail, Code2, Send, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 py-16 px-6 md:px-12 relative overflow-hidden" data-testid="footer-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <a href="#home" className="flex items-center gap-2 group self-start">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
              Nikesh<span className="text-violet-600">.</span>
            </span>
          </a>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
            Crafting elegant, accessible, and high-performance digital interfaces and backend systems. Committed to coding standards and visual excellence.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {[
              { icon: GithubIcon, link: 'https://github.com/nikesh', label: 'GitHub' },
              { icon: LinkedinIcon, link: 'https://linkedin.com/in/nikesh', label: 'LinkedIn' },
              { icon: TwitterIcon, link: 'https://twitter.com/nikesh_dev', label: 'Twitter' },
              { icon: Mail, link: 'mailto:contact@nikesh.dev', label: 'Email' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-zinc-850 hover:scale-[1.05] transition-all cursor-pointer"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {['Home', 'About', 'Services', 'Work'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase()}`}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-650 dark:hover:text-violet-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-4">Extras</h4>
            <ul className="flex flex-col gap-2">
              {['Skills', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-650 dark:hover:text-violet-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">Subscribe to newsletter</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Get the latest articles and source-code snippets sent directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 mt-1 relative" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-800 dark:text-white transition-all"
              placeholder="name@email.com"
            />
            <button 
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center justify-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
            
            <AnimatePresence>
              {subscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 text-xs font-semibold text-emerald-600"
                >
                  Subscribed successfully!
                </motion.span>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/40 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Nikesh. All rights reserved. Made with love & Next.js.
        </p>

        {/* Back to Top */}
        <button 
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-violet-650 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-zinc-850 hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer text-xs font-semibold uppercase tracking-wider"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </footer>
  );
}
