
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown,
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Server,
  Code2,
  Database,
  Terminal,
  ShieldCheck
} from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [systemCheck, setSystemCheck] = useState({
    gpu: false,
    physics: false,
    optics: false,
    integrity: false
  });

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6_6');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      
      // Simulate complex system diagnostics sequence
      setTimeout(() => setSystemCheck(prev => ({ ...prev, gpu: true })), 1200);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, physics: true })), 1800);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, optics: true })), 2400);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, integrity: true })), 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6_6', 'true');
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const allSystemsGo = systemCheck.gpu && systemCheck.physics && systemCheck.optics && systemCheck.integrity;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{ perspective: '1200px' }}
        >
          {/* Backdrop with Blur - REMOVED onClick to prevent outside dismissal */}
          <motion.div 
            className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-lg transition-all duration-700"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0 }}
          />

          {/* 
             MAIN GLASS PANEL 
             Realism Engine v3.6006 - Heavy Industrial Glass
          */}
          <motion.div
            layout
            initial={{ scale: 0.9, y: 40, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            style={{
                background: 'rgba(20, 20, 20, 0.4)', // Slightly darker for contrast
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 0 0 1px rgba(0,0,0,0.5),
                  0 50px 100px -20px rgba(0,0,0,0.8),
                  inset 0 0 20px rgba(255,255,255,0.02)
                `,
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
          >
            {/* Prismatic Top Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

            {/* Header Section */}
            <div className="relative p-8 border-b border-white/5 flex items-start justify-between flex-shrink-0 bg-white/5">
                <div className="flex items-center gap-5">
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
                         <Terminal className="w-7 h-7 text-[var(--accent)]" />
                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black/50 rounded-full border border-white/20 flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${allSystemsGo ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500 animate-pulse'}`} />
                         </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">
                            System Kernel <span className="text-[var(--text-secondary)] font-light opacity-50">#Init</span>
                        </h2>
                        <div className="flex items-center gap-3 mt-1.5">
                             <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded border border-white/5">
                                Build v3.6.6
                             </span>
                             <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider opacity-60">
                                Realism Engine Core
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-8 space-y-6 overflow-y-auto scrollbar-none">
                
                {/* Performance Warning */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle size={64} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Activity size={12} />
                            High-Load Environment
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                            Initializing <strong>Dual-Frequency Turbulence</strong> simulation. This interface utilizes a custom <strong>WebGL-Composite</strong> render pipeline. Mobile devices without dedicated neural processing units may experience frame quantization.
                        </p>
                    </div>
                </div>

                {/* System Diagnostics Grid */}
                <div className="rounded-2xl overflow-hidden bg-black/10 dark:bg-black/40 border border-white/5 shadow-inner">
                    <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            Runtime Diagnostics
                        </span>
                        <div className="flex gap-1">
                            {[1,2,3,4].map(i => (
                                <div key={i} className={`w-1 h-1 rounded-full ${allSystemsGo ? 'bg-[var(--accent)]' : 'bg-white/20 animate-pulse'}`} style={{ animationDelay: `${i*0.1}s` }}/>
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-2 grid grid-cols-2 gap-px bg-white/5">
                        <div className="bg-black/20 dark:bg-[#0a0a0a] p-3 flex items-center justify-between group">
                            <span className="text-[10px] font-medium text-[var(--text-secondary)] flex items-center gap-2 group-hover:text-white transition-colors">
                                <Cpu size={12} className="opacity-50"/> GPU Rasterizer
                            </span>
                            {systemCheck.gpu ? <span className="text-[9px] text-[var(--accent)] font-mono">OK</span> : <span className="text-[9px] text-yellow-500 font-mono animate-pulse">BOOT...</span>}
                        </div>
                        <div className="bg-black/20 dark:bg-[#0a0a0a] p-3 flex items-center justify-between group">
                            <span className="text-[10px] font-medium text-[var(--text-secondary)] flex items-center gap-2 group-hover:text-white transition-colors">
                                <Zap size={12} className="opacity-50"/> Physics Engine
                            </span>
                            {systemCheck.physics ? <span className="text-[9px] text-[var(--accent)] font-mono">OK</span> : <span className="text-[9px] text-yellow-500 font-mono animate-pulse">LOAD...</span>}
                        </div>
                        <div className="bg-black/20 dark:bg-[#0a0a0a] p-3 flex items-center justify-between group">
                            <span className="text-[10px] font-medium text-[var(--text-secondary)] flex items-center gap-2 group-hover:text-white transition-colors">
                                <Layers size={12} className="opacity-50"/> Refraction Core
                            </span>
                            {systemCheck.optics ? <span className="text-[9px] text-[var(--accent)] font-mono">OK</span> : <span className="text-[9px] text-yellow-500 font-mono animate-pulse">CALIB...</span>}
                        </div>
                        <div className="bg-black/20 dark:bg-[#0a0a0a] p-3 flex items-center justify-between group">
                            <span className="text-[10px] font-medium text-[var(--text-secondary)] flex items-center gap-2 group-hover:text-white transition-colors">
                                <ShieldCheck size={12} className="opacity-50"/> DOM Integrity
                            </span>
                            {systemCheck.integrity ? <span className="text-[9px] text-[var(--accent)] font-mono">OK</span> : <span className="text-[9px] text-yellow-500 font-mono animate-pulse">CHECK...</span>}
                        </div>
                    </div>
                </div>

                {/* Technical Report / Expandable */}
                <motion.div 
                    layout
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                    <button 
                        onClick={toggleDetails}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors group"
                    >
                        <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                                <Database size={12} />
                            </div>
                            Core Architecture Manifest
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono text-[var(--text-secondary)] opacity-50 uppercase">Read-Only</span>
                            <motion.div animate={{ rotate: isDetailsOpen ? 180 : 0 }}>
                                <ChevronDown size={14} className="text-[var(--text-secondary)]" />
                            </motion.div>
                        </div>
                    </button>
                    
                    <AnimatePresence>
                        {isDetailsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/5"
                            >
                                <div className="p-5 bg-black/20 dark:bg-black/40 grid grid-cols-2 gap-3">
                                    <div className="col-span-2 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-50">
                                        Primary Sub-Systems
                                    </div>

                                    {/* Tech Stack Grid */}
                                    {[
                                        "Spectral Refraction Engine",
                                        "Verlet Integration Physics Engine",
                                        "Dual-Pass Gaussian Blur Engine",
                                        "Gamma-Corrected Luminance Engine",
                                        "Hydration Drift Correction Engine",
                                        "Dynamic Asset Preloading Engine",
                                        "SVG Turbulence Noise Generator",
                                        "React Fiber Reconciliation Core",
                                        "Tailwind JIT Compilation Engine",
                                        "Framer Motion Spring Solver",
                                        "Ray-Cast Caustics Simulation",
                                        "Sub-Pixel Antialiasing Engine"
                                    ].map((tech, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                                            <div className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-50" />
                                            <span className="text-[10px] font-mono text-[var(--text-secondary)] truncate">
                                                {tech}
                                            </span>
                                        </div>
                                    ))}
                                    
                                    <div className="col-span-2 mt-2 p-3 rounded border border-dashed border-white/10 bg-black/20">
                                        <p className="text-[10px] font-mono text-gray-500 leading-relaxed text-center">
                                            // SYSTEM READY FOR RENDERING<br/>
                                            // AWAITING USER INPUT TO MOUNT VDOM
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Footer / Action */}
            <div className="p-8 pt-0 mt-auto flex-shrink-0">
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDismiss}
                    disabled={!allSystemsGo}
                    className="w-full py-5 rounded-2xl font-bold text-white shadow-[0_20px_40px_-10px_rgba(var(--accent-rgb),0.3)] relative overflow-hidden group disabled:opacity-50 disabled:grayscale transition-all border border-white/20"
                    style={{ background: 'var(--accent)' }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] group-hover:bg-[position:200%_0,0_0] transition-[background-position] duration-[1000ms]" />
                    <span className="relative flex items-center justify-center gap-3 text-sm tracking-wide">
                        {allSystemsGo ? "INITIALIZE INTERFACE" : "CALIBRATING ENVIRONMENT..."} 
                        {allSystemsGo && <ChevronRight size={16} />}
                    </span>
                </motion.button>
                <div className="text-center mt-4">
                    <span className="text-[9px] font-mono text-[var(--text-secondary)] opacity-30 uppercase tracking-[0.2em]">
                        Dron Pancholi © 2025
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
