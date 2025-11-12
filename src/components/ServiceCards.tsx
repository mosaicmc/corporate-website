import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Users, Handshake, ArrowRight, CheckCircle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const ServiceCards = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Settlement Support",
      description: "New to Australia? We can guide you to find housing, apply for jobs, and build your new life with confidence.",
      features: [
        "Housing assistance and navigation",
        "Employment support and mentoring",
        "Citizenship preparation and guidance",
        "Pacific visa pathway support"
      ],
      link: "/services/settlement-support",
      color: "sky"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Aged Care Services",
      description: "Need elderly care that respects your culture? We provide culturally informed in-home support and community connections",
      features: [
        "Personal care at home",
        "Companionship and social support",
        "Cultural activities and outings",
        "Help navigating aged care"
      ],
      link: "/services/aged-care",
      color: "care"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Support",
      description: "Looking for parenting help? We offer family counselling and community playgroups to help you, and your children thrive.",
      features: [
        "One-on-one family counselling",
        "Parenting skills workshops",
        "Multicultural playgroups (0-6 years)",
        "Crisis support and planning"
      ],
      link: "/services/family-support",
      color: "sun"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Community Engagement",
      description: "Struggling to cope with your new life in Australia? We help your children excel academically and connect your family with community support.",
      features: [
        "Free academic tutoring programmes",
        "Skill training with recognised certificates",
        "Critical safety information workshops",
        "Community connection Groups"
      ],
      link: "/services/community-engagement",
      color: "leaf"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      {/* Enhanced glass morphism background with multiple layers - adaptive for light/dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trusted Partner Section - Page Flow Optimized */}
        <div className="relative mb-24 py-16">
          {/* Subtle background gradient - different from glass morphism */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-800/30"></div>
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-7xl mx-auto relative">
            {/* Left Column - Compelling Headline (2/5 width) */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="text-sm font-medium text-earth dark:text-earth/90 uppercase tracking-wider">Since 1981</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Your{" "}
                    <span className="bg-gradient-to-r from-sky via-ocean to-earth bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky dark:via-ocean dark:to-earth">
                      Trusted
                    </span>
                    <br />
                    Partner
                  </h2>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-sky to-ocean"></div>
                  
                  <p className="text-xl text-gray-600 dark:text-white/70 font-light leading-relaxed">
                    Building belonging, one family at a time
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Flowing Content (3/5 width) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-gray-700 dark:text-white/80 font-light">
                  Since <strong className="font-semibold text-ocean dark:text-sky/90">1981</strong>, Mosaic Multicultural Connections has been supporting people from migrant and refugee backgrounds throughout every stage of their Australian journey.
                </p>
                
                <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70">
                  We understand that building a life in Australia brings both opportunities and challenges - whether you have just arrived or have been here for years, are raising a family, or are caring for elderly loved ones who deserve to live their best possible lives.
                </p>
                
                <div className="border-l-4 border-sky/30 pl-6 my-8">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-white/80 italic">
                    Our approach is simple: we meet you where you are, respect your cultural background, and provide professional support that empowers you to achieve your goals.
                  </p>
                </div>
                
                <p className="text-xl leading-relaxed text-gray-800 dark:text-white font-medium">
                  We are here as your{" "}
                  <span className="bg-gradient-to-r from-ocean to-sky bg-clip-text text-transparent font-semibold dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:to-sky">
                    trusted partner
                  </span>{" "}
                  in creating the connected, confident life you want.
                </p>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-sky rounded-full"></div>
                  <span>Professional Services</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-ocean rounded-full"></div>
                  <span>Culturally Responsive</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-earth rounded-full"></div>
                  <span>Community Focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header with glass effect */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">Our Services</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Support Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            Culturally appropriate services designed to meet the unique needs of multicultural communities across NSW delivered by our qualified staff
          </p>
        </div>

        {/* Services Grid with enhanced glass morphism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
            >
              {/* GlowingEffect with custom parameters for service cards */}
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.05}
                movementDuration={1.5}
                borderWidth={2}
              />
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content with enhanced readability */}
              <div className="relative z-10">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                      service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      service.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      service.color === 'care' ? 'bg-gradient-to-br from-care to-care/80' :
                      service.color === 'leaf' ? 'bg-gradient-to-br from-leaf to-leaf/80' :
                      'bg-gradient-to-br from-sun to-sun/80'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-white/70">
                          <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 ${
                            service.color === 'sky' ? 'text-sky' :
                            service.color === 'earth' ? 'text-earth' :
                            service.color === 'care' ? 'text-care' :
                            service.color === 'leaf' ? 'text-leaf' :
                            'text-sun'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to={service.link}
                      className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium min-w-40 text-[15px] transition-all duration-300 hover:shadow-lg ${
                        service.color === 'sky' ? 'bg-sky hover:bg-sky/90 hover:shadow-sky/25' :
                        service.color === 'earth' ? 'bg-earth hover:bg-earth/90 hover:shadow-earth/25' :
                        service.color === 'care' ? 'bg-care hover:bg-care/90 hover:shadow-care/25' :
                        service.color === 'leaf' ? 'bg-leaf hover:bg-leaf/90 hover:shadow-leaf/25' :
                        'bg-sun hover:bg-sun/90 hover:shadow-sun/25'
                      }`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Subtle top accent */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${
                service.color === 'sky' ? 'bg-gradient-to-r from-sky to-sky/80' :
                service.color === 'earth' ? 'bg-gradient-to-r from-earth to-earth/80' :
                service.color === 'care' ? 'bg-gradient-to-r from-care to-care/80' :
                service.color === 'leaf' ? 'bg-gradient-to-r from-leaf to-leaf/80' :
                'bg-gradient-to-r from-sun to-sun/80'
              } opacity-60`}></div>
              
              {/* Corner glow effect */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
                service.color === 'sky' ? 'bg-sky' :
                service.color === 'earth' ? 'bg-earth' :
                service.color === 'care' ? 'bg-care' :
                service.color === 'leaf' ? 'bg-leaf' :
                'bg-sun'
              } opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-ocean to-sky px-8 py-4 text-base font-semibold text-white shadow-xl hover:from-ocean/90 hover:to-sky/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean transition-all duration-300 hover:shadow-ocean/25 backdrop-blur-sm dark:from-sky dark:to-ocean"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;