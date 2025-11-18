import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/* 
          REBUILT & POLISHED SVG FILTER for a "pure lens" effect.
          This filter distorts the `BackgroundImage` (what is behind the element)
          to create central magnification and edge distortion without blurring.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
            {/* 1. Generate a watery, animated texture. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="2" seed="30" result="turbulence">
                <animate 
                    attributeName="baseFrequency" 
                    dur="40s" 
                    keyTimes="0;0.5;1" 
                    values="0.015 0.025;0.025 0.035;0.015 0.025" 
                    repeatCount="indefinite"
                />
            </feTurbulence>

            {/* 2. Create the main magnification map: A bright, soft-edged version of the pill's shape.
                This pushes content outwards from the center. */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="softPillShape" />
            <feColorMatrix in="softPillShape" type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 6 -1.5" result="magnificationMap" />
            
            {/* 3. Create the edge distortion map. We get the edges by taking the soft shape and subtracting a smaller, eroded version. */}
            <feMorphology in="SourceAlpha" operator="erode" radius="4" result="erodedShape" />
            <feGaussianBlur in="erodedShape" stdDeviation="6" result="softErodedShape" />
            <feComposite in="softPillShape" in2="softErodedShape" operator="out" result="edgeMap" />

            {/* 4. Combine the watery texture with the magnification and edge maps.
                This makes the distortion feel organic and liquid, not static. */}
            <feComposite in="turbulence" in2="magnificationMap" operator="arithmetic" k1="0" k2="0.7" k3="0.3" k4="0" result="texturedMagnification"/>
            <feComposite in="texturedMagnification" in2="edgeMap" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="finalDisplacementMap"/>
            
            {/* 5. Apply the displacement map to the BackgroundImage (what's behind the element).
                This is the core of the effect. 'scale' controls the intensity. */}
            <feDisplacementMap in="BackgroundImage" in2="finalDisplacementMap" scale="80" xChannelSelector="R" yChannelSelector="A"/>
        </filter>
      </defs>
    </svg>
  );
}