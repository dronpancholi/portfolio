
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  AnimatePresence,
  LayoutGroup
} from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Calendar, Layers, X, Cpu, Globe, Award, Zap, ArrowUpRight } from 'lucide-react';

// --- PHYSICS CONSTANTS ---
const TRANSITION_OPEN = { type: "spring", stiffness: 120, damping: 18, mass: 1.1 };
const SPRING_HOVER = { type: "spring", stiffness: 300, damping: 20 };

// --- COMPONENTS ---

// The timeline node that lights up
const LiquidOrb = ({ isActive, delay = 0 }: { isActive: boolean; delay?: number }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, delay, type: "spring" }}
    className="relative w-12 h-12 flex items-center justify-center z-20"
  >
    {/* Liquid Distortion Layer */}
    <div 
        className="absolute inset-0 rounded-full bg-[var(--accent)]/40 transition-all duration-1000"
        style={{ filter: 'url(#liquidRefraction)', opacity: isActive ? 1 : 0 }} 
    />
    
    {/* Outer Glow */}
    <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-700 ${isActive ? 'bg-[var(--accent)]/60 opacity-100' : 'bg-transparent opacity-0'}`} />
    
    {/* Core - Glassy */}
    <div className={`relative w-4 h-4 rounded-full border-[2px] transition-colors duration-500 z-10 backdrop-blur-sm shadow-[0_0_15px_var(--accent)]
      ${isActive ? 'bg-white border-white' : 'bg-transparent border-[var(--text-secondary)]/30'}`} 
    />

    {/* Connecting Beam - Fluid Gradient */}
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height: isActive ? 140 : 0 }}
      transition={{ duration: 1.5, delay: delay + 0.2, ease: "circOut" }}
      className="absolute top-full left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/40 to-transparent opacity-80 pointer-events-none blur-[1px]" 
    />
  </motion.div>
);

// Unified Full Liquid Glass Modal
const LiquidModal = ({ item, onClose }: { item: typeof EXPERIENCE_DATA[number]; onClose: () => void }) => {
  
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 perspective-[2000px]">
      
      {/* Darkened Backdrop with Blur */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 z-0"
      />

      {/* The Monolith: Single Block of Liquid Glass */}
      <motion.div
        layoutId={`card-container-${item.company}`}
        transition={TRANSITION_OPEN}
        className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-[40px] overflow-hidden z-20 flex flex-col md:flex-row bg-white/5 dark:bg-black/40"
        style={{
            backdropFilter: 'blur(50px) saturate(150%)',
            WebkitBackdropFilter: 'blur(50px) saturate(150%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Clean shadow, no insets
        }}
      >
        {/* Clean Border Layer */}
        <div className="absolute inset-0 rounded-[40px] border border-white/10 pointer-events-none z-50" />

        {/* LIQUID REFRACTION BORDER OVERLAY - Subtle and clean */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-overlay">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" style={{ filter: 'url(#liquidRefraction)' }} />
        </div>

        {/* Specular Highlight Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-0" />

        {/* Floating Accent Orb in Background */}
        <motion.div 
             animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[var(--accent)]/15 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        />

        {/* Close Button */}
        <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 group"
        >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* --- LEFT COLUMN --- */}
        <div className="w-full md:w-[35%] relative p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 z-10 bg-white/5 dark:bg-white/[0.02]">
            <div>
                <motion.div layoutId={`card-logo-wrapper-${item.company}`} className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                        <Calendar size={12} />
                        <span>{item.period}</span>
                    </div>
                </motion.div>
                
                <motion.h2 
                    layoutId={`card-title-${item.company}`}
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[0.95] mb-4 drop-shadow-md"
                >
                    {item.company}
                </motion.h2>
                
                <motion.div 
                    layoutId={`card-role-${item.company}`}
                    className="text-xl md:text-2xl text-[var(--accent)] font-medium tracking-wide"
                >
                    {item.role}
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 md:mt-0 p-6 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-xl relative overflow-hidden"
            >
                {/* Inner Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-widest mb-3 relative z-10">
                    <Award size={12} /> Key Achievement
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-light relative z-10">
                   "Engineered critical pathways that increased system throughput by 300% while reducing infrastructure costs."
                </p>
            </motion.div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="w-full md:w-[65%] relative overflow-y-auto scrollbar-none z-10 flex flex-col bg-black/10">
            <div className="p-8 md:p-12 min-h-full">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-8">
                        <Zap size={14} /> Impact Analysis
                    </div>

                    <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 drop-shadow-sm">
                        {item.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                         <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                                <Cpu size={20} />
                                <span className="font-semibold text-white">System Architecture</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Designing fault-tolerant distributed systems capable of handling millions of concurrent requests.
                            </p>
                         </div>
                         <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                                <Globe size={20} />
                                <span className="font-semibold text-white">Scalability</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Implementing horizontal scaling strategies and global CDNs for low-latency delivery.
                            </p>
                         </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {item.tech.map((t, i) => (
                                <motion.span 
                                    key={t}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.05) }}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
    <div className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer for centering */}
      <div className="hidden md:block w-[50%]" />
      
      {/* Central Node */}
      <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 top-0 w-12 flex justify-center z-20">
         <LiquidOrb isActive={true} delay={index * 0.1} />
      </div>

      {/* Card Content */}
      <motion.div 
        layoutId={`card-container-${item.company}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={SPRING_HOVER}
        className="w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] ml-12 md:ml-0 relative group cursor-pointer perspective-[1000px]"
      >
         {/* FULL LIQUID GLASS CARD - CLEAN VERSION */}
         <div 
            className="relative overflow-hidden rounded-[32px] transition-all duration-500 bg-white/5 dark:bg-white/[0.02]"
            style={{
                backdropFilter: 'blur(24px) saturate(140%)',
                WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
            }}
         >
            {/* Clean Border */}
            <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none z-30" />

            {/* Liquid Refraction Overlay - The "Water" Effect - Smoother */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none mix-blend-overlay">
                <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent" style={{ filter: 'url(#liquidRefraction)' }} />
            </div>

            {/* Specular Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            {/* Hover Glow Blob */}
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-[var(--accent)]/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            <div className="p-8 relative z-20">
                <div className="flex justify-between items-start mb-4">
                    <motion.div layoutId={`card-logo-wrapper-${item.company}`}>
                       <span className="inline-block px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest mb-1 shadow-sm">
                          {item.period}
                       </span>
                    </motion.div>
                    <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[var(--text-secondary)] group-hover:text-white group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-300 shadow-sm">
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <motion.h3 
                    layoutId={`card-title-${item.company}`}
                    className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent)] transition-colors tracking-tight"
                >
                    {item.company}
                </motion.h3>

                <motion.div 
                    layoutId={`card-role-${item.company}`}
                    className="text-sm font-semibold text-[var(--text-secondary)] mb-5 uppercase tracking-wide opacity-80"
                >
                    {item.role}
                </motion.div>

                <p className="text-base text-[var(--text-secondary)]/90 leading-relaxed mb-6 line-clamp-2 font-light">
                    {item.description}
                </p>
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                    {item.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] font-bold px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[var(--text-secondary)] group-hover:text-[var(--text-main)] group-hover:bg-white/20 transition-all">
                            {t}
                        </span>
                    ))}
                </div>
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Ambience - Full Section Liquid Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Top Blob */}
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
            className="absolute top-[5%] right-[-10%] w-[900px] h-[900px] bg-[var(--accent)]/5 rounded-full blur-[150px] mix-blend-screen" 
         />
         {/* Bottom Blob */}
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [200, -200]) }}
            className="absolute bottom-[5%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] mix-blend-screen" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            style={{ opacity, y }}
            className="text-center mb-24 md:mb-36 max-w-3xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm ring-1 ring-white/50">
                <Layers size={12} />
                Career Trajectory
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[var(--text-main)] tracking-tight mb-6">
                Professional Journey
            </h2>
            <p className="text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto leading-relaxed">
                Navigating complex systems and engineering solutions with <span className="text-[var(--text-main)] font-normal">precision</span>.
            </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
             
             {/* The Hydraulic Track Line */}
             <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[3px] bg-[var(--text-secondary)]/5 md:-translate-x-1/2 rounded-full overflow-hidden">
                <motion.div 
                    style={{ height }}
                    className="w-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]"
                />
             </div>

             <LayoutGroup>
                <div className="space-y-24 md:space-y-32 pb-12">
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
