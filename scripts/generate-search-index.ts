import fs from 'fs';
import path from 'path';

type RouteInfo = { path: string; componentVar: string };
// type kept for future use if switching back to parsing imports
// type ImportInfo = { varName: string; filePath: string };

type NavKey = 'home' | 'about' | 'services' | 'stories' | 'resources' | 'locations' | 'contact' | 'getInvolved' | 'donate';
type ServiceKey = 'settlement' | 'agedCare' | 'familySupport' | 'communityEngagement';
type TranslationEntry = { nav?: Partial<Record<NavKey, string>>; services?: Partial<Record<ServiceKey, string>> };
type TranslationsMap = Record<string, TranslationEntry>;

const ROOT = process.cwd();
const APP_FILE = path.join(ROOT, 'src', 'App.tsx');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const OUTPUT = path.join(ROOT, 'public', 'search-index.json');
const TRANSLATIONS_DIR = path.join(ROOT, 'src', 'i18n', 'translations');

function readFile(file: string) {
  return fs.readFileSync(file, 'utf-8');
}

function crawlPages(dir = PAGES_DIR): Record<string, string> {
  const map: Record<string, string> = {};
  function walk(d: string) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith('.tsx')) {
        const base = path.basename(e.name, '.tsx');
        map[base] = full;
      }
    }
  }
  walk(dir);
  return map;
}

function parseRoutes(appSource: string): RouteInfo[] {
  const routeRegex = /<Route\s+path="([^"]+)"[\s\S]*?element=\{<([A-Za-z0-9_]+)[^>]*>\}\s*\/?>/g;
  const routes: RouteInfo[] = [];
  let m: RegExpExecArray | null;
  while ((m = routeRegex.exec(appSource))) {
    routes.push({ path: m[1], componentVar: m[2] });
  }
  return routes;
}

function loadTranslations(): TranslationsMap {
  const map: TranslationsMap = {};
  if (!fs.existsSync(TRANSLATIONS_DIR)) return map;
  const entries = fs.readdirSync(TRANSLATIONS_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (e.isFile() && e.name.endsWith('.json')) {
      const code = path.basename(e.name, '.json');
      try {
        const content = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, e.name), 'utf-8')) as TranslationEntry;
        map[code] = content;
      } catch { void 0; }
    }
  }
  return map;
}

function addMultilingualTags(routePath: string, tags: Set<string>, translations: TranslationsMap, langCode?: string) {
  const list: TranslationEntry[] = langCode ? (translations[langCode] ? [translations[langCode]] : []) : Object.values(translations);
  for (const t of list) {
    const nav = t.nav || {};
    const services = t.services || {};
    const add = (s: string | undefined) => {
      if (typeof s === 'string' && s.trim()) tags.add(s.toLowerCase());
    };
    if (routePath === '/services/settlement-support') add(services.settlement);
    else if (routePath === '/services/aged-care') add(services.agedCare);
    else if (routePath === '/services/family-support') add(services.familySupport);
    else if (routePath === '/services/community-engagement') add(services.communityEngagement);
    else if (routePath === '/get-involved') add(nav.getInvolved);
    else if (routePath === '/resources' || routePath.startsWith('/resources/')) add(nav.resources);
    else if (routePath === '/contact') add(nav.contact);
    else if (routePath === '/') add(nav.home);
    else if (routePath === '/services') add(nav.services);
    else if (routePath === '/stories') add(nav.stories);
    else if (routePath === '/locations') add(nav.locations);
    else if (routePath === '/donate') add(nav.donate);
    else if (routePath === '/about') add(nav.about);
  }
}

function getTranslatedTitleForRoute(routePath: string, t: TranslationEntry): string | undefined {
  const nav = t.nav || {};
  const services = t.services || {};
  if (routePath === '/services/settlement-support') return services.settlement;
  if (routePath === '/services/aged-care') return services.agedCare;
  if (routePath === '/services/family-support') return services.familySupport;
  if (routePath === '/services/community-engagement') return services.communityEngagement;
  if (routePath === '/get-involved') return nav.getInvolved;
  if (routePath === '/resources' || routePath.startsWith('/resources/')) return nav.resources;
  if (routePath === '/contact') return nav.contact;
  if (routePath === '/') return nav.home;
  if (routePath === '/services') return nav.services;
  if (routePath === '/stories') return nav.stories;
  if (routePath === '/locations') return nav.locations;
  if (routePath === '/donate') return nav.donate;
  if (routePath === '/about') return nav.about;
  return undefined;
}

