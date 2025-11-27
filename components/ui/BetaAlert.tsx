
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight, X, Cpu, Zap, Layers, CheckCircle2, Activity, ScanLine } from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [systemCheck, setSystemCheck] = useState({
    gpu: false,
    physics: false,
    optics: false
  });

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6_4');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      
      // Simulate system diagnostics
      setTimeout(() => setSystemCheck(prev => ({ ...prev, gpu: true })), 1400);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, physics: true })), 1800);
      setTimeout(() => setSystemCheck(prev => ({ ...prev, optics: true })), 2200);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6_4', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ perspective: '1200px' }}
        >
          {/* Backdrop with Blur */}
          <motion.div 
            className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-md transition-all duration-700"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss} 
          />

          {/* 
             MAIN GLASS PANEL 
             Realism Engine v3.6004 - Etched Glass Aesthetics
          */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0, rotateX: 5 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 40px 80px -20px rgba(0,0,0,0.5),
                  inset 0 0 0 1px rgba(255,255,255,0.05),
                  inset 0 1px 0 0 rgba(255,255,255,0.3)
                `,
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            {/* Prismatic Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent mix-blend-overlay" />

            {/* Header Section */}
            <div className="relative p-6 border-b border-white/10 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                         <AlertTriangle className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight">
                            System Access <span className="text-[var(--accent)] opacity-80">Request</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                             <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider opacity-70">
                                Build v3.6004.001
                             </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleDismiss}
                    className="p-2 rounded-lg text-black/40 dark:text-white/40 hover:bg-white/5 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-6">
                
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    You are entering a <strong>high-fidelity prototype</strong> environment. The interface utilizes advanced real-time physics and refractive rendering engines which may impact battery life on portable devices.
                </p>

                {/* System Diagnostics Grid (Etched Glass Look) */}
                <div className="rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner">
                    <div className="px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                            <Activity size={12} /> Diagnostics
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent)]">
                            {systemCheck.optics ? "READY" : "CHECKING..."}
                        </span>
                    </div>
                    
                    <div className="p-4 space-y-3">
                        {/* Check 1 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Cpu size={14} className="text-[var(--text-secondary)] opacity-70" />
                                <span className="text-xs font-medium text-[var(--text-main)]">GPU Acceleration</span>
                            </div>
                            {systemCheck.gpu ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono text-[var(--text-secondary)] opacity-50">WebGL 2.0</span>
                                    <CheckCircle2 size={14} className="text-[var(--accent)]" />
                                </motion.div>
                            ) : (
                                <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />
                            )}
                        </div>

                        {/* Check 2 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Zap size={14} className="text-[var(--text-secondary)] opacity-70" />
                                <span className="text-xs font-medium text-[var(--text-main)]">Physics Engine</span>
                            </div>
                            {systemCheck.physics ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono text-[var(--text-secondary)] opacity-50">60Hz Tick</span>
                                    <CheckCircle2 size={14} className="text-[var(--accent)]" />
                                </motion.div>
                            ) : (
                                <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />
                            )}
                        </div>

                        {/* Check 3 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ScanLine size={14} className="text-[var(--text-secondary)] opacity-70" />
                                <span className="text-xs font-medium text-[var(--text-main)]">Optics & Refraction</span>
                            </div>
                            {systemCheck.optics ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono text-[var(--text-secondary)] opacity-50">Ray-Cast</span>
                                    <CheckCircle2 size={14} className="text-[var(--accent)]" />
                                </motion.div>
                            ) : (
                                <div className="w-3 h-3 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin opacity-30" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Action */}
            <div className="p-6 pt-0">
                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px -5px rgba(var(--accent-rgb), 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDismiss}
                    disabled={!systemCheck.optics}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ background: 'var(--accent)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                        {systemCheck.optics ? "Initialize Experience" : "Calibrating Environment..."} 
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
