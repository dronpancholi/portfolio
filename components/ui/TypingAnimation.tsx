import React, { useEffect } from 'react';
// FIX: Import `Variants` to correctly type the animation variants object.
import { motion, useMotionValue, useTransform, animate, Variants } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

// FIX: Explicitly type `cursorVariants` as `Variants` to resolve the type error.
const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1]
    }
  }
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, as: Component = 'span', className, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * 0.1, // Slower, more premium feel
      ease: "linear",
    });
    return controls.stop;
  }, [text, delay, count]);


  return (
    <Component className={className}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        variants={cursorVariants}
        animate="blinking"
        className="inline-block h-[0.9em] w-[2.5px] translate-y-1 bg-current"
      />
    </Component>
  );
};

export default TypingAnimation;