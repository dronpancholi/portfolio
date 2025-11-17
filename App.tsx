import React, { Suspense, lazy, useEffect } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import { ThemeProvider } from './contexts/ThemeContext';
import LiquidFilters from './components/ui/LiquidFilters';
import HeaderPillGlassFilter from './components/ui/HeaderPillGlassFilter';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {

  // Subtle pointer-driven highlight for more “liquid” feel
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let ticking = false;

    const handleMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!ticking) {
        ticking = true;

        requestAnimationFrame(() => {
          // Convert to % only once, no reflows, no expensive math
          const px = (lastX / window.innerWidth) * 100;
          const py = (lastY / window.innerHeight) * 100;

          // Write to GPU-accelerated CSS variables
          const root = document.documentElement;
          root.style.setProperty("--mx", `${px}%`);
          root.style.setProperty("--my", `${py}%`);

          ticking = false;
        });
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <div className="bg-[var(--bg-base)] text-[var(--text-main)] selection:bg-[var(--accent)]/30 min-h-screen">
          <LiquidFilters />
          <HeaderPillGlassFilter />
          <Header />
          <main className="container mx-auto px-6 md:px-8 pt-24 relative z-10">
            <Hero />
            <Suspense fallback={<Loader />}>
              <About />
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LazyMotion>
  );
};

export default App;