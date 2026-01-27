
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import TypingAnimation from './ui/TypingAnimation';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassCard>
          <div className="p-10 md:p-16">
            <TypingAnimation
              as="h2"
              text="About Me"
              className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6 tracking-tight"
            />
            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed font-light">
              <p>
                [Your Bio Here]. This is where you can write a few paragraphs about your professional background, your philosophy, and what interests you.
              </p>
              <p>
                You might want to mention your education, key areas of expertise, and what you are currently focused on learning or building. Keep it engaging and personal.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default About;
