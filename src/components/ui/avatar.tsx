import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: number; // px
}

export function Avatar({ src, alt, name, size = 40, className, ...props }: AvatarProps) {
  const initials = React.useMemo(() => {
    const n = (name || '').trim();
    if (!n) return '';
    const parts = n.split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || '' : '';
    return (first + last).toUpperCase();
  }, [name]);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center rounded-full bg-muted text-xs font-semibold', className)}
      style={{ width: size, height: size }}
      aria-label={name ? `Avatar for ${name}` : 'Avatar'}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Reviewer avatar'}
          className="w-full h-full rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-gray-700 dark:text-white/80">{initials || '•'}</span>
      )}
    </div>
  );
}
