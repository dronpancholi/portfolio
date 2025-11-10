import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Scroll: at top -> full; scrolled -> shrunk (unless expanded by click)
  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 8;
      setIsAtTop(atTop);
      // Auto-collapse when leaving top (unless user explicitly expanded)
      if (!atTop && isExpanded) return; // keep manual expand while scrolled
      if (!atTop) setIsExpanded(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isExpanded]);

  // Outside click & Esc to collapse (only when not at top)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (isAtTop) return; // full header at top; no need to collapse
      if (isExpanded && pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!isAtTop && isExpanded && e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isAtTop, isExpanded]);

  // Click toggles expand only when not at top; at top it's already full
  const onPillClick = useCallback(() => {
    if (!isAtTop) setIsExpanded((v) => !v);
  }, [isAtTop]);

  // Three visual states for the pill
  const state: "top" | "expanded" | "collapsed" =
    isAtTop ? "top" : isExpanded ? "expanded" : "collapsed";

  // Dimensions & motion per state
  const variants = {
    top: {
      width: 480,
      paddingLeft: 28,
      paddingRight: 28,
      paddingTop: 14,
      paddingBottom: 14,
      borderRadius: 9999,
      boxShadow: "0 10px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
      backgroundColor: "rgba(255,255,255,0.35)",
      transition: { type: "spring", stiffness: 320, damping: 28 }
    },
    expanded: {
      width: 460,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 9999,
      boxShadow: "0 10px 36px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.45)",
      backgroundColor: "rgba(255,255,255,0.32)",
      transition: { type: "spring", stiffness: 340, damping: 26 }
    },
    collapsed: {
      width: 160,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 9999,
      boxShadow: "0 8px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.40)",
      backgroundColor: "rgba(255,255,255,0.28)",
      transition: { type: "spring", stiffness: 360, damping: 24 }
    }
  } as const;

  // Name scales slightly; nav fades & clips so content never spills out
  const showNav = state === "top" || state === "expanded";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.header
        ref={pillRef}
        aria-label="Site header"
        role="banner"
        initial={false}
        animate={state}
        variants={variants}
        onClick={onPillClick}
        style={{
          // Liquid glass: blur + saturation; keep it even during motion
          backdropFilter: state === "collapsed" ? "blur(16px) saturate(180%)" : "blur(28px) saturate(180%)",
          WebkitBackdropFilter: state === "collapsed" ? "blur(16px) saturate(180%)" : "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.45)"
        }}
        className="flex items-center gap-6 select-none cursor-pointer overflow-hidden"
      >
        {/* subtle moving highlight for glass realism */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(1200px 160px at 20% -40%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
            mixBlendMode: "screen"
          }}
        />

        {/* Name (always visible) */}
        <motion.p
          aria-label="Brand name"
          className="relative z-10 font-semibold tracking-tight text-neutral-900 whitespace-nowrap"
          initial={false}
          animate={{
            fontSize: state === "collapsed" ? 14 : 16,
            letterSpacing: state === "collapsed" ? 0.1 : 0
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          Dron Pancholi
        </motion.p>

        {/* Nav (visible at top & when expanded) */}
        <AnimatePresence initial={false}>
          {showNav && (
            <motion.nav
              key="nav"
              className="relative z-10 flex items-center gap-8 text-neutral-800 font-medium"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <a href="#about" className="hover:text-black transition-colors">About</a>
              <a href="#projects" className="hover:text-black transition-colors">Projects</a>
              <a href="#skills" className="hover:text-black transition-colors">Skills</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* subtle inner edge (keeps the glass edge crisp) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.55)"
          }}
        />
      </motion.header>
    </div>
  );
}
