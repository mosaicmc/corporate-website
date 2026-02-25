import React from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from './ui/glowing-effect';

type Partner = {
  name: string;
  url?: string;
  brandColor: 'ocean' | 'sky' | 'earth' | 'leaf' | 'sun' | 'care';
  short?: string;
  logo?: string;
};

// TODO: Replace favicon placeholders with official SVG/PNG logos before deploy
const partners: Partner[] = [
  { name: 'Department of Home Affairs (Cth)', url: 'https://www.homeaffairs.gov.au/', brandColor: 'ocean', short: 'Home Affairs', logo: 'https://www.homeaffairs.gov.au/favicon.ico' },
  { name: 'NSW Department of Communities and Justice', url: 'https://dcj.nsw.gov.au/', brandColor: 'leaf', short: 'DCJ NSW', logo: 'https://dcj.nsw.gov.au/favicon.ico' },
  { name: 'Benevolent Society, Communities for Children', url: 'https://www.benevolent.org.au/', brandColor: 'earth', short: 'Benevolent Society', logo: 'https://www.benevolent.org.au/favicon.ico' },
  { name: 'NSW Office of Responsible Gambling', url: 'https://www.gambleaware.nsw.gov.au/', brandColor: 'sun', short: 'GambleAware NSW', logo: 'https://www.gambleaware.nsw.gov.au/favicon.ico' },
  { name: 'Waratah Education Foundation', url: 'https://www.warataheducationfoundation.org.au/', brandColor: 'sky', short: 'Waratah Education', logo: 'https://www.warataheducationfoundation.org.au/favicon.ico' },
  { name: 'Armidale Sanctuary Humanitarian Settlement Inc', url: 'https://www.armidalesanctuaryhumanitariansettlement.com.au/', brandColor: 'leaf', short: 'Armidale Sanctuary', logo: 'https://www.armidalesanctuaryhumanitariansettlement.com.au/favicon.ico' },
  { name: 'Wright Family', brandColor: 'earth', short: 'Wright Family' },
  { name: 'Department of Employment and Workplace Relations (Cth)', url: 'https://www.dewr.gov.au/', brandColor: 'ocean', short: 'DEWR', logo: 'https://www.dewr.gov.au/favicon.ico' },
  { name: 'Department of Health, Disability and Ageing (Cth)', url: 'https://www.health.gov.au/', brandColor: 'care', short: 'Health, Disability & Ageing', logo: 'https://www.health.gov.au/favicon.ico' },
];

const badgeColor = (color: Partner['brandColor']) => {
  switch (color) {
    case 'ocean':
      return 'bg-ocean text-white';
    case 'sky':
      return 'bg-sky text-white';
    case 'earth':
      return 'bg-earth text-white';
    case 'leaf':
      return 'bg-leaf text-white';
    case 'sun':
      return 'bg-sun text-white';
    case 'care':
      return 'bg-care text-white';
    default:
      return 'bg-ocean text-white';
  }
};

const PartnersFunders = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        'relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden',
        className
      )}
      aria-label="Partners and Funders"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-4">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse" />
            <span className="text-muted-foreground">Our Partners & Funders</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">With Gratitude</h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">We thank our major partners and funders for supporting inclusive, culturally appropriate services across NSW.</p>
        </div>

        <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/40 dark:border-white/20 shadow-2xl">
          <GlowingEffect spread={28} glow={true} disabled={false} proximity={120} inactiveZone={0.08} movementDuration={1.2} borderWidth={2} />
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 items-center">
            {partners.map((p) => (
              p.url ? (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center rounded-lg transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`Visit ${p.name}`}
                  title={p.name}
                >
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="h-10 sm:h-12 object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition"
                    />
                  ) : (
                    <div className={cn('h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center', badgeColor(p.brandColor))}>
                      <span className="text-sm sm:text-base font-bold">{(p.short || p.name).charAt(0)}</span>
                    </div>
                  )}
                </a>
              ) : (
                <div
                  key={p.name}
                  className="group inline-flex items-center justify-center rounded-lg"
                  title={p.name}
                  aria-label={p.name}
                >
                  <div className={cn('h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center', badgeColor(p.brandColor))}>
                    <span className="text-sm sm:text-base font-bold">{(p.short || p.name).charAt(0)}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersFunders;
