import React from "react";

export default function LiquidFilters(){
  return (
    <svg style={{display:"none"}} aria-hidden>
      <defs>
        {/*
          REBUILT & UNIFIED SVG FILTER for maximum cross-browser compatibility.
          This filter combines the blur and distortion into a single operation
          to prevent conflicts between CSS `backdrop-filter` and SVG `filter`.
          It operates on the `BackgroundImage` to create a true "lens" effect.
        */}
        <filter id="liquidRefraction" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
            {/* STAGE 1: Generate the animated, watery displacement map. This part is unchanged. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="2" seed="30" result="turbulence">
                <animate 
                    attributeName="baseFrequency" 
                    dur="40s" 
                    keyTimes="0;0.5;1" 
                    values="0.015 0.025;0.025 0.035;0.015 0.025" 
                    repeatCount="indefinite"
                />
            </feTurbulence>
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="softPillShape" />
            <feColorMatrix in="softPillShape" type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 6 -1.5" result="magnificationMap" />
            <feMorphology in="SourceAlpha" operator="erode" radius="4" result="erodedShape" />
            <feGaussianBlur in="erodedShape" stdDeviation="6" result="softErodedShape" />
            <feComposite in="softPillShape" in2="softErodedShape" operator="out" result="edgeMap" />
            <feComposite in="turbulence" in2="magnificationMap" operator="arithmetic" k1="0" k2="0.7" k3="0.3" k4="0" result="texturedMagnification"/>
            <feComposite in="texturedMagnification" in2="edgeMap" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="finalDisplacementMap"/>
            
            {/* STAGE 2: Get the background and apply the glass blur.
                This replaces the CSS `backdrop-filter: blur()` for better stability.
                A stdDeviation of 7 is roughly equivalent to a 14px CSS blur. */}
            <feGaussianBlur in="BackgroundImage" stdDeviation="7" result="blurredBackground" />

            {/* STAGE 3: Apply the displacement map to the blurred background.
                This is the final step that creates the distorted glass effect. */}
            <feDisplacementMap in="blurredBackground" in2="finalDisplacementMap" scale="80" xChannelSelector="R" yChannelSelector="A"/>
        </filter>
      </defs>
    </svg>
  );
}