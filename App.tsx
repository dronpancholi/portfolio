
import React, { Suspense, lazy } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

const App: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const backgroundPositionX = useTransform(smoothMouseX, [0, window.innerWidth], ["0%", "100%"]);
  const backgroundPositionY = useTransform(smoothMouseY, [0, window.innerHeight], ["0%", "100%"]);

  const { scrollY } = useScroll();
  const bgGradientY = useTransform(scrollY, [0, 1000], [0, 150]);
  const bgPatternY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div 
      className="bg-[#f0f2f5] text-gray-800 selection:bg-yellow-400/30 min-h-screen"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(600px circle at ${backgroundPositionX} ${backgroundPositionY}, rgba(255, 218, 121, 0.2), transparent 80%)`,
          y: bgGradientY,
        }}
      />
      
      <motion.div 
        className="fixed inset-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23d8d8d8%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50 -z-20"
        style={{ y: bgPatternY }}
      ></motion.div>

      <Header />
      <main className="container mx-auto px-6 md:px-8 pt-24 relative z-10">
        <Hero />
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
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
