
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-sm text-platinum">
          Designed & Built by Dron Pancholi — {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;