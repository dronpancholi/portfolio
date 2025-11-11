
import React from 'react';

const LiquidGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="liquidGlassEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="3" seed="6" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;