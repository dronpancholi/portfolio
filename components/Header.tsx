import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";
import LiquidGlass from "./ui/LiquidGlass";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <LiquidGlass
        className="pointer-events-auto"
        displacementScale={isAtTop ? 10 : 35}
        blurAmount={isAtTop ? 12 : 32}
        magnification={1.1}
        cornerRadius={999}
        padding={isAtTop ? "10px 24px" : "8px 16px"}
        proxy={
          <div className="flex items-center gap-12 py-4">
             <div className="w-24 h-4 bg-white/20 rounded-full" />
             <div className="w-48 h-4 bg-white/20 rounded-full" />
          </div>
        }
      >
        <div className="flex items-center gap-6">
          <motion.p className="font-bold tracking-tight text-sm md:text-base">
            Dron Pancholi
          </motion.p>
          
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)]">
            <a href="#about" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">About</a>
            <a href="#skills" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Skills</a>
            <a href="#projects" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Projects</a>
            <a href="#contact" className="px-3 py-1.5 hover:text-[var(--text-main)] transition-colors">Contact</a>
          </div>

          <ThemeToggle />
        </div>
      </LiquidGlass>
    </div>
  );
}