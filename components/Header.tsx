import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";
import LiquidGlass from "./ui/LiquidGlass";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 12;
      setIsAtTop(atTop);
      if (!atTop && isExpanded) setIsExpanded(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isExpanded]);

  const toggleExpanded = useCallback(() => {
    if (!isAtTop) setIsExpanded(v => !v);
  }, [isAtTop]);

  const headerSpring = {
    type: "spring",
    stiffness: 400,
    damping: 28,
    mass: 0.8
  } as const;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none px-4">
      <LiquidGlass
        className="pointer-events-auto cursor-pointer"
        displacementScale={isAtTop ? 12 : isExpanded ? 45 : 28}
        blurAmount={isAtTop ? 14 : isExpanded ? 36 : 22}
        magnification={1.1}
        elasticity={0.6}
        cornerRadius={999}
        padding={isAtTop ? "12px 28px" : "10px 20px"}
        onClick={toggleExpanded}
        proxy={
          <div className="flex items-center gap-10 py-4 opacity-40 blur-sm">
             <div className="w-20 h-4 bg-white/40 rounded-full" />
             <div className="w-32 h-4 bg-white/40 rounded-full" />
          </div>
        }
      >
        <div className="flex items-center gap-6 relative overflow-hidden">
          <motion.p 
            layout
            className="font-bold tracking-tighter text-base md:text-lg text-[var(--text-main)]"
          >
            Dron Pancholi
          </motion.p>
          
          <AnimatePresence mode="popLayout">
            {(isAtTop || isExpanded) && (
              <motion.nav
                key="header-nav"
                initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 5, filter: 'blur(5px)', transition: { duration: 0.15 } }}
                transition={headerSpring}
                className="hidden lg:flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-[var(--text-secondary)]"
              >
                <div className="w-[1px] h-3 bg-current opacity-20 mx-2" />
                <a href="#about" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">About</a>
                <a href="#skills" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Skills</a>
                <a href="#projects" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Projects</a>
                <a href="#contact" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Contact</a>
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div layout>
            <ThemeToggle />
          </motion.div>
        </div>
      </LiquidGlass>
    </div>
  );
}