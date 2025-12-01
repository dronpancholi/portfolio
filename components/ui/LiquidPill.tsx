import React, { useMemo } from "react";

// Version v3.8 - Crystal Clear Architecture
type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  // Memoize proxy DOM to prevent reflows
  const proxy = useMemo(()=>(
    <div 
      style={{ 
        position: "absolute", 
        left: "50%", 
        top: "50%", 
        transform: "translate(-50%, -50%) translateZ(0)", 
        width: "min(100vw, 1100px)",
        pointerEvents: "none"
      }}
    >
      {proxyRows.map((r,i) => (
        <div key={i} style={{ margin: "6px 0", opacity: 0.85 }}>{r}</div>
      ))}
    </div>
  ), [proxyRows]);

  return (
    <div className="relative flex justify-center w-full z-10">
      <div 
        className="glass liquid-pill" 
        role="group" 
        aria-label="Social links"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          padding: "10px 22px",
          borderRadius: "9999px",
          // Ultra-transparent Crystal Glass (99.5% clear)
          background: 'rgba(255, 255, 255, 0.005)', 
          // Thick Glass Bevel Simulation
          boxShadow: `
            0 20px 40px -4px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.7),      /* Top Highlight */
            inset 0 0 0 1px rgba(255,255,255,0.1),    /* Subtle Outline */
            inset 0 -10px 20px rgba(255,255,255,0.05) /* Internal Volume */
          `,
          border: 'none' // We use box-shadow for the border to avoid harsh lines
        }}
      >
        {/* PROXY LAYER: Refracted Text */}
        <div 
          className="glass__proxy" 
          aria-hidden="true" 
          style={{ 
            filter: "url(#liquidRefraction)",
            WebkitFilter: "url(#liquidRefraction)",
            opacity: 1,
            // Remove blur from proxy itself so center remains crisp
            backdropFilter: "none",
            WebkitBackdropFilter: "none"
          }}
        >
          {proxy}
        </div>

        {/* SHINE LAYER: Specular highlights */}
        <div className="glass__shine" aria-hidden="true" style={{ opacity: 0.6 }} />

        {/* CONTENT LAYER: Icons */}
        <div className="glass__content flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}