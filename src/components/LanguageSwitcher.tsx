import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', direction: 'ltr' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', direction: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', direction: 'ltr' },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa', flag: '🇼🇸', direction: 'ltr' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', direction: 'ltr' },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🏳️', direction: 'ltr' },
];

interface LanguageSwitcherProps {
  className?: string;
  showText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  showText = true
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Map app language codes to Google Translate codes where necessary
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
  
  const changeLanguage = (langCode: string) => {
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      i18n.changeLanguage(langCode);
      
      // Update document direction for RTL languages
      document.documentElement.dir = selectedLang.direction;
      document.documentElement.lang = langCode;
      
      // Save to localStorage
      localStorage.setItem('preferred-language', langCode);

      // Apply machine translation for full-page content via Google Translate.
      // When switching to English, clear translation; otherwise set target language.
      if (langCode === 'en') {
        clearGoogTransCookie();
      } else {
        setGoogTransCookie(langCode);
      }
      // Reload to ensure Google Translate applies consistently across the page.
      // This is necessary because the Google widget reads the cookie on load.
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-800/50 transition-all duration-300 group"
        aria-label={t('common.changeLanguage')}
      >
        <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
        {showText && (
          <>
            <span className="text-sm font-medium">
              {currentLanguage.flag} {currentLanguage.nativeName}
            </span>
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform duration-300',
              isOpen && 'rotate-180'
            )} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-64 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 rounded-xl shadow-2xl border border-white/30 dark:border-slate-700/50 z-50 overflow-hidden">
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-200/30 dark:border-slate-700/30">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('common.changeLanguage')}
                </p>
              </div>
              
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200',
                    i18n.language === language.code && 'bg-white/70 dark:bg-slate-800/70 text-ocean dark:text-sky'
                  )}
                  dir={language.direction}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language.name}
                      </div>
                    </div>
                  </div>
                  
                  {i18n.language === language.code && (
                    <div className="w-2 h-2 rounded-full bg-ocean dark:bg-sky animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200/30 dark:border-slate-700/30 bg-gray-50/50 dark:bg-slate-800/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {languages.length} languages available
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;