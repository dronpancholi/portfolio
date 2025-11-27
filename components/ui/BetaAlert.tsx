
import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  Microchip,
  Gauge
} from 'lucide-react';

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Simulated System Check State
  const [systemCheck, setSystemCheck] = useState({
    gpu: { status: 'WAIT', val: '---' },
    physics: { status: 'WAIT', val: '---' },
    optics: { status: 'WAIT', val: '---' },
    integrity: { status: 'WAIT', val: '---' }
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6_7');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      
      // Sequence: GPU
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, gpu: { status: 'OK', val: 'WebGL 2.0' } }));
        addLog("GPU Rasterizer mounted.");
      }, 1000);

      // Sequence: Physics
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, physics: { status: 'OK', val: '60Hz Tick' } }));
        addLog("Verlet Solver initialized.");
      }, 1800);

      // Sequence: Optics
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, optics: { status: 'OK', val: 'High-Res' } }));
        addLog("Refraction LUT generated.");
      }, 2600);

      // Sequence: Integrity
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, integrity: { status: 'OK', val: 'Verified' } }));
        addLog("DOM hydration complete.");
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dron_beta_alert_v3_6_7', 'true');
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const allSystemsGo = 
    systemCheck.gpu.status === 'OK' && 
    systemCheck.physics.status === 'OK' && 
    systemCheck.optics.status === 'OK' && 
    systemCheck.integrity.status === 'OK';

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
          {/* Backdrop - Locked (No interaction) */}
          <motion.div 
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl transition-all duration-1000"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0 }}
          />

          {/* 
             MAIN GLASS PANEL 
             Realism Engine v3.6007 - Clean Apple-style Glass
          */}
          <motion.div
            layout
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="relative w-full max-w-xl rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            style={{
                background: 'rgba(30, 30, 30, 0.65)', 
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `
                  0 0 0 1px rgba(0,0,0,1),
                  0 40px 80px -20px rgba(0,0,0,0.8),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
                backdropFilter: 'blur(50px) saturate(180%)',
                WebkitBackdropFilter: 'blur(50px) saturate(180%)',
            }}
          >
            {/* Header Section */}
            <div className="relative p-6 border-b border-white/10 flex items-start justify-between flex-shrink-0 bg-white/[0.03]">
                <div className="flex items-center gap-5">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-inner">
                         <Activity className="w-6 h-6 text-white" />
                         <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-black/60 rounded-full border border-white/20 flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${allSystemsGo ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-amber-500 animate-pulse'}`} />
                         </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">
                            Public Beta Preview
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] font-medium text-white/60 uppercase tracking-wide">
                                Release Candidate 3.6.7
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto scrollbar-none">
                
                {/* Warning Card */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                    <div>
                        <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">
                            Performance Advisory
                        </h3>
                        <p className="text-xs text-white/70 leading-relaxed font-normal">
                            This application runs an experimental <strong className="text-white">Liquid Glass Engine</strong> utilizing heavy GPU compositing. You may experience thermal throttling or frame drops on older devices.
                        </p>
                    </div>
                </div>

                {/* Live Diagnostics Grid (Apple Style) */}
                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
                     {/* GPU */}
                    <div className="bg-black/40 p-3 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-medium tracking-wider">
                            <Microchip size={10} /> GPU Rasterizer
                        </div>
                        <div className="flex justify-between items-end">
                            <span className={`text-sm font-mono font-bold ${systemCheck.gpu.status === 'OK' ? 'text-white' : 'text-amber-500'}`}>
                                {systemCheck.gpu.val}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${systemCheck.gpu.status === 'OK' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {systemCheck.gpu.status}
                            </span>
                        </div>
                    </div>

                    {/* Physics */}
                    <div className="bg-black/40 p-3 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-medium tracking-wider">
                            <Zap size={10} /> Physics Core
                        </div>
                        <div className="flex justify-between items-end">
                            <span className={`text-sm font-mono font-bold ${systemCheck.physics.status === 'OK' ? 'text-white' : 'text-amber-500'}`}>
                                {systemCheck.physics.val}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${systemCheck.physics.status === 'OK' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {systemCheck.physics.status}
                            </span>
                        </div>
                    </div>

                    {/* Optics */}
                    <div className="bg-black/40 p-3 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-medium tracking-wider">
                            <Layers size={10} /> Refraction
                        </div>
                        <div className="flex justify-between items-end">
                            <span className={`text-sm font-mono font-bold ${systemCheck.optics.status === 'OK' ? 'text-white' : 'text-amber-500'}`}>
                                {systemCheck.optics.val}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${systemCheck.optics.status === 'OK' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {systemCheck.optics.status}
                            </span>
                        </div>
                    </div>

                    {/* Integrity */}
                    <div className="bg-black/40 p-3 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-medium tracking-wider">
                            <ShieldCheck size={10} /> Integrity
                        </div>
                        <div className="flex justify-between items-end">
                            <span className={`text-sm font-mono font-bold ${systemCheck.integrity.status === 'OK' ? 'text-white' : 'text-amber-500'}`}>
                                {systemCheck.integrity.val}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${systemCheck.integrity.status === 'OK' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {systemCheck.integrity.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Technical Report / Expandable */}
                <motion.div 
                    layout
                    className="overflow-hidden rounded-xl bg-white/[0.03] border border-white/10"
                >
                    <button 
                        onClick={toggleDetails}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                    >
                        <span className="text-xs font-semibold text-white flex items-center gap-2">
                            <Database size={14} className="text-[var(--accent)]" />
                            Engine Manifest & Telemetry
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/40">READ ONLY</span>
                            <motion.div animate={{ rotate: isDetailsOpen ? 180 : 0 }}>
                                <ChevronDown size={14} className="text-white/60" />
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
                                <div className="p-0">
                                    {/* Data Table */}
                                    <div className="text-[10px] w-full">
                                        <div className="grid grid-cols-[1fr_80px_1fr] gap-4 px-4 py-2 border-b border-white/5 text-white/30 font-medium uppercase tracking-wider">
                                            <span>Module</span>
                                            <span>Reading</span>
                                            <span className="text-right">Operation</span>
                                        </div>
                                        
                                        {[
                                            { name: "Spectral Refraction", val: "Bi-Linear", desc: "Gamma-corrected light bending" },
                                            { name: "Verlet Physics", val: "Active", desc: "Spring-mass damping integration" },
                                            { name: "Dual-Pass Blur", val: "Gaussian", desc: "12px radius smoothing" },
                                            { name: "SVG Turbulence", val: "Fractal", desc: "Perlin noise generation" },
                                            { name: "Ray-Cast Caustics", val: "Simulated", desc: "Real-time surface projection" },
                                            { name: "JIT Compilation", val: "Tailwind", desc: "Atomic CSS injection" },
                                        ].map((item, i) => (
                                            <div key={i} className="grid grid-cols-[1fr_80px_1fr] gap-4 px-4 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                <div className="font-mono text-white/90 truncate">{item.name}</div>
                                                <div className="font-mono text-[var(--accent)]">{item.val}</div>
                                                <div className="text-white/50 text-right truncate">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Simulated Terminal */}
                                    <div className="bg-black/50 p-3 font-mono text-[9px] text-white/60 h-24 overflow-hidden flex flex-col justify-end border-t border-white/10">
                                        {logs.map((log, i) => (
                                            <motion.div key={i} initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}}>
                                                {log}
                                            </motion.div>
                                        ))}
                                        <div className="animate-pulse">_</div>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDismiss}
                    disabled={!allSystemsGo}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg relative overflow-hidden group disabled:opacity-50 disabled:grayscale transition-all border border-white/10"
                    style={{ background: 'var(--accent)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2 text-sm">
                        {allSystemsGo ? "Initialize Environment" : "Calibrating..."} 
                        {allSystemsGo && <ChevronRight size={16} />}
                    </span>
                </motion.button>
                <div className="text-center mt-4">
                    <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">
                        Engine v3.6007.001
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
