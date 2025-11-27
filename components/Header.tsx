import React, { useEffect, useRef, useState, useCallback } from "react";
// FIX: Removed `Transition` import which was causing a module resolution error.
// The `spring` object's type is correctly inferred by TypeScript without explicit annotation.
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";

export default function Header(){
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
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  useEffect(() => {
    const onClick = (e:MouseEvent) => {
      if (!expanded || isAtTop) return;
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e:KeyboardEvent) => { if (expanded && !isAtTop && e.key==="Escape") setExpanded(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, [expanded, isAtTop]);
  
  const onPillClick = useCallback(() => {
    if (!isAtTop) setExpanded(v => !v);
  }, [isAtTop]);

  const state = isAtTop ? "top" : expanded ? "expanded" : "collapsed";

  const filterUrl = state === 'expanded'
    ? 'url(#header-pill-glass-expanded)'
    : 'url(#header-pill-glass)';

  // OPTIMIZED: High-damping spring for buttery smooth, jitter-free transitions
  const spring = {
    type: "spring",
    stiffness: 110,
    damping: 22,
    mass: 1
  } as const;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="glass pointer-events-auto relative flex items-center justify-center cursor-pointer select-none whitespace-nowrap rounded-full"
        variants={{
          top:       { 
            padding: "12px 22px", 
            scale: 1,
            y: 0 
          },
          expanded:  { 
            padding: "10px 18px", 
            scale: 0.98,
            y: 0
          },
          collapsed: { 
            padding: "6px 12px" , 
            scale: 0.92,
            y: 0
          }
        }}
        initial={false}
        animate={state}
        transition={spring}
        aria-label="Primary navigation"
        style={{ transform: "translateZ(0)" }} // Force GPU layer
      >
        {/* Distortion Liquid Layer (inside only) */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{ filter: filterUrl }}
        />

        {/* Liquid Shine Sweep Layer */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[linear-gradient(115deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_65%)] opacity-70 dark:opacity-60 mix-blend-overlay" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-4">
          <motion.p
            layout
            animate={{ fontSize: state==="collapsed" ? "0.74rem" : "1.05rem" }}
            transition={spring}
            className="font-semibold tracking-tight text-[var(--text-main)]"
          >
            Dron Pancholi
          </motion.p>
          
          <AnimatePresence>
            {(state==="top") && (
              <motion.div 
                key="theme-toggle"
                layout="position"
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -5, scale: 0.8, transition: { duration: 0.15 } }}
                transition={spring}
                onClick={(e) => e.stopPropagation()}
                className="ml-auto"
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="popLayout">
            {(state==="top" || state==="expanded") && (
              <motion.nav
                key="nav"
                layout="position"
                onClick={(e)=>e.stopPropagation()}
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9, transition: { duration: 0.1 } }}
                transition={spring}
                className="
                  flex items-center font-medium text-[var(--text-secondary)] 
                  overflow-hidden
                  sm:flex-nowrap flex-wrap
                  sm:gap-0 gap-1
                "
              >
                <a href="#about"    className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">About</a>
                <a href="#projects" className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Projects</a>
                <a href="#skills"   className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Skills</a>
                <a href="#contact"  className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}