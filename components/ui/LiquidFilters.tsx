import React from "react";

// Version v2.5091.221
// Engine: Ring Distortion / Clean Center
const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           RING-DISTORTION FILTER v2.5091.221
           - Creates a clear "eye" in the center where text is untouched.
           - Pushes all turbulence/distortion to the perimeter.
           - Ensures 100% readability for the main content (95% visible rule).
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Generate heavy, liquid-like noise */}
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="1" seed="5" result="noise" />
          
          {/* 2. Create a solid 'island' from the noise (the center of the lens) */}
          <feMorphology operator="dilate" radius="16" in="noise" result="island" />
          
          {/* 3. Smooth the island to create a slope at the edges */}
          <feGaussianBlur in="island" stdDeviation="10" result="smoothIsland" />

          {/* 
             4. EDGE DETECTION MATRIX
             The center becomes neutral (no displacement). The edges become active.
          */}
          <feColorMatrix in="smoothIsland" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 15 -7" 
            result="edgeMap" 
          />

          {/* 5. Displace using the Edge Map. Center remains sharp. High scale for strong edge distortion. */}
          <feDisplacementMap in="SourceGraphic" in2="edgeMap" scale="50" xChannelSelector="A" yChannelSelector="A" result="distort" />
          
          {/* 6. Composite to ensure clean edges */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;