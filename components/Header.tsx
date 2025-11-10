
import React, { useEffect, useRef, useState, useCallback } from "react";
// FIX: Import the `Transition` type from framer-motion to correctly type animation configurations.
import { motion, AnimatePresence, Transition } from "framer-motion";

// FIX: Explicitly type animation configurations with `Transition`. This prevents TypeScript from widening literal types (e.g., "spring" to `string`) and ensures the `ease` array is treated as a cubic-bezier tuple, resolving type errors.
const SPRING_CONFIG: Transition = { type: "spring", stiffness: 120, damping: 22, mass: 0.95 };
const NAV_TRANSITION: Transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

export default function Header(){
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 10;
      if (atTop !== isAtTop) {
        setIsAtTop(atTop);
        if (!atTop) setExpanded(false); // Collapse when scrolling away from top
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAtTop]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const onEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };
    
    if (expanded) {
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("keydown", onEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscapeKey);
    };
  }, [expanded]);
  
  const onPillClick = useCallback(() => {
    if (!isAtTop) {
      setExpanded(v => !v);
    }
  }, [isAtTop]);

  const state = isAtTop ? "top" : expanded ? "expanded" : "collapsed";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none px-4">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="glass pointer-events-auto flex items-center justify-center gap-4 rounded-full cursor-pointer select-none whitespace-nowrap"
        variants={{
          top:       { 
            padding: "12px 20px",
            scale: 1,
            backdropFilter: `blur(var(--glass-blur)) saturate(180%)`,
          },
          expanded:  { 
            padding: "10px 18px",
            scale: 0.965,
            backdropFilter: `blur(var(--glass-blur)) saturate(180%)`,
          },
          collapsed: { 
            padding: "6px 10px",
            scale: 1,
            backdropFilter: `blur(var(--glass-blur-min)) saturate(180%)`,
          }
        }}
        style={{
          width: state === 'collapsed' ? 'fit-content' : undefined,
          maxWidth: state === 'collapsed' ? '92vw' : undefined
        }}
        initial={false}
        animate={state}
        transition={SPRING_CONFIG}
        aria-label="Primary navigation"
      >
        <motion.p
          layout="position"
          animate={{ fontSize: state==="collapsed" ? "0.78rem" : "1.04rem" }}
          transition={SPRING_CONFIG}
          className="font-semibold tracking-tight text-neutral-900"
        >
          Dron Pancholi
        </motion.p>

        <AnimatePresence initial={false} mode="popLayout">
          {(state==="top" || state==="expanded") && (
            <motion.nav
              key="nav"
              layout="position"
              onClick={(e)=>e.stopPropagation()}
              initial={{ opacity: 0, clipPath: 'inset(0% 50% 100% 50%)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0, clipPath: 'inset(0% 50% 100% 50%)' }}
              transition={NAV_TRANSITION}
              className="
                flex items-center font-medium text-neutral-800 
                overflow-hidden
                sm:flex-nowrap flex-wrap
                sm:gap-0 gap-1
              "
            >
              <a href="#about"    className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors text-sm sm:text-base">About</a>
              <a href="#projects" className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors text-sm sm:text-base">Projects</a>
              <a href="#skills"   className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors text-sm sm:text-base">Skills</a>
              <a href="#contact"  className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors text-sm sm:text-base">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
