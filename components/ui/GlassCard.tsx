
import React from "react";
import { motion, MotionProps } from "framer-motion";

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`
        group
        rounded-3xl 
        relative 
        overflow-clip 
        shadow-[0_18px_40px_rgba(0,0,0,0.10)]
        border border-white/40 
        bg-white/20 
        backdrop-blur-2xl 
        ${className}
      `}
      {...props}
    >
      {/* LIQUID HIGHLIGHT - Now a pure CSS hover effect */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(440px 320px at 30% 20%, rgba(255,255,255,0.38), rgba(255,255,255,0.12) 50%, transparent 80%)",
          mixBlendMode: "screen",
        }}
      />
      {/* CAUSTIC REFRACTION */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(120% 70% at 80% 20%, rgba(255,255,255,0.16), transparent 60%)",
          mixBlendMode: "overlay"
        }}
      />
      {/* INNER DEPTH */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.40), inset 0 -2px 3px rgba(0,0,0,0.08)"
        }}
      />

      {/* Actual content sits ABOVE all glass layers */}
      <div className="relative z-10 p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
