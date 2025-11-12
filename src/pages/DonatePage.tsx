import React from 'react';
import { Helmet } from 'react-helmet-async';

const DonatePage = () => {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Donate | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Support Mosaic Multicultural Connections. Your donation empowers multicultural communities across NSW through settlement support, aged care, family services, and community engagement."
        />
      </Helmet>
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Donate to Mosaic</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your contribution directly supports multicultural communities throughout New South Wales.
            </p>
          </div>
        </div>
      </section>

      {/* Raisely Embed */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="aspect-[16/12] sm:aspect-[16/10] w-full">
                <iframe
                  src="https://mosaicmc.raisely.com/embed"
                  title="Donate to Mosaic Multicultural Connections"
                  width="100%"
                  height="620"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Secure payments processed by Raisely.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;