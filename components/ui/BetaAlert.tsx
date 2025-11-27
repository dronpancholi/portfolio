
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Activity, 
  Cpu,
  Zap,
  Layers,
  Terminal,
  Grid,
  Maximize2,
  AlertTriangle,
  Info,
  Lock,
  Wifi,
  Database,
  Server,
  Command
} from 'lucide-react';

// Version v3.6906.506
// Engine: Crystal HUD Interface with Interactive Diagnostics

const ENGINE_DATA = [
  { id: 'refraction', name: "Spectral Refraction Engine", desc: "Calculates real-time light bending paths through variable density media using dual-pass rendering." },
  { id: 'physics', name: "Verlet Physics Integration", desc: "Simulates cloth-like physics and soft-body dynamics for fluid UI element interactions." },
  { id: 'aa', name: "Sub-Pixel Antialiasing", desc: "Enhances edge clarity on high-DPI displays by sampling sub-pixel geometry during rasterization." },
  { id: 'chromatic', name: "Chromatic Aberration Solver", desc: "Simulates lens dispersion effects by offsetting RGB channels based on radial distance." },
  { id: 'gamma', name: "Gamma Luminance Corrector", desc: "Linearizes color space before blending to ensure physically accurate lighting falloff." },
  { id: 'blur', name: "Dual-Pass Gaussian Blur", desc: "Optimized separate X/Y convolution passes to achieve high-radius blurs with minimal GPU cost." },
  { id: 'turbulence', name: "SVG Turbulence Generator", desc: "Generates pseudo-random Perlin noise for organic surface displacement mapping." },
  { id: 'caustics', name: "Ray-Cast Caustics Mapper", desc: "Approximates light concentration patterns on the 'floor' of the UI based on surface normals." },
  { id: 'composite', name: "GPU Composite Layering", desc: "Forces browser to promote elements to separate compositor layers to prevent layout thrashing." },
  { id: 'hydration', name: "Hydration Drift Compensator", desc: "Synchronizes server-rendered markup with client-side state to prevent layout shifts." },
  { id: 'fluid', name: "Fluid Dynamics Simulator", desc: "Solves Navier-Stokes equations in simplified 2D space for cursor-trail effects." },
  { id: 'vdom', name: "Virtual DOM Reconciler", desc: "Optimizes React rendering cycles by batching updates during animation frames." }
];

