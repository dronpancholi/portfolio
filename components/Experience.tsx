
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import GlassCard from './ui/GlassCard';
import TiltCard from './ui/TiltCard';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-32 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
          Professional Journey
        </h2>
        <p className="text-[var(--text-secondary)] text-lg font-light">
          Navigating the evolving landscape of intelligence.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Central 3D Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-30 md:-translate-x-1/2" />

        <div className="space-y-12">
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] z-10" />

              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-2rem)]">
                <TiltCard intensity={5} perspective={2000}>
                  <GlassCard className="h-full">
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[var(--text-main)]">
                          {item.company}
                        </h3>
                        <span className="text-xs font-mono font-medium text-[var(--text-secondary)] bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                          {item.period}
                        </span>
                      </div>
                      <div className="text-[var(--accent)] font-medium mb-4 text-sm tracking-wide uppercase">
                        {item.role}
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 font-light">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span 
                            key={t} 
                            className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] border border-[var(--text-secondary)]/20 px-2 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
