import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/* 
          REBUILT FILTER FOR DYNAMIC LIQUID EFFECT & CROSS-BROWSER CONSISTENCY
          - Animate `baseFrequency` in feTurbulence for a slow, perpetual "liquid" flow.
          - Increased morphology `radius` to create larger, smoother lensing areas.
          - Decreased displacement `scale` to prevent harsh artifacts, especially in Safari.
          - Removed color matrix to simplify filter chain and improve rendering consistency.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* Generate evolving noise for a dynamic liquid effect */}
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="2" seed="2" result="noise">
            <animate 
              attributeName="baseFrequency" 
              dur="20s" 
              keyTimes="0;0.5;1" 
              values="0.01 0.015;0.012 0.02;0.01 0.015" 
              repeatCount="indefinite"
            />
          </feTurbulence>
          
          {/* Dilate the noise to create larger, bubble-like magnification areas */}
          <feMorphology operator="dilate" radius="4" in="noise" result="magnify"/>
          
          {/* Use magnified noise for a smooth, powerful lensing effect */}
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="55" xChannelSelector="R" yChannelSelector="G" result="distort"/>
          
          {/* Final blur to smooth the result */}
          <feGaussianBlur in="distort" stdDeviation="1.5" result="final" />

          {/* Composite the final result over the original source graphic */}
          <feComposite in="final" in2="SourceGraphic" operator="over"/>
        </filter>
      </defs>
    </svg>
  );
}