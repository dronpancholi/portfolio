import React, { memo } from "react";

const LiquidFilters: React.FC = memo(() => (
  <svg aria-hidden="true" style={{ display: "none" }}>
    <defs>
      {/* High-Fidelity Refraction Filter */}
      <filter 
        id="liquidRefractionMax" 
        x="-30%" y="-30%" width="160%" height="160%" 
        colorInterpolationFilters="sRGB"
      >
        {/* Base Liquid Turbulence */}
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.008" 
          numOctaves="2" 
          seed="42" 
          result="baseNoise" 
        />
        
        {/* Detail Ripples */}
        <feTurbulence 
          type="turbulence" 
          baseFrequency="0.04" 
          numOctaves="1" 
          seed="10" 
          result="detailNoise" 
        />
        
        {/* Mix noise for organic complexity */}
        <feComposite in="baseNoise" in2="detailNoise" operator="arithmetic" k1="0" k2="0.8" k3="0.2" k4="0" result="mixedNoise" />
        
        <feGaussianBlur in="mixedNoise" stdDeviation="2" result="softNoise" />
        
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="softNoise" 
          scale="var(--refraction-scale)" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
        
        {/* Color Correction / Saturation Boost */}
        <feColorMatrix type="saturate" values="1.2" />
      </filter>

      {/* Edge Glow Filter for inner-glass lighting */}
      <filter id="glassEdge">
        <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="dilated" />
        <feGaussianBlur stdDeviation="3" in="dilated" result="blurred" />
        <feComposite operator="out" in="blurred" in2="SourceAlpha" result="edge" />
        <feFlood floodColor="white" floodOpacity="0.5" result="glowColor" />
        <feComposite operator="in" in="glowColor" in2="edge" result="glow" />
      </filter>
    </defs>
  </svg>
));

export default LiquidFilters;