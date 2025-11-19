import React from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  return (
    <div className="relative flex justify-center w-full z-10">
      <div className="liquid-pill mx-auto" role="group" aria-label="Social links">
        {/* 
          Proxy Layer: Receives the SVG displacement filter.
          This layer mimics the content BEHIND the glass but applies distortion to it.
        */}
        <div className="liquid-pill__proxy" aria-hidden>
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, 
              transform: "translateZ(0)",
              // Creates the "Fade" effect at the edges requested by the user
              maskImage: "linear-gradient(to right, transparent 2%, black 25%, black 75%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 2%, black 25%, black 75%, transparent 98%)"
            }}
          >
            {/* 
              Container for the proxy rows.
              We use absolute centering with a large fixed width that matches the outer container's 
              max-width context (1100px approx) to ensure the text flows align optically.
            */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 sm:gap-[7px]" 
              style={{ width: "min(100vw, 1100px)" }}
            >
              {proxyRows}
            </div>
          </div>
        </div>

        {/* Vignette to improve contrast of social icons against distorted text */}
        <div className="liquid-pill__readability-enhancer" aria-hidden />

        {/* Surface shine/caustics */}
        <div className="liquid-pill__shine" aria-hidden />

        {/* Actual Interactive Content (Social Icons) */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}