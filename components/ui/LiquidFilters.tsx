import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/* UPDATED: Enhanced filter for a more powerful, "liquid" feel on the social pill */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="8" result="noise"/>
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.05"/>
        </filter>
      </defs>
    </svg>
  );
}