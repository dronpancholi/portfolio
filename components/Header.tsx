import React, { useEffect, useRef, useState, useCallback } from "react";
// FIX: Import Transition to correctly type the spring animation object.
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

  // FIX: Explicitly define the type of `spring` as `Transition` to fix type error.
  // Without this, TypeScript infers `type` as `string` instead of the literal "spring".
  const spring: Transition = {
    type: "spring",
    stiffness: 72,
    damping: 16,
    mass: 1.1
  };

  const blurFor = (state: string) =>
    state === "collapsed"
      ? "var(--glass-blur-min)"
      : "var(--glass-blur)";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="glass pointer-events-auto flex items-center justify-center gap-4 rounded-full cursor-pointer select-none whitespace-nowrap"
        // FIX: Removed `WebkitBackdropFilter` from variants to resolve type errors,
        // as it's not a valid property in framer-motion's `Variant` type.
        variants={{
          top:       { 
            padding: "12px 22px", 
            scale: 1, 
            backdropFilter: `blur(var(--glass-blur)) saturate(180%)`,
          },
          expanded:  { 
            padding: "10px 18px", 
            scale: 0.97, 
            backdropFilter: `blur(var(--glass-blur)) saturate(180%)`,
          },
          collapsed: { 
            padding: "6px 12px" , 
            scale: 0.90, 
            backdropFilter: `blur(var(--glass-blur-min)) saturate(180%)`,
          }
        }}
        initial={false}
        animate={state}
        transition={spring}
        aria-label="Primary navigation"
      >
        <motion.p
          layout
          animate={{ fontSize: state==="collapsed" ? "0.74rem" : "1.05rem" }}
          transition={spring}
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
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6, transition: { duration: 0.18 } }}
              transition={{ duration: 0.32, ease:[0.22,1,0.36,1] }}
              className="
                flex items-center font-medium text-neutral-800 
                overflow-hidden
                sm:flex-nowrap flex-wrap
                sm:gap-0 gap-1
              "
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