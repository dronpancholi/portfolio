import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Smooth the scrollY value for a more fluid animation
  const smoothedScrollY = useSpring(scrollY, {
    stiffness: 200,
    damping: 50,
    mass: 0.5,
  });

  // Define the scroll range for the animation (e.g., from 0px to 120px)
  const scrollRange = [0, 120];

  // Interpolate values based on the smoothed scroll position
  const headerPaddingY = useTransform(smoothedScrollY, scrollRange, [12, 8]); // from py-3 to py-2
  const headerPaddingX = useTransform(smoothedScrollY, scrollRange, [28, 24]); // from a bit more than px-6 to px-6
  const headerBlur = useTransform(smoothedScrollY, scrollRange, [30, 20]);
  const headerSaturate = useTransform(smoothedScrollY, scrollRange, [190, 165]);
  const headerBrightness = useTransform(smoothedScrollY, scrollRange, [1.1, 1.05]);

  // Combine multiple motion values into a single CSS property string
  const backdropFilter = useTransform(
    [headerBlur, headerSaturate, headerBrightness],
    ([blur, saturate, brightness]) => `blur(${blur}px) saturate(${saturate}%) brightness(${brightness})`
  );

  // Mobile menu logic
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
        className="liquid-glass fixed top-6 left-1/2 z-50 rounded-full bg-pearl/12"
        style={{
          backdropFilter: backdropFilter,
          WebkitBackdropFilter: backdropFilter, // For Safari compatibility
        }}
      >
        <motion.div
          className="flex items-center justify-between relative"
          style={{
            paddingTop: headerPaddingY,
            paddingBottom: headerPaddingY,
            paddingLeft: headerPaddingX,
            paddingRight: headerPaddingX,
          }}
        >
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-lg font-semibold tracking-tight text-eerie-black z-10 shrink-0">
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
        </motion.div>
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
