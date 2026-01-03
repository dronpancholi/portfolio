import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import TypingAnimation from './ui/TypingAnimation';
import LiquidGlass from './ui/LiquidGlass';

const InteractivePortrait: React.FC = () => {
  return (
    <motion.div
      className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden cursor-pointer border-4 border-white/10 shadow-2xl"
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
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
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 0.7, 0]);

  return (
    <motion.section 
      id="home" 
      className="min-h-[90vh] flex flex-col items-center justify-center py-24 scroll-mt-24"
      style={{ y, opacity }}
    >
      <div className="relative w-full max-w-5xl mx-auto px-4">
        {/* Optical Background Engine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-30 blur-[100px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-emerald-500 to-blue-600 rounded-full animate-spin-slow" />
        </div>

        <LiquidGlass 
          className="w-full"
          cornerRadius={48}
          padding="80px 40px"
          displacementScale={55}
          magnification={1.22}
          proxy={
            <div className="flex flex-col items-center text-center select-none scale-110">
              <div className="w-72 h-72 rounded-full bg-white/30 mb-12 blur-sm" />
              <div className="w-[80%] h-16 bg-white/20 rounded-3xl mx-auto mb-6 blur-md" />
              <div className="w-[60%] h-8 bg-white/10 rounded-2xl mx-auto blur-md" />
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-10"
            >
              <InteractivePortrait />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-3xl"
            >
              <TypingAnimation 
                as="h1"
                text="Crafting Depth. Engineering Clarity."
                className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-[var(--text-main)] mb-8 leading-tight"
              />
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto leading-relaxed">
                Applying advanced AI and robotics systems to create premium, human-centric digital architecture.
              </p>
            </motion.div>
          </div>
        </LiquidGlass>
      </div>
    </motion.section>
  );
};

export default Hero;