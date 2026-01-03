
import React, { memo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LiquidGlassProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  elasticity?: number;
  cornerRadius?: number;
  padding?: string | number;
  proxy?: React.ReactNode; 
  className?: string;
  // Added explicit types for onClick and style to resolve property-not-found errors during destructuring
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

/**
 * Premium Liquid Glass Component
 * Performance Optimized: Uses CSS Variables and SVG Filters for 60FPS refraction.
 * Includes Layer Promotion for GPU acceleration.
 */
const LiquidGlass: React.FC<LiquidGlassProps> = memo(({
  children,
  displacementScale = 20,
  blurAmount = 26,
  saturation = 160,
  elasticity = 0.4,
  cornerRadius = 9999,
  padding = "12px 24px",
  proxy,
  className = "",
  onClick,
  style,
  ...props
}) => {
  const dynamicStyle = {
    "--refraction-scale": displacementScale,
    "--glass-blur": `${blurAmount}px`,
    borderRadius: cornerRadius,
    padding: padding,
    ...style
  } as React.CSSProperties;

  // Refined Spring Physics: Higher stiffness for professional "snappy" feedback
  const transition = {
    type: "spring",
    stiffness: 400 * (1 - elasticity * 0.3),
    damping: 25 + (elasticity * 5),
    mass: 1,
  };

  return (
    <motion.div
      className={`liquid-glass-container gpu-layer ${className}`}
      style={dynamicStyle}
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={transition}
      {...props}
    >
      {/* Background Refraction Layer */}
      {proxy && (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div 
            className="liquid-glass-refraction" 
            style={{ 
              filter: 'url(#liquidRefraction)', 
              WebkitFilter: 'url(#liquidRefraction)',
              transform: 'translate3d(0,0,0) scale(1.1)' 
            }}
          >
            {proxy}
          </div>
        </div>
      )}

      {/* Surface Specular Highlight */}
      <div 
        className="absolute inset-0 pointer-events-none z-1 opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(120% 100% at var(--mx) var(--my), rgba(255,255,255,0.4), transparent 50%)'
        }}
      />
      
      {/* Content Injection Layer */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        {children}
      </div>
    </motion.div>
  );
});

export default LiquidGlass;
