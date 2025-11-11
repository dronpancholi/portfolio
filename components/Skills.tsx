import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { SKILLS_DATA } from '../constants';
import { Briefcase, Code, Database, BrainCircuit, Bot } from 'lucide-react';

// FIX: Derive a strict type for icon names from the constants and use a Record to ensure type safety for the icons object. This resolves the 'Type 'string' is not assignable to type 'never'' error.
type SkillIconName = typeof SKILLS_DATA[number]['icon'];
const icons: Record<SkillIconName, React.ElementType> = {
  ai: BrainCircuit,
  frontend: Code,
  backend: Database,
  fullstack: Briefcase,
  tools: Bot,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        My Technical Stack
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS_DATA.map((category, index) => {
          const Icon = icons[category.icon];
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="h-full">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    {Icon && <Icon className="w-8 h-8 mr-4 text-[var(--accent)]" />}
                    <h3 className="text-xl font-bold text-[var(--text-main)]">{category.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="bg-black/5 text-[var(--text-secondary)] text-sm font-medium px-3 py-1 rounded-full"
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
      </div>
    </section>
  );
};

export default Skills;