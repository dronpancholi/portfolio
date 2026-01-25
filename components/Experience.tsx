
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import GlassCard from './ui/GlassCard';
import TiltCard from './ui/TiltCard';

// Liquid Node Component: A glowing, glassy bead that sits on the timeline
const LiquidNode = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        delay: index * 0.1 
      }}
      className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 z-20 top-8 md:top-8"
    >
      <div className="relative flex items-center justify-center w-5 h-5">
         {/* Outer Glow Pulse */}
         <div className="absolute inset-0 rounded-full bg-[var(--accent)] blur-md opacity-40 animate-pulse" />
         
         {/* Glass Core */}
         <div className="relative w-3.5 h-3.5 rounded-full bg-[var(--accent)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(0,0,0,0.2)] ring-2 ring-white/20 dark:ring-white/10" />
         
         {/* Specular Highlight */}
         <div className="absolute top-[3px] left-[4px] w-1.5 h-1.5 rounded-full bg-white opacity-90 blur-[0.5px]" />
      </div>
    </motion.div>
  );
};

// Individual Experience Card Item
const ExperienceCard = ({ item, index }: { item: typeof EXPERIENCE_DATA[number], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.2 }}
      className={`relative flex flex-col md:flex-row gap-8 items-start w-full ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
        {/* Spacer for alignment on desktop */}
        <div className="hidden md:block w-1/2" />
        
        {/* The Card Content */}
        <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12">
            <TiltCard intensity={8} perspective={2000} className="w-full">
                <GlassCard className="h-full relative overflow-hidden group transition-colors duration-500 border-white/40 dark:border-white/10">
                     {/* Liquid Shimmer Effect on Hover */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                          style={{ mixBlendMode: 'overlay' }}
                     />
                     
                    <div className="p-8 relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                            <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">
                                {item.company}
                            </h3>
                            <span className="text-xs font-mono font-medium text-[var(--text-secondary)] bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 whitespace-nowrap">
                                {item.period}
                            </span>
                        </div>
                        
                        <div className="text-[var(--accent)] font-semibold mb-5 text-sm tracking-widest uppercase flex items-center gap-3">
                            <span className="w-6 h-[1px] bg-[var(--accent)]/50" />
                            {item.role}
                        </div>
                        
                        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6 font-light">
                            {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {item.tech.map((t) => (
                                <span 
                                key={t} 
                                className="text-[11px] font-semibold text-[var(--text-secondary)] bg-[var(--bg-base)]/50 border border-[var(--text-secondary)]/15 px-3 py-1.5 rounded-lg backdrop-blur-md transition-colors group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)]"
                                >
                                {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </TiltCard>
        </div>

        {/* Node on the central line */}
        <LiquidNode index={index} />

    </motion.div>
  )
}

const Experience: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Track scroll progress of this specific section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });
    
    // Smooth out the progress bar animation
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-24 relative overflow-hidden" ref={ref}>
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20 md:mb-32 relative z-10 px-6"
      >
        <div className="inline-block mb-4">
             <span className="py-1.5 px-4 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold tracking-wider uppercase border border-[var(--accent)]/20 shadow-sm backdrop-blur-md">
                Career Path
             </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] tracking-tighter mb-6">
          Professional Journey
        </h2>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl font-light max-w-2xl mx-auto">
          Navigating the evolving landscape of intelligence, one system at a time.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Central Timeline Track */}
        <div className="absolute left-[4px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 md:-translate-x-1/2 rounded-full">
             {/* Liquid Fill Line: Grows based on scroll */}
             <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--accent)]/50 shadow-[0_0_10px_var(--accent)]"
             />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24 relative z-10 pb-24">
          {EXPERIENCE_DATA.map((item, index) => (
             <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
