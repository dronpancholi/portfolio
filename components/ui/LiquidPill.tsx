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
            // Ultra-transparent background to rely entirely on refraction and border
            background: 'rgba(255, 255, 255, 0.01)', 
            // Stronger glass border and shadow for definition without opacity
            boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)', // Reduced blur for clarity
            WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* 
          Proxy Layer: Receives the SVG displacement filter.
          This mimics the content BEHIND the glass.
        */}
        <div className="liquid-pill__proxy" aria-hidden style={{ overflow: 'visible' }}> 
          {/* Overflow visible ensures the distortion doesn't get clipped at the bounding box in Safari */}
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, 
              // Force GPU to prevent browser from optimizing away the expensive filter
              transform: "translate3d(0,0,0)", 
              willChange: "transform",
            }}
          >
            {/* 
              Container for the proxy rows.
              Absolute centered with fixed width matching the outer context.
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
            opacity: 0.8, 
            mixBlendMode: 'soft-light',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 100%)'
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