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

// Capability Detection Helper
function optimizeForHardware() {
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const isLowEnd = memory <= 2 || cores <= 2;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isLowEnd || prefersReduced) {
    document.documentElement.style.setProperty("--refraction-scale", "2");
    document.documentElement.style.setProperty("--glass-blur", "10px");
    document.documentElement.style.setProperty("--specular-opacity", "0.5");
  } else {
    // High-end default
    document.documentElement.style.setProperty("--refraction-scale", "8");
  }
}

const App: React.FC = () => {

  useEffect(() => {
    // 1. Run Hardware Optimization
    optimizeForHardware();

    // 2. Setup Pointer Tracking for Liquid Lighting
    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth) * 100;
        const py = (e.clientY / window.innerHeight) * 100;
        const root = document.documentElement;
        root.style.setProperty("--mx", `${px.toFixed(1)}%`);
        root.style.setProperty("--my", `${py.toFixed(1)}%`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
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