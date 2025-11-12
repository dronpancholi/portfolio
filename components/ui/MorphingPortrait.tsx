
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MorphingPortrait: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Track mouse position as a motion value
  const mouseX = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 18 });

  // Translate mouseX (0 → 1) into mask gradient position (0% → 100%)
  const maskPosition = useTransform(springX, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5); // reset to center when mouse leaves
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer shadow-2xl shadow-black/10"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* Base image (real) */}
      <img
        src="https://i.ibb.co/RFn5HJY/headshot.jpg"
        alt="Dron Pancholi Real Portrait"
        className="absolute inset-0 w-full h-full object-cover select-none"
      />

      {/* Animated overlay — masked reveal */}
      <motion.img
        src="https://i.ibb.co/Tqr9ntXr/image.jpg"
        alt="Animated Dron Pancholi"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 50%, black 100%)`,
          maskImage: `linear-gradient(to right, transparent 0%, black 50%, black 100%)`,
          WebkitMaskPosition: maskPosition,
          maskPosition: maskPosition as any, // Cast to any to resolve Framer Motion type issue
          WebkitMaskSize: "200%",
          maskSize: "200%",
          transition: "mask-position 0.2s ease-out, -webkit-mask-position 0.2s ease-out",
        }}
      />
    </motion.div>
  );
};

export default MorphingPortrait;
