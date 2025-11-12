import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesList from '../components/features-06/features-06';

const ServicesPage = () => {

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Explore culturally appropriate services including settlement support, aged care, family support, and community engagement across NSW."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl dark:bg-blue-500/10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl dark:bg-purple-500/10 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Services</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">
              Comprehensive Support Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
              Culturally appropriate services designed to meet the unique needs of multicultural communities across NSW.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <ServicesList
        title="Our Comprehensive Services"
      />
    </div>
  );
};

export default ServicesPage;