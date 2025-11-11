
import React, { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import HeaderPillGlassFilter from './components/ui/HeaderPillGlassFilter';

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
  );
};

export default App;