
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

type Project = (typeof PROJECTS_DATA)[number];

const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.16,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
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
        className="absolute inset-0"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        transition={{ duration:0.25, ease:"easeOut" }}
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.18), rgba(0,0,0,0.12))" }}
        onClick={onClose}
      />
      
      <GlassCard
        layoutId={`project-card-${project.title}`}
        transition={{ type:"spring", stiffness:360, damping:32, mass:1 }}
        className="relative w-full max-w-3xl z-10"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="p-8 md:p-12 relative max-h-[90vh] overflow-y-auto scrollbar-none">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] p-2 rounded-full hover:bg-black/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Close modal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div variants={contentContainerVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-start mb-4">
              <motion.h3 layoutId={`project-title-${project.title}`} id={`modal-title-${project.title}`} className="text-2xl md:text-3xl font-bold text-[var(--text-main)] pr-12">{project.title}</motion.h3>
              <motion.div variants={contentItemVariants}>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap self-start ${
                  project.status === 'Coming Soon' ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse' : 'bg-black/5 text-[var(--text-secondary)]'
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
                  <span key={tech} className="bg-black/5 text-[var(--text-secondary)] text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
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


const projectCardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hover: {
    y: -8,
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300, damping: 15 },
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
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        Current & Upcoming Projects
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
            viewport={{ once: true, amount: 0.3 }}
            whileTap={{ y: -2, scale: 0.99 }}
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
                      project.status === 'Coming Soon' ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse' : 'bg-black/5 text-[var(--text-secondary)]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <motion.p layoutId={`project-description-${project.title}`} className="text-[var(--text-secondary)] font-light mb-4">{project.description}</motion.p>
                </div>
                
                <div className="mt-auto pt-4">
                  <div 
                    className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors group -ml-2 p-2 rounded-md"
                    aria-hidden="true"
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
          <ProjectModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;