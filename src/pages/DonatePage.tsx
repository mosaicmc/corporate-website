import React from 'react';
import RelatedServices from '@/components/RelatedServices';
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

      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-3">Your Impact</h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  We need your help to deliver the important programs and activities that you can find throughout our website.
                </p>
                <p>
                  By donating to Mosaic Multicultural Connections, you will be making a positive difference to the lives of individuals, families and communities.
                </p>
                <p>
                  Mosaic Multicultural Connections is a registered business name of Northern Settlement Services Limited and is a registered charity with the ACNC. We can provide tax deductible receipts for gifts over $2.00
                </p>
                <p className="font-medium text-foreground">ABN 72 002 898 759</p>
                <div className="pt-2">
                  <a
                    href="https://www.acnc.gov.au/charity/charities/83faff37-39af-e811-a960-000d3ad24282/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ACNC Registered Charity Profile"
                    className="inline-flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <img
                      src="/images/charity_logo-150x150.png"
                      alt="Registered Charity — ACNC"
                      className="h-16 w-16 object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
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
          </div>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground text-center">Secure payments processed by Raisely.</p>
        </div>
      </section>
      <RelatedServices />
    </div>
  );
};

export default DonatePage;
