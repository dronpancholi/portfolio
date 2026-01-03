import React, { memo } from "react";

const LiquidFilters: React.FC = memo(() => (
  <svg aria-hidden="true" style={{ display: "none" }}>
    <defs>
      <filter 
        id="liquidRefraction" 
        x="-20%" y="-20%" width="140%" height="140%" 
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.012" 
          numOctaves="1" 
          seed="5" 
          result="noise" 
        />
        <feGaussianBlur in="noise" stdDeviation="1.5" result="softNoise" />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="softNoise" 
          scale="var(--refraction-scale)" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
      </filter>
    </defs>
  </svg>
));

export default LiquidFilters;