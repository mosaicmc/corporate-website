import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar } from './ui/avatar';
import { StarRating } from './StarRating';

type ScrapedReview = {
  id: string;
  authorName: string;
  authorProfileUrl?: string;
  authorAvatarUrl?: string;
  rating: number;
  dateText: string;
  text: string;
  reviewUrl?: string;
};

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';

const GoogleReviews = () => {
  const [reviews, setReviews] = React.useState<ScrapedReview[]>([]);
  const [placeUrl, setPlaceUrl] = React.useState<string | null>(null);
  const [visibleCount, setVisibleCount] = React.useState(6); // show six featured by default
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const fetchedRef = React.useRef(false);

  React.useEffect(() => {
    const loadReviews = () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;
      fetch('/reviews.json')
        .then(async (res) => {
          if (!res.ok) throw new Error(`Failed to load reviews: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const items: ScrapedReview[] = Array.isArray(data?.reviews) ? data.reviews : [];
          if (typeof data?.placeUrl === 'string') setPlaceUrl(data.placeUrl);
          // Display only the available unique reviews; do not artificially duplicate.
          setReviews(items);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Unable to fetch reviews');
          setLoading(false);
        });
    };
    // Fetch immediately on mount
    loadReviews();
    // Also observe in case of SSR or delayed hydration
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadReviews();
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onLoadMore = () => setVisibleCount((c) => Math.min(c + 3, reviews.length || c + 3));

  const featured = reviews.slice(0, visibleCount);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      aria-label="Google Reviews"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse" />
            <span className="text-gray-700 dark:text-white/90 font-medium">Google Reviews</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            Verified quotes from our public Google Reviews. Read more on Google for full context.
          </p>
        </div>

        {error && (
          <div role="alert" className="text-center text-red-600 dark:text-red-400 mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {loading && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={`skeleton-${i}`} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 w-24 bg-white/40 dark:bg-white/10 rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 w-full bg-white/40 dark:bg-white/10 rounded mb-2" />
                    <div className="h-3 w-3/4 bg-white/40 dark:bg-white/10 rounded" />
                  </CardContent>
                  <CardFooter>
                    <div className="h-3 w-24 bg-white/40 dark:bg-white/10 rounded" />
                    <div className="h-4 w-20 bg-white/40 dark:bg-white/10 rounded" />
                  </CardFooter>
                </Card>
              ))}
            </>
          )}

          {!loading && featured.map((item) => (
            <Card key={item.id} className="group relative hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary" tabIndex={0}>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={item.authorAvatarUrl} name={item.authorName} size={40} />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white/90">{item.authorName || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500 dark:text-white/60">{item.dateText}</div>
                  </div>
                </div>
                <StarRating value={item.rating} ariaLabel={`${item.rating} out of 5 stars`} />
              </CardHeader>
              <CardContent>
                <blockquote className="relative z-10 text-gray-700 dark:text-white/90 leading-relaxed text-base">“{item.text}”</blockquote>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-gray-500 dark:text-white/60">Source: Google Reviews</span>
                <a
                  href={item.reviewUrl || placeUrl || GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  aria-label="View review on Google"
                >
                  View on Google
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!loading && reviews.length > visibleCount && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={onLoadMore}
              className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-3 text-sm shadow-sm hover:shadow-md transition"
              aria-label="Load more reviews"
            >
              Load more reviews
            </button>
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href={placeUrl || GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-3 text-sm shadow-sm hover:shadow-md transition"
            aria-label="Read all reviews on Google"
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
