import React, { ReactNode } from "react";

interface LiquidPillProps {
  proxyRows?: ReactNode[];
  children?: ReactNode;
}

const LiquidPill: React.FC<LiquidPillProps> = ({ proxyRows = [], children }) => {
  return (
    <div className="relative flex justify-center w-full z-10 p-4">
      <div 
        className="liquid-pill-container"
        style={{
          border: '1px solid var(--glass-border)',
          boxShadow: '0 12px 40px -12px rgba(0,0,0,0.15)',
          background: 'rgba(255, 255, 255, 0.01)', 
        }}
      >
        {/* --- LAYER 1: REFRACTION ENGINE --- 
            This layer holds the "tickers" or content that gets distorted.
            It is rendered conceptually "behind" the glass surface but inside the clipping mask.
        */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0"
          style={{ 
             filter: "url(#liquidRefraction)",
             WebkitFilter: "url(#liquidRefraction)",
             opacity: 0.85,
             transform: "translateZ(0)", // Force GPU
          }}
        >
          {/* 
            Absolute centering for the proxy content.
            Using fixed dimension strategies to avoid layout thrashing.
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60">
            {proxyRows}
          </div>
        </div>

        {/* --- LAYER 2: FROSTED GLASS SURFACE --- 
            Standard browser-safe backdrop blur.
        */}
        <div 
          className="absolute inset-0 rounded-full z-10 pointer-events-none"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            mixBlendMode: "overlay" // Blend nicely with the distorted content below
          }}
        />

        {/* --- LAYER 3: CAUSTICS & NOISE --- 
            Subtle texture overlay to simulate physical glass imperfections.
        */}
        <div 
          className="absolute inset-0 rounded-full z-20 pointer-events-none opacity-30"
          style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
             mixBlendMode: "soft-light"
          }}
        />

        {/* --- LAYER 4: SPECULAR HIGHLIGHTS --- 
            Simulates light reflection on the curved surface.
        */}
        <div 
          className="absolute inset-0 rounded-full z-30 pointer-events-none"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 100%)",
            mixBlendMode: "overlay"
          }}
        />

        {/* --- LAYER 5: CONTENT --- 
            Interactive elements sitting clearly on top.
        */}
        <div className="relative z-40 px-8 py-4 flex items-center gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LiquidPill;