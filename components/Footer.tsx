
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Version structure: Main.Part.Patch
  // v3.6.9: Interactive Engine Diagnostics & Warning Module
  const APP_VERSION = "v3.6.9 [BETA]";

  return (
    <footer className="py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-sm text-[var(--text-secondary)]">
          Portfolio © {currentYear}
        </p>
        <p className="text-[10px] text-[var(--text-secondary)] opacity-40 mt-2 font-mono tracking-widest uppercase">
          {APP_VERSION}
        </p>
      </div>
    </footer>
  );
};

export default Footer;