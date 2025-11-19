import React from "react";

interface LiquidPillProps {
  proxyRows?: React.ReactNode[];
  children?: React.ReactNode;
}

const LiquidPill: React.FC<LiquidPillProps> = ({ proxyRows = [], children }) => {
  return (
    <div className="relative flex justify-center w-full z-10 p-4">
      <div 
        className="liquid-pill-container"
        style={{
          border: '1px solid var(--glass-border)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          background: 'rgba(255, 255, 255, 0.02)', // Ultra-transparent base
        }}
      >
        {/* --- LAYER 1: REFRACTION PROXY --- 
            This layer contains the content that gets distorted by the SVG filter.
            It sits conceptually "inside" the glass.
        */}
        <div 
          className="absolute inset-0 rounded-full overflow-visible pointer-events-none z-0"
          style={{ 
             opacity: 1,
             filter: "url(#liquidRefraction)",
             WebkitFilter: "url(#liquidRefraction)",
             transform: "translateZ(0)", // GPU force
          }}
        >
          {/* Use a fixed-size container centered in the pill to hold the ticker text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-[1000px] flex flex-col items-center gap-1 opacity-85">
            {proxyRows}
          </div>
        </div>

        {/* --- LAYER 2: BACKDROP BLUR --- 
            Provides the frosted glass effect on top of the distortion.
        */}
        <div 
          className="absolute inset-0 rounded-full z-10 pointer-events-none"
          style={{
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            background: "rgba(255, 255, 255, 0.1)",
            mixBlendMode: "overlay"
          }}
        />

        {/* --- LAYER 3: SHINE & HIGHLIGHTS --- 
            Simulates light hitting the curved surface.
        */}
        <div 
          className="absolute inset-0 rounded-full z-20 pointer-events-none"
          style={{
            background: "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 100%)",
            opacity: "var(--liquid-shine, 0.8)",
            mixBlendMode: "soft-light"
          }}
        />

        {/* --- LAYER 4: CONTENT --- 
            Interactive elements sitting on top of the glass.
        */}
        <div className="relative z-30 px-6 py-3 flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LiquidPill;