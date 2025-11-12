import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Users, Handshake, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';

type ServiceKey = 'settlement-support' | 'aged-care' | 'family-support' | 'community-engagement';

interface RelatedServicesProps {
  current?: ServiceKey;
}

const SERVICES: Record<ServiceKey, {
  title: string;
  description: string;
  link: string;
  color: 'sky' | 'care' | 'sun' | 'leaf' | 'earth';
  icon: React.ReactNode;
}> = {
  'settlement-support': {
    title: 'Settlement Support',
    description: 'Housing, jobs, and orientation support for new arrivals.',
    link: '/services/settlement-support',
    color: 'sky',
    icon: <Home className="h-6 w-6" />,
  },
  'aged-care': {
    title: 'Aged Care Services',
    description: 'Culturally appropriate in‑home care and social support.',
    link: '/services/aged-care',
    color: 'care',
    icon: <Heart className="h-6 w-6" />,
  },
  'family-support': {
    title: 'Family Support',
    description: 'Counselling, parenting workshops, and multicultural playgroups.',
    link: '/services/family-support',
    color: 'sun',
    icon: <Users className="h-6 w-6" />,
  },
  'community-engagement': {
    title: 'Community Engagement',
    description: 'Events, volunteering, and partnership initiatives across NSW.',
    link: '/services/community-engagement',
    color: 'leaf',
    icon: <Handshake className="h-6 w-6" />,
  },
};

export default function RelatedServices({ current }: RelatedServicesProps) {
  const entries = Object.entries(SERVICES);
  const items = (current
    ? entries.filter(([key]) => key !== current)
    : entries
  ).map(([key, svc]) => ({ key: key as ServiceKey, ...svc }));

  const gradientFor = (color: string) => (
    color === 'sky' ? 'from-sky to-sky/80' :
    color === 'earth' ? 'from-earth to-earth/80' :
    color === 'care' ? 'from-care to-care/80' :
    color === 'leaf' ? 'from-leaf to-leaf/80' :
    'from-sun to-sun/80'
  );

  return (
    <Section overlay>
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
          <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
          <span className="text-gray-700 dark:text-white/90 font-medium">Related Services</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">You May Also Be Interested In</h2>
        <p className="text-xl text-gray-700 dark:text-gray-100 max-w-3xl mx-auto">Explore other support we offer that often complements this service.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((svc) => (
            <Link
              key={svc.key}
              to={svc.link}
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4">
                <div className={`rounded-lg text-white p-3 bg-gradient-to-br ${gradientFor(svc.color)} shadow-md`}>
                  {svc.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{svc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/80 mt-1">{svc.description}</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
    </Section>
  );
}