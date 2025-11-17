import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* Default filter for top/collapsed states */}
        <filter id="header-pill-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.015"
            numOctaves="2"
            seed="12"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.6" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distort"
          />
          <feGaussianBlur in="distort" stdDeviation="0.7" result="final" />
          <feComposite in="final" in2="final" operator="over" />
        </filter>
        
        {/* UPDATED: Increased scale and radius for maximum liquid magnification effect */}
        <filter id="header-pill-glass-expanded" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02" 
            numOctaves="2" 
            seed="12"
            result="noise"
          />
          {/* Dilate the noise to create bubble-like magnification areas */}
          <feMorphology operator="dilate" radius="3" in="noise" result="magnify" />
          
          {/* Increase displacement for a powerful warping effect that magnifies */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="magnify"
            scale="80"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distort"
          />
          {/* A final slight blur to smooth the distorted result */}
          <feGaussianBlur in="distort" stdDeviation="1.5" result="final" />
          <feComposite in="final" in2="final" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;