const BOOT_LOGS = [
    "initializing_kernel...",
    "allocating_virtual_memory_pages...",
    "mounting_react_fiber_root...",
    "hydrating_suspense_boundaries...",
    "injecting_css_variables...",
    "compiling_glsl_shaders...",
    "optimizing_svg_paths...",
    "connecting_telemetry_stream...",
    "resolving_dns_prefetch...",
    "rendering_frame_buffer..."
];

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<typeof ENGINE_DATA[0] | null>(null);
  
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
    const hasSeenAlert = sessionStorage.getItem('dron_beta_alert_v3_6906');
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
    sessionStorage.setItem('dron_beta_alert_v3_6906', 'true');
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
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 
             MAIN HUD PANEL 
             Realism Engine v3.6906.506 - Crystal HUD
             High transparency, heavy blur, etched details.
          */}
          <motion.div
            layout
            initial={{ scale: 0.95, opacity: 0, rotateX: 2 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.98, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-xl rounded-[32px] overflow-hidden flex flex-col shadow-2xl ring-1 ring-white/10"
            style={{
                // Apple-Style Deep Crystal Glass
                background: 'rgba(20, 20, 25, 0.4)', 
                boxShadow: `
                  0 0 0 0.5px rgba(255,255,255,0.1),
                  0 50px 100px -20px rgba(0,0,0,0.6),
                  inset 0 0 60px rgba(255,255,255,0.02)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            }}
          >
            {/* NOISE TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* SCAN LINE ANIMATION (Subtle) */}
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 animate-[scanline_4s_linear_infinite] pointer-events-none z-0" />

            {/* HEADER: Minimalist Apple Style */}
            <div className="relative p-8 pb-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                        <Command size={22} className="text-white/90" />
                     </div>
                     <div>
                        <h1 className="text-xl font-medium text-white tracking-tight leading-none mb-1.5">
                            System Compatibility
                        </h1>
                        <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest flex items-center gap-2">
                           Version 3.6906.506
                           <span className="w-0.5 h-2 bg-white/20" />
                           RC-3
                        </p>
                     </div>
                </div>
            </div>

            {/* BODY: WARNING & PRIMARY ACTION */}
            <div className="relative p-8 pt-4 z-10">
                
                {/* AMBIENT HAZARD MODULE */}
                <div className="relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden group">
                     {/* Ambient Glow */}
                     <div className="absolute -right-10 -bottom-10 text-amber-500/20 blur-[50px] transition-transform duration-1000 group-hover:scale-110">
                         <div className="w-32 h-32 bg-amber-500 rounded-full" />
                     </div>

                     <div className="relative z-10 flex gap-4">
                        <AlertTriangle className="text-amber-400 shrink-0" size={24} />
                        <div>
                            <h3 className="text-sm font-semibold text-white/90 mb-1">Performance Advisory</h3>
                            <p className="text-xs text-white/50 leading-relaxed font-medium">
                                High-fidelity Liquid Glass rendering enabled. This may impact thermal performance on non-accelerated GPUs. Proceed with caution.
                            </p>
                        </div>
                     </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleDismiss}
                        disabled={!isReady}
                        className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-50 transition-all bg-white text-black font-semibold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)]"
                    >
                        {isReady ? 'Initialize Interface' : 'Mounting System...'}
                    </motion.button>

                    <button 
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        className="text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors py-2 flex items-center justify-center gap-1.5"
                    >
                        {isDetailsOpen ? 'Hide System Report' : 'View System Report'}
                        <ChevronDown size={12} className={`transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* EXPANDABLE: SYSTEM REPORT (Apple Style "About This Mac" Details) */}
            <AnimatePresence>
                {isDetailsOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20 border-t border-white/5"
                    >
                        <div className="p-8 space-y-8">
                            
                            {/* TELEMETRY STRIP */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Real-Time Telemetry</h4>
                                <div className="grid grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                                    {[
                                        { label: 'Latency', val: telemetry.latency, icon: Activity },
                                        { label: 'V-Sync', val: telemetry.fps, icon: Zap },
                                        { label: 'Memory', val: telemetry.mem, icon: Layers },
                                        { label: 'Threads', val: telemetry.threads, icon: Cpu },
                                    ].map((item: { label: string; val: string; icon: any }, i: number) => (
                                        <div key={i} className="bg-white/[0.02] p-3 text-center hover:bg-white/[0.05] transition-colors">
                                            <div className="text-xs font-bold text-white mb-1">{item.val}</div>
                                            <div className="text-[9px] font-medium text-white/40 uppercase">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ENGINE MANIFEST */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Engine Manifest</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {ENGINE_DATA.map((engine) => (
                                        <div 
                                            key={engine.id} 
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-white/30" />
                                            <span className="text-[10px] font-medium text-white/60 truncate">
                                                {engine.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BOOT LOGS */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Kernel Log</h4>
                                <div className="p-3 rounded-lg bg-black/30 border border-white/5 font-mono text-[9px] text-white/40 h-24 overflow-y-auto scrollbar-none shadow-inner">
                                     <div className="space-y-1 opacity-70">
                                        {BOOT_LOGS.map((log, i) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-white/20">[{Date.now().toString().slice(-4)}]</span>
                                                <span>{log}</span>
                                            </div>
                                        ))}
                                     </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BOTTOM BAR: SESSION ID */}
            <div className="p-3 bg-white/[0.02] border-t border-white/5 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-white/20 uppercase tracking-wider">
                 <span className="flex items-center gap-1"><Database size={8} /> SID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                 <span className="flex items-center gap-1"><Server size={8} /> US-EAST-1A</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaAlert;
