
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
import { Calendar, Briefcase, ChevronRight, Layers, X, Cpu, Globe, Award, Sparkles } from 'lucide-react';

// --- PHYSICS CONSTANTS ---
// "Viscous" spring for heavy, premium glass feel
const TILT_PHYSICS = { stiffness: 35, damping: 25, mass: 1.8 };
// "Morph" spring for seamless layout transitions
const MODAL_TRANSITION = { type: "spring", stiffness: 180, damping: 26, mass: 0.8 };
// "Snappy" spring for micro-interactions (hover, click)
const HOVER_SPRING = { stiffness: 400, damping: 25 };
// "Cinematic" easing for entrances
const EASE_CINEMATIC = [0.19, 1, 0.22, 1]; 

// --- UTILS ---
const useFluidSway = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Mapped rotation with viscous physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), TILT_PHYSICS);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), TILT_PHYSICS);
  
  // Sheen gradient movement (opposing direction)
  const sheenX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const sheenY = useTransform(y, [-0.5, 0.5], [0, 100]);

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

  return { rotateX, rotateY, sheenX, sheenY, x, y, handleMove, handleLeave };
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
    transition={{ duration: 1.2, delay, ease: EASE_CINEMATIC }}
    className="relative w-8 h-8 rounded-full z-20 flex items-center justify-center"
  >
    {/* Pulsing Core - subtle heartbeat */}
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute inset-0 rounded-full ${isActive ? 'bg-[var(--accent)]' : 'bg-gray-400/20'} backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] transition-colors duration-700`} 
    />
    
    {/* Ethereal Halo */}
    <div className="absolute inset-[-8px] rounded-full border border-[var(--accent)]/10 opacity-40 animate-[spin_12s_linear_infinite]" 
         style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
    
    {/* Vertical Connection Beam - Fluid fill */}
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 120, opacity: isActive ? 1 : 0 }} 
      transition={{ duration: 1.8, delay: delay + 0.3, ease: EASE_CINEMATIC }}
      className="absolute top-full left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent)]/80 via-[var(--accent)]/20 to-transparent" 
    />
  </motion.div>
);

const LiquidModal = ({ item, onClose }: { item: typeof EXPERIENCE_DATA[number]; onClose: () => void }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 perspective-[1200px]">
      
      {/* Dynamic Backdrop - Smooth fade & blur */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 dark:bg-black/60"
      />

      {/* The Monolith */}
      <motion.div
        layoutId={`card-container-${item.company}`}
        transition={MODAL_TRANSITION}
        className="relative w-full max-w-4xl h-[85vh] bg-[#f8fafc]/90 dark:bg-[#0f172a]/80 backdrop-blur-3xl rounded-[36px] overflow-hidden border border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] z-10 flex flex-col md:flex-row will-change-transform"
      >
        {/* Close Button - Floats nicely */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.4, ...HOVER_SPRING }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        {/* Left Visual Panel */}
        <div className="w-full md:w-1/3 relative p-8 md:p-10 flex flex-col justify-between overflow-hidden">
             {/* Dynamic Gradient Mesh */}
             <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/15 via-transparent to-transparent pointer-events-none" />
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay brightness-150" />
             
             {/* Animated Accent Blob */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[80px] pointer-events-none"
             />

             <motion.div layoutId={`card-header-${item.company}`} className="relative z-10">
                <motion.div layoutId={`card-logo-text-${item.company}`} className="origin-top-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] tracking-tighter mb-3">{item.company}</h2>
                </motion.div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[var(--text-secondary)] text-xs font-mono backdrop-blur-md shadow-sm">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
               className="relative z-10 mt-12 md:mt-auto"
             >
                <div className="text-[var(--accent)] font-bold text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2 opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                    Role Profile
                </div>
                <h3 className="text-2xl font-light text-[var(--text-main)] leading-snug">
                    {item.role}
                </h3>
             </motion.div>
        </div>

        {/* Right Content Panel - Staggered Entry */}
        <div className="w-full md:w-2/3 p-8 md:p-12 bg-white/40 dark:bg-black/20 overflow-y-auto scrollbar-none relative">
            <motion.div 
               initial="hidden"
               animate="visible"
               variants={{
                 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
               }}
            >
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-6"
                >
                    <Award size={14} /> 
                    Impact Analysis
                </motion.div>
                
                <motion.p 
                    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                    className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-10 text-pretty"
                >
                    {item.description}
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <motion.div 
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                        className="p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-300 group cursor-default"
                    >
                        <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                             <Cpu size={18} className="group-hover:rotate-90 transition-transform duration-500 ease-spring" />
                             <span className="font-bold text-sm">System Architecture</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed">
                            Engineered high-throughput pipelines, reducing latency by 40% in critical paths.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                        className="p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-300 group cursor-default"
                    >
                        <div className="flex items-center gap-3 mb-3 text-[var(--accent)]">
                             <Sparkles size={18} className="group-hover:scale-125 transition-transform duration-500 ease-spring" />
                             <span className="font-bold text-sm">Optimization</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed">
                            Implemented intelligent caching strategies that scaled to 1M+ daily users.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="border-t border-[var(--text-secondary)]/10 pt-8"
                >
                    <div className="text-xs font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-4">Technology Stack</div>
                    <div className="flex flex-wrap gap-2">
                        {item.tech.map((t, i) => (
                            <motion.span 
                                key={t}
                                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="px-3 py-1.5 rounded-lg bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all cursor-default shadow-sm"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
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
  // Fluid physics hook
  const { rotateX, rotateY, sheenX, sheenY, handleMove, handleLeave, x, y } = useFluidSway();
  
  // Parallax for content inside the card (creates depth)
  const contentX = useTransform(x, [-0.5, 0.5], [-3, 3]);
  const contentY = useTransform(y, [-0.5, 0.5], [-3, 3]);

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
        className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12 perspective-[1000px] group z-10"
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: index * 0.12 }}
      >
        <motion.div
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative cursor-pointer will-change-transform"
        >
            {/* Ambient Glow */}
            <div 
                className="absolute inset-0 bg-[var(--accent)]/5 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ transform: 'translateZ(-10px)' }}
            />

            <div 
                className="relative bg-white/60 dark:bg-[#0f172a]/50 backdrop-blur-xl rounded-[24px] border border-white/40 dark:border-white/5 overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-500"
            >
                {/* Dynamic Sheen / Refraction */}
                <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none mix-blend-overlay z-10 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                    style={{ x: sheenX, y: sheenY }}
                />

                <motion.div 
                    className="p-8 relative z-20"
                    style={{ x: contentX, y: contentY }} // Internal Parallax
                >
                    <div className="flex justify-between items-start mb-4">
                        <motion.div layoutId={`card-header-${item.company}`} className="flex-1">
                             <motion.h3 
                                layoutId={`card-logo-text-${item.company}`}
                                className="text-2xl font-bold text-[var(--text-main)] tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300"
                             >
                                {item.company}
                             </motion.h3>
                        </motion.div>
                        <motion.div 
                            whileHover={{ x: 4 }}
                            transition={HOVER_SPRING}
                            className="bg-black/5 dark:bg-white/5 p-2 rounded-full text-[var(--text-secondary)] group-hover:text-[var(--text-main)] group-hover:bg-[var(--accent)]/10 transition-colors"
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
                            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[var(--bg-base)] border border-[var(--text-secondary)]/10 text-[var(--text-secondary)] group-hover:border-[var(--accent)]/20 transition-colors duration-300">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
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
  
  // Hydraulic fluid simulation for the line - ultra smooth spring
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // Opacity fade in for section header
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Background Ambience - Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
            className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px] mix-blend-screen" 
         />
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
            className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
            style={{ opacity, y }}
            className="text-center mb-24 max-w-3xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
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
                    className="w-full bg-gradient-to-b from-[var(--accent)]/60 via-[var(--accent)] to-[var(--accent)]/60 shadow-[0_0_15px_var(--accent)]"
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
