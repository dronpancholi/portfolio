import React, { useRef, useState } from "react";
import { motion, MotionProps } from "framer-motion";

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mx, setMx] = useState("50%");
  const [my, setMy] = useState("50%");

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMx(`${x}%`);
    setMy(`${y}%`);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`
        rounded-3xl 
        relative 
        overflow-clip 
        shadow-[0_18px_40px_rgba(0,0,0,0.10)]
        border border-white/40 
        bg-white/20 
        backdrop-blur-2xl 
        ${className}
      `}
      style={
        {
          ["--mx" as any]: mx,
          ["--my" as any]: my
        } as React.CSSProperties
      }
      {...props}
    >
      {/* LIQUID HIGHLIGHT */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(340px 220px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.38), rgba(255,255,255,0.12) 50%, transparent 75%)",
          mixBlendMode: "screen",
          transition: "opacity 0.25s ease"
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
