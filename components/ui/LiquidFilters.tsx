import React from "react";

const LiquidFilters: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* 
           Advanced Liquid Lens Filter
           1. Creates a low-frequency "wave" to act as a magnifying lens curve.
           2. Adds high-frequency noise for the "liquid" edge distortion.
           3. Combines them and increases contrast to create a steep displacement map.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* Layer 1: Large, smooth wave for the "Magnification/Lens" effect */}
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.002" numOctaves="3" seed="5" result="lensWave">
             <animate attributeName="baseFrequency" dur="40s" values="0.001 0.002; 0.0015 0.0025; 0.001 0.002" repeatCount="indefinite" />
          </feTurbulence>
          
          {/* Layer 2: Fine, sharp noise for "Edge Distortion/Liquid" detail */}
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.06" numOctaves="2" seed="10" result="fineNoise">
             <animate attributeName="baseFrequency" dur="25s" values="0.03 0.06; 0.035 0.07; 0.03 0.06" repeatCount="indefinite" />
          </feTurbulence>

          {/* Combine: Blend mostly the lens wave, with a touch of fine noise */}
          <feComposite in="lensWave" in2="fineNoise" operator="arithmetic" k1="0" k2="0.85" k3="0.15" k4="0" result="combinedMap" />

          {/* Contrast Boost: Steepen the slopes of the map to make the refraction sharper */}
          <feColorMatrix in="combinedMap" type="matrix" 
            values="4 0 0 0 -1.5
                    0 4 0 0 -1.5
                    0 0 1 0 0
                    0 0 0 1 0" 
            result="contrastMap" 
          />

          {/* Displacement: Use the Red and Green channels to shift pixels */}
          <feDisplacementMap in="SourceGraphic" in2="contrastMap" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          
          {/* Final Polish: Slight blur to soften the pixelated edges of the distortion */}
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="final" />
          
          <feComposite in="final" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidFilters;