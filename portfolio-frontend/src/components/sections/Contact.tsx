import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MessageSquare, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  subject: yup.string().required('Subject is required').min(4, 'Subject must be at least 4 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
}).required();

type ContactFormData = yup.InferType<typeof contactSchema>;

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });


  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    
    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, process.env.NODE_ENV === 'test' ? 0 : 1500));
      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-testid="contact-section"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase mb-3">Get In Touch</h2>
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white">Let's Work Together</p>
        <div className="w-16 h-1 bg-violet-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/80">
            <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white mb-6">Contact Information</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Email Me</p>
                  <a href="mailto:contact@nikesh.dev" className="text-zinc-705 dark:text-zinc-300 font-medium hover:text-violet-650 transition-colors">contact@nikesh.dev</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-zinc-705 dark:text-zinc-300 font-medium">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Button */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
              <a
                href="https://wa.me/9779800000000?text=Hi%20Nikesh,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200 hover:scale-[1.01] cursor-pointer shadow-md shadow-emerald-600/10"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Styled Google Map Placeholder */}
          <div className="glass h-64 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden relative flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 opacity-20 -z-10" />
            
            {/* Mock Map Vector Grid */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] -z-10" />
            
            <div className="text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 text-violet-600 flex items-center justify-center mb-3 animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="font-heading font-bold text-zinc-900 dark:text-white">Kathmandu Valley</p>
              <p className="text-xs text-zinc-500 mt-1">Latitude: 27.7172° N | Longitude: 85.3240° E</p>
              <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider mt-3">Google Map Placeholder</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800/80">
            <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" data-testid="contact-form" noValidate>
              {/* Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-violet-500'} text-sm focus:outline-none focus:ring-2 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-violet-500'} text-sm focus:outline-none focus:ring-2 transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email.message}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className={`px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-violet-500'} text-sm focus:outline-none focus:ring-2 transition-all`}
                  placeholder="Collaboration Project"
                />
                {errors.subject && <span className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.subject.message}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className={`px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-violet-500'} text-sm focus:outline-none focus:ring-2 transition-all resize-none`}
                  placeholder="Hello! I would love to collaborate on..."
                />
                {errors.message && <span className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message.message}</span>}
              </div>

              {/* Status and Submit */}
              <div className="mt-2 flex flex-col gap-4">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-sm font-semibold flex items-center gap-2"
                      data-testid="success-banner"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Thank you! Your message was sent successfully.</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-650 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-sm font-semibold flex items-center gap-2"
                      data-testid="error-banner"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>Oops! An error occurred. Please try again later.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-600/10 hover:shadow-violet-600/20 hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                >
                  {submitStatus === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
