import React from 'react';

const LiquidGlassFilter: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0">
      <defs>
        <filter id="liquid-glass">
          {/* This creates a turbulence noise pattern */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.02 0.05" // Frequency in x and y direction, creates wavy effect
            numOctaves="1" // Lower octaves for smoother noise
            result="turbulence"
          />
          {/* This uses the noise to displace the pixels of the original graphic */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="10" // How much to displace
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;
