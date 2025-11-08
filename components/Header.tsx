import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    navRef.current.style.setProperty('--mx', `${x}px`);
    navRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
      if (navRef.current) {
          navRef.current.style.setProperty('--mx', '50%');
          navRef.current.style.setProperty('--my', '50%');
      }
  };


  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'p-2' : 'p-4'
        }`}
      >
        <div className="container mx-auto max-w-5xl">
          <nav 
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="liquid-glass flex items-center justify-between p-3 px-6 relative"
          >
            <a href="#home" className="text-lg font-semibold tracking-tight text-eerie-black z-10">
              Dron Pancholi
            </a>
            <ul className="hidden md:flex items-center space-x-1 z-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm text-jet hover:text-eerie-black rounded-lg transition-colors duration-200 relative"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="md:hidden z-10">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-jet p-2"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-saffron rounded-r-full"
              style={{
                scaleX,
                transformOrigin: '0%',
                boxShadow: '0 0 10px #f5cb5c, 0 0 5px #f5cb5c',
              }}
            />
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-mist z-40 md:hidden"
          >
            <motion.ul
                initial={{ y: '-10%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-10%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center h-full space-y-6 pt-28"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-2xl font-medium text-jet hover:text-saffron transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;