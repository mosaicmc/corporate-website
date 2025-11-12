import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Briefcase, Handshake, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';

const GetInvolvedPage = () => {
  const opportunities = [
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Make a Donation",
      description: "Your financial support helps us provide essential services to multicultural communities across NSW.",
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
      description: "Join our team of dedicated volunteers and make a direct difference in people's lives.",
      benefits: [
        "Flexible scheduling options",
        "Comprehensive training provided",
        "Cultural competency development",
        "Meaningful community connections"
      ],
      action: "Apply to Volunteer",
      link: "https://tally.so/r/mosaic-volunteer",
      external: true,
      color: "sky"
    },
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: "Join Our Team",
      description: "Build a rewarding career helping multicultural communities while developing your professional skills.",
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
      description: "Collaborate with us to create innovative solutions and expand our reach in the community.",
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
              <div className={`bg-gradient-to-br ${getColorClasses(opportunity.color)} p-8 border-b border-white/20 dark:border-slate-700/50`}>
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

              <div className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-6">{opportunity.description}</p>

                <h3 className="text-lg font-bold text-foreground mb-4">Benefits & Impact</h3>
                <ul className="space-y-3 mb-8">
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
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors group"
                  >
                    {opportunity.action}
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={opportunity.link}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors group"
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
            <h2 className="text-4xl font-bold text-foreground mb-6">{t('getInvolved.volunteerSpotlight')}</h2>
            <GlassCard className="rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Jennifer Chen"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Jennifer Chen</h3>
                    <p className="text-muted-foreground">Volunteer Settlement Worker</p>
                    <p className="text-sm text-sky">3 years with Mosaic</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic">
                  "Volunteering with Mosaic has been incredibly rewarding. I've helped families navigate their first 
                  months in Australia, and seeing their confidence grow is amazing. The training and support from 
                  staff makes it easy to contribute meaningfully."
                </blockquote>
            </GlassCard>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Volunteer Opportunities</h3>
            <div className="space-y-4">
                {[
                  { role: "Settlement Support Assistant", commitment: "4 hours/week", training: "2 days" },
                  { role: "Community Event Coordinator", commitment: "Flexible", training: "1 day" },
                  { role: "Language Support Volunteer", commitment: "2 hours/week", training: "Half day" },
                  { role: "Administrative Support", commitment: "3 hours/week", training: "1 day" }
                ].map((role, index) => (
                  <GlassCard key={index} padding="sm" className="rounded-lg shadow-sm border-l-4 border-sky">
                    <h4 className="font-semibold text-foreground mb-2">{role.role}</h4>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                      <span>Commitment: {role.commitment}</span>
                      <span>Training: {role.training}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
              <a
                href="https://tally.so/r/mosaic-volunteer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
    </div>
  );
};

export default GetInvolvedPage;