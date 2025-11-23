import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* Optimized Header Filter - Single Octave for 60fps */}
        <filter id="header-pill-glass" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="5" result="noise" />
          <feMorphology operator="dilate" radius="1" in="noise" result="magnify" />
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="15" xChannelSelector="R" yChannelSelector="G" result="distort" />
          <feGaussianBlur in="distort" stdDeviation="0.5" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
        
        {/* Expanded state */}
        <filter id="header-pill-glass-expanded" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="5" result="noise" />
          <feMorphology operator="dilate" radius="2" in="noise" result="magnify" />
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="40" xChannelSelector="R" yChannelSelector="G" result="distort" />
          <feGaussianBlur in="distort" stdDeviation="1" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;