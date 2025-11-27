import React from "react";

// Version v2.5091.221
// Engine: Crystal Clear Liquid
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
            // CRYSTAL CLEAR GLASS SETTINGS v2.5091.221
            // 1. Absolute minimal background color. Just enough for events, effectively invisible.
            background: 'rgba(255, 255, 255, 0.002)', 
            // 2. NO BLUR. This allows the text behind to be 95-100% visible and sharp.
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            // 3. Strong Specular Definition. We use borders and inset shadows to define the "Glass" 
            //    without needing to fill it with white haze.
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: `
              0 15px 40px rgba(0,0,0,0.05), 
              inset 0 1px 0 0 rgba(255,255,255,0.4), 
              inset 0 -1px 0 0 rgba(0,0,0,0.1)
            `,
        }}
      >
        {/* 
          Proxy Layer: The "Lens"
          This layer creates the distortion.
        */}
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
            opacity: 0.9, 
            mixBlendMode: 'overlay',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 100%)',
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