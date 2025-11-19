import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/* 
          REBUILT & POLISHED SVG FILTER FOR A PREMIUM "CAUSTIC LENS" EFFECT
          - Combines multiple stages for a sophisticated look: animated turbulence, a high-contrast magnification map, and an edge-aware pinch effect.
          - Creates powerful magnification in the center with beautiful warping distortion towards the edges.
          - Calibrated for maximum visual impact while preserving the readability of the text underneath.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
            {/* 1. Base turbulence for a watery feel. Animate it gently. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="10" result="turbulence">
                <animate 
                  attributeName="baseFrequency" 
                  dur="30s" 
                  keyTimes="0;0.5;1" 
                  values="0.012;0.018;0.012" 
                  repeatCount="indefinite"
                />
            </feTurbulence>

            {/* 2. Create larger, smoother "blobs" from the turbulence for a magnification map. */}
            <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredTurbulence" />
            {/* This color matrix dramatically increases the contrast of the noise, creating defined blobs for magnification. */}
            <feColorMatrix in="blurredTurbulence" type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 18 -7" result="magnifyAlpha" />

            {/* 3. Create an edge pinch effect from the shape's alpha channel to pull the distortion inward. */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="edgeBlur"/>
            <feDisplacementMap in="magnifyAlpha" in2="edgeBlur" scale="15" xChannelSelector="R" yChannelSelector="G" result="edgePinchedMagnifyMap" />
            
            {/* 4. Apply the final, powerful displacement to the source graphic. */}
            <feDisplacementMap in="SourceGraphic" in2="edgePinchedMagnifyMap" scale="85" xChannelSelector="R" yChannelSelector="A" result="finalDistort"/>

            {/* 5. Final polish with a minimal blur to smooth any hard edges from the distortion. */}
            <feGaussianBlur in="finalDistort" stdDeviation="1" result="final"/>
            <feComposite in="final" in2="SourceGraphic" operator="over"/>
        </filter>
      </defs>
    </svg>
  );
}