
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './ui/TypingAnimation';
import * as GlassForm from './ui/GlassForm';
import { Cpu, Code, Zap, Globe, Coffee, Bell } from 'lucide-react';

const About: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [available, setAvailable] = useState(true);

  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div className="p-4 md:p-0 mb-8 text-center md:text-left">
            <TypingAnimation
              as="h2"
              text="Profile Settings"
              className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-2 tracking-tight"
            />
            <p className="text-[var(--text-secondary)]">A study in precision and systems thinking.</p>
        </div>

        <GlassForm.Form>
            
            <GlassForm.Section title="Core Identity">
                <GlassForm.Row 
                    label="Role" 
                    value="Creative Technologist" 
                    icon={<Cpu size={18} />} 
                />
                <GlassForm.Row 
                    label="Focus" 
                    value="Applied AI & Systems" 
                    icon={<Zap size={18} />} 
                />
                <GlassForm.Row 
                    label="Location" 
                    value="Global / Remote" 
                    icon={<Globe size={18} />} 
                />
            </GlassForm.Section>

            <GlassForm.Section title="Philosophy">
                <GlassForm.Row 
                    label="Principle" 
                    value="Build with Intention" 
                    icon={<Code size={18} />} 
                />
                <GlassForm.Row 
                    label="Method" 
                    value="Clarity & Precision" 
                    icon={<Coffee size={18} />} 
                />
            </GlassForm.Section>

            <GlassForm.Section title="Status">
                <GlassForm.Switch 
                    label="Available for Projects" 
                    value={available} 
                    onValueChange={setAvailable}
                    icon={<div className={`w-2 h-2 rounded-full ${available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />}
                />
                <GlassForm.Switch 
                    label="Open to Collaboration" 
                    value={notifications} 
                    onValueChange={setNotifications}
                    icon={<Bell size={18} />}
                />
            </GlassForm.Section>

            <GlassForm.Section>
                <GlassForm.Button 
                    label="Download Resume / CV" 
                    onPress={() => window.open("/resume.pdf", "_blank")} 
                />
            </GlassForm.Section>

        </GlassForm.Form>

      </motion.div>
    </section>
  );
};

export default About;
