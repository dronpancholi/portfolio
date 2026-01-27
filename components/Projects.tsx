
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

type Project = (typeof PROJECTS_DATA)[number];

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 16 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 }
  }
};


const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void; }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={`modal-title-${project.title}`}
      aria-describedby={`modal-desc-${project.title}`}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        transition={{ duration:0.3 }}
        onClick={onClose}
      />
      
      <GlassCard
        layoutId={`project-card-${project.title}`}
        transition={{ type:"spring", stiffness:350, damping:25, mass:0.8 }}
        className="relative w-full max-w-3xl z-10"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="p-8 md:p-12 relative max-h-[90vh] overflow-y-auto scrollbar-none">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Close modal"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.2 } }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div variants={contentContainerVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-start mb-4">
              <motion.h3 layoutId={`project-title-${project.title}`} id={`modal-title-${project.title}`} className="text-2xl md:text-3xl font-bold text-[var(--text-main)] pr-12">{project.title}</motion.h3>
              <motion.div variants={contentItemVariants}>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap self-start ${
                  (project.status as string) === 'Coming Soon' ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse' : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
                }`}>
                  {project.status}
                </span>
              </motion.div>
            </div>
            
            <motion.p layoutId={`project-description-${project.title}`} id={`modal-desc-${project.title}`} className="text-[var(--text-secondary)] font-light text-base md:text-lg leading-relaxed mb-6">{project.longDescription}</motion.p>

            <motion.div variants={contentItemVariants} className="mb-6">
              <h4 className="text-lg font-semibold text-[var(--text-main)] mb-3">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] font-light">
                {project.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
            </motion.div>
            
            <motion.div variants={contentItemVariants} className="mb-8">
              <h4 className="text-lg font-semibold text-[var(--text-main)] mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] cursor-default">{tech}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={contentItemVariants} className="flex items-center space-x-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                  View Live Demo <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                  Source Code <Github className="w-4 h-4 ml-1.5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
};

const projectCardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  }),
  hover: {
    y: -10,
    scale: 1.03,
    transition: { type: 'spring' as const, stiffness: 350, damping: 15 },
  },
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const originRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const handleClose = () => {
    setSelectedProject(null);
    originRef.current?.focus();
  }

  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        Selected Work
      </motion.h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedProject ? 'pointer-events-none' : ''}`}>
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.title}
            custom={index}
            variants={projectCardVariants}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            onClick={(e) => {
              originRef.current = e.currentTarget;
              setSelectedProject(project);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                originRef.current = e.currentTarget;
                setSelectedProject(project);
              }
            }}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[24px]"
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${project.title}`}
          >
            <GlassCard 
              layoutId={`project-card-${project.title}`}
              className="h-full group"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 layoutId={`project-title-${project.title}`} className="text-xl font-bold text-[var(--text-main)]">{project.title}</motion.h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      (project.status as string) === 'Coming Soon' ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse' : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <motion.p layoutId={`project-description-${project.title}`} className="text-[var(--text-secondary)] font-light mb-4">{project.description}</motion.p>
                </div>
                
                <div className="mt-auto pt-4">
                  <div 
                    className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors group -ml-2 p-2 rounded-md"
                    aria-label="Learn more about this project"
                  >
                    Learn More <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <ProjectModal project={selectedProject} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;