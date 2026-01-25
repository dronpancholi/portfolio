import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  AnimatePresence,
  LayoutGroup
} from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Calendar, Briefcase, ChevronRight, Layers, X, Cpu, Globe, Award, Sparkles, Zap, ArrowUpRight } from 'lucide-react';

// --- PHYSICS CONSTANTS ---
const TRANSITION_OPEN = { type: "spring", stiffness: 120, damping: 20, mass: 1.1 }; // Heavy, fluid open
const TRANSITION_CLOSE = { type: "spring", stiffness: 160, damping: 22, mass: 0.8 }; // Snappier close
const SPRING_HOVER = { type: "spring", stiffness: 400, damping: 25 };

// --- UTILS ---
const useParallax = (value: any, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

// --- COMPONENTS ---

// The timeline node that lights up
const LiquidOrb = ({ isActive, delay = 0 }: { isActive: boolean; delay?: number }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, delay, type: "spring" }}
    className="relative w-10 h-10 flex items-center justify-center z-20"
  >
    {/* Outer Glow */}
    <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-700 ${isActive ? 'bg-[var(--accent)]/40 opacity-100' : 'bg-transparent opacity-0'}`} />
    
    {/* Core */}
    <div className={`relative w-4 h-4 rounded-full border-[2px] transition-colors duration-500 z-10 
      ${isActive ? 'bg-[var(--bg-base)] border-[var(--accent)]' : 'bg-[var(--bg-base)] border-[var(--text-secondary)]/30'}`} 
    />

    {/* Connecting Beam */}
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height: isActive ? 120 : 0 }}
      transition={{ duration: 1.5, delay: delay + 0.2, ease: "circOut" }}
      className="absolute top-full left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] to-transparent opacity-50 pointer-events-none" 
    />
  </motion.div>
);

// The Dual-Tone Liquid Modal
const LiquidModal = ({ item, onClose }: { item: typeof EXPERIENCE_DATA[number]; onClose: () => void }) => {
  
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 perspective-[1500px]">
      
      {/* Darkened Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-sm"
      />

      {/* The Dual-Tone Monolith */}
      <motion.div
        layoutId={`card-container-${item.company}`}
        transition={TRANSITION_OPEN}
        className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-20 flex flex-col md:flex-row bg-[#0f172a]"
      >
        {/* Close Button */}
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white backdrop-blur-md transition-all border border-white/10"
        >
            <X size={20} />
        </motion.button>

        {/* --- LEFT PANE: GRAINY LIQUID GLASS --- */}
        <div className="w-full md:w-[38%] relative p-8 md:p-10 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            
            {/* Grainy Texture Layer */}
            <div className="absolute inset-0 bg-[#1e293b]/80 backdrop-blur-3xl z-0" />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay z-0 pointer-events-none bg-repeat" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            
            {/* Ambient Gradient Blob */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[var(--accent)]/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

            {/* Content Layer */}
            <div className="relative z-10">
                <motion.div layoutId={`card-logo-wrapper-${item.company}`} className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono backdrop-blur-md shadow-sm">
                        <Calendar size={12} />
                        <span>{item.period}</span>
                    </div>
                </motion.div>
                
                <motion.h2 
                    layoutId={`card-title-${item.company}`}
                    className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2"
                >
                    {item.company}
                </motion.h2>
                
                <motion.div 
                    layoutId={`card-role-${item.company}`}
                    className="text-lg text-[var(--accent)] font-medium"
                >
                    {item.role}
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 mt-8 md:mt-0"
            >
                <div className="p-5 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                        <Award size={12} /> Key Achievement
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                        "Spearheaded the migration to a micro-frontend architecture, resulting in a 40% reduction in deployment times."
                    </p>
                </div>
            </motion.div>
        </div>

        {/* --- RIGHT PANE: PURE LIQUID GLASS --- */}
        <div className="w-full md:w-[62%] relative bg-[#0f172a]/40 backdrop-blur-3xl overflow-y-auto scrollbar-none flex flex-col">
            
            {/* Specular Highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

            <div className="p-8 md:p-12 min-h-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]/80 uppercase tracking-widest mb-6">
                        <Zap size={14} /> Impact Analysis
                    </div>

                    <p className="text-lg md:text-xl text-[var(--text-secondary)] dark:text-gray-300 font-light leading-relaxed mb-10">
                        {item.description}
                    </p>

                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Core Competencies</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                         {/* Tech Cards */}
                         <div className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[var(--accent)]/30 transition-all duration-300 cursor-default">
                            <div className="flex items-center gap-3 mb-2 text-[var(--accent)]">
                                <Cpu size={18} />
                                <span className="font-semibold text-sm text-white">Engineering</span>
                            </div>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                                Scalable system design & optimization
                            </p>
                         </div>
                         <div className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[var(--accent)]/30 transition-all duration-300 cursor-default">
                            <div className="flex items-center gap-3 mb-2 text-[var(--accent)]">
                                <Globe size={18} />
                                <span className="font-semibold text-sm text-white">Global Reach</span>
                            </div>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                                Multi-region deployment strategies
                            </p>
                         </div>
                    </div>

                    <div className="border-t border-white/5 pt-8">
                        <div className="flex flex-wrap gap-2">
                            {item.tech.map((t, i) => (
                                <motion.span 
                                    key={t}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors cursor-default"
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

// The Timeline Card
const ExperienceItem: React.FC<{ item: typeof EXPERIENCE_DATA[number]; index: number; onClick: () => void }> = ({ item, index, onClick }) => {
  return (
    <div className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer for centering */}
      <div className="hidden md:block w-[50%]" />
      
      {/* Central Node */}
      <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 top-0 w-10 flex justify-center z-20">
         <LiquidOrb isActive={true} delay={index * 0.1} />
      </div>

      {/* Card Content */}
      <motion.div 
        layoutId={`card-container-${item.company}`}
        onClick={onClick}
        whileHover={{ y: -5, scale: 1.01 }}
        transition={SPRING_HOVER}
        className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 relative group cursor-pointer"
      >
         {/* Liquid Glass Card Surface */}
         <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-[#0f172a]/40 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
            
            {/* Inner Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-2">
                    <motion.div layoutId={`card-logo-wrapper-${item.company}`}>
                       <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider mb-1 block">
                          {item.period}
                       </span>
                    </motion.div>
                    <ArrowUpRight size={16} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <motion.h3 
                    layoutId={`card-title-${item.company}`}
                    className="text-xl font-bold text-[var(--text-main)] mb-1 group-hover:text-[var(--accent)] transition-colors"
                >
                    {item.company}
                </motion.h3>

                <motion.div 
                    layoutId={`card-role-${item.company}`}
                    className="text-sm font-medium text-[var(--text-secondary)] mb-4"
                >
                    {item.role}
                </motion.div>

                <p className="text-sm text-[var(--text-secondary)] opacity-80 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>
                
                {/* Micro-interaction Line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
         </div>
      </motion.div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof EXPERIENCE_DATA[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });
  
  // Hydraulic Line Physics
  // High stiffness + low damping = fluid reaction to scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            className="absolute top-[10%] right-[-10%] w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-[120px] mix-blend-screen" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            style={{ opacity, y }}
            className="text-center mb-20 md:mb-32 max-w-3xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Layers size={12} />
                Career Trajectory
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
                Professional Journey
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
                Navigating complex systems and engineering solutions.
            </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
             
             {/* The Hydraulic Track Line */}
             {/* Left aligned on mobile, Center on Desktop */}
             <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/10 md:-translate-x-1/2 rounded-full overflow-hidden">
                <motion.div 
                    style={{ height }}
                    className="w-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                />
             </div>

             <LayoutGroup>
                <div className="space-y-16 md:space-y-24 pb-12">
                    {EXPERIENCE_DATA.map((item, index) => (
                        <ExperienceItem 
                            key={index} 
                            item={item} 
                            index={index} 
                            onClick={() => setSelectedItem(item)} 
                        />
                    ))}
                </div>

                <AnimatePresence>
                    {selectedItem && (
                        <LiquidModal 
                            item={selectedItem} 
                            onClose={() => setSelectedItem(null)} 
                        />
                    )}
                </AnimatePresence>
             </LayoutGroup>
        </div>

      </div>
    </section>
  );
};

export default Experience;