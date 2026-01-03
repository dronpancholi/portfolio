import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/ThemeToggle";
import LiquidGlass from "./ui/LiquidGlass";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none px-4">
      <LiquidGlass
        className="pointer-events-auto"
        displacementScale={isAtTop ? 12 : 40}
        blurAmount={isAtTop ? 16 : 32}
        magnification={1.1}
        cornerRadius={999}
        padding={isAtTop ? "12px 28px" : "10px 20px"}
        proxy={
          <div className="flex items-center gap-10 py-4 opacity-50 blur-sm">
             <div className="w-20 h-4 bg-white/40 rounded-full" />
             <div className="w-32 h-4 bg-white/40 rounded-full" />
          </div>
        }
      >
        <div className="flex items-center gap-8">
          <motion.p 
            layout
            className="font-bold tracking-tighter text-base md:text-lg"
          >
            Dron Pancholi
          </motion.p>
          
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)]">
            <a href="#about" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">About</a>
            <a href="#skills" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">Skills</a>
            <a href="#projects" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">Projects</a>
            <a href="#contact" className="px-4 py-2 hover:text-[var(--text-main)] transition-colors">Contact</a>
          </div>

          <ThemeToggle />
        </div>
      </LiquidGlass>
    </div>
  );
}