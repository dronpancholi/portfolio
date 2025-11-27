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
            // CRYSTAL CLEAR SETTINGS
            // 1. No background color (let the refraction do the work)
            background: 'rgba(255, 255, 255, 0.001)', 
            // 2. No Blur - this ensures the text behind is 100% sharp
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            // 3. Crisp border definition
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* 
          Proxy Layer: The "Lens"
          This layer contains the text that gets distorted by the SVG filter.
        */}
        <div className="liquid-pill__proxy" aria-hidden style={{ overflow: 'visible' }}> 
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, // Full opacity for the refracted text
              transform: "translate3d(0,0,0)", 
              willChange: "transform",
            }}
          >
            {/* 
              Container for the proxy rows.
            */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 sm:gap-[7px]" 
              style={{ width: "min(100vw, 1100px)" }}
            >
              {proxyRows}
            </div>
          </div>
        </div>

        {/* High-Gloss Specular Highlight (The "Glass" surface feel) */}
        <div 
          className="liquid-pill__shine" 
          aria-hidden 
          style={{ 
            opacity: 0.8, 
            mixBlendMode: 'overlay',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 100%)',
            pointerEvents: 'none'
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