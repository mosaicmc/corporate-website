import React from 'react';
import { Heart, Users, Briefcase, Handshake, Home, CheckCircle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const Phase1Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 Phase 1 Demo: GlowingEffect Integration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hover over the cards to see the beautiful glowing border effect in action
          </p>
        </div>

        {/* HomePage Service Cards Demo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            📍 HomePage - Service Cards
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: <Home className="h-8 w-8" />,
                title: "Settlement Support",
                description: "Comprehensive support for new arrivals including housing assistance, employment guidance, and community orientation.",
                color: "sky"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Aged Care Services", 
                description: "Culturally appropriate aged care services that respect traditions and provide comfort in familiar languages.",
                color: "earth"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                {/* GlowingEffect - Same settings as HomePage */}
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.05}
                  movementDuration={1.5}
                  borderWidth={2}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-all duration-300 ${
                        service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' : 'bg-gradient-to-br from-earth to-earth/80'
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
                      
                      <ul className="space-y-3">
                        {["Professional guidance", "Cultural sensitivity", "Ongoing support"].map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-white/70">
                            <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 ${
                              service.color === 'sky' ? 'text-sky' : 'text-earth'
                            }`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GetInvolvedPage Cards Demo */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🤝 Get Involved Page - Opportunity Cards
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Users className="h-12 w-12" />,
                title: "Volunteer With Us",
                description: "Join our team of dedicated volunteers and make a direct difference in people's lives.",
                action: "Apply to Volunteer",
                color: "sky"
              },
              {
                icon: <Heart className="h-12 w-12" />,
                title: "Make a Donation",
                description: "Your financial support helps us provide essential services to multicultural communities across NSW.",
                action: "Donate Now", 
                color: "earth"
              }
            ].map((opportunity, index) => (
              <div key={index} className="relative backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                {/* GlowingEffect - Same settings as GetInvolvedPage */}
                <GlowingEffect
                  spread={35}
                  glow={true}
                  disabled={false}
                  proximity={120}
                  inactiveZone={0.03}
                  movementDuration={2}
                  borderWidth={2}
                />
                
                <div className={`bg-gradient-to-br ${
                  opportunity.color === 'sky' ? 'from-sky/10 to-sky/5 border-sky/20' : 'from-earth/10 to-earth/5 border-earth/20'
                } p-8 border-b border-white/20 dark:border-slate-700/50`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                      <div className={opportunity.color === 'sky' ? 'text-sky' : 'text-earth'}>
                        {opportunity.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{opportunity.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{opportunity.description}</p>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors">
                    {opportunity.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <div className="mt-16 text-center backdrop-blur-md bg-white/60 dark:bg-slate-800/60 rounded-2xl p-8 border border-white/30 dark:border-slate-700/30">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ How to See the Effect
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Move your mouse near or over any card to see the beautiful, colorful glowing border effect. 
            The glow follows your cursor and creates an engaging, modern interaction that matches 
            Cursor's website aesthetic while complementing Mosaic MC's multicultural theme.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Phase1Demo;