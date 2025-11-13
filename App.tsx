
import React, { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import HeaderPillGlassFilter from './components/ui/HeaderPillGlassFilter';
import { ThemeProvider } from './contexts/ThemeContext';
import LiquidFilters from './components/ui/LiquidFilters';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {

  // Pointer-driven highlight for liquid-glass effects
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = Math.round((e.clientX / window.innerWidth) * 100);
        const y = Math.round((e.clientY / window.innerHeight) * 100);
        document.documentElement.style.setProperty("--mx", `${x}%`);
        document.documentElement.style.setProperty("--my", `${y}%`);
      });
    };
    // Cap devicePixelRatio for performance on heavy effects
    (window as any).CAP_DEVICE_PIXEL_RATIO = Math.min(window.devicePixelRatio || 1, 1.5);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-[var(--bg-base)] text-[var(--text-main)] selection:bg-[var(--accent)]/30 min-h-screen">
        <HeaderPillGlassFilter />
        <LiquidFilters />
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
  );
};

export default App;