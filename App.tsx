



import React, { Suspense, lazy, useEffect } from 'react';
// FIX: Import LazyMotion and domAnimation to enable framer-motion features.
// This resolves TypeScript errors across the app where motion props were not recognized.
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import HeaderPillGlassFilter from './components/ui/HeaderPillGlassFilter';
import { ThemeProvider } from './contexts/ThemeContext';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {

  // Subtle pointer-driven highlight for more “liquid” feel
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <div className="bg-[var(--bg-base)] text-[var(--text-main)] selection:bg-[var(--accent)]/30 min-h-screen">
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