

import React, { useEffect, useRef, useState, useCallback } from "react";
// FIX: Import the `Transition` type from framer-motion to correctly type animation properties.
import { motion, AnimatePresence, Transition } from "framer-motion";

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
    onScroll();
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

  const onPillClick = useCallback(() => { if (!isAtTop) setExpanded(v=>!v); }, [isAtTop]);

  const state = isAtTop ? "top" : expanded ? "expanded" : "collapsed";

  // FIX: Explicitly type `sharedSpring` with the imported `Transition` type. This ensures that properties like `type` are correctly validated against Framer Motion's expected literal types (e.g., "spring"), resolving the "Type 'string' is not assignable" error.
  const sharedSpring: Transition = {
    type: "spring",
    stiffness: 110,   // lower = smoother
    damping: 18,      // higher = less bounce
    mass: 0.9         // natural feel
  };

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-0 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="glass pointer-events-auto flex items-center justify-center rounded-full mx-auto cursor-pointer whitespace-nowrap"
        variants={{
          top:       { padding: "12px 20px", scale: 1   },
          expanded:  { padding: "10px 18px", scale: 0.965 },
          collapsed: { padding: "6px 10px",  scale: 0.90 }
        }}
        initial={false}
        animate={state}
        transition={sharedSpring}
        aria-label="Primary navigation"
      >

        <motion.p
          layout
          animate={{ fontSize: state==="collapsed" ? "0.76rem" : "1.02rem" }}
          transition={sharedSpring}
          className="font-semibold tracking-tight text-neutral-900"
        >
          Dron Pancholi
        </motion.p>

        <AnimatePresence initial={false}>
          {(state==="top" || state==="expanded") && (
            <motion.nav
              key="nav"
              layout
              onClick={(e)=>e.stopPropagation()}
              className="flex items-center font-medium text-neutral-800 overflow-hidden whitespace-nowrap"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#about"    className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">About</a>
              <a href="#projects" className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Projects</a>
              <a href="#skills"   className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Skills</a>
              <a href="#contact"  className="px-2 sm:px-3 py-1.5 hover:text-black transition-colors">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>

      </motion.header>
    </div>
  );
}