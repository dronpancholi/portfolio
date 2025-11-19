import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           Updated Liquid Lens Filter: "Magnified Center, Spreading Edges"
           - Low frequency turbulence creates a large, smooth "lens" curve.
           - High displacement scale pushes pixels outward (spread) and zooms the center (magnify).
           - Gaussian blur smooths the map to prevent jagged noise, ensuring a clean glass look.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* 1. Generate a smooth, large-scale noise map (The Lens Shape) */}
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.004" numOctaves="2" seed="8" result="lensNoise" />
          
          {/* 2. Smooth the noise to create clean gradients instead of jittery liquid */}
          <feGaussianBlur in="lensNoise" stdDeviation="2" result="smoothLens" />

          {/* 3. Increase contrast of the map to steepen the curve (Stronger refraction) */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -9" 
            result="steepMap" 
          />

          {/* 4. The Displacement: High scale for magnification and edge spreading */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="50" xChannelSelector="R" yChannelSelector="A" result="displaced" />
          
          {/* 5. Slight final blur to soften the stretched pixels at the edges */}
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="final" />
          
          <feComposite in="final" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;