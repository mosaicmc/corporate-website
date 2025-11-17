import { describe, it, expect } from 'vitest';
import { parseReviewsFromRoot } from '../src/lib/reviewsParser';

const html = `
  <div>
    <div class="section-review-content" data-review-id="r1">
      <div class="author">Jane Doe</div>
      <div aria-label="4 out of 5 stars"></div>
      <div class="date">2 weeks ago</div>
      <div class="text">Great service and friendly staff.</div>
    </div>
    <div class="section-review-content" data-review-id="r2">
      <div class="author">John Smith</div>
      <div aria-label="5 out of 5 stars"></div>
      <div class="date">1 month ago</div>
      <div class="text">Outstanding support. Highly recommend!</div>
    </div>
  </div>
`;

describe('parseReviewsFromRoot', () => {
  it('extracts reviews with author, rating, date, and text', () => {
    const root = new DOMParser().parseFromString(html, 'text/html');
    const reviews = parseReviewsFromRoot(root);
    expect(reviews).toHaveLength(2);
    expect(reviews[0]).toMatchObject({
      id: 'r1',
      authorName: 'Jane Doe',
      rating: 4,
      dateText: '2 weeks ago',
      text: 'Great service and friendly staff.',
    });
    expect(reviews[1].rating).toBe(5);
  });
});

