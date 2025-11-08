import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';

const InteractivePortrait: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const springMouseX = useSpring(mouseX, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { left, width } = ref.current.getBoundingClientRect();
      const newX = (e.clientX - left) / width;
      springMouseX.set(newX);
    }
  };
  
  const handleMouseLeave = () => {
      springMouseX.set(0.5);
  };

  const clipPathValue = useTransform(springMouseX, [0, 1], ["inset(0 100% 0 0)", "inset(0 0 0 0)"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer shadow-2xl shadow-eerie-black/10"
      // FIX: Corrected typo from 'preserve-d' to 'preserve-3d' for the transformStyle property.
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src="https://i.ibb.co/7jX1pCf/dron-pancholi.jpg"
        alt="Dron Pancholi"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: clipPathValue }}
      >
        <img
          src="https://i.ibb.co/7jX1pCf/dron-pancholi.jpg"
          alt="Dron Pancholi - AI Version"
          className="absolute inset-0 w-full h-full object-cover filter hue-rotate-180 brightness-110"
        />
      </motion.div>
    </motion.div>
  );
};


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 0.5, 0]);
  
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <motion.section 
      id="home" 
      className="min-h-[75vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center py-24 sm:py-28 md:py-32 scroll-mt-24"
      style={{ y, opacity }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <InteractivePortrait />
      </motion.div>
      
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        className="w-full max-w-4xl"
      >
        <motion.div style={{ rotateX, rotateY }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-eerie-black mb-4"
            style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
          >
            I build with Artificial Intelligence.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-jet font-light mx-auto"
            // FIX: Corrected typo from 'preserve-d' to 'preserve-3d' for the transformStyle property.
            style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
          >
            Pursuing a Diploma in Computer Engineering and advancing into AI & ML specialization to architect the next generation of intelligent systems.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;