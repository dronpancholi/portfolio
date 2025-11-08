import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { SKILLS_DATA } from '../constants';
import { Briefcase, Code, Database, BrainCircuit, Bot } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  frontend: Code,
  backend: Database,
  fullstack: Briefcase,
  ai: BrainCircuit,
  tools: Bot,
};

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 15 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="skills" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-eerie-black mb-12 text-center tracking-tight"
      >
        My Technical Stack
      </motion.h2>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1500px',
        }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {SKILLS_DATA.map((category, index) => {
            const Icon = icons[category.icon];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <GlassCard className="h-full">
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      {Icon && <Icon className="w-8 h-8 mr-4 text-saffron" />}
                      <h3 className="text-xl font-bold text-eerie-black">{category.title}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {/* FIX: Removed redundant Array.from(). .map() can be called directly on readonly arrays. */}
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="bg-silver/60 text-jet text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;