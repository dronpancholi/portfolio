import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

type Project = (typeof PROJECTS_DATA)[number];

// Optimized animation variants - purely transform/opacity based
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98 
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      delay: i * 0.1, 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  })
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 } 
  }
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void; }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true">
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <GlassCard
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col z-10 m-0"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="p-6 md:p-10 overflow-y-auto scrollbar-none overscroll-contain">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="mt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-main)]">{project.title}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${
                project.status === 'Coming Soon' 
                  ? 'bg-[var(--accent)]/20 text-[var(--accent)]' 
                  : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 font-light">
              {project.longDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)] mb-3 opacity-70">Features</h4>
                <ul className="space-y-2 text-[var(--text-secondary)] font-light">
                  {project.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)] mb-3 opacity-70">Technology</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] text-sm px-3 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--glass-border)]">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
                  View Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
                  Source Code <Github className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        Selected Work
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => setSelectedProject(project)}
            className="h-full"
          >
            <GlassCard className="h-full flex flex-col cursor-pointer group hover:border-[var(--accent)]/30 transition-colors duration-300">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                  {project.status === 'Coming Soon' && (
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  )}
                </div>
                
                <p className="text-[var(--text-secondary)] font-light mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-[var(--text-secondary)] opacity-70 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowUpRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
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