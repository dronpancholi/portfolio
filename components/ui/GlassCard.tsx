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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['120%', '-20%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['120%', '-20%']);
  
  const noiseX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const noiseY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const contentScale = useSpring(1, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
    contentScale.set(1.03);
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
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      className={`relative bg-jet/10 backdrop-blur-xl rounded-3xl border border-platinum/10 shadow-2xl shadow-eerie-black/30 overflow-hidden ${className}`}
    >
        {/* Fluid Glare Effect */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: useMotionTemplate`radial-gradient(
                    450px circle at ${glareX} ${glareY}, 
                    rgba(232, 237, 223, 0.08), 
                    transparent
                )`,
                opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0.5, 1]),
            }}
        />

        {/* Noisy texture for a frosted glass look, with parallax */}
        <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-soft-light"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundPositionX: noiseX,
                backgroundPositionY: noiseY,
            }}
        />

        {/* Content with 3D lift and refractive scaling */}
        <motion.div 
            style={{ 
                transform: 'translateZ(40px)',
                scale: contentScale,
            }}
            className="transition-transform duration-200 ease-out"
        >
            {children}
        </motion.div>

         {/* Inner shadow for depth */}
         <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_0_20px_rgba(36,36,35,0.5)]" />

    </motion.div>
  );
};

export default GlassCard;