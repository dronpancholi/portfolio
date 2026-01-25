
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate, 
  AnimatePresence,
  LayoutGroup
} from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Calendar, Briefcase, ArrowRight, Layers, X, Cpu, Globe, Zap, ChevronRight, Award } from 'lucide-react';
import TiltCard from './ui/TiltCard';

// --- LIQUID PHYSICS UTILS ---
// Custom hook to create a fluid swaying motion based on mouse position
const useFluidSway = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMove, handleLeave };
};

// --- COMPONENTS ---

const LiquidOrb = ({ isActive, delay = 0 }: { isActive: boolean; delay?: number }) => (
  <motion.div
    animate={{ 
      scale: isActive ? [1, 1.2, 1] : 1,
      filter: isActive ? "brightness(1.5) blur(1px)" : "brightness(1) blur(0px)"
    }}
    transition={{ 
      duration: 2, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="relative w-8 h-8 rounded-full z-20"
  >
    {/* Core */}
    <div className={`absolute inset-0 rounded-full ${isActive ? 'bg-[var(--accent)]' : 'bg-gray-400/30'} backdrop-blur-md border border-white/20 transition-colors duration-500`} />
    
    {/* Liquid Shell */}
    <div className="absolute inset-[-4px] rounded-full border border-[var(--accent)]/30 opacity-50" />
    <div className="absolute inset-[-8px] rounded-full border border-dashed border-[var(--text-secondary)]/10 animate-[spin_10s_linear_infinite]" />
    
    {/* Connecting Line Glow */}
    <div className={`absolute left-1/2 top-full w-0.5 h-24 -translate-x-1/2 bg-gradient-to-b from-[var(--accent)]/50 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
  </motion.div>
);

const LiquidModal = ({ item, onClose }: { item: typeof EXPERIENCE_DATA[number]; onClose: () => void }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 perspective-[1000px]">
      
      {/* Liquid Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        style={{
          // Use SVG filter for wavy liquid distortion on the backdrop
          backdropFilter: 'blur(20px) url(#liquidRefraction)',
          WebkitBackdropFilter: 'blur(20px) url(#liquidRefraction)',
        }}
      />

      {/* The Glass Monolith Modal */}
      <motion.div
        layoutId={`card-container-${item.company}`}
        className="relative w-full max-w-4xl h-[85vh] bg-white/5 dark:bg-[#0f172a]/40 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 flex flex-col md:flex-row"
        style={{
           boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 30px rgba(255,255,255,0.05)',
           transformStyle: 'preserve-3d'
        }}
      >
        {/* Close Button Orb */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:bg-[var(--accent)]/50 transition-all"
        >
          <X size={20} />
        </motion.button>

        {/* Left Panel: Visual & High Level */}
        <div className="w-full md:w-1/3 relative overflow-hidden p-8 flex flex-col justify-between bg-gradient-to-b from-[var(--accent)]/10 to-transparent">
             {/* Animated Noise Texture */}
             <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
             
             <motion.div layoutId={`card-logo-${item.company}`} className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none mb-2">{item.company}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-mono">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                </div>
             </motion.div>

             <div className="relative z-10 mt-12 md:mt-auto">
                <div className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    Role Overview
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white/90 leading-tight">
                    {item.role}
                </h3>
             </div>
        </div>

        {/* Right Panel: Deep Dive Details */}
        <div className="w-full md:w-2/3 p-8 md:p-10 relative overflow-y-auto scrollbar-none bg-white/5 backdrop-blur-md">
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="prose prose-invert max-w-none"
            >
                <h4 className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-wider mb-6">
                    <ActivityIcon /> Impact Analysis
                </h4>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                    {item.description}
                </p>

                {/* Mock Expanded Data (Simulated for Demo) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-[var(--accent)]/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2 text-[var(--accent)]">
                             <Award size={18} />
                             <span className="font-bold text-sm">Key Achievement</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80">
                            Architected core system components resulting in 40% reduction in latency.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-[var(--accent)]/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2 text-[var(--accent)]">
                             <Globe size={18} />
                             <span className="font-bold text-sm">Global Scale</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80">
                            Deployed solutions across 3 regions serving 1M+ daily active requests.
                        </p>
                    </div>
                </div>

                <h4 className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
                    <Cpu size={14} /> Technology Matrix
                </h4>
                <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-all cursor-default">
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

interface ExperienceItemProps {
  item: typeof EXPERIENCE_DATA[number];
  index: number;
  onClick: () => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ item, index, onClick }) => {
  const { rotateX, rotateY, handleMove, handleLeave } = useFluidSway();
  
  return (
    <div className={`relative flex flex-col md:flex-row gap-8 items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer */}
      <div className="hidden md:block w-1/2" />
      
      {/* Node */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 md:top-0 w-8 flex justify-center">
         <LiquidOrb isActive={true} delay={index * 0.2} />
      </div>

      {/* Card */}
      <motion.div 
        layoutId={`card-container-${item.company}`}
        className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12 perspective-[1000px] group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <motion.div
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative cursor-pointer"
        >
            {/* Liquid Fill Hover Effect */}
            <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div 
                className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[24px] border border-white/30 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                style={{
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Internal Refraction Layer */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-10"
                    style={{ 
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 60%)',
                        filter: 'url(#liquidRefraction)' 
                    }} 
                />

                <div className="p-8 relative z-20">
                    <div className="flex justify-between items-start mb-4">
                        <motion.h3 layoutId={`card-logo-${item.company}`} className="text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                            {item.company}
                        </motion.h3>
                        <ChevronRight className="text-[var(--text-secondary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)] mb-4 uppercase tracking-wider">
                        <Briefcase size={14} />
                        {item.role}
                    </div>

                    <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {item.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-base)]/50 border border-[var(--text-secondary)]/10 text-[var(--text-secondary)]">
                                {t}
                            </span>
                        ))}
                        {item.tech.length > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-base)]/50 border border-[var(--text-secondary)]/10 text-[var(--text-secondary)]">
                                +{item.tech.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ActivityIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
)

const Experience: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof EXPERIENCE_DATA[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* --- Section Liquid Background --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Wavy blobs */}
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.03),transparent_70%)]" />
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
            className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" 
         />
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
            className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            style={{ opacity }}
            className="text-center mb-24 max-w-3xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
                <Layers size={14} />
                Engineering Timeline
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] tracking-tight mb-6">
                Professional Journey
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-light">
                A trajectory of building scalable intelligence and resilient systems.
            </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
             
             {/* Central Liquid Track */}
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/5 md:-translate-x-1/2">
                <motion.div 
                    style={{ height }}
                    className="w-full bg-gradient-to-b from-[var(--accent)] via-blue-400 to-[var(--accent)] shadow-[0_0_15px_var(--accent)]"
                />
             </div>

             <LayoutGroup>
                <div className="space-y-20 md:space-y-32 pb-24 pl-8 md:pl-0">
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
