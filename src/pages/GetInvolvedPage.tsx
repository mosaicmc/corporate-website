import React, { useEffect, useState } from 'react';
import { AU } from '@/lib/auSpelling';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Briefcase, Handshake, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import RelatedServices from '@/components/RelatedServices';

const GetInvolvedPage = () => {
  const opportunities = [
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Make a Donation",
      description: AU("Your financial support helps us provide essential services to multicultural communities across NSW."),
      benefits: [
        "Tax-deductible donations",
        "Direct impact on families in need",
        "Regular updates on how funds are used",
        "Recognition in annual reports"
      ],
      action: "Donate Now",
      link: "https://raisely.com/mosaic-multicultural",
      external: true,
      color: "earth"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Volunteer With Us",
      description: AU("Join our team of dedicated volunteers and make a direct difference in people's lives."),
      benefits: [
        "Flexible scheduling options",
        "Comprehensive training provided",
        "Cultural competency development",
        "Meaningful community connections"
      ],
      action: "Apply to Volunteer",
      link: "#volunteer-opportunities",
      external: false,
      color: "sky"
    },
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: "Join Our Team",
      description: AU("Build a rewarding career helping multicultural communities while developing your professional skills."),
      benefits: [
        "Competitive salary packages",
        "Professional development opportunities",
        "Supportive team environment",
        "Work-life balance focus"
      ],
      action: "View Careers",
      link: "https://employmenthero.com/mosaic-mc",
      external: true,
      color: "leaf"
    },
    {
      icon: <Handshake className="h-12 w-12" />,
      title: "Partner With Us",
      description: AU("Collaborate with us to create innovative solutions and expand our reach in the community."),
      benefits: [
        "Strategic partnership opportunities",
        "Joint program development",
        "Shared resources and expertise",
        "Community impact amplification"
      ],
      action: "Explore Partnerships",
      link: "/contact",
      external: false,
      color: "sun"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      sky: "from-sky/10 to-sky/5 border-sky/20 text-sky bg-sky",
      earth: "from-earth/10 to-earth/5 border-earth/20 text-earth bg-earth",
      leaf: "from-leaf/10 to-leaf/5 border-leaf/20 text-leaf bg-leaf",
      sun: "from-sun/10 to-sun/5 border-sun/20 text-sun bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const { t } = useTranslation();

  const spotlights: Array<{
    name: string;
    role: string;
    quote: string;
    years?: string;
    source: string;
  }> = [
    {
      name: 'Peter Cook',
      role: 'Employment & Housing Mentor',
      quote: 'I feel duty bound to help others who haven\'t had such an easy path. I hope my small contribution helps them establish a fulfilled life in Australia.',
      years: 'Volunteering weekly',
      image: undefined,
      source: 'https://www.instagram.com/p/DKDrctCRjg6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Gaylia Bigg',
      role: 'Homework Centre Tutor',
      quote: 'Working at the homework centre lets me use my teaching skills and make a difference. I enjoy helping recent arrivals and learning about other cultures.',
      years: 'Volunteer Tutor',
      source: 'https://www.instagram.com/p/DKBGFPPuQui/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Joop de Wit',
      role: 'ACVVS Volunteer Visitor',
      quote: 'The most rewarding aspect of being a volunteer is the connections you build. These connections have created a very large family for me.',
      years: '42 years with Mosaic',
      source: 'https://www.instagram.com/p/DJ-hZqSvuRb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Shani Herat Gunarathne',
      role: 'Homework Centre Tutor',
      quote: 'I enjoy meeting students and learning about their journeys. I\'m always in awe of their can‑do attitudes and maturity in a tough world.',
      years: 'Volunteer Tutor',
      source: 'https://www.instagram.com/p/DJ78YFesQrH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Lizzie',
      role: 'Citizenship Application Support Volunteer',
      quote: 'I enjoy helping people navigate a complex process and meeting all the lovely people along the way. Everyone has a responsibility to help where they can.',
      years: 'Volunteer Support',
      source: 'https://www.instagram.com/p/DJ5YKCbhTVn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Bill Livingstone',
      role: 'ACVVS Volunteer Visitor',
      quote: 'I enjoy seeing recognition and pleasure when I talk about places people remember from their youth. It\'s rewarding to bring comfort through conversation.',
      years: 'Community Visitor',
      source: 'https://www.instagram.com/p/DJ2zIbUzoq3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: 'Dennis Archibald',
      role: 'Citizenship Test Tutor',
      quote: 'I want people who are starting fresh to feel welcome in their new country. Supportive volunteering creates meaningful connections and confidence.',
      years: 'Volunteer Tutor',
      source: 'https://www.instagram.com/p/DJ0OG5KRnDc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    }
  ];

  const getShortcode = (url: string): string | null => {
    const match = url.match(/\/p\/([^/?]+)/);
    return match ? match[1] : null;
  };

  // Static tiles are expected at /spotlights/{shortcode}.png|.jpg. No placeholder fallback.

  const chosenIndex = Math.floor(Math.random() * spotlights.length);
  try { console.log('[Spotlight] chosenIndex', chosenIndex); } catch (e) { void e; }
  const spotlight = spotlights[chosenIndex];
  const [spotlightImage, setSpotlightImage] = useState<string | null>(null);

  useEffect(() => {
    const code = getShortcode(spotlight.source);
    if (!code) return;
    try { console.log('[Spotlight] shortcode', code); } catch (e) { void e; }
    const localCandidates = [
      `/spotlights/${code}.png`,
      `/spotlights/${code}.jpg`,
      `/images/spotlights/${code}.png`,
      `/images/spotlights/${code}.jpg`,
    ];
    const initial = localCandidates[0] as string;
    try { console.log('[Spotlight] image(local)', initial); } catch (e) { void e; }
    setSpotlightImage(initial);
    const cacheKey = `spotlightTile:${code}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setSpotlightImage(cached);
      return;
    }
    const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(spotlight.source)}`;
    fetch(noembedUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.thumbnail_url === 'string') {
          setSpotlightImage(data.thumbnail_url);
          try { console.log('[Spotlight] image(oembed)', data.thumbnail_url); } catch (e) { void e; }
          sessionStorage.setItem(cacheKey, data.thumbnail_url);
          return;
        }
        // Fallback: fetch page via read-only proxy and parse og:image
        const proxyUrl = `https://r.jina.ai/http://www.instagram.com/p/${code}/`;
        return fetch(proxyUrl)
          .then((r) => (r.ok ? r.text() : ''))
          .then((html) => {
            const m = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
            if (m && m[1]) {
              setSpotlightImage(m[1]);
              try { console.log('[Spotlight] image(proxy)', m[1]); } catch (e) { void e; }
              sessionStorage.setItem(cacheKey, m[1]);
            }
          });
      })
      .catch(() => {});
  }, [spotlight.source]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash ? window.location.hash.slice(1) : '';
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Get Involved</title>
        <meta name="description" content="Donate, volunteer, join our team, or partner with Mosaic Multicultural to support multicultural communities across NSW." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-muted-foreground font-medium">{t('getInvolved.badge')}</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-foreground">{t('getInvolved.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('getInvolved.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <Section overlay>
        <div className="grid md:grid-cols-2 gap-8">
          {opportunities.map((opportunity, index) => (
            <GlassCard
              key={index}
              padding="none"
              className="rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${getColorClasses(opportunity.color)} p-6 border-b border-white/20 dark:border-slate-700/50`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                    <div className={opportunity.color === 'sky' ? 'text-sky' : opportunity.color === 'earth' ? 'text-earth' : opportunity.color === 'leaf' ? 'text-leaf' : 'text-sun'}>
                      {opportunity.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{opportunity.title}</h2>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-6">{opportunity.description}</p>

                <h3 className="text-lg font-bold text-foreground mb-4">Benefits & Impact</h3>
                <ul className="space-y-2 mb-6">
                  {opportunity.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${opportunity.color === 'sky' ? 'bg-sky' : opportunity.color === 'earth' ? 'bg-earth' : opportunity.color === 'leaf' ? 'bg-leaf' : 'bg-sun'}`}></div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {opportunity.external ? (
                  <a
                    href={opportunity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors group"
                  >
                    {opportunity.action}
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={opportunity.link}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors group"
                    onClick={(e) => {
                      if (opportunity.link.startsWith('#')) {
                        e.preventDefault();
                        const id = opportunity.link.slice(1);
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          history.replaceState(null, '', `#${id}`);
                        }
                      }
                    }}
                  >
                    {opportunity.action}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Volunteer Spotlight */}
      <Section padding="md" overlay>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6 inline-flex items-center">
              <Users className="h-8 w-8 text-sky mr-3" />
              {t('getInvolved.volunteerSpotlight')}
            </h2>
            <GlassCard className="rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                  {spotlightImage ? (
                    <img
                      src={spotlightImage}
                      alt={`${spotlight.name} Instagram tile`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                      }}
                    />
                  ) : null}
                  {!spotlightImage && (
                    <div className="w-16 h-16 bg-gradient-to-br from-sky to-sky/80 rounded-full flex items-center justify-center text-white shadow-md">
                      <Users className="h-8 w-8" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{spotlight.name}</h3>
                    <p className="text-muted-foreground">{spotlight.role}</p>
                    {spotlight.years && <p className="text-sm text-sky">{spotlight.years}</p>}
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic mt-2">
                  "{spotlight.quote}"
                </blockquote>
                <div className="mt-4 text-sm">
                  <a href={spotlight.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
                    Source: Instagram
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
            </GlassCard>
          </div>

          <div className="space-y-8" id="volunteer-opportunities">
            <h3 className="text-2xl font-bold text-foreground">Volunteer Opportunities</h3>
            <GlassCard padding="md" className="rounded-lg shadow-sm">
              <ul className="divide-y divide-border">
                {[
                  { name: 'Newcastle', href: '/volunteer/newcastle' },
                  { name: 'Central Coast', href: '/volunteer/central-coast' },
                  { name: 'Armidale', href: '/volunteer/armidale' },
                  { name: 'Tamworth', href: '/volunteer/tamworth' },
                ].map((place) => (
                  <li key={place.href} className="flex items-center justify-between py-3">
                    <Link
                      to={place.href}
                      className="text-foreground hover:text-sky dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background rounded px-1"
                    >
                      {place.name}
                    </Link>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </GlassCard>
            <a
              href="#volunteer-opportunities"
              className="inline-flex items-center bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('volunteer-opportunities');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  history.replaceState(null, '', '#volunteer-opportunities');
                }
              }}
            >
              {t('getInvolved.actions.apply')}
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </Section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('getInvolved.impactTitle')}</h2>
            <p className="text-xl text-blue-200 dark:text-blue-300 max-w-3xl mx-auto">
              See how community support translates into real change for multicultural families.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Active Volunteers", description: "Dedicated community members" },
              { number: "$2.5M", label: "Annual Donations", description: "Community financial support" },
              { number: "45", label: "Corporate Partners", description: "Business collaborations" },
              { number: "98%", label: "Volunteer Satisfaction", description: "Would recommend to others" }
            ].map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-sky mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-200 dark:text-blue-300 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelatedServices />
    </div>
  );
};

export default GetInvolvedPage;
