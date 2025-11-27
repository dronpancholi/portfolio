import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           ULTRA LIQUID LENS FILTER
           - Uses dilation to create thick "bubbles" of refraction
           - High displacement scale for strong magnification
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Low frequency noise for large, heavy droplets */}
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="85" result="baseNoise" />
          
          {/* 2. Dilate the noise to create "thick" high points (convex lens shapes) */}
          <feMorphology operator="dilate" radius="8" in="baseNoise" result="thickLens" />
          
          {/* 3. Smooth the edges deeply to create a glass-like curvature */}
          <feGaussianBlur in="thickLens" stdDeviation="6" result="smoothLens" />

          {/* 4. Contrast stretch to define the edges of the liquid clearly */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 25 -9" 
            result="steepMap" 
          />

          {/* 5. Massive displacement for true optical distortion */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="90" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          {/* 6. Composite to clean edges */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;