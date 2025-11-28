import React from "react";

// Optimized Lightweight Liquid Filter
// Uses smooth noise and low displacement for optical clarity + performance
const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* Smooth, low-frequency noise for 'glass' feel without heavy distortion */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="2" seed="7" result="noise" />
          
          {/* Soften the noise to create a lens-like curve */}
          <feGaussianBlur in="noise" stdDeviation="0.9" result="softNoise" />
          
          {/* 
            Displacement Map:
            Using 'var(--refraction-scale)' allows us to dynamically adjust intensity 
            based on device capability (handled in App.tsx)
          */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="softNoise" 
            scale="var(--refraction-scale)" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
          
          {/* Slight saturation boost to make refracted colors pop */}
          <feColorMatrix type="saturate" values="1.1" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;