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

/**
 * MAX LIQUID GLASS ENGINE v4.0
 * 
 * Performance: GPU-accelerated via `rotateX`, `rotateY`, and `translateZ`.
 * Optics: Simulates magnification (var(--glass-mag)) and refraction (SVG Filter).
 * Interaction: 3D parallax tilt based on mouse position.
 */
const LiquidGlass: React.FC<LiquidGlassProps> = memo(({
  children,
  displacementScale = 45,
  blurAmount = 32,
  magnification = 1.18,
  saturation = 180,
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
  
  // Interactive 3D tilt logic
  const springConfig = { stiffness: 260, damping: 24, mass: 0.9 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-12, 12]), springConfig);

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
      className={`liquid-glass-container gpu-layer group ${className}`}
      style={{
        ...dynamicStyle,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.5 } }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* 1. Magnified Refraction Buffer */}
      {proxy && (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div 
            className="liquid-glass-refraction" 
            style={{ 
              filter: 'url(#liquidRefractionMax)', 
              WebkitFilter: 'url(#liquidRefractionMax)',
            }}
          >
            {proxy}
          </div>
        </div>
      )}

      {/* 2. Dynamic Specular Light Blending */}
      <div className="glass-sheen" />

      {/* 3. Micro-Noise Surface Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 4. Double-Pass Rim Lighting */}
      <div className="absolute inset-0 border border-white/40 dark:border-white/10 rounded-[inherit] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-[-1px] border border-white/20 dark:border-white/5 rounded-[inherit] pointer-events-none" />
      
      {/* 5. Floating Content Layer */}
      <div 
        className="relative z-10 flex items-center justify-center gap-4 text-[var(--text-main)]"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
});

export default LiquidGlass;