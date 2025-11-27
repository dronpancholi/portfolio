
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight, X, Cpu, Zap, Layers } from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6', 'true');
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
          {/* 
             1. BACKDROP: 
             Only slightly dim the real website so the user feels "in" the app.
             Add a blur to focus attention on the glass card.
          */}
          <motion.div 
            className="absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss} 
          />

          {/* 
             2. RIGID LIQUID GLASS CARD 
             Uses the v3.0 Realism Engine aesthetics (borders, inset shadows).
          */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{
                background: 'rgba(255, 255, 255, 0.05)', // Crystal clear base
                border: '1px solid rgba(255, 255, 255, 0.2)', // Physical edge
                boxShadow: `
                  0 20px 50px -10px rgba(0,0,0,0.3),
                  inset 0 0 0 1px rgba(255,255,255,0.1),
                  inset 0 1px 0 0 rgba(255,255,255,0.4)
                `,
                backdropFilter: 'blur(20px) saturate(180%)', // Heavy glass refraction
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* Caustic Sheen Layer */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay" />

            {/* Close Button (Top Right) */}
            <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-20"
            >
                <X size={20} />
            </button>

            <div className="relative z-10 p-8 flex flex-col items-center text-center">
                
                {/* Icon Container with Glass Glow */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-20" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 border border-white/40 flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-8 h-8 text-[var(--accent)] drop-shadow-sm" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2 tracking-tight">
                   Liquid Engine <span className="text-[var(--accent)]">Beta</span>
                </h2>
                
                {/* Version Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
                    <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                        v3.6003.001
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
                    You are viewing the <strong>experimental build</strong>. 
                    This interface pushes browser rendering limits with real-time liquid physics and refractive glass layers.
                </p>

                {/* 
                   RIGID BUTTONS 
                   Standard shapes, no morphing. High-gloss finish.
                */}
                <div className="w-full space-y-3">
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -5px rgba(var(--accent-rgb), 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDismiss}
                        className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg relative overflow-hidden group"
                        style={{ background: 'var(--accent)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                            Enter Experience <ChevronRight size={18} />
                        </span>
                    </motion.button>

                    <motion.button
                         whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => setShowDetails(!showDetails)}
                         className="w-full py-3 rounded-xl font-medium text-[var(--text-secondary)] text-xs hover:text-[var(--text-main)] transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/10"
                    >
                        {showDetails ? "Hide Technical Data" : "View Performance Stats"}
                    </motion.button>
                </div>

                {/* Technical Details Accordion */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="w-full overflow-hidden text-left"
                        >
                            <div className="grid grid-cols-1 gap-2 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <Cpu size={14} className="text-[var(--accent)]" />
                                    <span className="text-[10px] text-[var(--text-secondary)]">GPU Acceleration Enabled</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Layers size={14} className="text-[var(--accent)]" />
                                    <span className="text-[10px] text-[var(--text-secondary)]">WebKit/Blink Dual-Engine</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Zap size={14} className="text-[var(--accent)]" />
                                    <span className="text-[10px] text-[var(--text-secondary)]">Real-time Spring Physics</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