function extractTitleAndText(pageSource: string): { title: string; body: string } {
  // Try Helmet <title> first
  const titleMatch = pageSource.match(/<title>([^<]+)<\/title>/);
  let title = titleMatch ? titleMatch[1].trim() : '';

  // Basic JSX text extraction: text between tags and common strings
  const texts: string[] = [];
  const betweenTags = pageSource.match(/>([^<]{2,})</g) || [];
  for (const frag of betweenTags) {
    const t = frag.replace(/[><]/g, '').trim();
    if (t && /[A-Za-z]/.test(t)) texts.push(t);
  }
  // Include string literals
  const literals = pageSource.match(/(['"])((?:[^'"\\]|\\.)+?)\1/g) || [];
  for (const lit of literals) {
    const unq = lit.replace(/^['"]|['"]$/g, '');
    if (unq && /[A-Za-z]/.test(unq)) texts.push(unq);
  }
  // Prefer an H1 if available
  const h1 = pageSource.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (!title && h1) title = h1[1].trim();

  const body = Array.from(new Set(texts)).join(' ');
  return { title, body };
}

function buildTags(title: string, body: string): string[] {
  const tags = new Set<string>();
  const add = (s: string) => s && tags.add(s.toLowerCase());
  // Basic tags from title tokens
  title.split(/\W+/).forEach(add);
  // Domain synonyms
  const synonyms: Record<string, string[]> = {
    volunteer: ['get involved', 'help', 'participate'],
    interpreting: ['translation', 'language', 'tis'],
    donate: ['support', 'give', 'funding'],
    services: ['programs', 'support'],
    emergency: ['000', 'police', 'fire', 'ambulance'],
    'aged care': ['elder care', 'elderly', 'senior', 'seniors'],
    'elder care': ['aged care', 'elderly', 'senior', 'seniors'],
    employment: ['jobs', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
    jobs: ['employment', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
    job: ['employment', 'jobs', 'career', 'work', 'get involved', 'work for us', 'join our team'],
    career: ['employment', 'jobs', 'work', 'get involved', 'work for us', 'join our team'],
    work: ['employment', 'jobs', 'career', 'get involved', 'work for us', 'join our team'],
    'old people': ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
    old: ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
  };
  for (const [k, arr] of Object.entries(synonyms)) {
    if (new RegExp(k, 'i').test(title + ' ' + body)) {
      add(k);
      arr.forEach(add);
    }
  }
  return Array.from(tags);
}

function main() {
  const appSource = readFile(APP_FILE);
  const pageFileMap = crawlPages();
  const routes = parseRoutes(appSource);
  const translations = loadTranslations();

  const rows: { path: string; title: string; body: string; tags: string[]; lang: string }[] = [];
  for (const r of routes) {
    const file = pageFileMap[r.componentVar];
    if (!file || !fs.existsSync(file)) continue;
    const src = readFile(file);
    const { title, body } = extractTitleAndText(src);
    const tags = buildTags(title, body);
    const tagSetAll = new Set<string>(tags);
    addMultilingualTags(r.path, tagSetAll, translations);
    rows.push({ path: r.path, title, body, tags: Array.from(tagSetAll), lang: 'en' });

    for (const code of Object.keys(translations)) {
      const t = translations[code];
      const tagSetLang = new Set<string>(tags);
      addMultilingualTags(r.path, tagSetLang, translations, code);
      const localizedTitle = getTranslatedTitleForRoute(r.path, t) || title;
      rows.push({ path: r.path, title: localizedTitle, body, tags: Array.from(tagSetLang), lang: code });
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), items: rows }, null, 2));
  console.log(`Generated search index: ${OUTPUT} (${rows.length} routes)`);
}

main();
