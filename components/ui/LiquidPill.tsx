import React, { useEffect, useRef } from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  const proxyRef = useRef<HTMLDivElement|null>(null);
  
  return (
    <div className="relative flex justify-center w-full">
      <div className="liquid-pill mx-auto" role="group" aria-label="Social links">
        {/* proxy receives the svg filter (displacement) on high quality */}
        <div className="liquid-pill__proxy" aria-hidden>
          <div
            className="liquid-pill__proxyInner"
            style={{
              /* apply filter only if supported and quality high; JS will toggle */
              filter: "url(#liquidRefraction)",
              WebkitFilter: "url(#liquidRefraction)",
              opacity: 0.95,
              transform: "translateZ(0)"
            }}
            ref={proxyRef}
          >
            <div style={{ width: "min(100%,1100px)", textAlign: "center" }}>
              {proxyRows.map((r,i) => <div key={i} style={{ margin: "6px 0" }}>{r}</div>)}
            </div>
          </div>
        </div>

        <div className="liquid-pill__shine" aria-hidden />

        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}