
import React from 'react';

const LiquidGlassFilter: React.FC = () => {
  return (
    <svg id="liquid-glass-filter" aria-hidden="true">
      <defs>
        <filter id="liquidGlassEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="3" seed="9" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="42" xChannelSelector="R" yChannelSelector="G"/>
          <feGaussianBlur stdDeviation="1.6"/>
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;