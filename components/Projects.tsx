import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, X, ExternalLink, Github } from 'lucide-react';
import usePerfMode from '../hooks/usePerfMode';

type Project = (typeof PROJECTS_DATA)[number];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const perf = usePerfMode(); // "high" | "mid" | "low"

  // add body class for css fallback
  useEffect(() => {
    document.documentElement.classList.remove('high-perf','mid-perf','low-perf');
    document.documentElement.classList.add(perf === 'high' ? 'high-perf' : perf === 'mid' ? 'mid-perf' : 'low-perf');
  }, [perf]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const springHigh = { type: 'spring', stiffness: 360, damping: 32, mass: 1 };
  const springLow = { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 };

  // Card animation: use transform-only and smaller springs on low devices
  const cardHover = perf === 'high' ? { y: -8, scale: 1.03 } : { y: -4, scale: 1.015 };
  const cardTransition = perf === 'high' ? springHigh : springLow;

  // Entrance animation: batch simple transform/opacity only
  const cardEntrance = (i: number) => ({
    opacity: [0,1],
    translateY: [30,0],
    transition: { delay: i * 0.06, duration: perf === 'high' ? 0.5 : 0.28, ease: 'easeOut' }
  });

  const openProject = (p: Project, origin: HTMLElement | null) => {
    originRef.current = origin;
    setSelectedProject(p);
  };

  const closeProject = () => {
    setSelectedProject(null);
    originRef.current?.focus?.();
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

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedProject ? 'pointer-events-none' : ''}`}>
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, translateY: 30 }}
            whileInView={cardEntrance(index) as any}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={cardHover}
            transition={cardTransition as any}
            onClick={(e) => openProject(project, e.currentTarget as HTMLElement)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProject(project, e.currentTarget as HTMLElement);
              }
            }}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[24px] project-card gpu-layer"
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${project.title}`}
          >
            <GlassCard layoutId={perf === 'high' ? `project-card-${project.title}` : undefined} className="h-full group">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 layoutId={perf === 'high' ? `project-title-${project.title}` : undefined} className="text-xl font-bold text-[var(--text-main)]">{project.title}</motion.h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.status === 'Coming Soon' ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse' : 'bg-black/5 dark:bg-white/5 text-[var(--text-secondary)]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <motion.p layoutId={perf === 'high' ? `project-description-${project.title}` : undefined} className="text-[var(--text-secondary)] font-light mb-4">{project.description}</motion.p>
                </div>

                <div className="mt-auto pt-4">
                  <div className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors group -ml-2 p-2 rounded-md" aria-hidden="true">
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
          <ProjectModalSafe
            project={selectedProject}
            onClose={closeProject}
            perf={perf}
            reducedMotion={Boolean(reduceMotion)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Modal (safe) ---------- */

function ProjectModalSafe({ project, onClose, perf, reducedMotion }: {
  project: Project;
  onClose: () => void;
  perf: "high"|"mid"|"low";
  reducedMotion: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const overlayTransition = { duration: 0.22, ease: "easeOut" as const };
  const modalSpring = perf === 'high' ? { type:"spring" as const, stiffness:360, damping:32 } : { type:"spring" as const, stiffness:160, damping:26 };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <motion.div
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-3xl z-10 gpu-layer"
        initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98, translateY: 16 }}
        animate={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, translateY: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        transition={modalSpring}
        style={{ backfaceVisibility: 'hidden' }}
        aria-labelledby={`modal-title-${project.title}`}
        aria-describedby={`modal-desc-${project.title}`}
      >
        <GlassCard className="relative max-h-[90vh] overflow-y-auto scrollbar-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="p-8 md:p-12">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 text-[var(--text-secondary)] p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" aria-label="Close modal">
              <X size={22} />
            </button>

            <h3 id={`modal-title-${project.title}`} className="text-2xl md:text-3xl font-bold text-[var(--text-main)] pr-12 mb-4">{project.title}</h3>
            <p id={`modal-desc-${project.title}`} className="text-[var(--text-secondary)] font-light text-base md:text-lg leading-relaxed mb-6">{project.longDescription}</p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-[var(--text-main)] mb-3">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] font-light">
                {project.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-[var(--text-main)] mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => <span key={tech} className="bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] text-sm font-medium px-3 py-1 rounded-full">{tech}</span>)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">View Live Demo <ExternalLink className="w-4 h-4 ml-1.5" /></a>}
              {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Source Code <Github className="w-4 h-4 ml-1.5" /></a>}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}