import { useEffect, useRef } from "react";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const name = nameRef.current;
    if (!header || !name) return;

    // Set starting expanded state to prevent FOUC
    header.style.width = `300px`;
    header.style.padding = `16px 28px`;
    const initialFilterValue = `blur(28px) saturate(180%)`;
    header.style.backdropFilter = initialFilterValue;
    header.style['webkitBackdropFilter'] = initialFilterValue;
    name.style.fontSize = `20px`;
    
    let animationFrameId: number;

    const animate = () => {
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / 140, 0), 1); // clamp 0→1

      const width = 300 - progress * 120;   // 300 → 180
      const padY = 16 - progress * 8;       // 16 → 8
      const padX = 28 - progress * 12;      // 28 → 16
      const blur = 28 - progress * 12;      // 28 → 16
      const font = 20 - progress * 6;       // 20 → 14

      header.style.width = `${width}px`;
      header.style.padding = `${padY}px ${padX}px`;
      const filterValue = `blur(${blur}px) saturate(180%)`;
      header.style.backdropFilter = filterValue;
      header.style['webkitBackdropFilter'] = filterValue;
      name.style.fontSize = `${font}px`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to cancel animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="liquid-glass-header fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full flex items-center justify-center"
    >
      <p
        ref={nameRef}
        className="font-semibold tracking-tight text-neutral-900 pointer-events-none select-none"
      >
        Dron Pancholi
      </p>
    </div>
  );
}
