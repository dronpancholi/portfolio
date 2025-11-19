import React from "react";
import { motion, MotionProps } from "framer-motion";

type GlassCardProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  // We remove layoutId/layout props from the default spread to avoid
  // heavy layout thrashing on scroll unless explicitly needed.
  
  return (
    <motion.div
      className={`glass glass--panel ${className}`}
      // GPU Optimization:
      style={{ 
        transformStyle: 'preserve-3d', 
        backfaceVisibility: 'hidden',
        // Default hardware acceleration hint
        transform: 'translateZ(0)', 
        ...props.style
      }}
      // Using simplified variants for better performance on mobile
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;