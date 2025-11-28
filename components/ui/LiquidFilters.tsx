
import React from "react";

// Version v3.6906.506
// Engine: Realism Engine (Dual-Frequency + Gamma Compression)
const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           REALISM ENGINE v3.6906.506 - SUPER LIQUID UPDATE
           - Uses Gamma Compression to force the center to be 100% flat (0 displacement).
           - Uses Dual-Frequency noise for realistic liquid surface imperfections.
           - Ultra-High displacement scale (120) for "Super Liquid" thick glass.
           - Lower base frequency for "viscous" heavy liquid feel.
        */}
        <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          {/* Layer 1: Global Lens Shape (Lower Frequency = Heavier Liquid) */}
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="1" seed="5" result="noiseLow" />

          {/* Layer 2: Surface Detail (High Frequency) */}
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="noiseHigh" />
          
          {/* Combine layers */}
          <feComposite in="noiseLow" in2="noiseHigh" operator="arithmetic" k1="0" k2="0.8" k3="0.2" k4="0" result="noiseMix" />

          {/* 
             GAMMA COMPRESSION:
             Flatten the mid-tones (0.5) to ensure the center of the lens has no displacement.
             Ramp up the extremes (0 and 1) to create steep edges.
          */}
          <feComponentTransfer in="noiseMix" result="compressedNoise">
            <feFuncR type="table" tableValues="0 0 0.5 0.5 0.5 1 1"/>
            <feFuncG type="table" tableValues="0 0 0.5 0.5 0.5 1 1"/>
          </feComponentTransfer>

          {/* 
             Create the island mask for the pill shape 
          */}
          <feMorphology operator="dilate" radius="16" in="compressedNoise" result="island" />
          <feGaussianBlur in="island" stdDeviation="12" result="smoothIsland" />

          {/* Edge Map Calculation */}
          <feColorMatrix in="smoothIsland" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10" 
            result="edgeMap" 
          />

          {/* High Scale Displacement - Boosted to 120 for Super Liquid effect */}
          <feDisplacementMap in="SourceGraphic" in2="edgeMap" scale="120" xChannelSelector="R" yChannelSelector="G" result="distort" />
          
          <feComposite in="distort" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;
