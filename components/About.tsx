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
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6 tracking-tight">About Me</h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed font-light">
            <p>
              I am a forward-thinking engineer driven by a profound fascination with artificial intelligence and its potential to reshape our world. My current academic path in Computer Engineering serves as a robust foundation for my primary ambition: to specialize in deep learning, applied machine learning, and the creation of AI-augmented systems.
            </p>
            <p>
              My focus extends beyond theoretical knowledge; I am dedicated to practical application and innovation. I believe in a future where intelligent systems seamlessly integrate into every facet of technology, and I am committed to being at the forefront of that revolution, building solutions that are not only powerful but also intuitive and impactful.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default About;
