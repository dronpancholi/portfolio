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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ 
        // PREVIEW MATCH: Enforce own layer to prevent repaints affecting neighbors
        transform: 'translate3d(0,0,0)',
        ...props.style 
      }}
      {...props}
    >
      {/* Shine Layer for Card */}
      <div className="glass__shine" aria-hidden="true" />
      
      {/* Content */}
      <div className="glass__content">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;