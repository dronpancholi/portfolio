import React from "react";

// Version v3.0
// Engine: Realism Engine
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
            // REALISM ENGINE v3.0 SETTINGS
            // 99.5% Transparent
            background: 'rgba(255, 255, 255, 0.005)', 
            // Absolute clarity
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            // Physical Bezel Simulation (4mm Glass)
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
              0 20px 50px rgba(0,0,0,0.1), 
              inset 0 0 0 1px rgba(255,255,255,0.2), 
              inset 0 1px 0 0 rgba(255,255,255,0.6), 
              inset 0 -2px 5px 0 rgba(0,0,0,0.1)
            `,
        }}
      >
        <div className="liquid-pill__proxy" aria-hidden style={{ overflow: 'visible' }}> 
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, 
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

        <div 
          className="liquid-pill__shine" 
          aria-hidden 
          style={{ 
            opacity: 0.8, 
            mixBlendMode: 'overlay',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 100%)',
            pointerEvents: 'none'
          }} 
        />

        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}