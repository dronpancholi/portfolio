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
            // ULTRA-TRANSPARENT SETTINGS (95% Visible)
            background: 'rgba(255, 255, 255, 0.005)', 
            // Subtle border and shadow to define edges without obscuring center
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.1)',
            // Minimal blur to keep background readable but "glassy"
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
        }}
      >
        {/* 
          Proxy Layer: Receives the SVG displacement filter.
          Strictly isolated to prevent z-fighting.
        */}
        <div className="liquid-pill__proxy" aria-hidden style={{ overflow: 'visible' }}> 
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 0.98, // High visibility for proxy content
              // PREVIEW MATCH: Strict GPU promotion for the filter layer
              transform: "translate3d(0,0,0)", 
              willChange: "transform",
            }}
          >
            {/* 
              Container for the proxy rows.
              Matches the context width exactly.
            */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 sm:gap-[7px]" 
              style={{ width: "min(100vw, 1100px)" }}
            >
              {proxyRows}
            </div>
          </div>
        </div>

        {/* Surface shine - sharper to emphasize the clear surface */}
        <div 
          className="liquid-pill__shine" 
          aria-hidden 
          style={{ 
            opacity: 0.6, 
            mixBlendMode: 'overlay',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)'
          }} 
        />

        {/* Actual Interactive Content (Social Icons) */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}