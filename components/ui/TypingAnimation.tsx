import React, { useEffect } from 'react';
// FIX: Removed `Variants` from import as it was causing a module resolution error.
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

// FIX: Using `as const` on the entire object caused the keyframe arrays to become `readonly`,
// which is incompatible with framer-motion's types. The fix is to remove `as const`
// from the object and apply it only to properties that need a literal type, such as `ease`.
const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear" as const,
      times: [0, 0.5, 0.5, 1]
    }
  }
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, as: Component = 'span', className, delay = 0 }) => {
  const count = useMotionValue(0);
  // FIX: Explicitly type `latest` as `number` to resolve `unknown` type error.
  const rounded = useTransform(count, (latest: number) => Math.round(latest));
  // FIX: Explicitly type `latest` as `number` to resolve `unknown` type error.
  const displayText = useTransform(rounded, (latest: number) => text.slice(0, latest));

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