import React, { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import { ThemeProvider } from './contexts/ThemeContext';
import LiquidFilters from './components/ui/LiquidFilters';
import HeaderPillGlassFilter from './components/ui/HeaderPillGlassFilter';
import PerformanceOptimizedBackground from './components/ui/PerformanceOptimizedBackground';
import BetaAlert from './components/ui/BetaAlert';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {

  useEffect(() => {
    // Runtime capability clamp
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isLowEnd = (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 2;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || isLowEnd || dpr > 1.6) {
      document.documentElement.style.setProperty("--refraction-scale", "3");
      document.documentElement.style.setProperty("--glass-blur", "14px");
    } else {
      document.documentElement.style.setProperty("--refraction-scale", "20");
      document.documentElement.style.setProperty("--glass-blur", "26px");
    }

    // Pointer-driven highlight updates — rAF throttled
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = Math.round((e.clientX / window.innerWidth) * 100) + "%";
        const y = Math.round((e.clientY / window.innerHeight) * 100) + "%";
        document.documentElement.style.setProperty("--mx", x);
        document.documentElement.style.setProperty("--my", y);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <ThemeProvider>
      <PerformanceOptimizedBackground />
      <div className="relative isolate min-h-screen text-[var(--text-main)] selection:bg-[var(--accent)]/30">
        <LiquidFilters />
        <HeaderPillGlassFilter />
        
        {/* Beta Alert Splash Screen */}
        <BetaAlert />

        <Header />
        <main className="container mx-auto px-6 md:px-8 pt-24">
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