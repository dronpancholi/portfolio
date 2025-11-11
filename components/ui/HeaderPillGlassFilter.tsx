import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="header-pill-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="1" seed="9" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="24" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;
