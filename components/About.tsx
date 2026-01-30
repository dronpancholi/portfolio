
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
                I am a Critical Care Consultant and Health Care Entrepreneur with over 16 years of experience managing ICUs and Hospitals. Currently, I serve as Hospital Director at Shree Bajrangdasbapa Arogyadham in Gujarat, India, and as Director at Aster Healthcare in Nairobi, Kenya.
              </p>
              <p>
                My foundation is built on a Doctor of Medicine (MD) in Anaesthesiology & Critical Care from M.P. Shah Medical College, Jamnagar. Bridging clinical expertise with efficient hospital administration, I focus on delivering high-quality patient care while managing complex healthcare operations.
              </p>
              <p>
                Beyond my professional life, I have a deep interest in Teaching and Financial Markets. I am an avid outdoor enthusiast, enjoying Trekking, Walking, Running, and Cycling, as well as the creative art of Cooking.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default About;
