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

  // FIX: Removed explicit `Transition` type to fix type error.
  // TypeScript correctly infers the type from the object literal.
  const spring = {
    type: "spring",
    stiffness: 72,
    damping: 16,
    mass: 1.1
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="pointer-events-auto relative flex items-center justify-center cursor-pointer select-none whitespace-nowrap rounded-full backdrop-blur-2xl bg-white/18 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        variants={{
          top:       { 
            padding: "12px 22px", 
            scale: 1,
          },
          expanded:  { 
            padding: "10px 18px", 
            scale: 0.97,
          },
          collapsed: { 
            padding: "6px 12px" , 
            scale: 0.90,
          }
        }}
        initial={false}
        animate={state}
        transition={spring}
        aria-label="Primary navigation"
      >
        {/* Distortion Liquid Layer (inside only) */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{ filter: "url(#header-pill-glass)" }}
        />

        {/* Depth Highlight Layer */}
        <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_6px_rgba(0,0,0,0.35)]" />

        {/* Liquid Shine Sweep Layer */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[linear-gradient(115deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_33%,rgba(255,255,255,0)_66%)] opacity-35" />
        
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
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.18 } }}
                transition={{ duration: 0.32, ease:[0.22,1,0.36,1], delay: 0.1 }}
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
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6, transition: { duration: 0.18 } }}
                transition={{ duration: 0.32, ease:[0.22,1,0.36,1] }}
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