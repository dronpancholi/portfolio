import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/* UPDATED: Enhanced filter for a more powerful, "liquid" magnification/lensing effect on the social pill */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          {/* Generate larger, smoother noise patterns */}
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" seed="5" result="noise"/>
          
          {/* Dilate the noise to create bubble-like magnification areas */}
          <feMorphology operator="dilate" radius="3" in="noise" result="magnify"/>
          
          {/* Use the magnified noise to displace the source graphic, creating a strong lensing effect */}
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="60" xChannelSelector="R" yChannelSelector="G" result="distort"/>
          
          {/* A final slight blur to smooth the distorted result without losing readability */}
          <feGaussianBlur in="distort" stdDeviation="1.5" result="final" />
          
          {/* Slightly boost saturation for a more vibrant look */}
          <feColorMatrix in="final" type="saturate" values="1.1" result="saturatedFinal"/>
          
          {/* Composite the final result over the original source graphic */}
          <feComposite in="saturatedFinal" in2="SourceGraphic" operator="over"/>
        </filter>
      </defs>
    </svg>
  );
}