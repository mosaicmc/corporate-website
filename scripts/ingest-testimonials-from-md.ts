import fs from 'fs';
import path from 'path';
// Explicit extension to satisfy ts-node ESM resolution
import { normalizeTestimonialText } from '../src/lib/testimonialsParser.ts';

type Entry = {
  testimonial: string;
  name?: string;
  role?: string;
  origin?: string;
  image?: string;
};

// Extract top-level headings to drive optional UI copy overrides
function extractHeadings(md: string): string[] {
  const lines = md.split(/\n+/);
  const titles: string[] = [];
  for (const raw of lines) {
    const line = (raw || '').trim();
    const m = line.match(/^#{1,6}\s+(.+)$/);
    if (m) {
      titles.push(m[1].trim());
      if (titles.length >= 2) break;
    }
  }
  return titles;
}

// Parse lines like: "### Name *Role* > \"Text...\""
function parseHeadingLine(line: string): Entry | null {
  const headingItem = line.match(/^#{3,}\s*([^*#>]+?)(?:\s*\*([^*]+)\*\s*)?>\s*["“”']?(.+?)["“”']?\s*$/);
  if (!headingItem) return null;
  const name = headingItem[1]?.trim();
  const role = headingItem[2]?.trim() || 'Community Member';
  const text = headingItem[3]?.trim();
  if (!text) return null;
  return {
    testimonial: normalizeTestimonialText(text),
    name,
    role,
    image: '/pexels-yankrukov-8199708.jpg',
  };
}

function parseBlocks(md: string): Entry[] {
  const entries: Entry[] = [];

  // First pass: structured entries including multi-line triplets
  const rawLines = md.split(/\n+/);
  const lines = rawLines.map((l) => (l || '').trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Skip section headings (# or ##) and separators
    if (/^#{1,2}\s+/.test(line)) continue;
    if (/^\s*-{3,}\s*$/.test(line)) continue;

    // Try single-line heading item: "### Name *Role* > \"Text\""
    const single = parseHeadingLine(line);
    if (single) {
      entries.push(single);
      continue;
    }

    // Try multi-line triplet: "### Name" then "*Role*" then "> Quote"
    const h3 = line.match(/^#{3,}\s+(.+)$/);
    if (h3) {
      const name = h3[1].trim();
      // Find next non-empty role line
      let j = i + 1;
      while (j < lines.length && !lines[j]) j++;
      const roleLine = lines[j] || '';
      const roleMatch = roleLine.match(/^\*([^*]+)\*\s*$/);
      if (roleMatch) {
        const role = (roleMatch[1] || '').trim() || 'Community Member';
        // Find next non-empty quote line
        let k = j + 1;
        while (k < lines.length && !lines[k]) k++;
        const quoteLine = lines[k] || '';
        const quoteMatch = quoteLine.match(/^>\s*["“”']?(.+?)["“”']?\s*$/);
        if (quoteMatch) {
          const text = normalizeTestimonialText(quoteMatch[1].trim());
          entries.push({ testimonial: text, name, role, image: '/pexels-yankrukov-8199708.jpg' });
          i = k; // advance past the triplet
          continue;
        }
      }
      // If role/quote not matched, fall through to other parsing
    }

    // Parse simple quote lines starting with '>'
    const quoteLine = line.match(/^>\s*["“”']?(.+?)["“”']?\s*$/);
    if (quoteLine) {
      entries.push({
        testimonial: normalizeTestimonialText(quoteLine[1].trim()),
        role: 'Community Member',
        image: '/pexels-yankrukov-8199708.jpg',
      });
      continue;
    }

    // Ignore other non-structured lines to avoid polluting testimonials with headings or metadata
  }

  // Second pass: legacy block parsing for meta-driven blocks (if present)
  const blocks = md
    .split(/\n\s*-{10,}\s*\n|\n{2,}/g)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  for (const block of blocks) {
    // Skip if block is just a heading or separator
    if (/^#{1,6}\s+/.test(block)) continue;
    if (/^\s*-{3,}\s*$/.test(block)) continue;

    const lines = block.split(/\n+/).map((l) => l.trim());
    const meta: Record<string, string> = {};
    const contentLines: string[] = [];

    for (const line of lines) {
      const m = line.match(/^([A-Za-z ]+)\s*:\s*(.+)$/);
      if (m) {
        const key = m[1].toLowerCase().trim();
        meta[key] = m[2].trim();
      } else {
        // Skip pure headings
        if (/^#{1,6}\s+/.test(line)) continue;
        if (/^\s*-{3,}\s*$/.test(line)) continue;
        contentLines.push(line);
      }
    }

    const rawText = contentLines.join(' ').trim();
    if (!rawText) continue;

    const testimonial = normalizeTestimonialText(rawText);
    const name = meta['name'] || meta['client'] || meta['author'] || undefined;
    const role = meta['role'] || meta['service'] || meta['program'] || 'Community Member';
    const origin = meta['origin'] || meta['country'] || meta['background'] || undefined;
    const image = meta['image'] || '/pexels-yankrukov-8199708.jpg';

    // Avoid duplicates by testimonial text
    if (!entries.find((e) => e.testimonial === testimonial)) {
      entries.push({ testimonial, name, role, origin, image });
    }
  }

  return entries;
}

async function main() {
  const inputPath = process.env.COMPLIMENTS_MD
    ? path.resolve(process.env.COMPLIMENTS_MD)
    : path.resolve(process.cwd(), 'docs/Compliments.md');

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    console.error('Please move your Compliments.md into docs/Compliments.md or set COMPLIMENTS_MD to the file path.');
    process.exit(1);
  }

  const md = fs.readFileSync(inputPath, 'utf8');
  const entries = parseBlocks(md);
  const headings = extractHeadings(md);

  if (entries.length === 0) {
    console.error('No testimonial entries parsed from Markdown.');
    process.exit(1);
  }

  const outputPath = path.resolve(process.cwd(), 'public/testimonials.json');
  const payload = { 
    meta: { 
      source: path.basename(inputPath), 
      generatedAt: new Date().toISOString(),
      title: headings[0] || undefined,
      subtitle: headings[1] || undefined,
      badgeLabel: /compliments/i.test(path.basename(inputPath)) ? 'Compliments' : undefined,
      bottomText: undefined,
    }, 
    entries 
  };
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Wrote ${entries.length} testimonials to ${outputPath}`);
}

main().catch((err) => {
  console.error('Ingestion error:', err);
  process.exit(1);
});
