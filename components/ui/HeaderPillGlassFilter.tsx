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
        
        {/* Stronger, more liquid filter for expanded state */}
        <filter id="header-pill-glass-expanded" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005 0.009"
            numOctaves="3"
            seed="12"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distort"
          />
          <feGaussianBlur in="distort" stdDeviation="1.0" result="final" />
          <feComposite in="final" in2="final" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;