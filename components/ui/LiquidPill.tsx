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
            // Override default glass bg to be fully transparent/crystalline as requested
            background: 'rgba(255, 255, 255, 0.02)', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.15)'
        }}
      >
        {/* 
          Proxy Layer: Receives the SVG displacement filter.
          This mimics the content BEHIND the glass.
        */}
        <div className="liquid-pill__proxy" aria-hidden>
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, 
              transform: "translateZ(0)",
              // REMOVED: maskImage (Was causing the "blur" on edges user disliked)
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

        {/* Minimal readability vignette, kept very subtle to maintain transparency */}
        <div 
            className="absolute inset-0 z-1 pointer-events-none rounded-[inherit]" 
            style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.05) 100%)' }}
        />

        {/* Surface shine/caustics - brightened for "Liquid Glass" feel */}
        <div className="liquid-pill__shine" aria-hidden style={{ opacity: 0.7, mixBlendMode: 'overlay' }} />

        {/* Actual Interactive Content (Social Icons) */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}