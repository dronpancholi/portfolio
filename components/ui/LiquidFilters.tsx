import React from "react";

export default function LiquidFilters() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {/* gentle refraction — small scale to avoid jank */}
        <filter id="liquidRefraction" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="2" seed="9" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.1" result="softNoise" />
          {/* Scale is intentionally small (4–8) for performance */}
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="24" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.04" />
        </filter>

        {/* subtle inner-shadow used by CSS fallback */}
        <filter id="liquidInnerLift" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feOffset dx="0" dy="1" result="off" />
          <feComposite in="off" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}