
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20" aria-label="Loading content">
      <div className="w-12 h-12 border-4 border-black/10 rounded-full border-t-[var(--accent)] animate-spin" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
