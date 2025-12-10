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
              text="A Study in Precision."
              className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6 tracking-tight"
            />
            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed font-light">
              <p>
                My work is guided by a single principle: build with intention. I specialize in developing intelligent systems where every component, from the backend architecture to the user interface, is crafted with precision and purpose.
              </p>
              <p>
                My background in computer engineering provides a foundation in systems thinking, allowing me to create solutions that are not only technically robust but also clear and effective. My focus is on applied AI, building tools and platforms that solve complex problems with elegant simplicity.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default About;