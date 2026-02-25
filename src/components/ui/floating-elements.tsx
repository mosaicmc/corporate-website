import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Phone, Mail } from 'lucide-react';

// Floating Action Button
interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon = <ArrowUp className="h-5 w-5" />,
  onClick,
  className = '',
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  ariaLabel,
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-ocean to-sky text-white shadow-xl
      hover:from-ocean/90 hover:to-sky/90 hover:shadow-2xl hover:shadow-ocean/20
    `,
    secondary: `
      backdrop-blur-md bg-white/90 text-gray-800 shadow-xl border border-white/30
      hover:bg-white hover:shadow-2xl dark:bg-slate-800/90 dark:text-gray-100
      dark:border-slate-700/50 dark:hover:bg-slate-800
    `,
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`
        fixed z-50 ${positionClasses[position]} ${sizeClasses[size]}
        ${variantClasses[variant]} ${className}
        rounded-full flex items-center justify-center
        transition-all duration-300 hover:scale-110 active:scale-95
        animate-fade-in group
      `}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
    </button>
  );
};

// Scroll to Top Button
export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setIsVisible(window.pageYOffset > 300);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as EventListener);
  }, []);

  const scrollToTop = () => {
    const startY = window.pageYOffset;
    const duration = 500;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextY = Math.max(startY * (1 - eased), 0);
      window.scrollTo(0, nextY);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <FloatingActionButton
      icon={<ArrowUp className="h-5 w-5" aria-hidden="true" />}
      onClick={scrollToTop}
      className={`${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 md:w-14 md:h-14 w-12 h-12`}
      variant="secondary"
      ariaLabel="Go to top"
    />
  );
};

// Contact Floating Menu
export const ContactFloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    { icon: <Phone className="h-4 w-4" />, label: 'Call', action: () => window.open('tel:+1234567890') },
    { icon: <Mail className="h-4 w-4" />, label: 'Email', action: () => window.open('mailto:contact@example.com') },
    { icon: <MessageCircle className="h-4 w-4" />, label: 'Chat', action: () => console.log('Open chat') },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="mb-4 space-y-2 animate-fade-in-up">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 animate-fade-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                {option.label}
              </span>
              <button
                onClick={option.action}
                className="w-10 h-10 bg-gradient-to-r from-ocean to-sky text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-ocean/20 transition-all duration-300"
              >
                {option.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Button */}
      <FloatingActionButton
        icon={
          <MessageCircle 
            className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
          />
        }
        onClick={() => setIsOpen(!isOpen)}
        position="bottom-left"
        className="relative"
      />
    </div>
  );
};

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'border-ocean border-t-transparent',
    secondary: 'border-sky border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} ${colorClasses[color]} ${className}
        animate-spin rounded-full border-2
      `}
    />
  );
};

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  color = 'primary',
  showPercentage = true,
  animated = true,
}) => {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-ocean to-sky',
    secondary: 'bg-gradient-to-r from-sky to-ocean',
    success: 'bg-gradient-to-r from-leaf to-green-500',
    warning: 'bg-gradient-to-r from-sun to-orange-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
        <div
          className={`
            h-2 ${colorClasses[color]} rounded-full transition-all duration-500 ease-out
            ${animated ? 'animate-shimmer-slow' : ''}
            relative overflow-hidden
          `}
          style={{ width: `${progress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Toast Component
interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    info: 'bg-blue-500 text-white',
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
      <div
        className={`
          ${typeClasses[type]}
          px-6 py-4 rounded-lg shadow-xl backdrop-blur-md
          flex items-center space-x-3 min-w-[300px]
          animate-slide-down
        `}
      >
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
};
