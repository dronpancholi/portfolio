
import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* Soft, water-like glass filter */}
        <filter id="header-pill-glass" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
          {/* Lower frequency = smoother, larger ripples (more like water, less like noise) */}
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="2" seed="5" result="noise" />
          <feMorphology operator="dilate" radius="1.5" in="noise" result="magnify" />
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="35" xChannelSelector="R" yChannelSelector="G" result="distort" />
          <feGaussianBlur in="distort" stdDeviation="1" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
        
        {/* Expanded state: Deep lens effect */}
        <filter id="header-pill-glass-expanded" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves="2" seed="5" result="noise" />
          <feMorphology operator="dilate" radius="4" in="noise" result="magnify" />
          {/* High scale displacement for strong refraction */}
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="85" xChannelSelector="R" yChannelSelector="G" result="distort" />
          <feGaussianBlur in="distort" stdDeviation="1.5" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;
