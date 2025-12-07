import React, { useMemo } from "react";

type Props = {
  proxyRows: React.ReactNode[]; // content you want refracted inside the pill
  children: React.ReactNode;    // visible icons/text
  filterId?: string;            // 'liquidRefraction' by default
};

export default function LiquidPill({ proxyRows, children, filterId = "liquidRefraction" }: Props) {
  // Memoize proxy DOM (prevents reflows on parent updates)
  const proxy = useMemo(() => (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) translateZ(0)", width: "min(100%, 1100px)", pointerEvents: "none" }}>
      {proxyRows.map((row, i) => <div key={i} style={{ margin: "6px 0", opacity: 0.95 }}>{row}</div>)}
    </div>
  ), [proxyRows]);

  return (
    <div className="liquid-pill" role="group" aria-label="liquid pill">
      <div className="liquid-pill__proxy" aria-hidden="true" style={{ filter: `url(#${filterId})`, WebkitFilter: `url(#${filterId})` }}>
        <div className="liquid-pill__proxyInner">
          {proxy}
        </div>
      </div>

      <div className="liquid-pill__shine" aria-hidden="true" />

      <div className="liquid-pill__content">
        {children}
      </div>
    </div>
  );
}