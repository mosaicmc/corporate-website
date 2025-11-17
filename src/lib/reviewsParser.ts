export type Review = {
  id: string;
  authorName: string;
  rating: number;
  dateText: string;
  text: string;
};

// Parse reviews from a given root element (server or client). This mirrors scraper heuristics.
export function parseReviewsFromRoot(root: ParentNode): Review[] {
  const sanitize = (s: string) => s.replace(/\s+/g, ' ').trim();
  const nodes = Array.from(
    root.querySelectorAll(
      [
        'div.section-review-content',
        'div[aria-label*="review"]',
        'div[data-review-id]',
        'div[jslog*="review"]',
      ].join(',')
    )
  );
  const getRating = (el: Element): number => {
    const starLabelEl = el.querySelector('[aria-label*="stars"]') as HTMLElement | null;
    if (starLabelEl && starLabelEl.getAttribute('aria-label')) {
      const m = starLabelEl.getAttribute('aria-label')!.match(/(\d\.?\d?) out of 5/);
      if (m) return Math.round(parseFloat(m[1]));
    }
    const stars = el.querySelectorAll('svg[aria-hidden="true"], span[class*="star"]');
    if (stars && stars.length) return Math.min(5, stars.length);
    return 0;
  };

  return nodes
    .map((el, idx) => {
      const id = (el.getAttribute('data-review-id') || `test-${idx}`).toString();
      const authorNameEl = el.querySelector('[class*="author"], [data-attr*="author"], a[aria-label*="Profile"]') as HTMLElement | null;
      const textEl = el.querySelector('[class*="text"], [jsname*="review"]') as HTMLElement | null;
      const dateEl = el.querySelector('[class*="date"], time, span[aria-label*="ago"]') as HTMLElement | null;

      const authorName = sanitize(authorNameEl?.textContent || '');
      const rating = getRating(el);
      const dateText = sanitize(dateEl?.textContent || '');
      const text = sanitize(textEl?.textContent || '');

      return { id, authorName, rating, dateText, text };
    })
    .filter((r) => r.text);
}

