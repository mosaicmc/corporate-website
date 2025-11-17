import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type Lang = {
  code: string;
  label: string; // short code shown under the flag
  flag: string;  // emoji flag for visual
  direction: 'ltr' | 'rtl';
};

// Inspired by mosaicmc.org.au footer language strip
// Uses emojis for simplicity (no external assets). Maps to Google Translate via cookies.
const languages: Lang[] = [
  { code: 'ar', label: 'AR', flag: '🇸🇦', direction: 'rtl' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳', direction: 'ltr' },
  { code: 'zh-tw', label: 'ZH', flag: '🇹🇼', direction: 'ltr' },
  { code: 'en', label: 'EN', flag: '🇦🇺', direction: 'ltr' },
  { code: 'tl', label: 'TL', flag: '🇵🇭', direction: 'ltr' },
  { code: 'hi', label: 'HI', flag: '🇮🇳', direction: 'ltr' },
  { code: 'it', label: 'IT', flag: '🇮🇹', direction: 'ltr' },
  { code: 'ru', label: 'RU', flag: '🇷🇺', direction: 'ltr' },
  { code: 'ku', label: 'KU', flag: '🏳️', direction: 'ltr' },
  { code: 'fa', label: 'FA', flag: '🇮🇷', direction: 'rtl' },
  { code: 'pt', label: 'PT', flag: '🇵🇹', direction: 'ltr' },
  { code: 'sm', label: 'SM', flag: '🇼🇸', direction: 'ltr' },
  { code: 'es', label: 'ES', flag: '🇪🇸', direction: 'ltr' },
  { code: 'sw', label: 'SW', flag: '🇰🇪', direction: 'ltr' },
  { code: 'th', label: 'TH', flag: '🇹🇭', direction: 'ltr' },
  { code: 'uk', label: 'UK', flag: '🇺🇦', direction: 'ltr' },
  { code: 'vi', label: 'VI', flag: '🇻🇳', direction: 'ltr' },
];

// Map app codes to Google Translate where needed
const gtLangMap: Record<string, string> = {
  'zh': 'zh-CN',
  'zh-tw': 'zh-TW',
};

const setGoogTransCookie = (targetLang: string) => {
  const lang = gtLangMap[targetLang] || targetLang;
  const cookieVal = `/auto/${lang}`;
  const hostname = window.location.hostname;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `googtrans=${cookieVal}; expires=${expires}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; expires=${expires}; domain=.${hostname}; path=/;`;
};

const clearGoogTransCookie = () => {
  const hostname = window.location.hostname;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${hostname}; path=/;`;
};

export const FooterLanguageBar: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (code: string, direction: 'ltr' | 'rtl') => {
    i18n.changeLanguage(code);
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
    localStorage.setItem('preferred-language', code);
    if (code === 'en') {
      clearGoogTransCookie();
    } else {
      setGoogTransCookie(code);
    }
    // Reload to ensure Google Translate applies uniformly
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <div
      className={cn(
        'w-full bg-transparent text-foreground dark:text-white',
        className
      )}
      aria-label="Language selection"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* Responsive: center on mobile, evenly spaced on larger screens; wraps to multiple lines */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-3 gap-y-2 py-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code, lang.direction)}
              className={cn(
                'flex flex-col items-center justify-center',
                'px-2 py-1 rounded-md transition-colors',
                'hover:bg-foreground/10 dark:hover:bg-white/10',
                'focus:outline-none focus:ring-2 focus:ring-foreground/30 dark:focus:ring-white/30',
                i18n.language === lang.code && 'bg-foreground/10 dark:bg-white/10'
              )}
              aria-label={`Change language to ${lang.label}`}
              dir={lang.direction}
            >
              <span className="text-base sm:text-lg leading-none">{lang.flag}</span>
              <span className="text-[10px] sm:text-xs mt-1 tracking-wide font-semibold">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLanguageBar;
