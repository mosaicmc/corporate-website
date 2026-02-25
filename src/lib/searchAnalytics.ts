export type MonthlyStats = Record<string, Record<string, number>>; // { YYYY-MM: { query: count } }
export type MonthlyLangStats = Record<string, Record<string, Record<string, number>>>; // { YYYY-MM: { lang: { query: count } } }

const KEY = 'mosaic-search-analytics';
const KEY_LANG = 'mosaic-search-analytics-lang';
const FAQ_VIEW_KEY = 'mosaic-faq-views';
const FAQ_FEEDBACK_KEY = 'mosaic-faq-feedback';

export function logSearchQuery(query: string, lang?: string) {
  const q = (query || '').trim().toLowerCase();
  const l = (lang || 'en').toLowerCase();
  if (!q) return;
  try {
    const raw = localStorage.getItem(KEY);
    const stats: MonthlyStats = raw ? JSON.parse(raw) : {};
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    stats[monthKey] = stats[monthKey] || {};
    stats[monthKey][q] = (stats[monthKey][q] || 0) + 1;
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch { void 0 }

  try {
    const raw2 = localStorage.getItem(KEY_LANG);
    const statsLang: MonthlyLangStats = raw2 ? JSON.parse(raw2) : {};
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    statsLang[monthKey] = statsLang[monthKey] || {};
    statsLang[monthKey][l] = statsLang[monthKey][l] || {};
    statsLang[monthKey][l][q] = (statsLang[monthKey][l][q] || 0) + 1;
    localStorage.setItem(KEY_LANG, JSON.stringify(statsLang));
  } catch { void 0 }
}

export function getMonthlyTop(month?: string, topN = 20): { query: string; count: number }[] {
  try {
    const raw = localStorage.getItem(KEY);
    const stats: MonthlyStats = raw ? JSON.parse(raw) : {};
    const now = new Date();
    const monthKey = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const bucket = stats[monthKey] || {};
    return Object.entries(bucket)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
  } catch {
    return [];
  }
}

export function getMonthlyTopByLanguage(lang?: string, month?: string, topN = 20): { query: string; count: number }[] {
  try {
    const raw = localStorage.getItem(KEY_LANG);
    const stats: MonthlyLangStats = raw ? JSON.parse(raw) : {};
    const now = new Date();
    const monthKey = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const l = (lang || 'en').toLowerCase();
    const bucket = (stats[monthKey] || {})[l] || {};
    return Object.entries(bucket)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
  } catch {
    return [];
  }
}

export function logFaqView(question: string) {
  const q = (question || '').trim().toLowerCase();
  if (!q) return;
  try {
    const raw = localStorage.getItem(FAQ_VIEW_KEY);
    const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
    stats[q] = (stats[q] || 0) + 1;
    localStorage.setItem(FAQ_VIEW_KEY, JSON.stringify(stats));
  } catch { void 0 }
}

export function logFaqFeedback(question: string, helpful: boolean) {
  const q = (question || '').trim().toLowerCase();
  if (!q) return;
  try {
    const raw = localStorage.getItem(FAQ_FEEDBACK_KEY);
    const stats: Record<string, { up: number; down: number }> = raw ? JSON.parse(raw) : {};
    const entry = stats[q] || { up: 0, down: 0 };
    if (helpful) entry.up += 1; else entry.down += 1;
    stats[q] = entry;
    localStorage.setItem(FAQ_FEEDBACK_KEY, JSON.stringify(stats));
  } catch { void 0 }
}

export function getTopFaqs(topN = 20): { question: string; views: number }[] {
  try {
    const raw = localStorage.getItem(FAQ_VIEW_KEY);
    const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
    return Object.entries(stats)
      .map(([question, views]) => ({ question, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, topN);
  } catch {
    return [];
  }
}
