
import React from "react";
import { motion, MotionProps } from "framer-motion";

type GlassCardProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`glass glass--panel min-glow ${className}`}
      // Tuned hover for snappiness
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      style={{ 
        transform: 'translate3d(0,0,0)',
        willChange: 'transform', // HINT for GPU
        ...props.style 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;