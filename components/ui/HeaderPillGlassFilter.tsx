import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="header-pill-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.015"
            numOctaves="2"
            seed="12"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.6" result="softNoise" />

          {/* STRONGER refraction */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="58"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distort"
          />

          {/* Smooths edges after distortion (important) */}
          <feGaussianBlur in="distort" stdDeviation="0.7" result="final" />

          <feComposite in="final" in2="final" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;
