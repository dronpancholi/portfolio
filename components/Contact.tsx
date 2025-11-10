

import React, { useState } from 'react';
// FIX: Explicitly import the `Variants` type from framer-motion to resolve type inference issues.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, MessageSquare, Send, LoaderCircle, CheckCircle, XCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import GlassCard from './ui/GlassCard';

const icons: { [key: string]: React.ElementType } = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

// Define a specific type for a social profile to aid TypeScript's inference.
type SocialProfile = (typeof SOCIAL_LINKS.profiles)[number];

// FIX: Added the `Variants` type to the `formVariants` object. This ensures TypeScript correctly validates the `ease` property against the allowed `Easing` types, preventing a type error where it was being inferred as a generic `string`.
const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    // Simulate API call with a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/error outcome
    if (Math.random() > 0.15) { // 85% success rate
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form on success
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4 tracking-tight"
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
      >
        I'm actively exploring new opportunities and collaborations. Fill out the form below or email me directly.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <GlassCard className="text-left">
          <div className="min-h-[460px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div key="success" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--text-secondary)]">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              )}

              {status === 'error' && (
                 <motion.div key="error" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                   <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                   <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Oh no!</h3>
                   <p className="text-[var(--text-secondary)] mb-6">Something went wrong. Please try again or email me at <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-[var(--accent)] underline">{SOCIAL_LINKS.email}</a>.</p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="px-6 py-2 bg-[var(--accent)] text-[var(--text-main)] font-bold rounded-lg hover:brightness-110 transition-all"
                   >
                     Try Again
                   </button>
                 </motion.div>
              )}

              {(status === 'idle' || status === 'sending') && (
                <motion.form key="form" onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white/50 border border-white/30 rounded-lg px-4 py-2 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white/50 border border-white/30 rounded-lg px-4 py-2 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleInputChange} className="w-full bg-white/50 border border-white/30 rounded-lg px-4 py-2 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center px-8 py-3 bg-[var(--accent)] text-[var(--text-main)] font-bold rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                  >
                    {status === 'sending' ? (
                      <>
                        <LoaderCircle className="w-5 h-5 mr-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center space-x-4 mt-12"
      >
        {SOCIAL_LINKS.profiles.map((profile, i) => {
          const Icon = icons[profile.name];
          return (
            <a key={i} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.name} className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-black/5 transition-colors duration-200">
              <Icon className="w-8 h-8" />
              <span className="sr-only">{profile.name}</span>
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Contact;