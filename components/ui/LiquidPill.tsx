import React from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children?: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  return (
    <div className="relative flex justify-center w-full z-10 perspective-1000">
      {/* 
         Main Container 
         - "liquid-pill" class handles the glass surface, border, and shadow.
         - Uses transform: translateZ(0) for GPU promotion.
      */}
      <div 
        className="liquid-pill mx-auto" 
        role="group" 
        aria-label="Social links"
      >
        {/* 
          PROXY LAYER (The "Behind the Glass" content)
          - Positioned absolutely to fill the pill.
          - Contains the scrolling text rows.
          - Receives the SVG Refraction Filter.
        */}
        <div className="liquid-pill__proxy" aria-hidden="true"> 
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              // Webkit specific fix:
              WebkitFilter: "url(#liquidRefraction)",
              // Force hardware acceleration
              transform: "translate3d(0,0,0)", 
            }}
          >
            {/* 
              Center the rows relative to the viewport/container 
              to ensure the distortion continuity.
            */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[8px]" 
              style={{ width: "min(100vw, 1100px)" }}
            >
              {proxyRows}
            </div>
          </div>
        </div>

        {/* 
           INTERACTION LAYER (Overlay)
           - Mouse-following spotlight effect
           - Noise texture for realism
        */}
        <div className="liquid-pill__overlay" />

        {/* 
           CONTENT LAYER (The Icons)
           - Must sit on top of everything.
        */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}