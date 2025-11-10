
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header(){
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 8;
      setIsAtTop(atTop);
      if (!atTop && expanded) return; // preserve manual expand while scrolled
      if (!atTop) setExpanded(false); // auto-collapse when leaving top
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  // Outside click to collapse when expanded away from top
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

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-0 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="glass pointer-events-auto flex items-center justify-center gap-4 sm:gap-5 rounded-full mx-auto cursor-pointer whitespace-nowrap"
        variants={{
          top: {
            padding: "12px 20px",
            scale: 1
          },
          expanded: {
            padding: "10px 18px",
            scale: 0.97
          },
          collapsed: {
            padding: "6px 12px",
            scale: 0.90
          }
        }}
        initial={false}
        animate={state}
        transition={{ type:"spring", stiffness:180, damping:22, mass:1 }}
        aria-label="Primary navigation"
      >
        <motion.p
          layout
          animate={{ fontSize: state==="collapsed" ? "0.78rem" : "1.05rem" }}
          transition={{ type:"spring", stiffness:260, damping:20 }}
          className="font-semibold tracking-tight text-neutral-900 whitespace-nowrap"
        >
          Dron Pancholi
        </motion.p>

        <AnimatePresence initial={false}>
          {(state==="top" || state==="expanded") && (
            <motion.nav
              key="nav"
              onClick={(e)=>e.stopPropagation()}
              className="
                flex items-center font-medium text-neutral-800 
                overflow-hidden
                sm:flex-nowrap flex-wrap
                sm:gap-0 gap-1
              "
              initial={{ opacity:0, x: 6 }}
              animate={{ opacity:1, x: 0 }}
              exit={{ opacity:0, x: 6 }}
              transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
            >
              <a href="#about"    className="px-2 py-1 sm:px-3 hover:text-black transition-colors">About</a>
              <a href="#projects" className="px-2 py-1 sm:px-3 hover:text-black transition-colors">Projects</a>
              <a href="#skills"   className="px-2 py-1 sm:px-3 hover:text-black transition-colors">Skills</a>
              <a href="#contact"  className="px-2 py-1 sm:px-3 hover:text-black transition-colors">Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}