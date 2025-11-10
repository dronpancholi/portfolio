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

  const state = isAtTop ? "top" : isExpanded ? "expanded" : "collapsed";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        animate={state}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        variants={{
          top: { width: 880, padding: "14px 28px" },
          expanded: { width: 720, padding: "12px 24px" },
          collapsed: { width: 200, padding: "8px 16px" },
        }}
        style={{
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.45)",
        }}
        className={`
          bg-white/25 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          flex items-center transition-all select-none cursor-pointer overflow-hidden
          ${state === "collapsed" ? "justify-center gap-0" : "justify-center gap-8"}
        `}
      >
        <motion.p
          initial={false}
          animate={{
            fontSize: state === "collapsed" ? 14 : 18,
          }}
          className="font-semibold tracking-tight text-neutral-900 whitespace-nowrap"
        >
          Dron Pancholi
        </motion.p>

        <AnimatePresence initial={false}>
          {(state === "top" || state === "expanded") && (
            <motion.nav
              key="nav"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-10 text-neutral-800 font-medium whitespace-nowrap"
              style={{ overflow: "hidden" }}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.25 }}
            >
              <a href="#about" className="hover:text-black transition-colors">About</a>
              <a href="#projects" className="hover:text-black transition-colors">Projects</a>
              <a href="#skills" className="hover:text-black transition-colors">Skills</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
