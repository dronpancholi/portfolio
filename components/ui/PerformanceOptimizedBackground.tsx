import React, { memo } from 'react';

const PerformanceOptimizedBackground: React.FC = memo(() => {
  return (
    <div className="perf-bg fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-inherit" aria-hidden="true">
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-[0.15] dark:opacity-[0.08] bg-green-500/30 animate-pulse-slow gpu-layer" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-[0.2] dark:opacity-[0.1] bg-blue-500/20 animate-pulse-slow gpu-layer" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[20%] right-[10%] w-[20vw] h-[20vw] rounded-full blur-[60px] opacity-[0.1] bg-purple-500/20 animate-pulse-slow gpu-layer" style={{ animationDelay: '2s' }} />
    </div>
  );
});

export default PerformanceOptimizedBackground;