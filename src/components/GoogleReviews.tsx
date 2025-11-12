import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ReviewItem {
  quote: string;
}

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';

const reviews: ReviewItem[] = [
  {
    quote:
      "Excellent service from Miza, who has been very professional and devoted to the community. It's great to see Mosaic Multicultural Connections moving forward in contributing to society. Keep up the good work!",
  },
  {
    quote:
      "Mosaic Multicultural Connections is an amazing organisation! They always provide excellent support and care for our community. I’m truly grateful for their kindness, professionalism, and dedication.",
  },
  {
    quote:
      "Proud to support Mosaic Multicultural Connections for their continuous efforts in empowering multicultural communities and promoting understanding and collaboration. Your work makes a real difference and truly deserves appreciation.",
  },
  {
    quote:
      "The activities organised are culturally appropriate and very helpful for the elderly.",
  },
  {
    quote:
      "I have found the staff at Mosaic to be helpful and adaptable to the constantly changing needs of the CALD community.",
  },
];

const GoogleReviews = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">Google Reviews</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            Authentic quotes from our public Google Reviews. Read more on Google to verify.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <blockquote className="relative z-10 text-gray-700 dark:text-white/90 leading-relaxed mb-6 text-base">
                “{item.quote}”
              </blockquote>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-white/60">Source: Google Reviews</span>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View on Google
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to all reviews */}
        <div className="text-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-3 text-sm shadow-sm hover:shadow-md transition"
          >
            Read all reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;