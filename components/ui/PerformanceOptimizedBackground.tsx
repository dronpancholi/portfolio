import React from 'react';

const PerformanceOptimizedBackground: React.FC = () => {
  return (
    <div className="perf-bg" aria-hidden="true">
      <div className="perf-bg__blob perf-bg__blob--1"></div>
      <div className="perf-bg__blob perf-bg__blob--2"></div>
      <div className="perf-bg__blob perf-bg__blob--3"></div>
    </div>
  );
};

export default PerformanceOptimizedBackground;
