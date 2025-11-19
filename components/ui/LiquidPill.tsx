import React from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  return (
    <div className="relative flex justify-center w-full">
      <div className="liquid-pill mx-auto" role="group" aria-label="Social links">
        {/* proxy receives the svg filter (displacement) */}
        <div className="liquid-pill__proxy" aria-hidden>
          <div
            className="liquid-pill__proxyInner"
            style={{
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 1, 
              transform: "translateZ(0)"
            }}
          >
            {/* UPDATED: Flex container with scaling to prevent text overlap and fit rows within the pill. */}
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5" style={{ width: "min(100%,1100px)", transform: 'scale(0.8)' }}>
              {proxyRows}
            </div>
          </div>
        </div>

        <div className="liquid-pill__readability-enhancer" aria-hidden />

        <div className="liquid-pill__shine" aria-hidden />

        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}