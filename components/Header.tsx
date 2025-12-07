import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";

export default function Header(){
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [filterId, setFilterId] = useState("header-pill-glass");

  // Scroll detection
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

  // Click outside and Escape key
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
  
  // Choose expanded filter when at top or expanded
  useEffect(()=> setFilterId(isAtTop || expanded ? "header-pill-glass-expanded" : "header-pill-glass"), [isAtTop, expanded]);

  // Pointer-driven highlight updates — rAF throttled
  useEffect(()=>{
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        const x = Math.round((e.clientX / window.innerWidth) * 100) + "%";
        const y = Math.round((e.clientY / window.innerHeight) * 100) + "%";
        document.documentElement.style.setProperty("--mx", x);
        document.documentElement.style.setProperty("--my", y);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  },[]);

  // Runtime capability clamp: reduce effect on low-end devices
  useEffect(()=>{
    const isLowEnd = (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // prefer-reduced-motion respects user; else clamp automatically for low-end
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || isLowEnd || dpr > 1.6) {
      document.documentElement.style.setProperty("--refraction-scale", "3");
      document.documentElement.style.setProperty("--glass-blur", "14px");
    } else {
      document.documentElement.style.setProperty("--refraction-scale", "20");
      document.documentElement.style.setProperty("--glass-blur", "26px");
    }
  },[]);

  const onPillClick = useCallback(() => {
    if (!isAtTop) setExpanded(v => !v);
  }, [isAtTop]);

  const state = isAtTop ? "top" : expanded ? "expanded" : "collapsed";

  const spring = {
    type: "spring",
    stiffness: 220, 
    damping: 22
  } as const;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.div
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="header-pill pointer-events-auto cursor-pointer select-none whitespace-nowrap"
        style={{
          // Apply SVG filter via CSS `filter` — switch filter ID based on state
          filter: `url(#${filterId})`,
          WebkitFilter: `url(#${filterId})`,
          backfaceVisibility: "hidden",
        }}
        variants={{
          top:       { 
            padding: "12px 22px", 
            scale: 1,
          },
          expanded:  { 
            padding: "10px 18px", 
            scale: 0.98,
          },
          collapsed: { 
            padding: "6px 12px" , 
            scale: 0.92,
          }
        }}
        initial={false}
        animate={state}
        transition={spring}
      >
        {/* Proxy Layer: Rendered inside the pill but visually behind content via z-index */}
        <div className="header-pill__proxy" aria-hidden="true">
          <div
            className="header-pill__proxyInner"
            style={{ filter: `url(#${filterId})`, WebkitFilter: `url(#${filterId})` }}
          />
        </div>

        {/* Shine Layer: Specular Highlights */}
        <div className="header-pill__shine" />

        {/* Content Layer: Icons and Text */}
        <div className="header-pill__content">
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
                <a href="#skills"   className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Skills</a>
                <a href="#projects" className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Projects</a>
                <a href="#contact"  className="px-2 sm:px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}