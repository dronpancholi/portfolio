
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check session storage to only show once per session
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3');
    if (!hasSeenAlert) {
      // Small delay to let the initial page load settle before showing the modal
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-[8px]"
          style={{ transform: 'translateZ(0)' }} // Force GPU
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full max-w-md"
          >
            <GlassCard className="overflow-hidden border border-white/40 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              {/* Caution Striping Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)'
                }}
              />

              <div className="relative p-8 flex flex-col items-center text-center">
                {/* Icon with Liquid Glow */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/50 flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2 tracking-tight">
                  Public Beta Preview
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono uppercase tracking-widest mb-6 border border-[var(--accent)]/20">
                  v3.6001.001
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
                  You are viewing a <strong>Liquid Glass</strong> experimental build. 
                  <br /><br />
                  While optimized for <strong>WebKit (Apple Devices)</strong>, users on Chromium or low-power devices may experience frame-drops or visual turbulence due to the high-fidelity refraction engine.
                </p>

                <button
                  onClick={handleDismiss}
                  className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white overflow-hidden transition-transform active:scale-95"
                >
                  {/* Liquid Button Background */}
                  <div className="absolute inset-0 bg-[var(--accent)] opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute inset-0 opacity-50 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_linear_infinite]" />
                  
                  {/* Button Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Experience <ChevronRight size={18} />
                  </span>
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
