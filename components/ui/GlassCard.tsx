import React from "react";
import { motion, MotionProps } from "framer-motion";

// FIX: Changed from an interface extending MotionProps to a type intersection.
// This ensures that all properties from Framer Motion's MotionProps are correctly
// included in the GlassCardProps type, resolving errors where props like 'initial',
// 'layoutId', and 'whileInView' were not recognized.
type GlassCardProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`glass glass--panel min-glow ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
