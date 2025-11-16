import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="2" seed="8" result="noise"/>
          <feGaussianBlur in="noise" stdDeviation="0.9" result="softNoise"/>
          {/* small scale—safe on mid/low devices (JS will adjust scale) */}
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.03"/>
        </filter>
      </defs>
    </svg>
  );
}
