import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-ocean via-sky to-ocean dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      {/* Enhanced glass morphism background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean/80 via-sky/70 to-ocean/80 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/90"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 text-sm shadow-lg mb-8">
            <span className="mr-2 h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-white font-medium">Take Action Today</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Take Your{" "}
            <span className="bg-gradient-to-r from-sand via-white to-sand bg-clip-text text-transparent">
              Next Step?
            </span>
          </h2>
          
          {/* Content */}
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Whether you're seeking settlement support, family assistance, aged care services, or community connections, our qualified team is here to help. All consultations are free and available in your preferred language.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/services"
              className="group inline-flex items-center justify-center rounded-xl bg-white text-ocean px-8 py-4 text-lg font-semibold shadow-xl hover:bg-sand hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-300 hover:scale-105 active:scale-98 hover:shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-300 hover:scale-105 active:scale-98 hover:shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              <Phone className="mr-2 h-5 w-5" />
              Get Support Now
            </Link>
          </div>
          
          {/* Service Areas Notice */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg max-w-2xl mx-auto">
            <p className="text-white/80 text-sm leading-relaxed">
              <span className="text-white font-medium">*Service Areas:</span> Our services may vary by location. Please{" "}
              <Link 
                to="/contact" 
                className="text-sand hover:text-white font-medium underline decoration-sand/50 hover:decoration-white transition-colors duration-300"
              >
                Contact us
              </Link>{" "}
              to confirm availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;