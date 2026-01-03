import React, { memo } from "react";

/**
 * Max Liquid Refraction Pipeline
 * Documentation:
 * - baseNoise: Broad displacement for large "liquid" waves.
 * - detailNoise: Fine-grained surface ripples.
 * - feComposite: Blends noises using arithmetic (k2=0.8 for primary wave dominance).
 * - feDisplacementMap: Uses R/G channels as X/Y offsets.
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
          result="baseNoise" 
        />
        
        <feTurbulence 
          type="turbulence" 
          baseFrequency="0.04" 
          numOctaves="1" 
          seed="10" 
          result="detailNoise" 
        />
        
        <feComposite 
          in="baseNoise" 
          in2="detailNoise" 
          operator="arithmetic" 
          k1="0" k2="0.8" k3="0.2" k4="0" 
          result="mixedNoise" 
        />
        
        <feGaussianBlur in="mixedNoise" stdDeviation="1.8" result="softNoise" />
        
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="softNoise" 
          scale="var(--refraction-scale)" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
        
        <feColorMatrix type="saturate" values="1.25" />
      </filter>

      <filter id="glassInnerEdge">
        <feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="dilated" />
        <feGaussianBlur stdDeviation="3.5" in="dilated" result="blurred" />
        <feComposite operator="out" in="blurred" in2="SourceAlpha" result="edge" />
        <feFlood floodColor="white" floodOpacity="0.4" result="glowColor" />
        <feComposite operator="in" in="glowColor" in2="edge" result="glow" />
      </filter>
    </defs>
  </svg>
));

export default LiquidFilters;