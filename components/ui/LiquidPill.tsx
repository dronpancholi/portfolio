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
            // ULTRA-CLEAR GLASS SETTINGS
            // Nearly invisible background to let the distortion do the work
            background: 'rgba(255, 255, 255, 0.001)', 
            // Stronger inner glow and outer shadow for 3D volume
            boxShadow: '0 20px 50px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 20px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            // High blur for the "frosted" edges look
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
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
              opacity: 1, 
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

        {/* Surface shine/caustics - Sharp overlay for crystal look */}
        <div 
          className="liquid-pill__shine" 
          aria-hidden 
          style={{ 
            opacity: 1, 
            mixBlendMode: 'overlay', // Stronger highlight blend
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 100%)'
          }} 
        />

        {/* Readability Vignette (Optional, kept subtle) */}
        <div className="liquid-pill__readability-enhancer" />

        {/* Actual Interactive Content (Social Icons) */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}