
import React, { memo, useRef } from 'react';
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * LIQUID GLASS PROPS (Template Standard)
 * @param children Visible foreground elements.
 * @param proxy Refracted background elements (simulated depth).
 * @param magnification Scale of the refracted layer (1.0 = flat).
 * @param elasticity Bounce factor (0.1 = rigid, 1.0 = highly fluid).
 */
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
  magnification = 1.22,
  saturation = 190,
  elasticity = 0.5,
  cornerRadius = 48,
  padding = "24px 48px",
  proxy,
  className = "",
  onClick,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-elasticity spring configuration
  // stiffness: 420 for snappy response, damping: 28 for organic decay
  const springConfig = { stiffness: 420 * (1 - elasticity * 0.2), damping: 28 + (elasticity * 10), mass: 1 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-14, 14]), springConfig);

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
      // Fixed: Moved rotateX and rotateY into the style prop to comply with Framer Motion typing
      style={{
        ...dynamicStyle,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", ...springConfig }}
      {...props}
    >
      {/* Stage 1: Optical Refraction Layer */}
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

      {/* Stage 2: Specular Tracking Highlight */}
      <div className="glass-sheen" />

      {/* Stage 3: Surface Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Stage 4: Double-Layer Inner Rim Lighting */}
      <div className="absolute inset-0 border border-white/50 dark:border-white/10 rounded-[inherit] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Stage 5: Depth-Injected Content */}
      <div 
        className="relative z-10 flex items-center justify-center gap-4"
        style={{ transform: "translateZ(40px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
});

export default LiquidGlass;
