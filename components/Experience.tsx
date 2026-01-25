
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
import { Calendar, Briefcase, ChevronRight, Layers, X, Cpu, Globe, Award } from 'lucide-react';

// --- PHYSICS CONSTANTS ---
const SPRING_HEAVY = { stiffness: 60, damping: 20, mass: 1.2 }; // "Heavy" glass feel
const SPRING_SNAP = { stiffness: 250, damping: 25, mass: 0.8 }; // Snappy but soft interactions
const EASE_PREMIUM = [0.25, 1, 0.5, 1]; // "Apple-style" swift-out, soft-in

// --- UTILS ---
const useFluidSway = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Using heavy spring for a premium, viscous liquid feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), SPRING_HEAVY);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), SPRING_HEAVY);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: isActive ? 1 : 0.8,
      opacity: 1,
      filter: isActive ? "brightness(1.2)" : "brightness(1)"
    }}
    transition={{ duration: 1, delay, ease: EASE_PREMIUM }}
    className="relative w-8 h-8 rounded-full z-20 flex items-center justify-center"
  >
    {/* Pulsing Core */}
    <motion.div 
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute inset-0 rounded-full ${isActive ? 'bg-[var(--accent)]' : 'bg-gray-400/30'} backdrop-blur-md border border-white/20 transition-colors duration-700`} 
    />
    
    {/* Orbiting Ring */}
    <div className="absolute inset-[-6px] rounded-full border border-[var(--accent)]/20 opacity-60 animate-[spin_8s_linear_infinite]" 
         style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
    
    {/* Vertical Connection Beam */}
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 100, opacity: isActive ? 1 : 0 }} // 100px height beam
      transition={{ duration: 1.5, delay: delay + 0.2, ease: EASE_PREMIUM }}
      className="absolute top-full left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] to-transparent" 
    />
  </motion.div>
);

const LiquidModal = ({ item, onClose }: { item: typeof EXPERIENCE_DATA[number]; onClose: () => void }) => {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 perspective-[1200px]">
      
      {/* Blurred Liquid Backdrop */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Main Card */}
      <motion.div
        layoutId={`card-container-${item.company}`}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }} // Perfect "snap"
        className="relative w-full max-w-4xl h-[85vh] bg-[#0f172a]/80 dark:bg-[#0f172a]/60 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] z-10 flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* Sidebar (Visual) */}
        <div className="w-full md:w-1/3 relative p-8 flex flex-col justify-between overflow-hidden">
             {/* Gradient Mesh Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/20 via-transparent to-transparent pointer-events-none" />
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-200 mix-blend-overlay" />

             <motion.div layoutId={`card-logo-${item.company}`} className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-3">{item.company}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-mono backdrop-blur-md">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.5 }}
               className="relative z-10 mt-12 md:mt-auto"
             >
                <div className="text-[var(--accent)] font-bold text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2 opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Role Profile
                </div>
                <h3 className="text-xl font-light text-white/90 leading-snug">
                    {item.role}
                </h3>
             </motion.div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-8 md:p-12 bg-black/20 overflow-y-auto scrollbar-none">
            <motion.div 
               initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-6">
                    <Award size={14} /> 
                    Impact Analysis
                </div>
                
                <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-10 text-pretty">
                    {item.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-[var(--accent)]/30 hover:bg-white/[0.05] transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                             <Cpu size={18} className="group-hover:scale-110 transition-transform" />
                             <span className="font-bold text-sm">System Arch</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed">
                            Designed fault-tolerant microservices handling 10k+ concurrent connections.
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-[var(--accent)]/30 hover:bg-white/[0.05] transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                             <Globe size={18} className="group-hover:scale-110 transition-transform" />
                             <span className="font-bold text-sm">Scalability</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed">
                            Optimized edge-caching strategies reducing global latency by 35%.
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8">
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Technology Stack</div>
                    <div className="flex flex-wrap gap-2">
                        {item.tech.map((t, i) => (
                            <motion.span 
                                key={t}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + (i * 0.05) }}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all cursor-default"
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
      
      {/* Timeline Node */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 md:top-0 w-8 flex justify-center">
         <LiquidOrb isActive={true} delay={index * 0.2} />
      </div>

      {/* Interactive Card */}
      <motion.div 
        layoutId={`card-container-${item.company}`}
        className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12 perspective-[1000px] group"
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: index * 0.15 }}
      >
        <motion.div
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative cursor-pointer"
        >
            {/* Liquid Glow on Hover */}
            <div 
                className="absolute inset-0 bg-[var(--accent)]/10 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ transform: 'translateZ(-20px)' }}
            />

            <div 
                className="relative bg-white/60 dark:bg-[#0f172a]/40 backdrop-blur-xl rounded-[24px] border border-white/40 dark:border-white/5 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', // Soft clean shadow
                }}
            >
                {/* Internal Refraction/Sheen */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-10 bg-gradient-to-br from-white/50 via-transparent to-transparent"
                />

                <div className="p-8 relative z-20">
                    <div className="flex justify-between items-start mb-4">
                        <motion.h3 layoutId={`card-logo-${item.company}`} className="text-2xl font-bold text-[var(--text-main)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                            {item.company}
                        </motion.h3>
                        <motion.div 
                            whileHover={{ x: 3 }}
                            className="bg-black/5 dark:bg-white/5 p-2 rounded-full text-[var(--text-secondary)]"
                        >
                             <ChevronRight size={16} />
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] mb-4 uppercase tracking-wider">
                        <Briefcase size={12} />
                        {item.role}
                    </div>

                    <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-6 line-clamp-2">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {item.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[var(--bg-base)] border border-[var(--text-secondary)]/10 text-[var(--text-secondary)]">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof EXPERIENCE_DATA[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Hydraulic fluid simulation for the line
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // Opacity fade in for section header
  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] mix-blend-screen" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
            style={{ opacity, y }}
            className="text-center mb-24 max-w-3xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Layers size={12} />
                Engineering Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-6">
                Professional Journey
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
                Building scalable intelligence and resilient systems across industries.
            </p>
        </motion.div>

        {/* Timeline Track */}
        <div className="relative max-w-5xl mx-auto">
             
             {/* Track Line */}
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--text-secondary)]/5 md:-translate-x-1/2 rounded-full overflow-hidden">
                <motion.div 
                    style={{ height }}
                    className="w-full bg-gradient-to-b from-[var(--accent)]/50 via-[var(--accent)] to-[var(--accent)]/50 shadow-[0_0_20px_var(--accent)]"
                />
             </div>

             <LayoutGroup>
                <div className="space-y-24 md:space-y-32 pb-24 pl-8 md:pl-0">
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