
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { AlertTriangle, ChevronRight, ChevronDown, Cpu, Zap, Layers } from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6', 'true');
  };

  // Liquid Morphing Button Animation
  const blobVariants: Variants = {
    idle: {
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%"
      ],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    hover: {
      scale: 1.05,
      borderRadius: [
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "60% 40% 30% 70% / 60% 30% 70% 40%"
      ],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* --- 1. FULL LIQUID BACKDROP --- */}
          {/* Custom localized SVG filter for the background ripple */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="splash-liquid-warp">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="warp" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
              </filter>
            </defs>
          </svg>

          {/* The moving gradient mesh seen through the liquid filter */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <div 
               className="absolute inset-0 opacity-40"
               style={{ 
                 filter: 'url(#splash-liquid-warp)',
                 background: 'radial-gradient(circle at 50% 50%, #1f2937 0%, #000 100%)' 
               }}
             />
             <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/20 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
             />
          </motion.div>

          {/* --- 2. HOLOGRAPHIC PRISM CARD --- */}
          <motion.div
            initial={{ scale: 0.9, y: 100, rotateX: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1.2 }}
            className="relative w-full max-w-lg"
          >
            {/* Glass Container */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              
              {/* Caustic/Holographic Sheen Layer */}
              <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-30 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

              {/* Content Wrapper */}
              <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
                
                {/* Floating 3D Icon */}
                <motion.div 
                  className="mb-6 relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-[var(--accent)] blur-3xl opacity-30" />
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md">
                     <AlertTriangle className="w-10 h-10 text-[var(--accent)] drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" />
                  </div>
                </motion.div>

                {/* Typography */}
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
                  Liquid Glass <span className="text-[var(--accent)]">Beta</span>
                </h2>
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono text-white/70 uppercase tracking-widest">
                        v3.6002.001
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]" />
                </div>

                <p className="text-white/70 text-base leading-relaxed mb-8">
                  Welcome to the experimental build of the <strong>Liquid Glass Engine</strong>. 
                  This interface utilizes advanced GPU refraction and real-time physics simulations.
                </p>

                {/* --- 3. MORPHING MERCURY BUTTON --- */}
                <motion.button
                  variants={blobVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="group relative w-64 h-16 flex items-center justify-center overflow-hidden mb-6"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 10px 40px -10px var(--accent)',
                  }}
                >
                  {/* Internal Liquid Shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
                  
                  <span className="relative z-10 flex items-center gap-2 font-bold text-white text-lg tracking-wide">
                    Enter Experience <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                {/* --- 4. EXPANDABLE TECHNICAL DETAILS --- */}
                <div className="w-full">
                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex items-center justify-center gap-2 text-xs font-medium text-white/40 hover:text-white/80 transition-colors mx-auto"
                    >
                        Technical Details <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 gap-3 text-left">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                        <Cpu className="w-4 h-4 text-[var(--accent)] mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold text-white mb-0.5">High GPU Usage</h4>
                                            <p className="text-[10px] text-white/50">Uses WebGL & SVG Displacement maps. May drain battery on mobile.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                        <Layers className="w-4 h-4 text-[var(--accent)] mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold text-white mb-0.5">WebKit Optimized</h4>
                                            <p className="text-[10px] text-white/50">Refraction quality is highest on Safari (iOS/macOS). Chromium may exhibit jitter.</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                        <Zap className="w-4 h-4 text-[var(--accent)] mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold text-white mb-0.5">Experimental Physics</h4>
                                            <p className="text-[10px] text-white/50">Spring damping and mass calculations are real-time.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
