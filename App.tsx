import React, { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import { ThemeProvider } from './contexts/ThemeContext';
import LiquidFilters from './components/ui/LiquidFilters';
import PerformanceOptimizedBackground from './components/ui/PerformanceOptimizedBackground';
import BetaAlert from './components/ui/BetaAlert';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {

  useEffect(() => {
    // 60FPS Throttled mouse tracking for global glass sheen
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = Math.round((e.clientX / window.innerWidth) * 100) + "%";
          const y = Math.round((e.clientY / window.innerHeight) * 100) + "%";
          document.documentElement.style.setProperty("--mx", x);
          document.documentElement.style.setProperty("--my", y);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Mobile fallback quality settings
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      document.documentElement.style.setProperty("--refraction-scale", "15");
      document.documentElement.style.setProperty("--glass-blur", "18px");
      document.documentElement.style.setProperty("--glass-mag", "1.08");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative isolate min-h-screen selection:bg-emerald-500/30">
        <PerformanceOptimizedBackground />
        <LiquidFilters />
        
        <BetaAlert />

        <Header />
        <main className="container mx-auto px-6 md:px-12 pt-28 overflow-visible">
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