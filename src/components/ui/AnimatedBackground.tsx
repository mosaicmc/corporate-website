import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'vibrant';
  className?: string;
}

const variantBackgrounds: Record<NonNullable<AnimatedBackgroundProps['variant']>, string> = {
  default: 'from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30',
  subtle: 'from-white/20 via-transparent to-blue-300/10 dark:from-slate-900/40 dark:to-blue-800/20',
  vibrant: 'from-white/40 via-blue-100/40 to-indigo-200/40 dark:from-slate-900/60 dark:to-blue-900/50',
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'default',
  className = '',
}) => {
  const gradientClass = variantBackgrounds[variant] || variantBackgrounds.default;
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} ${className}`}></div>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl dark:bg-blue-500/10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl dark:bg-purple-500/10 animate-blob-delayed"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-green-400/12 rounded-full blur-3xl dark:bg-green-500/8 animate-blob-reverse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl dark:bg-indigo-500/8 animate-pulse-gentle"></div>
    </>
  );
};

export default AnimatedBackground;
