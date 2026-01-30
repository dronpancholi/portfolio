
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  AnimatePresence,
  LayoutGroup,
  useSpring
} from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Calendar, Layers, X, Cpu, Globe, Award, Zap, ArrowUpRight } from 'lucide-react';

// --- PHYSICS CONSTANTS ---
// Low stiffness + adequate damping = Heavy, premium glass feel
const TRANSITION_SPRING = { type: "spring" as const, stiffness: 80, damping: 18, mass: 1.1 };

// --- UTILS ---
const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const width = document.body.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.width = `${width}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.width = '';
    }
    return () => {
        document.body.style.overflow = '';
        document.body.style.width = '';
    };
  }, [lock]);
};

// --- PURE LIQUID GLASS LAYER ---
// This component provides the unified visual substrate for both cards and modals.
// It removes muddy background colors in favor of blur, saturation, and light interaction.
const PureLiquidGlassLayer = ({ active = false }: { active?: boolean }) => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]">
        {/* 1. Base Blur & Saturation (The Glass) */}
        <div 
            className="absolute inset-0 backdrop-blur-[50px] saturate-[180%]"
            style={{ 
                background: 'rgba(255, 255, 255, 0.03)', // Extremely transparent
            }} 
        />
        
        {/* 2. Noise Texture (The Matter) */}
        <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* 3. Specular Gradient (The Shine) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />

        {/* 4. Caustic Inner Shadow (The Depth) */}
        <div 
            className="absolute inset-0"
            style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.15)' }} 
        />
        
        {/* 5. Dark Mode Tint Override */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 mix-blend-multiply" />
    </div>
);

// --- TIMELINE NODE ---
const TimelineNode = ({ isActive, index }: { isActive: boolean; index: number }) => (
  <div className="relative w-12 h-12 flex items-center justify-center z-20">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ...TRANSITION_SPRING }}
      className="relative flex items-center justify-center"
    >
        <div className={`w-4 h-4 rounded-full border-[2px] z-10 transition-colors duration-500 shadow-[0_0_20px_var(--accent)]
            ${isActive ? 'bg-[var(--accent)] border-white dark:border-white' : 'bg-transparent border-[var(--text-secondary)]/50'}`} 
        />
        <div className="absolute inset-[-8px] rounded-full bg-[var(--accent)]/30 animate-pulse blur-md opacity-50" />
    </motion.div>
  </div>
);

// --- CARD (COLLAPSED) ---
const CardCollapsed = ({ item, onClick, id }: { item: typeof EXPERIENCE_DATA[number], onClick: () => void, id: string }) => {
    return (
        <motion.div
            layoutId={id}
            onClick={onClick}
            transition={TRANSITION_SPRING}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            // Explicit style borderRadius fixes the corner glitch during layout transition
            style={{ borderRadius: 32 }}
            className="group relative w-full cursor-pointer overflow-hidden isolate shadow-lg hover:shadow-2xl transition-shadow"
        >
            <PureLiquidGlassLayer />

            {/* Content */}
            <div className="relative p-6 md:p-8 z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <motion.div 
                        layout="position"
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                    >
                        {item.period}
                    </motion.div>
                    
                    <motion.div layout="position" className="p-2 rounded-full bg-white/10 text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300 backdrop-blur-md">
                        <ArrowUpRight size={16} />
                    </motion.div>
                </div>

                <div className="mb-3">
                     <motion.h3 layout="position" className="text-2xl font-bold text-[var(--text-main)] leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                        {item.company}
                     </motion.h3>
                     <motion.div layout="position" className="text-sm font-medium text-[var(--text-secondary)] opacity-80 uppercase tracking-wide mt-1">
                        {item.role}
                     </motion.div>
                </div>
                
                <motion.p layout="position" className="text-[var(--text-secondary)] leading-relaxed font-light line-clamp-2 mb-6">
                    {item.description}
                </motion.p>

                <motion.div layout="position" className="mt-auto flex flex-wrap gap-2">
                    {item.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[var(--text-secondary)] backdrop-blur-sm">
                            {t}
                        </span>
                    ))}
                    {item.tech.length > 3 && (
                         <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[var(--text-secondary)] backdrop-blur-sm">
                            +{item.tech.length - 3}
                        </span>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- MODAL (EXPANDED) ---
const ModalExpanded = ({ item, onClose, id }: { item: typeof EXPERIENCE_DATA[number], onClose: () => void, id: string }) => {
    useScrollLock(true);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[8px] z-0"
                onClick={onClose}
            />

            {/* Modal Container */}
            <motion.div
                layoutId={id}
                transition={TRANSITION_SPRING}
                // Explicit style borderRadius ensures smooth tween from card(32px) to modal(40px)
                style={{ borderRadius: 40 }}
                className="relative w-full max-w-5xl h-full max-h-[85vh] overflow-hidden z-20 flex flex-col md:flex-row isolate shadow-2xl"
            >
                <PureLiquidGlassLayer active={true} />

                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/20 dark:bg-black/20 text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white transition-all backdrop-blur-md border border-white/20"
                >
                    <X size={20} />
                </motion.button>

                {/* Content Panels - Using transparent backgrounds to let Liquid Glass shine through */}
                
                {/* LEFT PANEL */}
                <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col relative z-10 border-b md:border-b-0 md:border-r border-white/10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, ...TRANSITION_SPRING }}
                    >
                        <motion.div layout="position" className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            <Calendar size={12} /> {item.period}
                        </motion.div>
                        
                        <motion.h2 layout="position" className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] tracking-tight leading-[0.95] mb-4">
                            {item.company}
                        </motion.h2>
                        
                        <motion.div layout="position" className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                            {item.role}
                        </motion.div>

                        <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/10 border border-white/20 shadow-inner backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
                                <Award size={14} /> Key Achievement
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                                "{item.achievement}"
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT PANEL */}
                <div className="w-full md:w-[60%] overflow-y-auto scrollbar-none relative z-10">
                    <motion.div 
                        className="p-8 md:p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, ...TRANSITION_SPRING }}
                    >
                         <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest mb-8">
                            <Zap size={14} /> Role Breakdown
                        </div>

                        <p className="text-lg md:text-xl text-[var(--text-main)] font-light leading-relaxed mb-12">
                            {item.description}
                        </p>

                        <div className="grid grid-cols-1 gap-4 mb-10">
                            {item.responsibilities.map((resp, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                >
                                    <div className="mt-1 p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] h-fit">
                                        {i === 0 ? <Cpu size={20} /> : <Globe size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">{resp.title}</h4>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {resp.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div>
                            <div className="text-xs font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest mb-4">
                                Technologies
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {item.tech.map((t, i) => (
                                    <motion.span 
                                        key={t}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-white/10 border border-white/20 text-sm font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur-sm"
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};


// --- MAIN SECTION COMPONENT ---
const Experience: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof EXPERIENCE_DATA[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"]
  });
  
  // Spring-smoothed scroll line
  const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 relative" ref={containerRef}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
         <motion.div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 backdrop-blur-md text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest mb-6">
                <Layers size={12} />
                Career Trajectory
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
                Professional Journey
            </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
             
             {/* Dynamic Central Line */}
             <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/10 md:-translate-x-1/2 overflow-hidden rounded-full">
                <motion.div 
                    style={{ scaleY, transformOrigin: "top" }} 
                    className="w-full h-full bg-[var(--accent)] opacity-50 blur-[0.5px]"
                />
             </div>

             <LayoutGroup>
                <div className="flex flex-col gap-16 md:gap-24 pb-12">
                    {EXPERIENCE_DATA.map((item, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                             
                             {/* Spacer */}
                             <div className="hidden md:block w-1/2" />
                             
                             {/* Timeline Node */}
                             <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 top-0">
                                <TimelineNode isActive={true} index={index} />
                             </div>

                             {/* The Card */}
                             <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-4rem)] ml-14 md:ml-0">
                                <CardCollapsed 
                                    item={item} 
                                    onClick={() => setSelectedItem(item)} 
                                    id={`card-${item.company}`}
                                />
                             </div>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedItem && (
                        <ModalExpanded 
                            item={selectedItem} 
                            onClose={() => setSelectedItem(null)} 
                            id={`card-${selectedItem.company}`}
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
