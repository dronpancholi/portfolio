import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

export default function Header() {
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);

  // Scroll logic: full at top; collapsed when scrolled; click to expand when scrolled.
  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 8;
      setIsAtTop(atTop);
      if (!atTop && expanded) return; // preserve manual expand while scrolled
      if (!atTop) setExpanded(false); // auto-collapse when leaving top
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  // Outside click / Esc closes only when expanded away from top.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!expanded || isAtTop) return;
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (expanded && !isAtTop && e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded, isAtTop]);

  // Smooth, unified spring for pill + text + nav (buttery both directions).
  const spring: Transition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.9
  };

  const onPillClick = useCallback(() => {
    if (!isAtTop) setExpanded(v => !v);
  }, [isAtTop]);

  const state = isAtTop ? "top" : expanded ? "expanded" : "collapsed";

  // Cursor tracking for liquid highlight; falls back center on touch.
  const onPointerMove = (e: React.PointerEvent) => {
    const el = pillRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMx((e.clientX - r.left) / r.width);
    setMy((e.clientY - r.top) / r.height);
  };

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full px-2 sm:px-0 flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onPointerMove={onPointerMove}
        onClick={onPillClick}
        layout
        // Liquid glass base (Apple-like): transparent, blur, subtle border + depth
        className="
          pointer-events-auto mx-auto cursor-pointer select-none
          rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)]
          border border-white/40 bg-white/25 backdrop-blur-2xl
          flex items-center justify-center
          whitespace-nowrap
        "
        // Size & scale per state; mobile-safe paddings
        variants={{
          top:       { padding: "12px 18px", scale: 1    },
          expanded:  { padding: "10px 16px", scale: 0.97 },
          collapsed: { padding: "6px 10px",  scale: 0.90 }
        }}
        initial={false}
        animate={state}
        transition={spring}
        aria-label="Primary navigation"
        // Liquid highlight layers via CSS variables (read by children)
        style={
          {
            // used by the gradient highlight spans
            ["--mx" as any]: `${mx * 100}%`,
            ["--my" as any]: `${my * 100}%`
          } as React.CSSProperties
        }
      >
        {/* Liquid glass layers (avoid ::before/::after so Tailwind can style) */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(260px 180px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), rgba(255,255,255,0.12) 60%, transparent 75%)",
            mixBlendMode: "screen",
            transition: "opacity .25s ease"
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 30%, rgba(255,255,255,0.18), transparent 60%)",
            mixBlendMode: "overlay"
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.06)"
          }}
        />

        {/* CONTENT GRID:
            - collapsed → just name, perfectly centered
            - expanded/top → name + nav, evenly spaced, no clipping on mobile
        */}
        <motion.div
          layout
          className={`
            relative z-10 grid items-center
            ${state === "collapsed" ? "grid-cols-1" : "grid-cols-[auto,1fr] gap-3 sm:gap-4"}
            px-1
          `}
          transition={spring}
        >
          {/* Name */}
          <motion.p
            layout
            className="font-semibold tracking-tight text-neutral-900 mx-auto"
            animate={{ fontSize: state === "collapsed" ? "0.78rem" : "1.05rem" }}
            transition={spring}
          >
            Dron Pancholi
          </motion.p>

          {/* Nav (only when not collapsed) */}
          <AnimatePresence initial={false}>
            {(state === "top" || state === "expanded") && (
              <motion.nav
                key="nav"
                layout
                onClick={e => e.stopPropagation()}
                className="
                  flex items-center justify-center sm:justify-start
                  font-medium text-neutral-800
                  overflow-hidden whitespace-nowrap
                  -mx-1
                "
                // buttery open/close; exit matches enter, so close is as smooth as open
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ ...spring, stiffness: 130, damping: 21 }}
              >
                {/* Compact, non-clipping, touch-friendly hit areas */}
                <a href="#about"    className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">About</a>
                <a href="#projects" className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Projects</a>
                <a href="#skills"   className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Skills</a>
                <a href="#contact"  className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>
    </div>
  );
}
