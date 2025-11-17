import fs from 'node:fs';
import path from 'node:path';

type ReviewItem = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
};

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

async function fetchApiReviews(placeId?: string, apiKey?: string): Promise<any[]> {
  if (!placeId || !apiKey) return [];
  const fields = 'reviews,url,place_id';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Places API failed: ${res.status}`);
  const data = await res.json();
  const reviews = data?.result?.reviews || [];
  return reviews.map((r: any) => ({ authorName: r.author_name, rating: r.rating, text: r.text || '' }));
}

async function run() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const inputPath = path.resolve('public/reviews.json');
  if (!fs.existsSync(inputPath)) {
    console.error('reviews.json not found. Run the scrape first.');
    process.exit(1);
  }
  const local = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const items: ReviewItem[] = Array.isArray(local?.reviews) ? local.reviews : [];
  let apiReviews: any[] = [];
  try {
    apiReviews = await fetchApiReviews(placeId, apiKey);
  } catch (e) {
    console.error('Failed to fetch API reviews:', (e as Error).message);
    process.exit(1);
  }

  const mismatches: any[] = [];
  for (const r of items) {
    const match = apiReviews.find((ar) => normalize(ar.text).includes(normalize(r.text)) || normalize(ar.authorName) === normalize(r.authorName));
    if (!match) {
      mismatches.push({ id: r.id, reason: 'No API match', authorName: r.authorName });
      continue;
    }
    if (match.rating !== r.rating) {
      mismatches.push({ id: r.id, reason: 'Rating mismatch', expected: match.rating, actual: r.rating });
    }
    if (normalize(match.text) !== normalize(r.text)) {
      mismatches.push({ id: r.id, reason: 'Text mismatch', expectedSample: match.text.slice(0, 120), actualSample: r.text.slice(0, 120) });
    }
  }

  const report = {
    checkedAt: new Date().toISOString(),
    displayedCount: items.length,
    apiCount: apiReviews.length,
    mismatches,
  };
  const outPath = path.resolve('QA/reviews-verification.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`Verification report written: ${outPath}`);
  if (mismatches.length > 0) {
    console.error(`Discrepancies detected: ${mismatches.length}`);
    process.exit(2);
  }
}

run();

