
import React, { Suspense, lazy, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const springConfig = { damping: 100, stiffness: 150, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const backgroundPositionX = useTransform(smoothMouseX, [0, window.innerWidth], ["0%", "100%"]);
  const backgroundPositionY = useTransform(smoothMouseY, [0, window.innerHeight], ["0%", "100%"]);
  
  const { scrollY } = useScroll();
  const bgGradientY = useTransform(scrollY, [0, 1000], [0, 150]);
  const bgPatternY = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      document.querySelectorAll(".liquid-glass").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty("--mx", `${x}px`);
        htmlEl.style.setProperty("--my", `${y}px`);

        // Smooth 3D tilt angles
        const rx = (y - rect.height / 2) / 26;
        const ry = -(x - rect.width / 2) / 26;
        htmlEl.style.setProperty("--rx", `${rx}deg`);
        htmlEl.style.setProperty("--ry", `${ry}deg`);
      });
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div 
      className="bg-mist text-jet selection:bg-saffron/30 min-h-screen"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Ambient background lighting */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${backgroundPositionX} ${backgroundPositionY}, rgba(245, 203, 92, 0.05), transparent 80%)`,
          y: bgGradientY,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(1200px circle at 50% 0%, rgba(232, 235, 239, 0.5), transparent 80%)`,
          y: bgGradientY,
        }}
      />
      
      <motion.div 
        className="fixed inset-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23E8EBEF%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50 -z-20"
        style={{ y: bgPatternY }}
      ></motion.div>

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