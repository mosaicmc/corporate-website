export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'settlement-support'
  | 'aged-care'
  | 'family-support'
  | 'community-engagement'
  | 'locations'
  | 'get-involved'
  | 'resources'
  | 'annual-reports'
  | 'emergency-translation'
  | 'helpful-links'
  | 'stories'
  | 'contact'
  | 'donate';

export type RelatedItem = {
  key: PageKey;
  title: string;
  description: string;
  link: string;
  color: 'sky' | 'care' | 'sun' | 'leaf' | 'earth';
  icon: 'home' | 'heart' | 'users' | 'handshake' | 'file' | 'phone' | 'map' | 'globe' | 'calendar';
};

type Meta = { key: PageKey; path: string; tags: string[] };

const INDEX: Meta[] = [
  { key: 'home', path: '/', tags: ['overview', 'landing', 'services', 'stories'] },
  { key: 'about', path: '/about', tags: ['organisation', 'mission', 'team', 'governance'] },
  { key: 'services', path: '/services', tags: ['services', 'overview', 'programs'] },
  { key: 'settlement-support', path: '/services/settlement-support', tags: ['settlement', 'housing', 'employment', 'government', 'community', 'language'] },
  { key: 'aged-care', path: '/services/aged-care', tags: ['aged care', 'support at home', 'chsp', 'respite', 'volunteer', 'family'] },
  { key: 'family-support', path: '/services/family-support', tags: ['family', 'parenting', 'counselling', 'children', 'playgroups', 'safety'] },
  { key: 'community-engagement', path: '/services/community-engagement', tags: ['community', 'events', 'volunteering', 'partnerships', 'youth'] },
  { key: 'locations', path: '/locations', tags: ['locations', 'offices', 'visit', 'contact'] },
  { key: 'get-involved', path: '/get-involved', tags: ['donate', 'volunteer', 'careers', 'partner', 'community'] },
  { key: 'resources', path: '/resources', tags: ['resources', 'guides', 'emergency', 'translation', 'reports', 'links'] },
  { key: 'annual-reports', path: '/resources/annual-reports', tags: ['reports', 'governance', 'resources'] },
  { key: 'emergency-translation', path: '/resources/emergency-translation', tags: ['emergency', 'translation', 'interpreting', 'language', 'resources'] },
  { key: 'helpful-links', path: '/resources/helpful-links', tags: ['links', 'resources', 'legal', 'traffic', 'weather'] },
  { key: 'stories', path: '/stories', tags: ['stories', 'impact', 'community', 'volunteer'] },
  { key: 'contact', path: '/contact', tags: ['contact', 'support', 'help', 'connect'] },
  { key: 'donate', path: '/donate', tags: ['donate', 'support', 'funding'] },
];

const PREFERRED: Partial<Record<PageKey, PageKey[]>> = {
  'settlement-support': ['family-support', 'community-engagement', 'resources'],
  'aged-care': ['family-support', 'get-involved', 'resources'],
  'family-support': ['settlement-support', 'community-engagement', 'resources'],
  'community-engagement': ['get-involved', 'services', 'stories'],
  resources: ['emergency-translation', 'helpful-links', 'annual-reports'],
  'emergency-translation': ['helpful-links', 'resources', 'contact'],
  'annual-reports': ['about', 'resources', 'get-involved'],
  'get-involved': ['donate', 'community-engagement', 'services'],
  locations: ['contact', 'services', 'about'],
  stories: ['community-engagement', 'services', 'get-involved'],
};

const ICONS: Record<RelatedItem['icon'], RelatedItem['icon']> = {
  home: 'home', heart: 'heart', users: 'users', handshake: 'handshake', file: 'file', phone: 'phone', map: 'map', globe: 'globe', calendar: 'calendar'
};

const META_TO_ITEM: Record<PageKey, Omit<RelatedItem, 'key'>> = {
  'settlement-support': { title: 'Settlement Support', description: 'Housing, jobs and orientation help.', link: '/services/settlement-support', color: 'sky', icon: ICONS.home },
  'aged-care': { title: 'Aged Care Services', description: 'In‑home care and social support.', link: '/services/aged-care', color: 'care', icon: ICONS.heart },
  'family-support': { title: 'Family Support', description: 'Counselling and parenting programs.', link: '/services/family-support', color: 'sun', icon: ICONS.users },
  'community-engagement': { title: 'Community Engagement', description: 'Events, volunteering and partnerships.', link: '/services/community-engagement', color: 'leaf', icon: ICONS.handshake },
  services: { title: 'Services', description: 'Explore our full programs.', link: '/services', color: 'sky', icon: ICONS.home },
  resources: { title: 'Resources', description: 'Guides and official links.', link: '/resources', color: 'earth', icon: ICONS.file },
  'annual-reports': { title: 'Annual Reports', description: 'Governance and accountability.', link: '/resources/annual-reports', color: 'earth', icon: ICONS.file },
  'emergency-translation': { title: 'Emergency & Translation', description: 'Language and emergency info.', link: '/resources/emergency-translation', color: 'sky', icon: ICONS.phone },
  'helpful-links': { title: 'Helpful Links', description: 'Trusted external sources.', link: '/resources/helpful-links', color: 'earth', icon: ICONS.globe },
  'get-involved': { title: 'Get Involved', description: 'Donate, volunteer and partner.', link: '/get-involved', color: 'sun', icon: ICONS.users },
  locations: { title: 'Locations', description: 'Find our offices.', link: '/locations', color: 'leaf', icon: ICONS.map },
  contact: { title: 'Contact', description: 'Talk to our team.', link: '/contact', color: 'sky', icon: ICONS.phone },
  stories: { title: 'Stories & Impact', description: 'Community transformations.', link: '/stories', color: 'leaf', icon: ICONS.calendar },
  about: { title: 'About Us', description: 'Mission and team.', link: '/about', color: 'leaf', icon: ICONS.users },
  donate: { title: 'Donate', description: 'Support our work.', link: '/donate', color: 'care', icon: ICONS.heart },
  home: { title: 'Home', description: 'Start here.', link: '/', color: 'sky', icon: ICONS.home },
};

