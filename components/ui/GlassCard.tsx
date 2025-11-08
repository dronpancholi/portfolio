import React, { useRef } from 'react';
// FIX: Import `MotionStyle` to explicitly type the style object, preventing type widening issues.
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, MotionProps, MotionStyle } from 'framer-motion';

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  isStatic?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', isStatic = false, style, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const contentScale = useSpring(1, { stiffness: 150, damping: 20 });
  const contentTranslateZ = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Update CSS variables for the glass shine effect
    const xShine = e.clientX - left;
    const yShine = e.clientY - top;
    ref.current.style.setProperty('--mx', `${xShine}px`);
    ref.current.style.setProperty('--my', `${yShine}px`);

    // Update motion values for 3D tilt
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
    
    // Update motion values for content lift
    contentScale.set(1.02);
    contentTranslateZ.set(60);
  };

  const handleMouseLeave = () => {
    if (ref.current) {
        ref.current.style.setProperty('--mx', '50%');
        ref.current.style.setProperty('--my', '50%');
    }
    mouseX.set(0);
    mouseY.set(0);
    contentScale.set(1);
    contentTranslateZ.set(0);
  };
  
  // FIX: Explicitly typing `internalStyles` with `MotionStyle` prevents TypeScript from widening string literal types (e.g., 'preserve-3d') to `string`, ensuring compatibility with `motion.div`'s `style` prop.
  const internalStyles: MotionStyle = {
    transformStyle: 'preserve-3d',
    perspective: '1200px',
    rotateX: isStatic ? 0 : rotateX,
    rotateY: isStatic ? 0 : rotateY,
    willChange: 'transform',
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={isStatic ? undefined : handleMouseMove}
      onMouseLeave={isStatic ? undefined : handleMouseLeave}
      style={{...internalStyles, ...style}}
      className={`liquid-glass ${className}`}
      {...props}
    >
        {/* Content with 3D lift */}
        <motion.div 
            style={{ 
                transform: useMotionTemplate`translateZ(${isStatic ? 0 : contentTranslateZ}px)`,
                scale: isStatic ? 1 : contentScale,
                willChange: 'transform',
            }}
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
            {children}
        </motion.div>
    </motion.div>
  );
};

export default GlassCard;