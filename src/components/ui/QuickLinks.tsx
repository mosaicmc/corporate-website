import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type QuickLink = { title: string; to: string };

const defaultLinks: QuickLink[] = [
  { title: 'Services', to: '/services' },
  { title: 'Resources', to: '/resources' },
  { title: 'Get Involved', to: '/get-involved' },
  { title: 'Contact', to: '/contact' },
];

export default function QuickLinks({ items }: { items?: QuickLink[] }) {
  const location = useLocation();
  const links = (items ?? defaultLinks).filter((l) => l.to !== location.pathname);

  return (
    <aside className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-base font-semibold text-foreground mb-3">You may also be interested in…</h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex items-center rounded-full border border-border bg-muted/60 text-sm px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}