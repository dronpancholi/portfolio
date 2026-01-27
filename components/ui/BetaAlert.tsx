import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Activity, 
  Cpu,
  Zap,
  Layers,
  AlertTriangle,
  Box,
  Database,
  Server,
  Smartphone,
  Monitor
} from 'lucide-react';

// Version v3.6.15
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
];

const ENGINE_SEQUENCE = [
    "mounting_accelerated_compositor...",
    "detecting_device_pixel_ratio...",
    "allocating_frame_buffer...",
    "compiling_fragment_shaders...",
    "initializing_physics_world...",
    "precaching_glass_assets...",
    "optimizing_render_tree...",
    "verifying_webgl_context...",
    "starting_main_loop..."
];

interface TelemetryItem {
  label: string;
  val: string;
  icon: any;
}

const BetaAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [telemetry, setTelemetry] = useState({
    latency: '14ms',
    fps: '60',
    mem: '128MB',
    threads: '4'
  });

  // Strict Scroll Lock Effect
  useEffect(() => {
    if (isVisible) {
      // Lock both html and body to prevent mobile scroll propagation
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none'; // Disable touch scroll on body
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isVisible]);

  useEffect(() => {
    // Check session storage
    const hasSeenAlert = sessionStorage.getItem('portfolio_beta_alert_v3_6906');
    if (!hasSeenAlert) {
      const timer = setTimeout(() => setIsVisible(true), 200);

      // Simulate loading progress
      const interval = setInterval(() => {
        setIsReady(true);
        
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
    sessionStorage.setItem('portfolio_beta_alert_v3_6906', 'true');
  };

  const telemetryData: TelemetryItem[] = [
    { label: 'Latency', val: telemetry.latency, icon: Activity },
    { label: 'V-Sync', val: telemetry.fps, icon: Zap },
    { label: 'Memory', val: telemetry.mem, icon: Layers },
    { label: 'Threads', val: telemetry.threads, icon: Cpu },
  ];

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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 
             MAIN HUD PANEL 
             Realism Engine v3.6.15 - Maximum Liquid Glass
          */}
          <motion.div
            layout
            initial={{ scale: 0.95, opacity: 0, rotateX: 2 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.98, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="
              relative w-full max-w-xl rounded-[32px] flex flex-col shadow-2xl ring-1 ring-white/10
              max-h-[90vh] overflow-y-auto scrollbar-none overscroll-contain
            "
            style={{
                // Ultimate Liquid Glass Aesthetic
                // Clearer background to see through, heavier blur, sharper edges
                background: 'rgba(30, 35, 45, 0.3)', 
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.1),
                  0 50px 100px -20px rgba(0,0,0,0.8),
                  inset 0 1px 0 rgba(255,255,255,0.4), /* Sharp top edge */
                  inset 0 0 60px rgba(255,255,255,0.02)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                // Enable scroll on this element specifically
                touchAction: 'pan-y'
            }}
          >
            {/* NOISE TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay fixed" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* HEADER: Minimalist Apple Style */}
            <div className="relative p-8 pb-4 flex items-center justify-between z-10 sticky top-0 bg-transparent">
                {/* Header Glass Overlay for Scroll */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" style={{ backdropFilter: 'blur(10px)', maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }} />
                
                <div className="flex items-center gap-4 relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                        <Box size={22} className="text-white/90" />
                     </div>
                     <div>
                        <h1 className="text-xl font-medium text-white tracking-tight leading-none mb-1.5">
                            Graphic Environment Analysis
                        </h1>
                        <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest flex items-center gap-2">
                           Hardware Acceleration Check
                           <span className="w-0.5 h-2 bg-white/20" />
                           v3.6906.506
                        </p>
                     </div>
                </div>
            </div>

            {/* BODY: WARNING & PRIMARY ACTION */}
            <div className="relative p-8 pt-4 z-10">
                
                {/* AMBIENT HAZARD MODULE */}
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group min-h-[140px] flex flex-col justify-between">
                     
                     <div className="relative z-10 pr-8">
                        <h3 className="text-sm font-semibold text-white/90 mb-2">Performance Optimization Warning</h3>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">
                            This interface utilizes a high-fidelity Liquid Glass rendering pipeline. 
                            Visual performance may degrade on devices without dedicated hardware acceleration, 
                            such as legacy iOS devices, integrated Intel HD graphics, and non-Metal/Vulkan compliant renderers.
                        </p>
                     </div>

                     {/* Hazard Sign - Yellow, Ambient, Bottom Right */}
                     <div className="absolute bottom-[-15px] right-[-15px] opacity-20 rotate-[-12deg] pointer-events-none mix-blend-screen">
                         <AlertTriangle size={140} className="text-yellow-500 blur-sm" />
                     </div>
                     
                     {/* Active Indicator */}
                     <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-pulse" />
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleDismiss}
                        disabled={!isReady}
                        className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-50 transition-all bg-white text-black font-semibold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.3)]"
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

            {/* EXPANDABLE: SYSTEM REPORT */}
            <AnimatePresence>
                {isDetailsOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black/20 border-t border-white/5"
                    >
                        <div className="p-8 space-y-8">
                            
                            {/* TELEMETRY STRIP */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Real-Time Telemetry</h4>
                                <div className="grid grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                                    {telemetryData.map((item, i) => (
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

                            {/* DEVICE COMPATIBILITY MATRIX */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Device Support Matrix</h4>
                                <div className="flex gap-4">
                                     <div className="flex items-center gap-2 text-white/40">
                                        <Monitor size={12} /> <span className="text-[10px]">Desktop (Recommended)</span>
                                     </div>
                                     <div className="flex items-center gap-2 text-white/40">
                                        <Smartphone size={12} /> <span className="text-[10px]">Mobile (Standard)</span>
                                     </div>
                                </div>
                            </div>

                            {/* ENGINE SEQUENCE */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Engine Sequence</h4>
                                <div className="p-3 rounded-lg bg-black/30 border border-white/5 font-mono text-[9px] text-white/40 h-24 overflow-y-auto scrollbar-none shadow-inner">
                                     <div className="space-y-1 opacity-70">
                                        {ENGINE_SEQUENCE.map((log, i) => (
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
            <div className="p-3 bg-white/[0.02] border-t border-white/5 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-white/20 uppercase tracking-wider sticky bottom-0 z-20">
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