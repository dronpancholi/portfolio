import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal,
  Activity, 
  ChevronDown,
  Cpu,
  Layers,
  Box,
  Server
} from 'lucide-react';

const ENGINE_SPECS = [
  { id: '1', name: "Liquid V4.0", desc: "Dual-octave displacement engine." },
  { id: '2', name: "Spec-Alpha", desc: "Chromatically neutral blending." },
  { id: '3', name: "Optics+", desc: "1.2x physical magnification solver." },
];

const BetaAlert: React.FC = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('dron_max_liquid_template');
    if (!hasSeen) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsLoaded(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_max_liquid_template', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-2xl"
        >
          <motion.div
            layout
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="w-full max-w-lg bg-slate-900/80 border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
          >
            <div className="p-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                  <Terminal size={28} className="text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-1.5">System Ready</h1>
                  <p className="text-[10px] text-emerald-400/60 font-mono uppercase tracking-[0.2em]">Liquid Engine v4.0.2</p>
                </div>
              </div>

              <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5 mb-10">
                <p className="text-base text-white/70 leading-relaxed mb-6 font-light">
                  Welcome to the premium personal portfolio of <strong>Dron Pancholi</strong>. 
                  This template utilizes high-end GPU-accelerated refraction and optical distortion.
                </p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                    <Activity size={14} /> ACTIVE_REFRACTION
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-blue-400 font-mono">
                    <Server size={14} /> GPU_60FPS
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismiss}
                  disabled={!isLoaded}
                  className="w-full py-5 rounded-2xl bg-white text-black font-bold text-sm shadow-2xl disabled:opacity-50 transition-all"
                >
                  {isLoaded ? 'Launch Experience' : 'Calibrating Optics...'}
                </motion.button>
                
                <button 
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="w-full text-center text-[10px] text-white/30 uppercase tracking-[0.3em] py-2 hover:text-white/60 transition-colors flex items-center justify-center gap-3"
                >
                  {isDetailsOpen ? 'Collapse Documentation' : 'View Documentation'}
                  <ChevronDown size={14} className={isDetailsOpen ? 'rotate-180' : ''} />
                </button>
              </div>

              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-8 pt-8 border-t border-white/5 space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      {ENGINE_SPECS.map(spec => (
                        <div key={spec.id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-2">{spec.name}</h4>
                          <p className="text-[11px] text-white/40 leading-relaxed">{spec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="px-10 py-4 bg-black/40 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] flex justify-between">
              <span>AUTH: DRON.ENGINE</span>
              <span>RENDER: WEBGL_2.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default BetaAlert;