
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";

export default function Header(){
  const pillRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 20; // Increased threshold slightly
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

  // BUTTERY SMOOTH PHYSICS
  // Overdamped spring to prevent "jitter" at the end of the movement.
  const fluidSpring = {
    type: "spring",
    stiffness: 120,
    damping: 22,
    mass: 1
  } as const;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.header
        ref={pillRef}
        onClick={onPillClick}
        layout
        initial={false}
        animate={state}
        transition={fluidSpring}
        className="relative flex items-center justify-center cursor-pointer select-none overflow-hidden pointer-events-auto"
        variants={{
          top: { 
            width: "auto",
            height: "54px", // Fixed height for consistency
            paddingLeft: "28px",
            paddingRight: "28px",
            borderRadius: "9999px",
            y: 0 
          },
          expanded: { 
            width: "380px", // Fixed width to prevent layout fighting
            height: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
            paddingBottom: "16px",
            borderRadius: "28px",
            y: 0
          },
          collapsed: { 
            width: "auto",
            height: "44px",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "9999px",
            y: 0
          }
        }}
        style={{
          // HIGH PERFORMANCE LIQUID GLASS STYLES
          // Uses pure CSS to mimic the water effect without expensive SVG filters
          backgroundColor: "rgba(255, 255, 255, 0.65)", // Light mode base
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.05),
            0 10px 15px -3px rgba(0, 0, 0, 0.05),
            inset 0 1px 1px rgba(255, 255, 255, 0.8),   /* Top highlight (surface tension) */
            inset 0 -1px 1px rgba(0, 0, 0, 0.05)        /* Bottom shadow (depth) */
          `,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transform: "translateZ(0)" // Force GPU
        }}
      >
        {/* Dark Mode Overrides via CSS class injection logic would be complex with inline styles, 
            so we use a pseudo-element or just rely on global CSS variables if possible.
            However, since we are in a motion component, we can use a simpler approach:
            We will use a class for the dynamic colors.
        */}
        <div className="absolute inset-0 bg-white/50 dark:bg-[#0f141e]/60 transition-colors duration-300" />
        
        {/* Liquid Surface Shine (Gradient Overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-100 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-4">
          <motion.p
            layout="position"
            animate={{ 
              fontSize: state==="collapsed" ? "0.9rem" : "1rem",
              fontWeight: state==="collapsed" ? 600 : 700
            }}
            className="tracking-tight text-gray-900 dark:text-white"
          >
            Dron Pancholi
          </motion.p>
          
          <AnimatePresence mode="popLayout">
            {(state==="top") && (
              <motion.div 
                key="theme-toggle"
                layout="position"
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="ml-auto"
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {(state==="top" || state==="expanded") && (
              <motion.nav
                key="nav"
                layout="position"
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ 
                  opacity: 1, 
                  width: 'auto', 
                  marginLeft: 8,
                  transition: { delay: 0.05, duration: 0.3 }
                }}
                exit={{ 
                  opacity: 0, 
                  width: 0, 
                  marginLeft: 0,
                  transition: { duration: 0.1 } 
                }}
                onClick={(e)=>e.stopPropagation()}
                className="flex items-center gap-1 sm:gap-2 overflow-hidden"
              >
                <div className="w-[1px] h-4 bg-black/10 dark:bg-white/20 mx-1" />
                <a href="#about"    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-2 py-1 transition-colors">About</a>
                <a href="#projects" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-2 py-1 transition-colors">Projects</a>
                <a href="#skills"   className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-2 py-1 transition-colors">Skills</a>
                <a href="#contact"  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-2 py-1 transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}
