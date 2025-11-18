import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function LiquidPill({ children }: Props) {
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
            {/* This div is now intentionally empty. The SVG filter uses `BackgroundImage` to distort what's behind it. */}
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