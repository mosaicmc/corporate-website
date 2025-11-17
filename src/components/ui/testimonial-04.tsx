import React from 'react';
import { HeartPulse, UsersRound, Home, ClipboardList, HandHeart, GraduationCap, UserRound, Handshake } from 'lucide-react';

import { cn } from '@/lib/utils';

interface TestimonialProps {
  testimonial: string;
  name?: string;
  role?: string;
  origin?: string;
  image?: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialProps[];
  bottomText?: string;
  badgeLabel?: string;
  className?: string;
}

type RoleCategory =
  | 'agedCare'
  | 'agedCareFamily'
  | 'settlement'
  | 'admin'
  | 'volunteer'
  | 'community'
  | 'generic';

const ROLE_CATEGORY_STYLES: Record<RoleCategory, { bg: string; ring: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  agedCare: { bg: 'bg-rose-500', ring: 'border-rose-100 dark:border-rose-400/40', Icon: HeartPulse },
  agedCareFamily: { bg: 'bg-rose-400', ring: 'border-rose-100 dark:border-rose-300/40', Icon: UsersRound },
  settlement: { bg: 'bg-indigo-500', ring: 'border-indigo-100 dark:border-indigo-400/40', Icon: Home },
  admin: { bg: 'bg-amber-500', ring: 'border-amber-100 dark:border-amber-300/40', Icon: ClipboardList },
  volunteer: { bg: 'bg-emerald-600', ring: 'border-emerald-100 dark:border-emerald-300/40', Icon: HandHeart },
  community: { bg: 'bg-sky-500', ring: 'border-sky-100 dark:border-sky-300/40', Icon: Handshake },
  generic: { bg: 'bg-slate-500', ring: 'border-slate-100 dark:border-slate-400/40', Icon: UserRound },
};

const ROLE_CATEGORY_KEYWORDS: { type: RoleCategory; keywords: string[] }[] = [
  { type: 'agedCareFamily', keywords: ['aged care family', 'family member'] },
  { type: 'agedCare', keywords: ['aged care', 'care support', 'home care', 'scheduler'] },
  { type: 'volunteer', keywords: ['volunteer', 'acvvs', 'mentor', 'tutor', 'citizenship', 'homework centre'] },
  { type: 'settlement', keywords: ['settlement', 'families communities', 'housing', 'caseworker'] },
  { type: 'admin', keywords: ['admin services', 'reception', 'front desk'] },
  { type: 'community', keywords: ['community member', 'community'] },
];

function normalizeRole(role?: string): string {
  return (role || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getRoleCategory(role?: string): RoleCategory {
  const normalized = normalizeRole(role);
  if (!normalized) return 'generic';
  for (const matcher of ROLE_CATEGORY_KEYWORDS) {
    if (matcher.keywords.some((keyword) => normalized.includes(keyword))) {
      return matcher.type;
    }
  }
  return 'generic';
}

const RoleAvatar = ({ role, name }: { role?: string; name?: string }) => {
  const category = getRoleCategory(role);
  const { bg, ring, Icon } = ROLE_CATEGORY_STYLES[category];

  return (
    <div
      className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center border-2 text-white shadow-lg shadow-black/10 dark:shadow-black/40',
        bg,
        ring
      )}
      aria-label={name || role || 'Community Member'}
    >
      <span className="sr-only">{role || 'Community Member'}</span>
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
  );
};

const TestimonialCard = ({ testimonial, name, role, origin, image }: TestimonialProps) => {
  const [imageError, setImageError] = React.useState(false);
  const showImage = Boolean(image && !imageError);

  return (
    <div className="group w-80 flex-shrink-0 mx-4 pt-1 pr-1">
      {/* Glass morphism card with enhanced effects - Added padding to prevent clipping */}
      <div className="relative h-full backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content with enhanced readability */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Quote */}
          <blockquote className="text-gray-700 dark:text-white/90 leading-relaxed mb-6 text-base flex-1">
            "{testimonial}"
          </blockquote>
          
          {/* Author info */}
          <div className="flex items-center space-x-4 mt-auto">
            {showImage ? (
              <img
                src={image}
                alt={name || role || 'Community Member'}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-white/20"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <RoleAvatar role={role} name={name} />
            )}
            <div>
              {name ? (
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{name}</div>
              ) : null}
              <div className="text-gray-600 dark:text-white/70 text-xs">{role}</div>
              {origin ? (
                <div className="text-gray-500 dark:text-white/60 text-xs">{origin}</div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Subtle top accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 opacity-60"></div>
        
        {/* Corner glow effect - Adjusted position to prevent clipping */}
        <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
      </div>
    </div>
  );
};

export function Testimonial04({ 
  title = "What Our Community Says",
  subtitle = "Real stories from families and individuals whose lives have been transformed through our services",
  testimonials,
  bottomText = "95% client satisfaction rate",
  badgeLabel = "Testimonials",
  className 
}: TestimonialSectionProps) {
  return (
    <section className={cn(
      "relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300",
      className
    )}>
      {/* Enhanced glass morphism background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">{badgeLabel}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Horizontal Scrolling Testimonials Container */}
        <div className="relative mb-16">
          {/* Left fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50/60 via-blue-50/40 to-transparent dark:from-slate-900/60 dark:via-slate-800/40 dark:to-transparent z-20 pointer-events-none"></div>
          
          {/* Right fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50/60 via-blue-50/40 to-transparent dark:from-slate-900/60 dark:via-slate-800/40 dark:to-transparent z-20 pointer-events-none"></div>

          {/* First row - scrolling left */}
          <div className="mb-8 overflow-hidden py-1">
            <div className="flex animate-scroll-left hover:pause-animation">
              {/* Duplicate the testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard key={`first-${index}`} {...testimonial} />
              ))}
            </div>
          </div>

          {/* Second row - scrolling right */}
          <div className="overflow-hidden py-1">
            <div className="flex animate-scroll-right hover:pause-animation">
              {/* Reverse and duplicate for opposite direction */}
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                <TestimonialCard key={`second-${index}`} {...testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced bottom section with glass effect */}
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-4 px-8 py-4 backdrop-blur-md bg-white/60 dark:bg-white/10 rounded-full border border-white/40 dark:border-white/20 shadow-xl">
            <div className="w-2 h-2 bg-sky rounded-full animate-pulse"></div>
            <span className="text-base font-medium text-gray-700 dark:text-white">{bottomText}</span>
            <div className="w-2 h-2 bg-ocean rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
