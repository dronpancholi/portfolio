import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

const SPRING: Transition = { type: "spring", stiffness: 120, damping: 22, mass: 0.95 };
const NAV_IN_OUT: Transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

export default function Header() {
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 8;
      setIsAtTop(atTop);
      if (!atTop && expanded) return;
      if (!atTop) setExpanded(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!expanded || isAtTop) return;
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => expanded && !isAtTop && e.key === "Escape" && setExpanded(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded, isAtTop]);

  const onPillClick = useCallback(() => { if (!isAtTop) setExpanded(v => !v); }, [isAtTop]);

  const collapsed = !isAtTop && !expanded;
  const showNav = isAtTop || expanded;

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        aria-label="Primary navigation"
        className="glass pointer-events-auto rounded-full flex items-center cursor-pointer select-none"
        style={{
          width: "fit-content",       // <— KEY FIX (no bridging)
          maxWidth: "92vw",           // <— prevents overflow on phone
        }}
        initial={false}
        animate={{
          paddingLeft: collapsed ? 12 : 22,
          paddingRight: collapsed ? 12 : 22,
          paddingTop: collapsed ? 6 : 12,
          paddingBottom: collapsed ? 6 : 12,
          scale: collapsed ? 0.90 : isAtTop ? 1 : 0.965,
        }}
        transition={SPRING}
      >

        {/* NAME */}
        <motion.p
          layout="position"
          animate={{ fontSize: collapsed ? "0.78rem" : "1.05rem" }}
          transition={SPRING}
          className="font-semibold tracking-tight text-neutral-900 whitespace-nowrap"
        >
          Dron Pancholi
        </motion.p>

        {/* NAV - ABSOLUTE CENTERED, DOES NOT CHANGE WIDTH */}
        <AnimatePresence initial={false}>
          {showNav && (
            <motion.nav
              key="nav"
              onClick={(e)=>e.stopPropagation()}
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 font-medium text-neutral-800 whitespace-nowrap"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={NAV_IN_OUT}
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