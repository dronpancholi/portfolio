import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  isStatic?: boolean; // Kept for compatibility, though tilt is now global.
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', isStatic = false, ...props }) => {
  return (
    <motion.div
      className={`liquid-glass ${className}`}
      {...props}
    >
      {children}
      {/* This element is used to create the liquid ripple effect via CSS. */}
      <div className="ripple-overlay" aria-hidden="true"></div>
    </motion.div>
  );
};

export default GlassCard;