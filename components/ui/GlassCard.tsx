import React from "react";
import { motion, MotionProps } from "framer-motion";

type GlassCardProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`glass glass--panel ${className}`}
      // Force GPU layer creation to prevent repaints on scroll
      style={{ 
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        ...props.style 
      }}
      // Simplified hover effect to avoid layout thrashing (scale/width/height changes)
      // Only animate transform and opacity
      whileHover={{ 
        y: -4,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;