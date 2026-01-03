
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
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const LiquidGlass: React.FC<LiquidGlassProps> = memo(({
  children,
  displacementScale = 30,
  blurAmount = 32,
  magnification = 1.15,
  saturation = 180,
  elasticity = 0.5,
  cornerRadius = 9999,
  padding = "14px 28px",
  proxy,
  className = "",
  onClick,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive spring physics for the glass "tilt" or "movement"
  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const dynamicStyle = {
    "--refraction-scale": displacementScale,
    "--glass-blur": `${blurAmount}px`,
    "--glass-mag": magnification,
    borderRadius: cornerRadius,
    padding: padding,
    ...style
  } as React.CSSProperties;

  return (
    <motion.div
      ref={containerRef}
      className={`liquid-glass-container gpu-layer group ${className}`}
      // Fixed: rotateX and rotateY (MotionValues) must be passed as props, not inside the style object
      rotateX={rotateX}
      rotateY={rotateY}
      style={{
        ...dynamicStyle,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* 1. Magnified Refraction Layer */}
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

      {/* 2. Interactive Specular Sheen */}
      <div className="glass-sheen" />

      {/* 3. Surface Texture (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 4. Internal Edge Lighting (Rim Light) */}
      <div className="absolute inset-0 border border-white/40 dark:border-white/10 rounded-[inherit] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 5. Content Injection Layer */}
      <div 
        className="relative z-10 flex items-center justify-center gap-4 text-[var(--text-main)]"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
});

export default LiquidGlass;
