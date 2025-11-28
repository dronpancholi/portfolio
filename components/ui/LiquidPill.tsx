import React, { useMemo } from "react";

// Version v4.0 - True Apple-Grade Liquid Architecture
type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  // Memoize proxy DOM to prevent reflows during parent renders
  // The width min(100%, 1100px) matches the container width in Contact.tsx to ensure alignment
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
          boxShadow: '0 20px 50px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* PROXY LAYER: This contains the 'refracted' text background
            It sits inside the clipped pill, providing the illusion of seeing through it. 
        */}
        <div 
          className="glass__proxy" 
          aria-hidden="true" 
          style={{ 
            // Apply the lightweight liquid filter here.
            // This distorts the proxy text inside the pill boundaries.
            filter: "url(#liquidRefraction)",
            WebkitFilter: "url(#liquidRefraction)",
            opacity: 1
          }}
        >
          {proxy}
        </div>

        {/* SHINE LAYER: Specular highlights & Caustics tracking the mouse */}
        <div className="glass__shine" aria-hidden="true" />

        {/* CONTENT LAYER: The buttons sitting on top, sharp and unaffected by refraction */}
        <div className="glass__content flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}