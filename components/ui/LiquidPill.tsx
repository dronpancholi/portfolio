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
            // PREVIEW MATCH: Tuned transparency and borders for the "Crystal" look
            background: 'rgba(255, 255, 255, 0.01)', 
            boxShadow: '0 15px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
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
            opacity: 0.85, 
            mixBlendMode: 'soft-light',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 100%)'
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