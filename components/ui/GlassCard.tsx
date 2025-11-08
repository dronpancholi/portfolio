import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  isStatic?: boolean; // Prop is kept for compatibility but no longer drives the tilt effect
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', isStatic = false, ...props }) => {
  // All mouse-tracking and transform logic has been removed.
  // The new .liquid-glass CSS and the global pointermove listener in App.tsx now handle the effect.
  
  return (
    <motion.div
      className={`liquid-glass ${className}`}
      {...props}
    >
      {/* The inner div for content lift has been removed for simplification with the new CSS approach. */}
      {children}
    </motion.div>
  );
};

export default GlassCard;