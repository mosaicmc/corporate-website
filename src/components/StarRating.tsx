import * as React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  value: number; // 0-5
  max?: number;
  size?: number;
  ariaLabel?: string;
}

export function StarRating({ value, max = 5, size = 16, ariaLabel }: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i < Math.round(value));
  return (
    <div className="flex items-center gap-1" aria-label={ariaLabel || `${value} out of ${max} stars`} role="img">
      {stars.map((filled, idx) => (
        <Star
          key={idx}
          className={filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
          width={size}
          height={size}
          aria-hidden="true"
        />)
      )}
    </div>
  );
}

