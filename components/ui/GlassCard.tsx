
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
      // Updated to a softer, more fluid hover state
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
      style={{ 
        transform: 'translate3d(0,0,0)',
        ...props.style 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
