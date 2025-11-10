import React, { useEffect, useRef, useState, useCallback } from "react";
// FIX: Explicitly import the `Variants` type from framer-motion to resolve type inference issues.
import { motion, AnimatePresence, Variants } from "framer-motion";

// FIX: Added the `Variants` type to the `variants` object. This ensures TypeScript correctly validates the `type` property in the transition object against the allowed `AnimationGeneratorType` values (e.g., "spring"), preventing a type error where it was being inferred as a generic `string`.
const variants: Variants = {
  top: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 14,
    paddingBottom: 14,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1.2 }
  },
  expanded: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 12,
    paddingBottom: 12,
    scale: 0.96,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1.2 }
  },
  collapsed: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    scale: 0.88,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1.2 }
  }
};


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

  const state = isAtTop ? "top" : isExpanded ? "expanded" : "collapsed";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        animate={state}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1.2
        }}
        className={`
          flex items-center overflow-hidden cursor-pointer select-none rounded-full
          bg-white/25 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]
          ${state === "collapsed" ? "justify-center gap-0" : "justify-center gap-6"}
        `}
      >
        <motion.p
          animate={{ fontSize: state === "collapsed" ? 14 : 18 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1.1 }}
          className="font-semibold text-neutral-900 whitespace-nowrap"
        >
          Dron Pancholi
        </motion.p>

        <AnimatePresence initial={false}>
          {(state === "top" || state === "expanded") && (
            <motion.nav
              key="nav"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center font-medium text-neutral-800 whitespace-nowrap"
              style={{ overflow: "hidden" }}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6, transition: { duration: 0.26, delay: 0.06 } }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#about" className="hover:text-black transition-colors mr-6">About</a>
              <a href="#projects" className="hover:text-black transition-colors mr-6">Projects</a>
              <a href="#skills" className="hover:text-black transition-colors mr-6">Skills</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}