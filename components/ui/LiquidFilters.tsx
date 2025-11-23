import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           Performance Optimized Liquid Lens Filter
           - Reduced octaves to 1 for high frame rate
           - Tuned baseFrequency to maintain visual depth without heavy computation
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* 1. Single octave noise is much faster and cleaner for "smooth" glass */}
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.004" numOctaves="1" seed="7" result="lensNoise" />
          
          {/* 2. Gaussian blur smoothes the single octave to look like liquid */}
          <feGaussianBlur in="lensNoise" stdDeviation="5" result="smoothLens" />

          {/* 3. Contrast stretch */}
          <feColorMatrix in="smoothLens" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -9" 
            result="steepMap" 
          />

          {/* 4. Reduced displacement scale to prevent tearing during movement */}
          <feDisplacementMap in="SourceGraphic" in2="steepMap" scale="30" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;