const TAG_SYNONYMS: Record<string, string[]> = {
  emergency: ['disaster', 'crisis'],
  translation: ['interpreting', 'language'],
  community: ['engagement', 'volunteer', 'events'],
  family: ['parenting', 'children'],
  reports: ['governance'],
  housing: ['accommodation'],
  jobs: ['employment'],
};

function tagExpand(tags: string[]): string[] {
  const set = new Set<string>();
  for (const t of tags) {
    set.add(t);
    const syn = TAG_SYNONYMS[t];
    if (syn) syn.forEach((x) => set.add(x));
  }
  return Array.from(set);
}

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a);
  const B = new Set(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}

function readNavHistory(): string[] {
  try {
    const raw = localStorage.getItem('navHistory');
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(-10) : [];
  } catch {
    return [];
  }
}

export function recordNav(path: string) {
  try {
    const arr = readNavHistory();
    arr.push(path);
    localStorage.setItem('navHistory', JSON.stringify(arr.slice(-25)));
  } catch (e) { void e; }
}

type CacheEntry = { ts: number; items: RelatedItem[] };

function getCache(path: string): RelatedItem[] | null {
  try {
    const raw = localStorage.getItem('relatedCache');
    if (!raw) return null;
    const cache: Record<string, CacheEntry> = JSON.parse(raw);
    const entry = cache[path];
    if (!entry) return null;
    const ttlMs = 2 * 60 * 60 * 1000; // 2 hours
    if (Date.now() - entry.ts > ttlMs) return null;
    return entry.items;
  } catch {
    return null;
  }
}

function setCache(path: string, items: RelatedItem[]) {
  try {
    const raw = localStorage.getItem('relatedCache');
    const cache: Record<string, CacheEntry> = raw ? JSON.parse(raw) : {};
    cache[path] = { ts: Date.now(), items };
    localStorage.setItem('relatedCache', JSON.stringify(cache));
  } catch (e) { void e; }
}

export function keyForPath(path: string): PageKey | null {
  const meta = INDEX.find((m) => m.path === path);
  return meta ? meta.key : null;
}

export function getRelatedPages(currentPath: string): RelatedItem[] {
  const cached = getCache(currentPath);
  if (cached) return cached;

  const currentMeta = INDEX.find((m) => m.path === currentPath);
  const currentKey = currentMeta?.key ?? null;
  const currentTags = tagExpand(currentMeta?.tags ?? []);
  const preferred = currentKey ? (PREFERRED[currentKey] ?? []) : [];
  const history = readNavHistory();

  const scored: { key: PageKey; score: number }[] = [];
  for (const meta of INDEX) {
    if (meta.path === currentPath) continue; // prevent circular
    const scoreBase = jaccard(currentTags, tagExpand(meta.tags));
    const preferBoost = preferred.includes(meta.key) ? 0.2 : 0;
    const historyBoost = history.includes(meta.path) ? 0.1 : 0;
    const score = scoreBase + preferBoost + historyBoost;
    scored.push({ key: meta.key, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).map(({ key }) => ({ key, ...META_TO_ITEM[key] }));
  setCache(currentPath, top);
  return top;
}

export function copyFor(currentKey: PageKey | null): string {
  const map: Partial<Record<PageKey, string>> = {
    'settlement-support': 'New in Australia? Explore complementary services that support housing, work and community connection.',
    'aged-care': 'Discover programs that enhance independence and wellbeing alongside aged care supports.',
    'family-support': 'Strengthen family life with related services that support parenting, safety and community.',
    'community-engagement': 'Build connections through services that complement events, volunteering and partnerships.',
    services: 'Explore complementary services that pair well with your current needs.',
    resources: 'Find practical guides and official links that complement your current topic.',
    'emergency-translation': 'Access related resources for language support and emergency preparedness.',
    'annual-reports': 'Learn more about our work, impact and ways to support our mission.',
    'get-involved': 'Pair your involvement with programs and stories that amplify community impact.',
    locations: 'Plan your visit with related services and resources available at our hubs.',
    stories: 'Explore services and resources connected to these community transformations.',
    contact: 'Find helpful services and resources while you get in touch.',
    about: 'Learn more through impact stories, reports and ways to support our mission.',
    donate: 'See how your support connects with programs and community initiatives.',
  };
  return map[currentKey ?? 'services'] ?? 'Explore other support we offer that often complements this service.';
}
