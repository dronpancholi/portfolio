
import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import GlassCard from './ui/GlassCard';
import { Calendar, Briefcase, ArrowRight, Layers } from 'lucide-react';

// --- 3D Orbital Node ---
const OrbitalNode = ({ index, isActive }: { index: number; isActive: boolean }) => {
  return (
    <div className="absolute left-[-6px] md:left-1/2 md:-translate-x-1/2 z-20 top-8 md:top-10">
      <div className="relative flex items-center justify-center w-8 h-8">
        {/* Core */}
        <motion.div
          animate={{ scale: isActive ? 1.5 : 1, backgroundColor: isActive ? "var(--accent)" : "rgba(120,120,120,0.5)" }}
          className="relative w-3 h-3 rounded-full shadow-[0_0_15px_var(--accent)] z-20 transition-colors duration-500"
        />
        
        {/* Orbit Ring 1 */}
        <motion.div
          animate={{ rotate: 360, scale: isActive ? 1.2 : 1 }}
          transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 } }}
          className="absolute inset-0 rounded-full border border-[var(--accent)]/30 border-t-transparent border-l-transparent"
        />
        
        {/* Orbit Ring 2 (Counter-rotate) */}
        <motion.div
          animate={{ rotate: -360, scale: isActive ? 1.4 : 0.8 }}
          transition={{ rotate: { duration: 5, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 } }}
          className="absolute inset-[-4px] rounded-full border border-dashed border-[var(--text-secondary)]/20"
        />

        {/* Vertical Beam connector effect */}
        <div className={`absolute top-full left-1/2 w-px h-24 bg-gradient-to-b from-[var(--accent)]/50 to-transparent -translate-x-1/2 ${index === EXPERIENCE_DATA.length - 1 ? 'hidden' : ''}`} />
      </div>
    </div>
  );
};

