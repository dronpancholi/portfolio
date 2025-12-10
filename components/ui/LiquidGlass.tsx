import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LiquidGlassProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number; // Kept for API compatibility, can map to other filters if needed
  elasticity?: number;
  cornerRadius?: number;
  padding?: string | number;
  proxy?: React.ReactNode; // The content to be refracted (background)
  className?: string;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  displacementScale = 20,
  blurAmount = 26,
  saturation = 160,
  elasticity = 0.35,
  cornerRadius = 9999,
  padding = "10px 22px",
  proxy,
  className = "",
  onClick,
  style,
  ...props
}) => {
  // Map library props to our CSS variable engine
  const dynamicStyle = {
    "--refraction-scale": displacementScale,
    "--glass-blur": `${blurAmount}px`,
    // We can use saturation in the backdrop filter
    backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    borderRadius: cornerRadius,
    padding: padding,
    ...style
  } as React.CSSProperties;

  // Calculate spring physics based on elasticity (0 to 1)
  // Higher elasticity = lower stiffness, higher damping for "bouncy" feel
  const stiffness = 500 * (1 - elasticity * 0.5); 
  const damping = 20 + (elasticity * 10);

  return (
    <motion.div
      className={`liquid-pill ${className}`}
      style={dynamicStyle}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness, damping }}
      {...props}
    >
        {/* Proxy Layer: Refracts the content passed in 'proxy' */}
        {proxy && (
            <div className="liquid-pill__proxy" aria-hidden="true">
                 <div 
                    className="liquid-pill__proxyInner" 
                    style={{ 
                        filter: 'url(#liquidRefraction)', 
                        WebkitFilter: 'url(#liquidRefraction)',
                        transform: 'translateZ(0)' 
                    }}
                 >
                    {proxy}
                 </div>
            </div>
        )}

        {/* Shine Layer */}
        <div className="liquid-pill__shine" aria-hidden="true" />
        
        {/* Content Layer */}
        <div className="liquid-pill__content">
            {children}
        </div>
    </motion.div>
  );
};

export default LiquidGlass;