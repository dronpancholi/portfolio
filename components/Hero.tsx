
import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import TypingAnimation from './ui/TypingAnimation';
import GlassCard from './ui/GlassCard';
import TiltCard from './ui/TiltCard';

const InteractivePortrait: React.FC = () => {
  return (
    <TiltCard intensity={25} perspective={800} className="w-48 h-48 md:w-64 md:h-64 rounded-full">
        <div 
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/10 border-4 border-white/20"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img
            src="https://i.ibb.co/YFJdKdD1/picofme-9.png"
            alt="Dron Pancholi"
            className="w-full h-full object-cover"
          />
          
          {/* Internal Shine for Globe effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
        </div>
    </TiltCard>
  );
};


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 0.5, 0]);

  // Elastic entrance transition
  const entranceTransition = {
    type: "spring",
    stiffness: 70,
    damping: 14,
    mass: 1.2
  } as const;

  return (
    <motion.section 
      id="home" 
      className="min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center py-24 sm:py-28 md:py-32 scroll-mt-24 relative z-10"
      style={{ y, opacity }}
    >
      <motion.div
        style={{ perspective: 1200 }}
        className="w-full"
      >
        <GlassCard
          className="w-full max-w-5xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...entranceTransition, delay: 0.1 }}
              className="mb-8"
              style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}
            >
              <InteractivePortrait />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.3 }}
              style={{ transform: 'translateZ(100px)', transformStyle: 'preserve-3d' }}
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
              transition={{ ...entranceTransition, delay: 3.2 }}
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
