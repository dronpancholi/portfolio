
import React, { useEffect, useRef, useState, useCallback } from "react";
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

  // High-performance bouncy spring physics
  const spring = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    mass: 1
  } as const;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        className="
          pointer-events-auto relative flex items-center justify-center 
          cursor-pointer select-none overflow-hidden
          bg-white/60 dark:bg-black/60
          backdrop-blur-xl saturate-150
          border border-white/40 dark:border-white/10
        "
        // CSS-based liquid effect (Inset shadows mimic volume/refraction without SVG cost)
        style={{
          boxShadow: '0 8px 32px -4px rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.3), inset 0 -1px 0 0 rgba(0,0,0,0.05)',
        }}
        variants={{
          top:       { padding: "12px 24px", borderRadius: "9999px", scale: 1 },
          expanded:  { padding: "12px 24px", borderRadius: "24px", scale: 1 },
          collapsed: { padding: "8px 16px", borderRadius: "9999px", scale: 0.95 }
        }}
        initial={false}
        animate={state}
        transition={spring}
      >
        {/* Shine Layer */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(255,255,255,0.4)_0%,transparent_40%)] mix-blend-overlay" />
        
        <div className="relative z-10 flex items-center justify-center gap-4">
          <motion.p
            layout
            animate={{ 
              fontSize: state === "collapsed" ? "0.875rem" : "1rem",
              fontWeight: state === "collapsed" ? 600 : 700
            }}
            transition={spring}
            className="tracking-tight text-[var(--text-main)] whitespace-nowrap"
          >
            Dron Pancholi
          </motion.p>
          
          <AnimatePresence mode="popLayout">
            {(state === "top") && (
              <motion.div 
                key="theme-toggle"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={spring}
                onClick={(e) => e.stopPropagation()}
                className="ml-2"
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {(state === "top" || state === "expanded") && (
              <motion.nav
                key="nav"
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                transition={{
                  ...spring,
                  staggerChildren: 0.05
                }}
                className="flex items-center gap-1 sm:gap-2"
              >
                {[
                  { href: "#about", label: "About" },
                  { href: "#projects", label: "Projects" },
                  { href: "#skills", label: "Skills" },
                  { href: "#contact", label: "Contact" }
                ].map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}
