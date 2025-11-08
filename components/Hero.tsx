
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

const InteractivePortrait: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { left, width } = ref.current.getBoundingClientRect();
      const newX = (e.clientX - left) / width;
      mouseX.set(newX);
    }
  };
  
  const handleMouseLeave = () => {
      mouseX.set(0.5);
  };

  const clipPathValue = useTransform(mouseX, [0, 1], ["inset(0 100% 0 0)", "inset(0 0 0 0)"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer shadow-2xl shadow-jet/50"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src="https://picsum.photos/seed/real-face/300/300?grayscale"
        alt="Dron Pancholi - Real"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: clipPathValue }}
      >
        <img
          src="https://picsum.photos/seed/ai-face/300/300"
          alt="Dron Pancholi - AI"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 0.5, 0]);

  return (
    <motion.section 
      id="home" 
      className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20 md:py-32"
      style={{ y, opacity }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <InteractivePortrait />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-alabaster mb-4"
      >
        I build with Artificial Intelligence.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-2xl text-lg md:text-xl text-platinum"
      >
        Pursuing a Diploma in Computer Engineering and advancing into AI & ML specialization to architect the next generation of intelligent systems.
      </motion.p>
    </motion.section>
  );
};

export default Hero;