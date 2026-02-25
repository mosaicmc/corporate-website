import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

type Location = { slug: string; name: string };

const LOCATIONS: Location[] = [
  { slug: 'newcastle', name: 'Newcastle' },
  { slug: 'central-coast', name: 'Central Coast' },
  { slug: 'armidale', name: 'Armidale' },
  { slug: 'tamworth', name: 'Tamworth' },
];

export default function VolunteerLocationNav({ currentSlug }: { currentSlug: Location['slug'] }) {
  const idx = LOCATIONS.findIndex((l) => l.slug === currentSlug);
  const current = LOCATIONS[idx] ?? LOCATIONS[0];
  const prev = LOCATIONS[(idx - 1 + LOCATIONS.length) % LOCATIONS.length];
  const next = LOCATIONS[(idx + 1) % LOCATIONS.length];
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const [labelKey, setLabelKey] = useState(current.slug);

  const onNavigate = (target: Location) => {
    setLabelKey(target.slug);
    navigate(`/volunteer/${target.slug}`);
  };

  return (
    <div
      role="navigation"
      aria-label="Volunteer locations"
      className="mt-8 flex items-center justify-center"
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const endX = e.changedTouches[0]?.clientX ?? null;
        if (touchStartX.current == null || endX == null) return;
        const delta = endX - touchStartX.current;
        if (Math.abs(delta) < 50) return;
        if (delta < 0) onNavigate(next);
        else onNavigate(prev);
        touchStartX.current = null;
      }}
    >
      <div className="inline-flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Link
            to={`/volunteer/${prev.slug}`}
            aria-label={`Previous location: ${prev.name}`}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/70 dark:bg-card/30 w-12 h-12 text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
            title={prev.name}
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <span aria-hidden="true" className="text-sm font-medium text-foreground/90 max-w-[140px] truncate">
            {prev.name}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={labelKey}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="text-base sm:text-lg font-medium text-foreground"
          >
            {current.name}
          </motion.span>
        </AnimatePresence>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-sm font-medium text-foreground/90 max-w-[140px] truncate text-right">
            {next.name}
          </span>
          <Link
            to={`/volunteer/${next.slug}`}
            aria-label={`Next location: ${next.name}`}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/70 dark:bg-card/30 w-12 h-12 text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
            title={next.name}
          >
            <ChevronRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
