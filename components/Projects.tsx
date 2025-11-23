
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

type Project = (typeof PROJECTS_DATA)[number];

// Tuned for "MacBook-like" snappy yet fluid feel
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1, // Slight delay to let the card expand first
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1, // Fast exit to clear content before card collapses
    }
  }
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.1 }
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      
      {/* 
         NOTE: layoutId matches the grid card. 
         We DO NOT put layoutId on internal text elements to avoid morphing glitches.
      */}
      <GlassCard
        layoutId={`project-card-${project.title}`}
        transition={springTransition}
        className="relative w-full max-w-3xl z-10 overflow-hidden shadow-2xl"
      >
        <div className="p-8 md:p-12 relative max-h-[85vh] overflow-y-auto scrollbar-none">
          <motion.button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div 
            variants={contentContainerVariants} 
            initial="hidden" 
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
              <motion.h3 
                variants={contentItemVariants}
                className="text-3xl md:text-4xl font-bold text-[var(--text-main)]"
              >
                {project.title}
              </motion.h3>
              
              <motion.div variants={contentItemVariants}>
                <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
                  project.status === 'Coming Soon' 
                    ? 'bg-[var(--accent)]/15 text-[var(--accent)]' 
                    : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
                }`}>
                  {project.status}
                </span>
              </motion.div>
            </div>
            
            <motion.p variants={contentItemVariants} className="text-[var(--text-secondary)] font-light text-lg leading-relaxed mb-8">
              {project.longDescription}
            </motion.p>

            <motion.div variants={contentItemVariants} className="mb-8 p-6 bg-black/5 dark:bg-white/5 rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)] mb-4 opacity-70">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map(feature => (
                  <li key={feature} className="flex items-start text-[var(--text-secondary)] font-light">
                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={contentItemVariants} className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)] mb-3 opacity-70">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 text-[var(--text-secondary)] text-sm font-medium px-3 py-1.5 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={contentItemVariants} className="flex flex-wrap gap-4 pt-4 border-t border-black/5 dark:border-white/5">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--text-main)] text-[var(--bg-base)] rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  View Live <ExternalLink size={16} />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/10 text-[var(--text-main)] rounded-xl font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                  Source Code <Github size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const originRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-12 text-center tracking-tight"
      >
        Selected Work
      </motion.h2>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.title}
            layoutId={`project-card-${project.title}`}
            onClick={() => setSelectedProject(project)}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...springTransition, delay: index * 0.1 }}
            className={`cursor-pointer group rounded-[24px] ${selectedProject?.title === project.title ? 'opacity-0' : 'opacity-100'}`}
          >
            <GlassCard className="h-full flex flex-col p-8">
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  {/* No layoutId on text to prevent jitter */}
                  <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    project.status === 'Coming Soon' ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] font-light text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5 flex items-center text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                Learn More <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
