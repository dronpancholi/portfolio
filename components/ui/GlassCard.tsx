import React, { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = React.memo(forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`glass glass--panel min-glow ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
));

GlassCard.displayName = "GlassCard";

export default GlassCard;