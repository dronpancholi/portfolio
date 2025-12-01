import React from "react";

// Version v3.8 - Edge-Distortion Lens Engine
// Uses dilation to create clear 'bubbles' for readability with heavy edge warping.
const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* 1. Generate organic noise */}
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="5" result="noise" />
          
          {/* 2. Dilate the noise to create large, flat 'clear zones' (bubbles) */}
          <feMorphology operator="dilate" radius="4" in="noise" result="expandedNoise" />
          
          {/* 3. Smooth the transitions between clear zones and distorted edges */}
          <feGaussianBlur in="expandedNoise" stdDeviation="2" result="smoothNoise" />
          
          {/* 4. Apply heavy displacement. 
              The flat areas (center of bubbles) will have 0 effective distortion (readable).
              The edges will have massive warping.
          */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="smoothNoise" 
            scale="50" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
          
          {/* 5. Slight contrast boost to sharpen the refractive edges */}
          <feComponentTransfer>
             <feFuncA type="linear" slope="0.9" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;