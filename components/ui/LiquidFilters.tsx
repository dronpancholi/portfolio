import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           Updated Liquid Lens Filter: "Crystal Clear"
           - Removed final blur to ensure 100% sharpness.
           - Tuned turbulence for a large central "lens" curve that magnifies.
           - High displacement scale for distinct edge refraction.
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Large smooth waves for a solid glass block feel */}
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.002" numOctaves="3" seed="7" result="lensNoise" />
          
          {/* 2. Smooth the noise significantly to create a lens curvature */}
          <feGaussianBlur in="lensNoise" stdDeviation="8" result="smoothLens" />

          {/* 3. Contrast stretch to define the refraction angles cleanly */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -7" 
            result="steepMap" 
          />

          {/* 4. The Displacement: High scale to pull text at edges and zoom center */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="50" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          {/* 5. NO final blur. Keep it sharp. Composite to ensure alpha handling. */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;