import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

type Project = (typeof PROJECTS_DATA)[number];

/* --- OPTIMIZED VARIANTS --- */
// Removed layoutId from list items to prevent heavy calculations during scroll
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Cubic bezier for smooth settle
    },
  }),
};

const modalContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void; }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <motion.div
        className="relative w-full max-w-3xl z-10 max-h-[85vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <GlassCard className="flex flex-col h-full overflow-hidden !rounded-3xl border border-white/20 shadow-2xl">
           {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[var(--text-main)]" />
          </button>

          {/* Scrollable Content */}
          <div className="p-8 md:p-10 overflow-y-auto scrollbar-none">
            <motion.div variants={modalContentVariants} initial="hidden" animate="visible">
              <div className="flex flex-wrap justify-between items-baseline gap-4 mb-2">
                <h3 className="text-3xl font-bold text-[var(--text-main)]">{project.title}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase ${
                  project.status === 'Coming Soon' ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'bg-gray-100 dark:bg-white/10 text-[var(--text-secondary)]'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light mb-8">
                {project.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3 opacity-80">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map(f => (
                      <li key={f} className="flex items-start text-[var(--text-main)] text-sm">
                        <span className="mr-2 text-[var(--accent)]">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3 opacity-80">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-sm text-[var(--text-main)] border border-black/5 dark:border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
                    Live Demo <ExternalLink size={16} />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
                    Source Code <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 scroll-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-4">Selected Work</h2>
        <div className="h-1 w-20 bg-[var(--accent)] mx-auto rounded-full opacity-80" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer group"
          >
            <GlassCard className="h-full flex flex-col justify-between p-8 !rounded-[24px] transition-colors hover:border-[var(--accent)]/30">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="text-[var(--text-secondary)] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" size={20} />
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map(t => (
                  <span key={t} className="text-xs font-medium text-[var(--text-secondary)] bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs font-medium text-[var(--text-secondary)] px-1 py-1">+</span>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;