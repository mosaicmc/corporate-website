import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesList from '../components/features-06/features-06';
import RelatedServices from '@/components/RelatedServices';
import { AU } from '@/lib/auSpelling';

const ServicesPage = () => {

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content={AU('Simple, culturally appropriate support to help people build a new life in Australia — including settlement services, family support, aged care and community services across NSW.')}
        />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem', position: 1,
              item: { '@type': 'Service',
                name: 'Settlement services',
                description: 'Personalised support for people from refugee, migrant and humanitarian backgrounds to help take control of their settlement journey and access essential services, information and opportunities.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/settlement-support'
              }
            },
            {
              '@type': 'ListItem', position: 2,
              item: { '@type': 'Service',
                name: 'Family support',
                description: 'Culturally appropriate programs for multicultural families with children aged 0–18.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/family-support'
              }
            },
            {
              '@type': 'ListItem', position: 3,
              item: { '@type': 'Service',
                name: 'Aged care programs',
                description: 'Culturally responsive, in‑home and community based aged care that honours cultural traditions.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/aged-care'
              }
            },
            {
              '@type': 'ListItem', position: 4,
              item: { '@type': 'Service',
                name: 'Community services',
                description: 'Personalised support to ensure access to opportunities, services and connections needed to thrive.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/community-engagement'
              }
            }
          ]
        })}</script>
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
              {AU('Support to help you build a new life in Australia')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
              {AU('Simple, culturally appropriate services across NSW — settlement, family support, aged care and community services.')}
            </p>
          </div>
        </div>
      </section>


      {/* Services List Section */}
      <ServicesList
        title="Our Comprehensive Services"
      />
      <RelatedServices />
    </div>
  );
};

export default ServicesPage;
