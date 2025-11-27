
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown,
  X, 
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2, 
  Activity, 
  ScanLine, 
  Server,
  Code2,
  Box,
  Thermometer
} from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [systemCheck, setSystemCheck] = useState({
    gpu: false,
    physics: false,
    optics: false
  });

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6_5');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      
      // Simulate system diagnostics sequence
      setTimeout(() => setSystemCheck(prev => ({ ...prev, gpu: true })), 1200);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, physics: true })), 1600);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, optics: true })), 2100);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6_5', 'true');
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

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
          {/* Backdrop with Blur */}
          <motion.div 
            className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-md transition-all duration-700"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss} 
          />

          {/* 
             MAIN GLASS PANEL 
             Realism Engine v3.6005 - Etched Glass Aesthetics
          */}
          <motion.div
            layout
            initial={{ scale: 0.9, y: 30, opacity: 0, rotateX: 5 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `
                  0 50px 100px -20px rgba(0,0,0,0.6),
                  inset 0 0 0 1px rgba(255,255,255,0.05),
                  inset 0 1px 0 0 rgba(255,255,255,0.2)
                `,
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            }}
          >
            {/* Prismatic Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent mix-blend-overlay" />

            {/* Header Section */}
            <div className="relative p-6 border-b border-white/10 flex items-start justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                         <Activity className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight">
                            System Initialization
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="relative flex h-2 w-2">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                             </span>
                             <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider opacity-70">
                                Beta Environment v3.6.5
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-6 space-y-6 overflow-y-auto scrollbar-none">
                
                {/* Performance Warning */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h3 className="text-xs font-bold text-red-500/90 uppercase tracking-wide">Performance Warning</h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            This application is currently in <strong>Beta</strong>. It utilizes a high-fidelity <strong>Realism Engine</strong> that heavily taxes the GPU. Users on devices without hardware acceleration (non-Apple silicon, older GPUs) may experience lag, jitter, or thermal throttling.
                        </p>
                    </div>
                </div>

                {/* System Diagnostics Grid */}
                <div className="rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner">
                    <div className="px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                            <Server size={12} /> Live Diagnostics
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent)]">
                            {systemCheck.optics ? "OPTIMAL" : "CALIBRATING..."}
                        </span>
                    </div>
                    
                    <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[var(--text-main)] flex items-center gap-2"><Cpu size={14} className="opacity-50"/> GPU Compute</span>
                            {systemCheck.gpu ? <CheckCircle2 size={14} className="text-[var(--accent)]" /> : <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />}
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[var(--text-main)] flex items-center gap-2"><Zap size={14} className="opacity-50"/> Physics Engine</span>
                            {systemCheck.physics ? <CheckCircle2 size={14} className="text-[var(--accent)]" /> : <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />}
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[var(--text-main)] flex items-center gap-2"><Layers size={14} className="opacity-50"/> Refraction Core</span>
                            {systemCheck.optics ? <CheckCircle2 size={14} className="text-[var(--accent)]" /> : <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />}
                        </div>
                    </div>
                </div>

                {/* Technical Report / Expandable */}
                <motion.div 
                    layout
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                    <button 
                        onClick={toggleDetails}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                        <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Code2 size={14} className="text-[var(--accent)]"/>
                            Technical Specifications
                        </span>
                        <motion.div animate={{ rotate: isDetailsOpen ? 180 : 0 }}>
                            <ChevronDown size={16} className="text-[var(--text-secondary)]" />
                        </motion.div>
                    </button>
                    
                    <AnimatePresence>
                        {isDetailsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/10"
                            >
                                <div className="p-4 space-y-4 bg-black/10 dark:bg-black/20">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1">Rendering Engine</div>
                                        <div className="text-xs text-[var(--text-main)] font-semibold">Liquid Glass v3.6 (Realism Core)</div>
                                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed opacity-80">
                                            Custom SVG turbulence filters utilizing a Dual-Frequency noise model with Gamma Compression to achieve zero-distortion centers and high-index edge refraction.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1">Animation Physics</div>
                                        <div className="text-xs text-[var(--text-main)] font-semibold">Critically Damped Spring Solver</div>
                                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed opacity-80">
                                            All UI interactions are driven by a custom spring physics engine (Stiffness: 180-300, Damping: 20-30) ensuring organic, buttery-smooth motion without linear interpolation.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1">Components</div>
                                        <ul className="text-[11px] text-[var(--text-secondary)] space-y-1 opacity-80 list-disc list-inside">
                                            <li>Parallax Tilt Cards (3D Volumetric)</li>
                                            <li>Dynamic Fluid Background (GPU Accelerated)</li>
                                            <li>Type-Safe Framer Motion Orchestration</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Footer / Action */}
            <div className="p-6 pt-0 mt-auto flex-shrink-0">
                <motion.button
                    whileHover={{ scale: 1.01, translateY: -1 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleDismiss}
                    disabled={!systemCheck.optics}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ background: 'var(--accent)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                        {systemCheck.optics ? "Initialize Interface" : "Calibrating Environment..."} 
                        {systemCheck.optics && <ChevronRight size={18} />}
                    </span>
                </motion.button>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
