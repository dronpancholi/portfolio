import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };


  return (
    <>
      <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`liquid-glass fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-pearl/12 backdrop-blur-[34px] saturate-[190%] brightness-[1.10]`}
      >
        <div
          className={`flex items-center justify-between relative transition-all duration-300 ${
            scrolled ? 'py-2 px-6' : 'py-3 px-6'
          }`}
        >
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-lg font-semibold tracking-tight text-eerie-black z-10">
            Dron Pancholi
          </a>
          <ul className="hidden md:flex items-center space-x-1 z-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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
                    onClick={(e) => handleNavClick(e, link.href)}
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