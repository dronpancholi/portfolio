import React, { useMemo } from "react";

// Version v3.7 - Apple-Grade Liquid Architecture
type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  // Memoize proxy DOM to prevent reflows during parent renders
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
        <div key={i} style={{ margin: "6px 0", opacity: 0.8 }}>{r}</div>
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
          // Base glass override for the pill shape specifically
          background: 'rgba(255, 255, 255, 0.005)', // Nearly clear
          boxShadow: '0 15px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* PROXY LAYER: This contains the 'refracted' text */}
        <div 
          className="glass__proxy" 
          aria-hidden="true" 
          style={{ 
            // Apply the lightweight liquid filter here
            filter: "url(#liquidRefraction)",
            WebkitFilter: "url(#liquidRefraction)",
            opacity: 1
          }}
        >
          {proxy}
        </div>

        {/* SHINE LAYER: Specular highlights & Caustics */}
        <div className="glass__shine" aria-hidden="true" />

        {/* CONTENT LAYER: The buttons sitting on top */}
        <div className="glass__content flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}