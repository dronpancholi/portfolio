import React from "react";

// Optimized for browser consistency:
// 1. Uses x/y/width/height percentages > 100% to prevent clipping artifacts on movement.
// 2. Simplifies the turbulence to avoid high-frequency noise that aliases on low-res screens.
const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <filter 
          id="liquidRefraction" 
          x="-50%" 
          y="-50%" 
          width="200%" 
          height="200%" 
          colorInterpolationFilters="sRGB"
        >
          {/* Base turbulence: Smooth, larger waves for glass-like feel */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.003 0.005" 
            numOctaves="3" 
            seed="12" 
            result="noise" 
          />
          
          {/* Gaussian Blur: Smooths the noise to create a lens surface map */}
          <feGaussianBlur 
            in="noise" 
            stdDeviation="12" 
            result="smoothNoise" 
          />
          
          {/* Color Matrix: Increases contrast to sharpen the refraction edges */}
          <feColorMatrix 
            in="smoothNoise" 
            type="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" 
            result="contrastNoise" 
          />

          {/* Displacement Map: The actual refraction effect */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="contrastNoise" 
            scale="40" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            result="distorted" 
          />
          
          {/* Composite: Ensures transparency is handled correctly */}
          <feComposite 
            in="distorted" 
            in2="SourceGraphic" 
            operator="in" 
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;