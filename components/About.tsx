
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';

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
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6 tracking-tight">About Me</h2>
            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed font-light">
              <p>
                I design and build software systems engineered to learn, adapt, and scale. My work treats software as a craft, balancing rigorous engineering with a deep focus on user experience.
              </p>
              <p>
                I specialize in translating complex problems into clear, structured solutions. The result is systems that are powerful in function and intuitive in form, creating technology that feels effortless to use.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default About;
