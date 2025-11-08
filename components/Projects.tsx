
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
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 40 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    // FIX: Add `as const` to ensure the array is typed as a tuple, which is required by framer-motion's `ease` property.
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0, 
    y: 40,
    // FIX: Add `as const` to ensure the array is typed as a tuple, which is required by framer-motion's `ease` property.
    transition: { duration: 0.3, ease: [0.36, 0, 0.66, -0.56] as const } // easeInBack
  }
};

const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
      exit="hidden"
      onClick={onClose}
      className="fixed inset-0 bg-eerie-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full"
      >
        <GlassCard>
          <div className="p-8 md:p-12 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-jet hover:text-saffron transition-colors z-10" aria-label="Close modal">
              <X size={24} />
            </button>

            <motion.div variants={contentContainerVariants} initial="hidden" animate="visible">
              <motion.div variants={contentItemVariants} className="flex justify-between items-start mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-eerie-black pr-4">{project.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap self-start ${
                  project.status === 'Coming Soon' ? 'bg-saffron/20 text-saffron' : 'bg-silver/60 text-jet'
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
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24">
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
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ y: -2, scale: 0.99 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="h-full group hover:!shadow-[0_8px_30px_rgba(36,36,35,0.2),_0_0_20px_rgba(245,203,92,0.4)]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-eerie-black">{project.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.status === 'Coming Soon' ? 'bg-saffron/20 text-saffron' : 'bg-silver/60 text-jet'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-jet font-light mb-4">{project.description}</p>
                </div>
                
                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center text-sm font-semibold text-jet hover:text-saffron transition-colors group"
                    aria-label={`Learn more about ${project.title}`}
                  >
                    Learn More <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
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
