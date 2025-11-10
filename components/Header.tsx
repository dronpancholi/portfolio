import { useEffect, useRef, useState } from "react";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = 120; // scroll before collapse happens
      setCollapsed(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        rounded-full flex items-center backdrop-blur-xl 
        border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]
        ${collapsed ? "px-6 py-2" : "px-8 py-3"}
        bg-white/20
      `}
    >

      {/* NAME ALWAYS VISIBLE & SCALES */}
      <p
        ref={nameRef}
        className={`
          font-semibold text-neutral-900 select-none transition-all duration-500
          ${collapsed ? "text-sm" : "text-lg"}
        `}
      >
        Dron Pancholi
      </p>

      {/* NAV LINKS FADE + COLLAPSE WIDTH SMOOTHLY */}
      <nav
        className={`
          overflow-hidden flex items-center gap-5 font-medium text-neutral-800
          transition-all duration-500
          ${collapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-[400px] ml-5"}
        `}
      >
        <a href="#about" className="hover:text-black transition-colors whitespace-nowrap">About</a>
        <a href="#projects" className="hover:text-black transition-colors whitespace-nowrap">Projects</a>
        <a href="#skills" className="hover:text-black transition-colors whitespace-nowrap">Skills</a>
        <a href="#contact" className="hover:text-black transition-colors whitespace-nowrap">Contact</a>
      </nav>

    </header>
  );
}
