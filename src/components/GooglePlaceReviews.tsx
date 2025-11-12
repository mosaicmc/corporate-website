import React, { useEffect, useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';

interface PlaceReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';

function Stars({ rating }: { rating: number }) {
  const r = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < r ? 'text-sun fill-sun' : 'text-gray-300 dark:text-gray-600'}`} />
      ))}
    </div>
  );
}

const GooglePlaceReviews = () => {
  const [reviews, setReviews] = useState<PlaceReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

    // If credentials are missing, show graceful fallback and stop loading
    if (!apiKey || !placeId) {
      setLoading(false);
      return;
    }

    // Load Google Maps JS API and use PlacesService to avoid CORS issues
    const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
        if ((window as any).google?.maps) return resolve();
      } else {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load Google Maps script'));
        document.head.appendChild(s);
      }
    });

    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    loadScript(src)
      .then(() => {
        const google = (window as any).google;
        if (!google?.maps?.places) {
          throw new Error('Google Places library unavailable');
        }
        // Create invisible map for PlacesService context
        const mapDiv = document.createElement('div');
        mapDiv.style.width = '0px';
        mapDiv.style.height = '0px';
        document.body.appendChild(mapDiv);
        const map = new google.maps.Map(mapDiv);
        const service = new google.maps.places.PlacesService(map);
        service.getDetails(
          {
            placeId,
            fields: ['name', 'rating', 'user_ratings_total', 'reviews'],
          },
          (result: any, status: string) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              setError('Unable to load live reviews automatically.');
              setLoading(false);
              return;
            }
            const list = (result?.reviews || []) as PlaceReview[];
            const sorted = list
              .slice()
              .sort((a, b) => (b.rating - a.rating) || a.relative_time_description.localeCompare(b.relative_time_description))
              .slice(0, 6);
            setReviews(sorted);
            setLoading(false);
          }
        );
      })
      .catch((e) => {
        setError(e?.message || 'Unable to load live reviews automatically.');
        setLoading(false);
      });
  }, []);

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
            Live reviews from our Google listing when available. Click through to verify on Google.
          </p>
        </div>

        {/* Reviews content */}
        {reviews && reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((item, idx) => (
              <div
                key={idx}
                className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">{item.author_name}</div>
                  <Stars rating={item.rating} />
                </div>
                <blockquote className="relative z-10 text-gray-700 dark:text-white/90 leading-relaxed mb-6 text-base">
                  “{item.text}”
                </blockquote>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-white/60">{item.relative_time_description}</span>
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
        ) : (
          <div className="text-center">
            {/* Graceful loader and messaging */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow animate-pulse bg-white/60 dark:bg-white/10">
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    <div className="mt-4 h-3 w-1/3 bg-gray-200 dark:bg-slate-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : null}
            {error ? (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-300 mb-4">Live reviews will appear here when available.</p>
            )}
            {/* Fallback to a simple embed or external link */}
            <div className="max-w-3xl mx-auto rounded-lg overflow-hidden border border-white/50 dark:border-white/20 shadow">
              <iframe
                title="Google Maps"
                src="https://maps.google.com/maps?q=Mosaic%20Multicultural%20Connections&output=embed"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
            <div className="mt-6">
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
        )}
      </div>
    </section>
  );
};

export default GooglePlaceReviews;