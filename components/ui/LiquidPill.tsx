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
              /* UPDATED: Apply the most powerful filter for a premium effect */
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              /* UPDATED: Set to 1 as parent handles glass opacity */
              opacity: 1, 
              transform: "translateZ(0)"
            }}
          >
            <div style={{ width: "min(100%,1100px)", textAlign: "center" }}>
              {proxyRows.map((r,i) => <div key={i} style={{ margin: "6px 0" }}>{r}</div>)}
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