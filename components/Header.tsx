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
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
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
          width: "fit-content",
          maxWidth: "92vw"
        }}
        initial={false}
        animate={{
          paddingLeft: collapsed ? 12 : 20,
          paddingRight: collapsed ? 12 : 20,
          paddingTop: collapsed ? 6 : 12,
          paddingBottom: collapsed ? 6 : 12,
          scale: collapsed ? 0.90 : isAtTop ? 1 : 0.965
        }}
        transition={SPRING}
      >
        
        {/* FLEX WRAPPER that fixes spacing + layout */}
        <motion.div
          layout
          className="flex items-center gap-4 overflow-hidden"
          style={{ maxWidth: "100%" }}
        >

          <motion.p
            layout
            animate={{ fontSize: collapsed ? "0.78rem" : "1.05rem" }}
            transition={SPRING}
            className="font-semibold tracking-tight text-neutral-900 whitespace-nowrap"
          >
            Dron Pancholi
          </motion.p>

          <AnimatePresence initial={false}>
            {showNav && (
              <motion.nav
                key="nav"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center font-medium text-neutral-800 whitespace-nowrap"
                initial={{ opacity: 0, clipPath: "inset(0 50% 0 50% round 9999px)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0% round 9999px)" }}
                exit={{ opacity: 0, clipPath: "inset(0 50% 0 50% round 9999px)" }}
                transition={NAV_IN_OUT}
              >
                <a href="#about" className="px-2 sm:px-3 py-1 hover:text-black transition-colors">About</a>
                <a href="#projects" className="px-2 sm:px-3 py-1 hover:text-black transition-colors">Projects</a>
                <a href="#skills" className="px-2 sm:px-3 py-1 hover:text-black transition-colors">Skills</a>
                <a href="#contact" className="px-2 sm:px-3 py-1 hover:text-black transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.header>
    </div>
  );
}