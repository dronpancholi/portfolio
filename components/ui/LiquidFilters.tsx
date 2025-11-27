import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           EDGE-DISTORTION LENS FILTER
           - Creates a large, flat-topped bubble.
           - Center remains mostly clear (flat refraction).
           - Edges have steep curvature for strong distortion.
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Base smooth noise */}
          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="5" result="baseNoise" />
          
          {/* 2. Dilate heavily to push the 'curve' to the edges, leaving center flat */}
          <feMorphology operator="dilate" radius="15" in="baseNoise" result="thickLens" />
          
          {/* 3. Smooth the slope for glass-like refraction */}
          <feGaussianBlur in="thickLens" stdDeviation="10" result="smoothLens" />

          {/* 4. Contrast stretch to define the edge rim explicitly */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -9" 
            result="steepMap" 
          />

          {/* 5. Strong displacement using the rim map */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="50" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          {/* 6. Composite to ensure alpha integrity */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;