// --- Floating Geometric Shape ---
const FloatingShape = ({ delay, className }: { delay: number; className?: string }) => (
  <motion.div
    className={`absolute pointer-events-none opacity-20 ${className}`}
    animate={{ 
      y: [0, -15, 0], 
      rotate: [0, 45, 0],
      scale: [1, 1.1, 1] 
    }}
    transition={{ 
      duration: 8, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <div className="w-12 h-12 border border-[var(--accent)]/30 backdrop-blur-sm bg-[var(--accent)]/5 rounded-lg transform rotate-45" />
  </motion.div>
);

// --- 3D Parallax Experience Card ---
const Experience3DCard: React.FC<{ item: typeof EXPERIENCE_DATA[number], index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  
  // Parallax offsets
  const contentX = useTransform(x, [-0.5, 0.5], [-20, 20]);
  const contentY = useTransform(y, [-0.5, 0.5], [-20, 20]);
  
  // Liquid Lens Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lensMask = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black, transparent 150px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalized coordinates for tilt (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
    
    // Pixel coordinates for lens
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-12 items-start w-full group ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
      style={{ zIndex: isFocused ? 50 : 10 }}
    >
      {/* Alignment Spacer */}
      <div className="hidden md:block w-1/2" />
      
      {/* Node Logic */}
      <OrbitalNode index={index} isActive={isHovered || isFocused} />

      {/* Main Interactive Card */}
      <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12 perspective-[2000px]">
        <motion.div
          ref={ref}
          onMouseMove={(e) => { setIsHovered(true); handleMouseMove(e); }}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFocused(!isFocused)}
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d",
            scale: isFocused ? 1.05 : 1
          }}
          className="relative transition-all duration-500 cursor-pointer"
        >
          {/* Back Glow */}
          <div 
            className="absolute inset-0 bg-[var(--accent)]/10 blur-[40px] rounded-[30px] transition-opacity duration-500"
            style={{ opacity: isHovered ? 0.4 : 0, transform: 'translateZ(-50px)' }}
          />

          <GlassCard className={`min-h-[280px] rounded-[24px] overflow-hidden border transition-all duration-500 ${
            isFocused ? 'border-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent),0.2)]' : 'border-white/10 dark:border-white/5'
          }`}>
            
            {/* --- Liquid Distortion Layer --- */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none opacity-50 mix-blend-overlay"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'url(#liquidRefraction)', // Uses the SVG filter from LiquidFilters.tsx
                WebkitBackdropFilter: 'url(#liquidRefraction)',
                maskImage: lensMask,
                WebkitMaskImage: lensMask,
              }}
            />

            {/* --- Content Parallax Layer --- */}
            <motion.div 
              style={{ x: contentX, y: contentY, transformStyle: "preserve-3d" }}
              className="relative z-20 p-8 flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2 transform-gpu translate-z-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight flex items-center gap-2">
                    {item.company}
                    <ArrowRight className={`w-4 h-4 text-[var(--accent)] transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'}`} />
                  </h3>
                  <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-xs tracking-widest uppercase">
                    <Briefcase size={12} />
                    {item.role}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md">
                   <Calendar size={12} className="text-[var(--text-secondary)]" />
                   <span className="text-[10px] font-mono font-medium text-[var(--text-secondary)]">
                     {item.period}
                   </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 mb-6 transform-gpu translate-z-5">
                 <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                   {item.description}
                 </p>
                 
                 {/* Expandable Details for "Focus Mode" */}
                 <AnimatePresence>
                   {isFocused && (
                     <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                     >
                       <div className="pt-4 border-t border-[var(--text-secondary)]/10 text-sm text-[var(--text-secondary)]/80 italic">
                         "Focusing on scalability and high-availability systems architecture..."
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {/* Tech Stack Chips - Parallax depth increased */}
              <div 
                className="mt-auto flex flex-wrap gap-2 transform-gpu translate-z-15"
                style={{ transform: 'translateZ(25px)' }}
              >
                {item.tech.map((t, i) => (
                  <span 
                    key={t}
                    className="
                      text-[11px] font-medium text-[var(--text-secondary)] 
                      px-2.5 py-1 rounded-md
                      bg-[var(--bg-base)]/80 backdrop-blur-sm
                      border border-[var(--text-secondary)]/10
                      shadow-sm
                      hover:text-[var(--accent)] hover:border-[var(--accent)]/30 hover:scale-105
                      transition-all duration-300 cursor-default
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>

            {/* Grid Decoration */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div 
                className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none transition-transform duration-700"
                style={{ transform: isHovered ? 'scale(1.2) rotate(-10deg)' : 'scale(1) rotate(0deg)' }}
            >
                <Layers size={120} />
            </div>

          </GlassCard>
        </motion.div>
      </div>
      
      {/* Decorative Atmosphere - Floating Shapes */}
      <FloatingShape delay={index} className={`top-0 ${index % 2 === 0 ? '-left-8' : '-right-8'}`} />

    </motion.div>
  );
};

// --- Main Experience Component ---
const Experience: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-24 relative overflow-hidden" ref={ref}>
      
      {/* Atmospheric Background Lights */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-24 px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
        >
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            Professional Timeline
        </motion.div>
        
        <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-[var(--text-main)] tracking-tighter mb-6"
        >
          Engineering History
        </motion.h2>
        
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          A chronological dimension of systems I've architected and teams I've led. <br className="hidden md:block"/>
          <span className="opacity-60 text-sm">(Hover for parallax depth, click to focus)</span>
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 perspective-[2000px]">
        
        {/* Central Energy Beam */}
        <div className="absolute left-[4px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/10 md:-translate-x-1/2 rounded-full overflow-hidden">
             <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute top-0 left-0 right-0 w-full h-full bg-gradient-to-b from-[var(--accent)] via-blue-400 to-[var(--accent)] shadow-[0_0_20px_var(--accent)]"
             />
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-24 md:space-y-32 relative z-10 pb-24">
          {EXPERIENCE_DATA.map((item, index) => (
             <Experience3DCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
