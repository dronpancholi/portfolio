import React from 'react';

const HeaderPillGlassFilter: React.FC = () => {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        {/* UPDATED: Milder magnification for default/collapsed states to prioritize readability */}
        <filter id="header-pill-glass" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" seed="12" result="noise" />
          {/* Use morphology to create subtle lensing areas */}
          <feMorphology operator="dilate" radius="1.5" in="noise" result="magnify" />
          {/* Apply a moderate displacement for a gentle liquid distortion that preserves readability */}
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="35" xChannelSelector="R" yChannelSelector="G" result="distort" />
          {/* A minimal blur to smooth the effect */}
          <feGaussianBlur in="distort" stdDeviation="1" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
        
        {/* UPDATED: Increased scale and radius for maximum liquid magnification effect */}
        <filter id="header-pill-glass-expanded" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" seed="12" result="noise" />
          {/* Dilate noise more aggressively for larger, more defined magnification bubbles */}
          <feMorphology operator="dilate" radius="4" in="noise" result="magnify" />
          {/* Significantly increase displacement for a powerful, Apple-like magnification warp */}
          <feDisplacementMap in="SourceGraphic" in2="magnify" scale="90" xChannelSelector="R" yChannelSelector="G" result="distort" />
          {/* A final blur to smooth the powerful distortion */}
          <feGaussianBlur in="distort" stdDeviation="1.5" result="final" />
          <feComposite in="final" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeaderPillGlassFilter;