import React from 'react';

type Report = { year: string; href: string };

const DECADES = [
  { id: '1991-2000', start: 1991, end: 2000, color: 'leaf', accent: 'bg-leaf' },
  { id: '2001-2010', start: 2001, end: 2010, color: 'earth', accent: 'bg-earth' },
  { id: '2011-2020', start: 2011, end: 2020, color: 'sky', accent: 'bg-sky' },
  { id: '2021-present', start: 2021, end: 3000, color: 'ocean', accent: 'bg-ocean' },
];

function numericYear(label: string): number | null {
  const match = label.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}


export function computeDecadeGroups(reports: Report[]) {
  return DECADES.map((d) => {
    const items = reports
      .filter((r) => {
        const y = numericYear(r.year);
        return y !== null && y >= d.start && y <= d.end;
      })
      .sort((a, b) => (numericYear(a.year)! - numericYear(b.year)!));
    return { ...d, items };
  });
}

export default function DecadeCards({
  reports,
  selected,
  onSelect,
}: {
  reports: Report[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const groups = computeDecadeGroups(reports);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g) => {
        const isActive = selected === g.id;
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            aria-pressed={isActive}
            className={`group relative text-left backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${isActive ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${g.accent} text-white p-3`}>
                <div className="h-6 w-6 flex items-center justify-center">
                  <span className="sr-only">Decade accent</span>
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-white"></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground dark:text-white">{g.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {g.items.length} report{g.items.length === 1 ? '' : 's'} available
                </p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Browse decade
              <span className="ml-1 h-4 w-4 inline-block transition-transform duration-300 group-hover:translate-x-0.5">›</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
