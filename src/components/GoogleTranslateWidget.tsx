import * as React from "react";
import { useTranslation } from 'react-i18next';
import { Languages, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

type GoogleTranslateWidgetProps = {
  className?: string;
  includedLanguages?: string; // comma-separated language codes
  pageLanguage?: string;
  showReset?: boolean;
};

export default function GoogleTranslateWidget({
  className,
  includedLanguages = "ar,zh-CN,zh-TW,es,uk,ru,ps,ku,vi,hi,tl,it,pt,fa,th,sw",
  pageLanguage = "en",
  showReset = true,
}: GoogleTranslateWidgetProps) {
  const { t } = useTranslation();
  React.useEffect(() => {
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage,
          includedLanguages,
          autoDisplay: false,
          layout: 0,
        },
        "google_translate_element"
      );
    };

    return () => {
      // no reliable cleanup from Google widget; leave script in place
    };
  }, [includedLanguages, pageLanguage]);

  const handleReset = React.useCallback(() => {
    try {
      // Clear Google Translate cookie and reload to reset language
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      const banner = document.querySelector("iframe.goog-te-banner-frame");
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
      window.location.reload();
    } catch (e) {
      // noop: best-effort reset
    }
  }, []);

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground p-1.5">
              <Languages className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="text-sm font-semibold leading-6 text-foreground">
              {t('common.translateThisPage')}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Google Translate</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-3 pb-3">
          <div
            id="google_translate_element"
            className="inline-block w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm"
          />
          {showReset && (
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleReset} aria-label="Reset translation">
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}