import React, { useEffect, useRef } from "react";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const scrollY = window.scrollY;
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(scrollY / 140, 1));

      const header = headerRef.current;
      const name = nameRef.current;

      // Only animate if elements are mounted
      if (header && name) {
        // Interpolated shrinking
        const width = 300 - progress * 120; // 300 → 180
        const paddingY = 16 - progress * 8; // 16px → 8px
        const paddingX = 28 - progress * 12; // 28px → 16px
        const blur = 28 - progress * 12; // blur 28 → 16
        const fontSize = 20 - progress * 6; // 20px → 14px

        header.style.width = `${width}px`;
        header.style.padding = `${paddingY}px ${paddingX}px`;
        const filterValue = `blur(${blur}px) saturate(180%)`;
        header.style.backdropFilter = filterValue;
        // FIX: Used index access to set the vendor-prefixed `webkitBackdropFilter` property. This bypasses TypeScript's strict type checking for `CSSStyleDeclaration`, which does not include this non-standard property.
        header.style['webkitBackdropFilter'] = filterValue;
        name.style.fontSize = `${fontSize}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      ref={headerRef}
      className="liquid-glass-header fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center rounded-full select-none"
      // Set initial styles to prevent FOUC and ensure smooth start
      style={{
        width: '300px',
        padding: '16px 28px',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      }}
    >
      <p
        ref={nameRef}
        className="font-semibold tracking-tight text-eerie-black"
        style={{ fontSize: '20px' }}
      >
        Dron Pancholi
      </p>
    </div>
  );
}