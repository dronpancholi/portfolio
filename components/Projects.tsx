import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';

// Define the Project type for clarity and type safety
// FIX: Changed from `[0]` to `[number]` to correctly type `Project` as a union of all possible project types.
type Project = (typeof PROJECTS_DATA)[number];

// Animation variants for the modal and its content
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2, // Delay to let layout animation start
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};


const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  // Effect to handle closing the modal with the Escape key
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
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 bg-eerie-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        variants={modalContentVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full"
      >
        <GlassCard>
          <div className="p-8 md:p-12 relative">
            <motion.div variants={contentContainerVariants} initial="hidden" animate="visible">
              <motion.div variants={contentItemVariants} className="flex justify-between items-start mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-eerie-black pr-4">{project.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap self-start ${
                  project.status === 'Coming Soon' ? 'bg-saffron/20 text-saffron animate-pulse' : 'bg-silver/60 text-jet'
                }`}>
                  {project.status}
                </span>
              </motion.div>
              
              <motion.p variants={contentItemVariants} className="text-jet font-light text-base md:text-lg leading-relaxed mb-6">{project.longDescription}</motion.p>

              <motion.div variants={contentItemVariants} className="mb-6">
                <h4 className="text-lg font-semibold text-eerie-black mb-3">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-jet font-light">
                  {project.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </motion.div>
              
              <motion.div variants={contentItemVariants} className="mb-8">
                <h4 className="text-lg font-semibold text-eerie-black mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="bg-silver/60 text-jet text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={contentItemVariants} className="flex items-center space-x-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-jet hover:text-saffron transition-colors">
                    View Live Demo <ExternalLink className="w-4 h-4 ml-1.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-jet hover:text-saffron transition-colors">
                    Source Code <Github className="w-4 h-4 ml-1.5" />
                  </a>
                )}
              </motion.div>
              
              <motion.div variants={contentItemVariants} className="flex justify-end mt-8">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-silver/60 text-jet font-semibold rounded-lg hover:bg-silver transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </motion.div>

            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
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


  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-eerie-black mb-12 text-center tracking-tight"
      >
        Current & Upcoming Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${project.title}`}
          >
            <GlassCard className="h-full group hover:!shadow-[0_8px_30px_rgba(36,36,35,0.2),_0_0_20px_rgba(245,203,92,0.4)]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-eerie-black">{project.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.status === 'Coming Soon' ? 'bg-saffron/20 text-saffron animate-pulse' : 'bg-silver/60 text-jet'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-jet font-light mb-4">{project.description}</p>
                </div>
                
                <div className="mt-auto pt-4">
                  <div 
                    className="inline-flex items-center text-sm font-semibold text-jet group-hover:text-saffron transition-colors group -ml-2 p-2 rounded-md"
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
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;