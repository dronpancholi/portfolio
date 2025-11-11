
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, MessageSquare, Clipboard, Check } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import GlassCard from './ui/GlassCard';

// FIX: Derive a strict type for social profile names from the constants and use a Record to ensure type safety for the icons object. This resolves the 'Type 'string' is not assignable to type 'never'' error.
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]['name'];
const icons: Record<SocialProfileName, React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
        I'm actively exploring new opportunities and collaborations. The best way to reach me is by email.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto"
      >
        <GlassCard>
          <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[280px]">
            <Mail className="w-12 h-12 text-[var(--accent)] mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] mb-6">Email me directly at</h3>
            <div className="relative w-full max-w-md">
                <div className="flex items-center justify-between w-full bg-black/5 rounded-xl p-3 border border-transparent">
                  <span className="text-sm sm:text-base text-[var(--text-secondary)] font-mono tracking-tight truncate pr-2">
                    {SOCIAL_LINKS.email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 flex items-center justify-center w-24 h-9 text-sm font-semibold bg-[var(--accent)] text-[var(--text-main)] rounded-lg hover:brightness-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white/10 focus-visible:ring-[var(--accent)]"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center"
                      >
                        <Check size={16} className="mr-1.5" />
                        Copied!
                      </motion.span>
                    ) : (
                      <span className="flex items-center">
                        <Clipboard size={16} className="mr-1.5" />
                        Copy
                      </span>
                    )}
                  </button>
                </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 w-full flex items-center justify-center"
      >
        {/* Moving Code Background */}
        <div className="absolute inset-0 h-[60px] overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-sm font-mono text-pink-200/60 opacity-[0.55]"
          >
            {`const dron = { name: "Dron Pancholi", skills: ["AI/ML", "Web Dev", "Systems"], location: "Surendranagar", vision: "Build Empires" }; `.repeat(12)}
          </motion.div>
        </div>

        {/* Liquid Glass Social Pill */}
        <motion.div
          layout
          className="
            relative flex items-center gap-6 px-6 py-3 rounded-full backdrop-blur-xl border
            border-white/20 bg-white/12 shadow-[0_0_25px_rgba(255,255,255,0.18)]
            hover:bg-white/18 transition-all duration-500"
          style={{ filter: "url(#liquidGlassEffect)" }}
        >
          {SOCIAL_LINKS.profiles.map((profile) => {
            const Icon = icons[profile.name];
            return (
              <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.name}>
                <motion.div
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12 }}
                  className="text-white/85 hover:text-white"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;