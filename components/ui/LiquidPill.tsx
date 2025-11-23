import React from "react";

type Props = {
  proxyRows: React.ReactNode[];
  children: React.ReactNode;
};

export default function LiquidPill({ proxyRows, children }: Props) {
  return (
    <div className="relative flex justify-center w-full z-10">
      <div 
        className="liquid-pill mx-auto" 
        role="group" 
        aria-label="Social links"
        style={{
            // OPTIMIZATION: Use standard transparency + blur for the main container
            // This is GPU accelerated and much faster than SVG filters
            background: 'rgba(255, 255, 255, 0.03)', 
            boxShadow: '0 15px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            overflow: 'hidden' // Clip content for clean edges
        }}
      >
        {/* 
          OPTIMIZATION: The "Proxy" (Ticker) is now BEHIND the glass effect or just standard rendering.
          We removed the SVG Filter from the scrolling text because filtering moving text kills FPS.
          Instead, we display the ticker cleanly.
        */}
        <div className="absolute inset-0 z-0 opacity-50 select-none pointer-events-none mix-blend-overlay"> 
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-1 sm:gap-[7px]"
            style={{ 
              transform: "translate3d(0,0,0)", 
              willChange: "transform",
            }}
          >
             {/* 
               We render the ticker directly here. 
               The 'blur' on the parent provides the 'glass' look over the background,
               and this content sits 'inside' the glass.
             */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,1100px)]">
                {proxyRows}
             </div>
          </div>
        </div>

        {/* 
           Liquid Distortion Layer - Static Texture
           Instead of filtering the text, we overlay a subtle distorted texture 
           to give the "Liquid" feel without calculating text displacement per frame.
        */}
        <div 
           className="absolute inset-0 z-1 pointer-events-none opacity-30"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%)',
             filter: 'url(#liquidRefraction)', // Apply filter to static gradient, cheap!
             transform: 'translate3d(0,0,0)'
           }}
        />

        {/* Surface shine/caustics */}
        <div 
          className="liquid-pill__shine" 
          aria-hidden 
          style={{ 
            opacity: 0.85, 
            mixBlendMode: 'soft-light',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 100%)'
          }} 
        />

        {/* Actual Interactive Content (Social Icons) */}
        <div className="liquid-pill__content relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}