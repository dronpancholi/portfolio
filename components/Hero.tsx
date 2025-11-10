
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';

// --- INSTRUCTIONS FOR DRON ---
// 1. Go to a website like https://www.base64-image.de/
// 2. Upload your headshot.jpg
// 3. Copy the generated image text (starts with "data:image/jpeg;base64,...")
// 4. Replace the entire string below (inside the single quotes) with the text you copied.
// FIX: Removed extraneous '/>' characters from the end of the string literal to fix a syntax error.
const imageUrl = 'data:image/jpeg;base64,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';

// FIX: Define the PortraitImage component to resolve 'Cannot find name' errors.
const PortraitImage: React.FC<{ isFiltered?: boolean }> = ({ isFiltered = false }) => (
  <img
    src={imageUrl}
    alt="Portrait of Dron Pancholi"
    className={`absolute inset-0 w-full h-full object-cover ${isFiltered ? 'filter grayscale contrast-125' : ''}`}
  />
);

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
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer shadow-2xl shadow-black/10"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <PortraitImage />
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: clipPathValue }}
      >
        <PortraitImage isFiltered={true} />
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
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[var(--text-main)] mb-4"
            style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
          >
            I build with <span className="text-[var(--accent)]">Artificial Intelligence.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-light mx-auto"
            // FIX: Corrected typo in `transformStyle` property from `preserve-d` to `preserve-3d`.
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