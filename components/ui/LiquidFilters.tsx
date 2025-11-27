import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           RING-DISTORTION FILTER
           - Creates a clear "eye" in the center where text is untouched.
           - Pushes all turbulence/distortion to the perimeter.
           - Ensures 100% readability for the main content.
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Generate heavy, liquid-like noise */}
          <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="1" seed="5" result="noise" />
          
          {/* 2. Create a solid 'island' from the noise (the center of the lens) */}
          <feMorphology operator="dilate" radius="12" in="noise" result="island" />
          
          {/* 3. Smooth the island to create a slope at the edges */}
          <feGaussianBlur in="island" stdDeviation="8" result="smoothIsland" />

          {/* 
             4. EDGE DETECTION MATRIX
             This is the magic step. We take the smooth island and calculate the 'slope' (edges).
             The center (flat white) becomes neutral. The edges (slope) become active displacement.
          */}
          <feColorMatrix in="smoothIsland" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 9 -4" 
            result="edgeMap" 
          />

          {/* 5. Displace only using the Edge Map. Center remains sharp. */}
          <feDisplacementMap in="SourceGraphic" in2="edgeMap" scale="40" xChannelSelector="A" yChannelSelector="A" result="distort" />
          
          {/* 6. Composite to ensure clean edges */}
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;