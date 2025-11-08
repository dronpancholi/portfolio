import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, MessageSquare } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const icons: { [key: string]: React.ElementType } = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

// Define a specific type for a social profile to aid TypeScript's inference.
type SocialProfile = (typeof SOCIAL_LINKS.profiles)[number];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-eerie-black mb-4 tracking-tight"
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-jet mb-8 max-w-xl mx-auto"
      >
        I'm actively exploring new opportunities and collaborations. Feel free to reach out.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <a 
          href={`mailto:${SOCIAL_LINKS.email}`} 
          className="inline-flex items-center justify-center px-8 py-3 bg-saffron text-eerie-black font-bold rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Mail className="w-5 h-5 mr-3" />
          {SOCIAL_LINKS.email}
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center space-x-4"
      >
        {/* FIX: Removed redundant Array.from(). .map() can be called directly on readonly arrays. */}
        {SOCIAL_LINKS.profiles.map((profile, i) => {
          const Icon = icons[profile.name];
          return (
            // Using the index as the key is safe for this static, unchanging list.
            <a key={i} href={profile.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-jet hover:text-saffron hover:bg-silver transition-colors duration-200">
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