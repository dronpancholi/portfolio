import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        {/* 
           MASTER LIQUID REFRACTION FILTER
           - Uses filterUnits="objectBoundingBox" with ample padding (-50% to 200%)
             to prevent Safari from clipping the displaced pixels at the element's edge.
           - High scale displacement map for the signature "Liquid Glass" look.
           - "Crystal Clear" tuning: minimal internal blur, high contrast noise.
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          
          {/* Base Noise: Lower frequency for larger, smoother ripples */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.002 0.004" 
            numOctaves="3" 
            seed="5" 
            result="noise" 
          />
          
          {/* Smoothing: Essential for "Glass" rather than "Water" look */}
          <feGaussianBlur in="noise" stdDeviation="6" result="smoothNoise" />
          
          {/* Contrast: Hardens the edges of the refraction map */}
          <feColorMatrix 
            in="smoothNoise" 
            type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 25 -9" 
            result="contrastNoise" 
          />

          {/* Displacement: 
             scale="40" provides the strong "lens" effect. 
             Using xChannelSelector="R" and yChannelSelector="G" maps the noise colors to distortion.
          */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="contrastNoise" 
            scale="40" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            result="displaced" 
          />
          
          {/* Composite: Ensures transparency is handled correctly */}
          <feComposite in="displaced" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;