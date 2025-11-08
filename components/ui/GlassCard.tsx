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

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['150%', '-50%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['120%', '-20%']);
  
  const noiseX = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);
  const noiseY = useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25]);

  const contentScale = useSpring(1, { stiffness: 150, damping: 20 });
  const contentTranslateZ = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
    contentScale.set(1.02);
    contentTranslateZ.set(60);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    contentScale.set(1);
    contentTranslateZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        rotateX,
        rotateY,
      }}
      className={`relative bg-pearl/50 backdrop-blur-2xl rounded-3xl border border-silver/50 shadow-2xl shadow-eerie-black/10 transition-shadow duration-300 hover:shadow-eerie-black/20 ${className}`}
    >
        {/* Subsurface Scattering Layer */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 80%)',
                opacity: 0.5,
            }}
        />

        {/* Dynamic Specular Highlight Layer */}
        <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
            style={{
                background: useMotionTemplate`radial-gradient(
                    600px circle at ${glareX} ${glareY}, 
                    rgba(255, 255, 255, 0.4), 
                    transparent
                )`,
                opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0.3, 1]),
            }}
        />

        {/* Micro-roughness/Refraction Noise Layer */}
        <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundPositionX: noiseX,
                backgroundPositionY: noiseY,
                backgroundSize: '200%',
            }}
        />
        
        {/* Content with 3D lift */}
        <motion.div 
            style={{ 
                transform: useMotionTemplate`translateZ(${contentTranslateZ}px)`,
                scale: contentScale,
            }}
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
            {children}
        </motion.div>

         {/* Inner Rim-Shadow for thickness simulation */}
         <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_1px_4px_0_rgba(255,255,255,0.8),_inset_0_0_20px_rgba(232,235,239,0.8)]" />

    </motion.div>
  );
};

export default GlassCard;