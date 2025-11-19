import React from "react";
import { motion, MotionProps } from "framer-motion";

type GlassCardProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`glass ${className}`}
      // PERFORMANCE OPTIMIZATION:
      // Only animate transform and opacity. 
      // Avoid animating box-shadow or backdrop-filter on hover as it triggers repaints.
      whileHover={{ 
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      // Force GPU layer creation
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;