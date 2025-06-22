import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Users, Handshake, ArrowRight, CheckCircle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const ServiceCards = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Settlement Support",
      description: "Comprehensive support for new arrivals including housing assistance, employment guidance, and community orientation.",
      features: [
        "Housing assistance",
        "Employment support", 
        "Community orientation",
        "Language services"
      ],
      link: "/services/settlement-support",
      color: "sky"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Aged Care Services",
      description: "Culturally appropriate aged care services that respect traditions and provide comfort in familiar languages.",
      features: [
        "Home care packages",
        "Cultural activities",
        "Multilingual staff",
        "Family support"
      ],
      link: "/services/aged-care",
      color: "earth"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Support",
      description: "Programs designed to support families through challenges and build stronger community connections.",
      features: [
        "Parenting programs",
        "Youth services",
        "Crisis support",
        "Counseling services"
      ],
      link: "/services/family-support",
      color: "leaf"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Community Engagement",
      description: "Creating opportunities for community participation, cultural celebration, and social connection.",
      features: [
        "Cultural events",
        "Volunteer programs",
        "Community groups",
        "Advocacy support"
      ],
      link: "/services/community-engagement",
      color: "sun"
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
            Culturally appropriate services designed to meet the unique needs of multicultural communities across NSW
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
                            service.color === 'leaf' ? 'text-leaf' :
                            'text-sun'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to={service.link}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 dark:from-blue-400 dark:to-blue-500"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Subtle top accent */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${
                service.color === 'sky' ? 'bg-gradient-to-r from-sky to-sky/80' :
                service.color === 'earth' ? 'bg-gradient-to-r from-earth to-earth/80' :
                service.color === 'leaf' ? 'bg-gradient-to-r from-leaf to-leaf/80' :
                'bg-gradient-to-r from-sun to-sun/80'
              } opacity-60`}></div>
              
              {/* Corner glow effect */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
                service.color === 'sky' ? 'bg-sky' :
                service.color === 'earth' ? 'bg-earth' :
                service.color === 'leaf' ? 'bg-leaf' :
                'bg-sun'
              } opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-xl hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all duration-300 hover:shadow-blue-500/25 backdrop-blur-sm dark:from-blue-500 dark:to-blue-600"
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