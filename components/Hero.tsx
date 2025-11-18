
import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import TypingAnimation from './ui/TypingAnimation';
import GlassCard from './ui/GlassCard';

const InteractivePortrait: React.FC = () => {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer shadow-2xl shadow-black/10"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src="https://i.ibb.co/YFJdKdD1/picofme-9.png"
        alt="Dron Pancholi"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 0.5, 0]);

  return (
    <motion.section 
      id="home" 
      className="min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center py-24 sm:py-28 md:py-32 scroll-mt-24"
      style={{ y, opacity }}
    >
      <motion.div
        style={{ perspective: '1200px' }}
        className="w-full"
      >
        <GlassCard
          className="w-full max-w-5xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
              style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}
            >
              <InteractivePortrait />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: 'translateZ(100px)', transformStyle: 'preserve-d' }}
              className="w-full max-w-4xl"
            >
              <TypingAnimation 
                as="h1"
                text="Systems, designed with depth. Interfaces, designed with clarity."
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[var(--text-main)] mb-4"
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-light mx-auto"
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
            >
              I engineer intelligent systems and thoughtful digital experiences, focusing on the intersection of artificial intelligence, full-stack development, and design.
            </motion.p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.section>
  );
};

export default Hero;