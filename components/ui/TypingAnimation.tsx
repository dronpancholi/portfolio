
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  speed?: number;
}

const cursorVariants = {
  blinking: {
    opacity: [1, 1, 0, 0],
    transition: {
      duration: 0.95,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.6, 0.6, 1]
    }
  }
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ 
  text, 
  as: Component = 'span', 
  className, 
  delay = 0,
  speed = 0.03 
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number) => Math.round(latest));
  const displayText = useTransform(rounded, (latest: number) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * speed,
      ease: "linear",
    });
    return controls.stop;
  }, [text, delay, count, speed]);


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
