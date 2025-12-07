import React from 'react';

export default function HeaderPillGlassFilter(){
  return (
    <svg aria-hidden="true" style={{display:"none"}}>
      <defs>
        <filter id="header-pill-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="12" result="noise"/>
          <feGaussianBlur in="noise" stdDeviation="1" result="softNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="var(--refraction-scale)" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.05"/>
        </filter>

        <filter id="header-pill-glass-expanded" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="14" result="noise"/>
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="calc(var(--refraction-scale) * 1.8)" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="saturate" values="1.07"/>
        </filter>
      </defs>
    </svg>
  );
}