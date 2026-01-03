import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";
import LiquidGlass from "./ui/LiquidGlass";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 20;
      setIsAtTop(atTop);
      if (!atTop && isExpanded) setIsExpanded(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isExpanded]);

  const toggleExpanded = useCallback(() => {
    if (!isAtTop) setIsExpanded(prev => !prev);
  }, [isAtTop]);

  // Max Elastic Spring Configuration
  const headerSpring = {
    type: "spring",
    stiffness: 450,
    damping: 30,
    mass: 0.8
  } as const;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none px-4">
      <LiquidGlass
        className="pointer-events-auto cursor-pointer"
        displacementScale={isAtTop ? 15 : isExpanded ? 50 : 35}
        blurAmount={isAtTop ? 18 : isExpanded ? 36 : 24}
        magnification={1.12}
        elasticity={0.7}
        cornerRadius={999}
        padding={isAtTop ? "12px 32px" : "10px 24px"}
        onClick={toggleExpanded}
        transition={headerSpring}
        proxy={
          <div className="flex items-center gap-10 py-4 opacity-40 blur-md select-none">
             <div className="w-24 h-5 bg-white/40 rounded-full" />
             <div className="w-40 h-5 bg-white/40 rounded-full" />
          </div>
        }
      >
        <div className="flex items-center gap-8 relative overflow-hidden">
          {/* Logo/Name with Elastic Morphing */}
          <motion.p 
            layout="position"
            transition={headerSpring}
            className={`font-black tracking-tighter text-base md:text-xl ${isAtTop ? 'opacity-100' : 'opacity-90'}`}
          >
            Dron Pancholi
          </motion.p>
          
          <AnimatePresence mode="popLayout">
            {(isAtTop || isExpanded) && (
              <motion.nav
                key="header-nav"
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(10px)', transition: { duration: 0.15 } }}
                transition={headerSpring}
                className="hidden lg:flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)]"
              >
                <div className="w-4 h-[1px] bg-[var(--text-secondary)]/20 mx-2" />
                <a href="#about" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">About</a>
                <a href="#skills" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">Skills</a>
                <a href="#projects" className="px-2 py-2 hover:text-[var(--text-main)] transition-colors">Projects</a>
                <a href="#contact" className="pl-4 py-2 hover:text-[var(--text-main)] transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div layout transition={headerSpring}>
            <ThemeToggle />
          </motion.div>
        </div>
      </LiquidGlass>
    </div>
  );
}