import React from "react";

const LiquidFilters: React.FC = () => (
  <svg aria-hidden="true" style={{ display: "none" }}>
    <defs>
      <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="0.9" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="var(--refraction-scale)" xChannelSelector="R" yChannelSelector="G" />
        <feColorMatrix type="saturate" values="1.06" />
      </filter>
    </defs>
  </svg>
);

export default LiquidFilters;