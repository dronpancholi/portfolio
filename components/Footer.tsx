
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Version structure: Main.Part.Patch [Status]
  // v3 (Realism Engine) . 6 (Beta Integration) . 3 (Rigid Glass Update)
  const APP_VERSION = "v3.6.3 [BETA]";

  return (
    <footer className="py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-sm text-[var(--text-secondary)]">
          Dron Pancholi © {currentYear}
        </p>
        <p className="text-[10px] text-[var(--text-secondary)] opacity-40 mt-2 font-mono tracking-widest uppercase">
          {APP_VERSION}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
