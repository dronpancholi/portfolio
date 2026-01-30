
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence,
  LayoutGroup
} from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Calendar, Layers, X, Cpu, Globe, Award, Zap, ArrowUpRight } from 'lucide-react';

// --- PHYSICS & ANIMATION CONSTANTS ---
const OPEN_SPRING = { type: "spring", stiffness: 220, damping: 25, mass: 0.8 } as const;

// --- UTILS ---
const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const width = document.body.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.width = `${width}px`; // Prevent layout shift
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

// --- SUB-COMPONENTS ---

// The Glowing Node on the Timeline
const TimelineNode = ({ isActive, index }: { isActive: boolean; index: number }) => (
  <div className="relative w-12 h-12 flex items-center justify-center z-20">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="relative flex items-center justify-center"
    >
        {/* Core */}
        <div className={`w-4 h-4 rounded-full border-[2px] z-10 transition-colors duration-500 shadow-[0_0_10px_var(--accent)]
            ${isActive ? 'bg-white border-white' : 'bg-transparent border-[var(--text-secondary)]/50'}`} 
        />
        
        {/* Liquid Halo */}
        <div className="absolute inset-[-8px] rounded-full bg-[var(--accent)]/30 animate-pulse blur-md opacity-50" />
        
        {/* Connection Line */}
        <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: 160 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.2 }}
            className="absolute top-full w-[2px] bg-gradient-to-b from-[var(--accent)]/50 to-transparent blur-[0.5px]"
        />
    </motion.div>
  </div>
);

// --- MAIN LIST CARD (Collapsed State) ---
const CardCollapsed = ({ item, onClick, id }: { item: typeof EXPERIENCE_DATA[number], onClick: () => void, id: string }) => {
    return (
        <motion.div
            layoutId={id}
            onClick={onClick}
            variants={{
                idle: { scale: 1 },
                hover: { scale: 1.02 }
            }}
            initial="idle"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative w-full cursor-pointer rounded-[32px] overflow-hidden backdrop-blur-md border border-white/10 bg-white/5 dark:bg-white/[0.02]"
            style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                willChange: 'transform, opacity' // Hardware acceleration hint
            }}
        >
            {/* --- PREMIUM GLASS LAYERS --- */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative p-6 md:p-8 z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[10px] font-bold uppercase tracking-wider"
                    >
                        {item.period}
                    </motion.div>
                    
                    <div className="p-2 rounded-full bg-white/5 text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <div className="mb-2">
                     <h3 className="text-2xl font-bold text-[var(--text-main)] leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                        {item.company}
                     </h3>
                     <div className="text-sm font-medium text-[var(--text-secondary)] opacity-80 uppercase tracking-wide mt-1">
                        {item.role}
                     </div>
                </div>
                
                <p className="text-[var(--text-secondary)] leading-relaxed font-light line-clamp-2 mb-6">
                    {item.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {item.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text-secondary)]">
                            {t}
                        </span>
                    ))}
                    {item.tech.length > 3 && (
                         <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text-secondary)]">
                            +{item.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// --- EXPANDED MODAL (Active State) ---
const ModalExpanded = ({ item, onClose, id }: { item: typeof EXPERIENCE_DATA[number], onClose: () => void, id: string }) => {
    useScrollLock(true);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            
            {/* 1. Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[8px] z-0"
                onClick={onClose}
            />

            {/* 2. The Morphing Container */}
            <motion.div
                layoutId={id}
                className="relative w-full max-w-5xl h-full max-h-[85vh] bg-[#fafafa] dark:bg-[#0f1115] rounded-[40px] shadow-2xl overflow-hidden z-20 flex flex-col md:flex-row ring-1 ring-white/10"
                transition={OPEN_SPRING}
            >
                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/10 dark:bg-white/10 text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white transition-all backdrop-blur-md"
                >
                    <X size={20} />
                </motion.button>

                {/* Left Panel: Header & Info */}
                <div className="w-full md:w-[40%] bg-gray-50/50 dark:bg-white/[0.02] p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[10px] font-bold uppercase tracking-wider">
                            <Calendar size={12} /> {item.period}
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] tracking-tight leading-[0.9] mb-4">
                            {item.company}
                        </h2>
                        
                        <div className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                            {item.role}
                        </div>

                        {/* Highlight Box */}
                        <div className="p-6 rounded-2xl bg-[var(--bg-base)] border border-black/5 dark:border-white/5 shadow-sm">
                            <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
                                <Award size={14} /> Key Achievement
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                "{item.achievement}"
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Panel: Scrollable Content */}
                <div className="w-full md:w-[60%] overflow-y-auto scrollbar-none bg-[var(--bg-base)]">
                    <motion.div 
                        className="p-8 md:p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                         <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest mb-8">
                            <Zap size={14} /> Role Breakdown
                        </div>

                        <p className="text-lg md:text-xl text-[var(--text-main)] font-light leading-relaxed mb-12">
                            {item.description}
                        </p>

                        <div className="grid grid-cols-1 gap-4 mb-10">
                            {item.responsibilities.map((resp, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <div className="mt-1 p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] h-fit">
                                        {i === 0 ? <Cpu size={20} /> : <Globe size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">{resp.title}</h4>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {resp.description}
                                        </p>
                                    </div>
                                </div>
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
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm font-medium text-[var(--text-secondary)]"
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax Physics
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="experience" className="py-32 relative" ref={containerRef}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
         <motion.div style={{ y }} className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div style={{ opacity }} className="text-center mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 backdrop-blur-md text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest mb-6">
                <Layers size={12} />
                Career Trajectory
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
                Professional Journey
            </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
             
             {/* Central Line */}
             <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/10 md:-translate-x-1/2" />

             <LayoutGroup>
                <div className="flex flex-col gap-16 md:gap-24 pb-12">
                    {EXPERIENCE_DATA.map((item, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                             
                             {/* Spacer for centering logic */}
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
