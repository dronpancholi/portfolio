import React, { memo } from "react";

/**
 * MAX LIQUID REFRACTION PIPELINE
 * - Stage 1: Macro noise (baseWaves) for large displacement.
 * - Stage 2: Micro noise (detailWaves) for surface tension ripples.
 * - Stage 3: Displacement map using combined noise channels.
 */
const LiquidFilters: React.FC = memo(() => (
  <svg aria-hidden="true" style={{ display: "none" }}>
    <defs>
      <filter 
        id="liquidRefractionMax" 
        x="-30%" y="-30%" width="160%" height="160%" 
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.007" 
          numOctaves="2" 
          seed="42" 
          result="macroNoise" 
        />
        
        <feTurbulence 
          type="turbulence" 
          baseFrequency="0.04" 
          numOctaves="1" 
          seed="10" 
          result="microNoise" 
        />
        
        <feComposite 
          in="macroNoise" 
          in2="microNoise" 
          operator="arithmetic" 
          k1="0" k2="0.8" k3="0.2" k4="0" 
          result="blendedNoise" 
        />
        
        <feGaussianBlur in="blendedNoise" stdDeviation="1.5" result="softNoise" />
        
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="softNoise" 
          scale="var(--refraction-scale)" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
        
        <feColorMatrix type="saturate" values="1.25" />
      </filter>
    </defs>
  </svg>
));

export default LiquidFilters;