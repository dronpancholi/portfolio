
import React from 'react';
import { motion } from 'framer-motion';

const FloatingGeometries: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none perspective-[1000px]">
      {/* Abstract Shape 1: Top Right */}
      <motion.div 
        className="absolute top-[10%] -right-[5%] w-64 h-64 md:w-96 md:h-96 opacity-[0.03] dark:opacity-[0.05]"
        animate={{ 
          rotate: [0, 360],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--text-main)] fill-current">
          <path d="M100 0 L186.6 50 L186.6 150 L100 200 L13.4 150 L13.4 50 Z" />
        </svg>
      </motion.div>

      {/* Abstract Shape 2: Bottom Left */}
      <motion.div 
        className="absolute bottom-[5%] -left-[10%] w-80 h-80 md:w-[30rem] md:h-[30rem] opacity-[0.02] dark:opacity-[0.04]"
        animate={{ 
          rotate: [0, -360],
          y: [0, 30, 0],
        }}
        transition={{ 
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--accent)] stroke-current" fill="none" strokeWidth="1">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
        </svg>
      </motion.div>

       {/* Grid Overlay */}
       <div 
         className="absolute inset-0 opacity-[0.03]"
         style={{
           backgroundImage: `linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)`,
           backgroundSize: '50px 50px',
           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
         }}
       />
    </div>
  );
};

export default FloatingGeometries;
