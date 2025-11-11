import React from 'react';

const LiquidGlassFilter: React.FC = () => {
  return (
    <svg id="liquid-glass-filter" aria-hidden="true">
      <defs>
        <filter id="liquidGlassEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G"/>
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;
