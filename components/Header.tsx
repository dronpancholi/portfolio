import { useEffect, useRef, useState } from "react";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    const name = nameRef.current;
    if (!header || !name) return;

    // Set starting expanded state
    header.style.width = `320px`;
    header.style.padding = `16px 28px`;
    const initialFilterValue = `blur(28px) saturate(180%)`;
    header.style.backdropFilter = initialFilterValue;
    header.style['webkitBackdropFilter'] = initialFilterValue;
    name.style.fontSize = `20px`;

    let animationFrameId: number;
    const update = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 140, 0), 1); // clamp 0→1

      // Switch between "full state" and "identity-only state"
      setCollapsed(progress > 0.45);

      // Smooth interpolation
      const width = 320 - progress * 120;   // 320 → 200
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

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="liquid-glass-header fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full flex items-center justify-center gap-5 select-none transition-all"
    >
      <p ref={nameRef} className="font-semibold tracking-tight text-neutral-900 pointer-events-none">
        Dron Pancholi
      </p>

      {/* Nav links fade away when collapsed */}
      <nav
        className={`flex items-center gap-4 text-neutral-800 font-medium transition-opacity duration-300 ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a href="#about" className="hover:text-black transition-colors">About</a>
        <a href="#projects" className="hover:text-black transition-colors">Projects</a>
        <a href="#skills" className="hover:text-black transition-colors">Skills</a>
        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
      </nav>
    </header>
  );
}
