import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['100%', '0%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['100%', '0%']);

  // Spring for subtle content magnification on hover to simulate refraction
  const contentScale = useSpring(1, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
    contentScale.set(1.02);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    contentScale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px', // Add perspective for a better 3D effect
        rotateX,
        rotateY,
      }}
      className={`relative liquid-glass rounded-3xl shadow-xl shadow-black/5 ${className}`}
    >
      {/* Dynamic light hotspot / glare effect */}
       <motion.div
        className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none overflow-hidden"
        style={{
          background: useMotionTemplate`radial-gradient(
            circle 400px at ${glareX} ${glareY}, 
            rgba(255, 255, 255, 0.15), 
            transparent
          )`,
          mixBlendMode: 'plus-lighter', // A great blend mode for light effects
          opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0.4, 1]), // Fade in/out based on position
        }}
       />
      {/* Content with 3D lift and refractive scaling */}
      <motion.div 
        style={{ 
          transform: 'translateZ(20px)',
          scale: contentScale
        }}
        className="transition-transform duration-200 ease-out"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default GlassCard;
