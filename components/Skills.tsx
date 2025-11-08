
import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section id="skills" className="py-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight"
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    {Icon && <Icon className="w-8 h-8 mr-4 text-yellow-600" />}
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="bg-gray-200/50 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
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
   