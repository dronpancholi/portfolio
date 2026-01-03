import React, { memo, useRef } from 'react';
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface LiquidGlassProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  magnification?: number;
  saturation?: number;
  elasticity?: number;
  cornerRadius?: number;
  padding?: string | number;
  proxy?: React.ReactNode; 
  className?: string;
}

const LiquidGlass: React.FC<LiquidGlassProps> = memo(({
  children,
  displacementScale = 50,
  blurAmount = 36,
  magnification = 1.15,
  saturation = 190,
  elasticity = 0.5,
  cornerRadius = 9999,
  padding = "16px 32px",
  proxy,
  className = "",
  onClick,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance spring config for "liquid" feel
  const springConfig = { stiffness: 420, damping: 28, mass: 1 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const dynamicStyle = {
    "--refraction-scale": displacementScale,
    "--glass-blur": `${blurAmount}px`,
    "--glass-mag": magnification,
    "--glass-saturation": `${saturation}%`,
    borderRadius: cornerRadius,
    padding: padding,
    ...style
  } as React.CSSProperties;

  return (
    <motion.div
      ref={containerRef}
      className={`liquid-pill gpu-layer group ${className}`}
      style={{
        ...dynamicStyle,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", ...springConfig }}
      {...props}
    >
      {/* 1. Refraction Layer with Lens Magnification */}
      {proxy && (
        <div className="liquid-pill__proxy" aria-hidden="true">
          <div 
            className="w-full h-full"
            style={{ 
              filter: 'url(#liquidRefractionMax)', 
              WebkitFilter: 'url(#liquidRefractionMax)',
              transform: 'translateZ(0)' 
            }}
          >
            {proxy}
          </div>
        </div>
      )}

      {/* 2. Specular Light Blending */}
      <div className="liquid-pill__shine" />
      
      {/* 3. Surface Tension Border (Internal Rim Light) */}
      <div className="absolute inset-0 border border-white/40 dark:border-white/10 rounded-[inherit] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 4. Foreground Content (Floats on Z-Axis) */}
      <div 
        className="liquid-pill__content"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
});

export default LiquidGlass;