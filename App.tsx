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
    // Graceful degradation for low-end devices
    document.documentElement.style.setProperty("--refraction-scale", "2");
    document.documentElement.style.setProperty("--glass-blur", "12px");
    document.documentElement.style.setProperty("--specular-opacity", "0.55");
  } else {
    // High-end default: Stronger refraction and blur
    document.documentElement.style.setProperty("--refraction-scale", "6");
  }
}

const App: React.FC = () => {

  useEffect(() => {
    // 1. Run Hardware Optimization
    optimizeForHardware();

    // 2. Setup Pointer Tracking for Liquid Lighting (Apple VisionOS style)
    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const px = Math.round((e.clientX / window.innerWidth) * 100);
        const py = Math.round((e.clientY / window.innerHeight) * 100);
        const root = document.documentElement;
        root.style.setProperty("--mx", `${px}%`);
        root.style.setProperty("--my", `${py}%`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    
    // Cap DPR to avoid heavy shader work on very-high-dpi devices
    (window as any).CAP_DEVICE_PIXEL_RATIO = Math.min(window.devicePixelRatio || 1, 1.5);
    
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