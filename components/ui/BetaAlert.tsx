import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Activity, 
  Cpu,
  Zap,
  Layers,
  Box,
  Server,
  Terminal
} from 'lucide-react';

const ENGINE_DATA = [
  { id: 'refraction', name: "Liquid Refraction v2.0", desc: "GPU-accelerated vector displacement." },
  { id: 'physics', name: "Verlet Spring Core", desc: "Non-linear interaction physics." },
  { id: 'blur', name: "Adaptive Gaussian Stack", desc: "Variable radius stack-blur." },
];

const BetaAlert: React.FC = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('dron_template_ready_v1');
    if (!hasSeen) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsReady(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_template_ready_v1', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
        >
          <motion.div
            layout
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="w-full max-w-lg bg-slate-900/80 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-white/20"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Terminal size={24} className="text-green-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">System Environment</h1>
                  <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Build 0x96C-Premium</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  This portfolio template uses an advanced <strong>Liquid Glass Rendering Pipeline</strong>. 
                  Optimization is active for hardware-accelerated environments.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-green-400/80 font-mono">
                    <Activity size={12} /> 60FPS_LOCKED
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-blue-400/80 font-mono">
                    <Server size={12} /> GPU_READY
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismiss}
                  disabled={!isReady}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm shadow-xl disabled:opacity-50 transition-all"
                >
                  {isReady ? 'Initialize Application' : 'Synchronizing Logic...'}
                </motion.button>
                
                <button 
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="w-full text-center text-[10px] text-white/30 uppercase tracking-widest py-2 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
                >
                  {isDetailsOpen ? 'Collapse Documentation' : 'View Documentation'}
                  <ChevronDown size={12} className={isDetailsOpen ? 'rotate-180' : ''} />
                </button>
              </div>

              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t border-white/5 space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-3">
                      {ENGINE_DATA.map(engine => (
                        <div key={engine.id} className="p-3 bg-white/[0.03] rounded-lg border border-white/5">
                          <h4 className="text-[10px] font-bold text-white/90 uppercase mb-1">{engine.name}</h4>
                          <p className="text-[10px] text-white/40">{engine.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="px-8 py-3 bg-black/40 text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] flex justify-between">
              <span>TEMPLATE_AUTH: DP_v3.6</span>
              <span>EST_LATENCY: 4ms</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default BetaAlert;