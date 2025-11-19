import React from "react";

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
          primitiveUnits="userSpaceOnUse"
        >
          {/* 
            Base Turbulence
            Using specific baseFrequency to avoid aliasing on low-res screens 
          */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015" 
            numOctaves="3" 
            seed="5" 
            result="noise" 
          />
          
          {/* 
            Smooth the noise to create glass-like undulations rather than sharp grit
          */}
          <feGaussianBlur 
            in="noise" 
            stdDeviation="2" 
            result="smoothNoise" 
          />
          
          {/* 
            Displacement Map
            Scale adjusted for consistency across browsers (not relying on percentage scaling bugs)
          */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="smoothNoise" 
            scale="12" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            result="distorted" 
          />
          
          {/* 
            Composite to ensure alpha channel integrity
          */}
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