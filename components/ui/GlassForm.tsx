
import React from 'react';
import { motion } from 'framer-motion';

// --- Types ---
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface RowProps {
  label: string;
  value?: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonProps {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
}

interface SwitchProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  icon?: React.ReactNode;
}

// --- Components ---

export const Form: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return <div className={`flex flex-col gap-6 w-full ${className}`}>{children}</div>;
};

export const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h4 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] opacity-80">
          {title}
        </h4>
      )}
      <div 
        className="glass overflow-hidden rounded-[20px]"
        style={{
            // Local override for the list aesthetic: lighter border, crisp backdrop
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            background: 'var(--glass-bg)',
            borderColor: 'var(--pill-border)'
        }}
      >
        {/* Shine effect reused from global glass styles */}
        <div className="glass__shine pointer-events-none" aria-hidden="true" />
        
        <div className="flex flex-col relative z-10">
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child;
            // Add separator div for all items except the last one
            const isLast = index === React.Children.count(children) - 1;
            return (
              <React.Fragment key={index}>
                {child}
                {!isLast && (
                  <div className="ml-4 h-[0.5px] bg-[var(--text-main)] opacity-[0.08]" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Row: React.FC<RowProps> = ({ label, value, icon, className = "", children }) => {
  return (
    <div className={`flex items-center justify-between min-h-[50px] px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-[var(--text-main)] opacity-70">{icon}</span>}
        <span className="text-[15px] font-medium text-[var(--text-main)]">{label}</span>
      </div>
      <div className="text-[15px] text-[var(--text-secondary)] flex items-center gap-2">
        {value}
        {children}
      </div>
    </div>
  );
};

export const Button: React.FC<ButtonProps> = ({ label, onPress, icon, destructive }) => {
  return (
    <button 
      onClick={onPress}
      className={`w-full flex items-center justify-between min-h-[50px] px-4 py-3 bg-white/[0.01] hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors text-left outline-none focus-visible:bg-white/[0.05]`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className={destructive ? "text-red-500" : "text-[var(--accent)]"}>{icon}</span>}
        <span className={`text-[15px] font-medium ${destructive ? "text-red-500" : "text-[var(--accent)]"}`}>
          {label}
        </span>
      </div>
    </button>
  );
};

export const Switch: React.FC<SwitchProps> = ({ label, value, onValueChange, icon }) => {
  return (
    <div className="flex items-center justify-between min-h-[50px] px-4 py-3 bg-white/[0.01]">
      <div className="flex items-center gap-3">
        {icon && <span className="text-[var(--text-main)] opacity-70">{icon}</span>}
        <span className="text-[15px] font-medium text-[var(--text-main)]">{label}</span>
      </div>
      
      <div 
        onClick={() => onValueChange(!value)}
        className={`
          relative w-[51px] h-[31px] rounded-full cursor-pointer transition-colors duration-300
          ${value ? 'bg-[var(--accent)]' : 'bg-gray-200 dark:bg-gray-700'}
        `}
      >
        <motion.div
          className="absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-sm"
          animate={{ x: value ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
};
