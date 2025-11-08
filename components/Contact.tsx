
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

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
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
          className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
        className="flex items-center justify-center space-x-6"
      >
        {SOCIAL_LINKS.profiles.map((profile) => {
          const Icon = icons[profile.name];
          return (
            <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
              <Icon className="w-7 h-7" />
              <span className="sr-only">{profile.name}</span>
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Contact;
   