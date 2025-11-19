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
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* 1. Large smooth waves for a solid glass block feel */}
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.004" numOctaves="3" seed="5" result="lensNoise" />
          
          {/* 2. Smooth the noise significantly to create a lens curvature */}
          <feGaussianBlur in="lensNoise" stdDeviation="4" result="smoothLens" />

          {/* 3. Contrast stretch to define the refraction angles */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 25 -10" 
            result="steepMap" 
          />

          {/* 4. The Displacement: High scale to pull text at edges and zoom center */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="60" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          {/* 5. Clip to original shape - NO BLUR applied to output for maximum clarity */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;