
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown,
  Activity, 
  Cpu,
  Zap,
  Layers,
  ShieldCheck,
  Terminal,
  Grid,
  Maximize2
} from 'lucide-react';

// Version v3.6008.001
// Engine: Crystal HUD Interface

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Simulated System Check State
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Simulated Telemetry Data
  const [telemetry, setTelemetry] = useState({
    latency: '14ms',
    fps: '60',
    mem: '128MB',
    threads: '4'
  });

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6_8');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 200);

      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsReady(true);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15);
        });
        
        // Jitter telemetry
        setTelemetry({
            latency: `${12 + Math.floor(Math.random() * 5)}ms`,
            fps: `${58 + Math.floor(Math.random() * 3)}`,
            mem: `${120 + Math.floor(Math.random() * 20)}MB`,
            threads: '4'
        });

      }, 300);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6_8', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {/* Backdrop - Locked (No interaction) */}
          <motion.div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 
             MAIN HUD PANEL 
             Realism Engine v3.6008 - Crystal HUD
             High transparency, heavy blur, etched details.
          */}
          <motion.div
            layout
            initial={{ scale: 0.95, opacity: 0, rotateX: 5 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.98, opacity: 0, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative w-full max-w-2xl rounded-[32px] overflow-hidden flex flex-col max-h-[85vh] shadow-2xl"
            style={{
                // Deep Crystal Glass
                background: 'rgba(20, 20, 20, 0.2)', 
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.1),
                  0 40px 100px -20px rgba(0,0,0,0.6),
                  inset 0 0 40px rgba(255,255,255,0.02)
                `,
                backdropFilter: 'blur(50px) saturate(180%)',
                WebkitBackdropFilter: 'blur(50px) saturate(180%)',
            }}
          >
            {/* NOISE TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* HEADER: HUD STRIP */}
            <div className="relative p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <Terminal size={18} className="text-white/80" />
                     </div>
                     <div>
                        <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                            System Diagnostics
                        </h1>
                        <p className="text-[10px] font-mono text-white/40 mt-1.5 uppercase tracking-widest">
                            Release Candidate v3.6.8
                        </p>
                     </div>
                </div>
                {/* Status Indicator */}
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white/60 tracking-wider">STATUS</span>
                        <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-amber-400 animate-pulse'}`} />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 mt-0.5">
                        {isReady ? 'READY TO MOUNT' : 'INITIALIZING...'}
                    </span>
                </div>
            </div>

            {/* BODY: TELEMETRY GRID */}
            <div className="p-6 space-y-6 overflow-y-auto scrollbar-none relative z-10">
                
                {/* 4-Column Live Data Grid */}
                <div className="grid grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                    {[
                        { label: 'Latency', val: telemetry.latency, icon: Activity },
                        { label: 'V-Sync', val: telemetry.fps, icon: Zap },
                        { label: 'Memory', val: telemetry.mem, icon: Layers },
                        { label: 'Threads', val: telemetry.threads, icon: Cpu },
                    ].map((item, i) => (
                        <div key={i} className="bg-black/20 p-3 flex flex-col justify-between h-20 hover:bg-white/5 transition-colors">
                            <item.icon size={12} className="text-white/40 mb-2" />
                            <div>
                                <div className="text-lg font-mono font-bold text-white tracking-tight">{item.val}</div>
                                <div className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{item.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-medium text-white/50 uppercase tracking-widest">
                        <span>Kernel Loading</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>
                </div>

                {/* EXPANDABLE: ENGINE MANIFEST */}
                <div className="border-t border-white/10 pt-4">
                     <button 
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        className="w-full flex items-center justify-between group"
                    >
                        <span className="text-xs font-bold text-white/80 flex items-center gap-2 group-hover:text-white transition-colors">
                            <Grid size={14} className="text-[var(--accent)]" />
                            Advanced Engine Manifest
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 group-hover:text-white/60">
                            {isDetailsOpen ? 'COLLAPSE' : 'EXPAND'}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isDetailsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {/* Tech Stack List - Apple Style */}
                                    {[
                                        "Spectral Refraction Engine",
                                        "Verlet Physics Integration",
                                        "Sub-Pixel Antialiasing",
                                        "Chromatic Aberration Solver",
                                        "Gamma Luminance Corrector",
                                        "Dual-Pass Gaussian Blur",
                                        "SVG Turbulence Generator",
                                        "Ray-Cast Caustics Mapper",
                                        "GPU Composite Layering",
                                        "Hydration Drift Compensator",
                                        "Fluid Dynamics Simulator",
                                        "Virtual DOM Reconciler"
                                    ].map((tech, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                                            <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                                            <span className="text-[10px] font-mono text-white/70 truncate">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Visualizer Mockup */}
                                <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/5 flex gap-1 items-end h-16 opacity-50">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="flex-1 bg-white/40 rounded-sm"
                                            animate={{ height: `${Math.random() * 100}%` }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.02 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* FOOTER: ACTION */}
            <div className="p-6 bg-white/[0.02] border-t border-white/10 backdrop-blur-md relative z-20">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDismiss}
                    disabled={!isReady}
                    className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-50 disabled:grayscale transition-all"
                    style={{ 
                        background: 'rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center justify-center gap-3 text-sm font-bold text-white tracking-wide">
                        {isReady ? (
                            <>
                                INITIALIZE INTERFACE <Maximize2 size={14} />
                            </>
                        ) : (
                            "SYSTEM MOUNTING..."
                        )}
                    </span>
                </motion.button>
                
                <div className="flex justify-between items-center mt-4 px-1">
                     <span className="text-[9px] font-medium text-white/30 uppercase tracking-widest">
                        Secure Connection
                     </span>
                     <span className="text-[9px] font-mono text-white/30 uppercase">
                        ID: 8X-229-LQD
                     </span>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
