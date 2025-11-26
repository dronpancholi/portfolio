
import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { SKILLS_DATA } from '../constants';
import { Briefcase, Code, Database, BrainCircuit, Bot } from 'lucide-react';
import TypingAnimation from './ui/TypingAnimation';

// --- Type Definitions ---
type SkillIconName = typeof SKILLS_DATA[number]['icon'];
const icons: Record<SkillIconName, React.ComponentType<{ className: string }>> = {
  ai: BrainCircuit,
  frontend: Code,
  backend: Database,
  fullstack: Briefcase,
  tools: Bot,
};

// --- Spotlight Card Component ---
interface SpotlightCardProps {
  children: React.ReactNode;
  index: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Effect: Liquid Spotlight Gradient
  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(var(--accent-rgb), 0.1), transparent 80%)`;
  const borderHighlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(var(--accent-rgb), 0.3), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        delay: index * 0.1 
      }}
      className="group relative h-full rounded-3xl border border-white/10 bg-gray-50/50 dark:bg-white/5 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Background Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: background }}
      />
      
      {/* Spotlight Border Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ 
          background: borderHighlight,
          maskImage: 'linear-gradient(black, black), content-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px' // Thickness of the spotlight border
        }}
      />

      {/* Content Container */}
      <div className="relative h-full p-8 flex flex-col z-10">
        {children}
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const Skills: React.FC = () => {
  // Helper to extract RGB values from CSS variable for the gradient usage
  // We assume --accent is defined in hex, but for gradients we often need rgb components.
  // Since we can't easily parse CSS vars in JS without refs, we'll use a hardcoded fallback or a clever transparency trick.
  // Actually, let's use the theme context or just simple tailwind classes.
  // To make the spotlight dynamic color-aware, we'll inject a small style helper.
  
  return (
    <section id="skills" className="py-20 md:py-32 scroll-mt-24 relative overflow-visible">
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center max-w-2xl mx-auto mb-16 px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-4">
           <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"/> Expertise
        </div>
        <TypingAnimation
          as="h2"
          text="Core Capabilities"
          className="text-3xl md:text-5xl font-bold text-[var(--text-main)] mb-6 tracking-tight"
        />
        <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed">
          A fusion of systems engineering and creative intelligence.
        </p>
      </motion.div>

      {/* Grid */}
      {/* We inject a custom property for the spotlight color logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10" style={{ "--accent-rgb": "34, 197, 94" } as React.CSSProperties}>
        {SKILLS_DATA.map((category, index) => {
          const Icon = icons[category.icon];
          return (
            <SpotlightCard key={category.title} index={index}>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 group-hover:bg-[var(--accent)]/20 transition-colors duration-500">
                  {Icon && (
                    <Icon className="w-6 h-6 text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">{category.title}</h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (i * 0.05), type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      backgroundColor: "rgba(var(--accent-rgb), 0.15)",
                      color: "var(--accent)"
                    }}
                    className="
                      cursor-default
                      text-xs sm:text-sm font-medium 
                      px-3 py-1.5 rounded-lg
                      bg-black/5 dark:bg-white/5 
                      text-[var(--text-secondary)]
                      border border-transparent
                      hover:border-[var(--accent)]/30
                      transition-colors duration-200
                    "
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;