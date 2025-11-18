import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const PARTICLE_COUNT = 20;

const COLORS = [
  'var(--particle-color-1)',
  'var(--particle-color-2)',
  'var(--particle-color-3)',
  'var(--particle-color-4)',
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const DynamicParticleBackground: React.FC = () => {
  const { theme } = useTheme();

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: random(5, 95),
      y: random(5, 95),
      size: random(40, 150),
      color: COLORS[i % COLORS.length],
      duration: random(25, 50),
      delay: random(0, 15),
    }));
  }, []);

  // We add a key to the parent div to force a re-render when the theme changes.
  // This is a simple way to make sure the new CSS color variables are picked up by the particles.
  return (
    <div key={theme} className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: 0.3,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, random(-100, 100), 0, random(-100, 100), 0],
            y: [0, random(-100, 100), 0, random(-100, 100), 0],
            scale: [1, random(0.8, 1.2), 1, random(0.8, 1.2), 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default DynamicParticleBackground;
