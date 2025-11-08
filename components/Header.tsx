
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // easeOutQuad
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'p-2' : 'p-4'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <nav className="liquid-glass flex items-center justify-between p-3 px-6 rounded-2xl relative overflow-hidden">
          <a href="#home" className="text-lg font-semibold tracking-tight text-eerie-black">
            Dron Pancholi
          </a>
          <ul className="hidden md:flex items-center space-x-1">
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
           <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-saffron"
            style={{ scaleX, transformOrigin: '0%' }}
          />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
