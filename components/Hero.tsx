import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import TypingAnimation from './ui/TypingAnimation';
import LiquidGlass from './ui/LiquidGlass';

const InteractivePortrait: React.FC = () => {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer"
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
      className="min-h-[90vh] flex flex-col items-center justify-center py-24 scroll-mt-24"
      style={{ y, opacity }}
    >
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Animated Background Blob for Refraction */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-3xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-spin-slow" />
        </div>

        <LiquidGlass 
          className="w-full"
          cornerRadius={48}
          padding="60px 20px"
          displacementScale={45}
          magnification={1.2}
          proxy={
            <div className="flex flex-col items-center text-center select-none">
              <div className="w-64 h-64 rounded-full bg-white/20" />
              <div className="mt-8 w-96 h-12 bg-white/20 rounded-full mx-auto" />
              <div className="mt-4 w-72 h-8 bg-white/20 rounded-full mx-auto" />
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <InteractivePortrait />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-3xl"
            >
              <TypingAnimation 
                as="h1"
                text="Systems with Depth. Clarity in Design."
                className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-[var(--text-main)] mb-6"
              />
              <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
                Engineering intelligent systems and premium digital experiences at the intersection of AI, Robotics, and human-centric design.
              </p>
            </motion.div>
          </div>
        </LiquidGlass>
      </div>
    </motion.section>
  );
};

export default Hero;