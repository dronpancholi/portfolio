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
      whileHover={{ y: -5, scale: 1.01 }}
      style={{ 
        // PREVIEW MATCH: Enforce own layer to prevent repaints affecting neighbors
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