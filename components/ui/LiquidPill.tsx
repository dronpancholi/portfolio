
import React from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  return (
    <div className="relative flex justify-center w-full z-10">
      <div 
        className="liquid-pill mx-auto" 
        role="group" 
        aria-label="Social links"
        style={{
            // High-Performance CSS Glass
            background: 'rgba(255, 255, 255, 0.01)', 
            // Inset shadows create the "thick glass" look without expensive refraction filters
            boxShadow: '0 20px 50px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            borderRadius: '9999px',
            padding: '12px 24px'
        }}
      >
        {/* 
          Proxy Layer: 
          Previously held the SVG filter. Now acts as a subtle depth layer using standard CSS.
        */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-50"> 
          <div
            className="w-full h-full flex items-center justify-center opacity-60"
            style={{
              transform: "translate3d(0,0,0)", 
              willChange: "transform",
            }}
          >
             <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 sm:gap-[7px]" 
              style={{ width: "min(100vw, 1100px)" }}
            >
              {proxyRows}
            </div>
          </div>
        </div>

        {/* Surface shine - Sharp overlay for crystal look */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none" 
          aria-hidden 
          style={{ 
            opacity: 0.5, 
            mixBlendMode: 'overlay',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%)'
          }} 
        />

        {/* Content */}
        <div className="relative z-10 flex gap-5 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
