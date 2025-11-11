import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../constants';
import LiquidGlassFilter from './ui/LiquidGlassFilter';

const Skills: React.FC = () => {
  const skills = useMemo(() => SKILLS_DATA.flatMap(category => category.skills), []);
  const numSkills = skills.length;
  const sphereRadius = 280;

  const positions = useMemo(() => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < numSkills; i++) {
      const y = 1 - (i / (numSkills - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push({ x, y, z });
    }
    return points;
  }, [numSkills]);

  return (
    <section id="skills" className="py-16 md:py-24 scroll-mt-24 overflow-hidden">
      <LiquidGlassFilter />
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        My Technical Stack
      </motion.h2>

      <div className="flex justify-center items-center h-[500px] w-full" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d', width: `${sphereRadius*2}px`, height: `${sphereRadius*2}px` }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          {skills.map((skill, index) => {
            const { x, y, z } = positions[index];
            return (
              <motion.div
                key={skill}
                className="absolute top-1/2 left-1/2"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateX(-50%) translateY(-50%) translateX(${x * sphereRadius}px) translateY(${y * sphereRadius}px) translateZ(${z * sphereRadius}px)`,
                }}
                whileHover={{ scale: 1.2, zIndex: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div
                  className="glass glass--panel !rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap cursor-default"
                  style={{
                    filter: 'url(#liquid-glass)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {skill}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
