import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import FooterLanguageBar from '@/components/FooterLanguageBar';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
 

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const GOOGLE_REVIEWS_URL = 'https://g.page/r/CS2sb5dkY56KEBM/review';

  

  

  const acknowledgementCopy =
    "Mosaic Multicultural Connections acknowledges the Traditional Owners of the lands where we work and pay our respects to Elders, past and present. As an organisation supporting people from many cultures in building new connections, we honour First Nations peoples' continuing connection to country and culture.";

  return (
    <footer className="relative overflow-hidden bg-background text-foreground transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-sky/25 to-ocean/25 dark:from-ocean/30 dark:via-sky/20 dark:to-ocean/30" />
        <div className="absolute inset-y-0 right-[-15%] w-1/2 md:w-1/3 rounded-full bg-sky/15 dark:bg-sky/20 blur-3xl" />
        <div className="absolute inset-y-0 left-[-20%] w-2/5 md:w-1/3 rounded-full bg-ocean/15 dark:bg-ocean/25 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-6 sm:py-8 lg:px-8">
        <div className="space-y-4">

          <div className="space-y-4">
            <div>
              <nav aria-label={t('footer.quickLinks')} className="mt-1">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <Link to="/" className="inline-flex items-center gap-3">
                      <img
                        className="h-12 w-auto sm:h-14 lg:h-16"
                        src={theme === 'dark' ? '/3.png' : '/4.png'}
                        alt="Mosaic Multicultural Connections"
                      />
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      <span className="rounded-full border border-border bg-ocean/10 text-ocean dark:bg-white/10 dark:text-sky px-3 py-1.5">40+ Years of Impact</span>
                      <span className="rounded-full border border-border bg-ocean/10 text-ocean dark:bg-white/10 dark:text-sky px-3 py-1.5">Multicultural Services NSW</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('footer.sections.overview')}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <Link to="/" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('nav.home')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('nav.about')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/stories" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('nav.stories')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('footer.sections.services')}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <Link to="/services/settlement-support" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('services.settlement')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/aged-care" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('services.agedCare')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/family-support" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('services.familySupport')}
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/community-engagement" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          {t('services.communityEngagement')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('nav.resources')}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <Link to="/resources/emergency-translation" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Emergency & Translation Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/resources/annual-reports" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Annual Reports
                        </Link>
                      </li>
                      <li>
                        <Link to="/company/knowledge-base" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Knowledge Base
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('footer.sections.getInvolved')}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <a href="https://tally.so/r/3qoXjg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Volunteer
                        </a>
                      </li>
                      <li>
                        <a href="https://employmenthero.com/mosaic-mc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Career
                        </a>
                      </li>
                      <li>
                        <Link to="/donate" className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky">
                          Donate
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          
        </div>

        <div className="mt-4 rounded-3xl border border-border bg-muted/40 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Acknowledgement of Country</p>
              <p className="text-sm leading-relaxed text-foreground">{acknowledgementCopy}</p>
              <p className="text-xs text-muted-foreground">
                We walk alongside Elders, knowledge holders, and communities to ensure our work honours their custodianship.
              </p>
            </div>
            <div className="flex h-full flex-col lg:border-l lg:border-border lg:pl-8 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('footer.sections.aboutMosaic')}</p>
              <p className="text-sm text-foreground">{t('footer.description')}</p>
              <div className="lg:mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Row 1 */}
                <Link
                  to="/contact"
                  className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border border-ocean bg-ocean px-3 py-2 text-sm font-semibold text-white dark:text-ocean shadow-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-98 hover:bg-[#233069] focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700 dark:border-sky dark:bg-sky dark:hover:bg-sky/90 dark:focus:ring-sky"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>
                  Contact
                </Link>
                <a
                  href="https://tally.so/r/w4veNk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Refer a client"
                  className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border border-ocean bg-ocean px-3 py-2 text-sm font-semibold text-white dark:text-ocean shadow-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-98 hover:bg-[#233069] focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700 dark:border-sky dark:bg-sky dark:hover:bg-sky/90 dark:focus:ring-sky"
                >
                  <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
                  Refer
                </a>
                {/* Row 2 */}
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Leave a Google Review"
                  className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border border-ocean bg-transparent px-3 py-2 text-sm font-semibold text-ocean shadow-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-98 hover:bg-ocean/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700 dark:border-sky dark:text-sky dark:hover:bg-white/10"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                  </svg>
                  Leave a Google Review
                </a>
                <a
                  href="https://forms.mosaicmc.org.au/Feedback"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share Your Feedback"
                  className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border border-ocean bg-transparent px-3 py-2 text-sm font-semibold text-ocean shadow-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-98 hover:bg-ocean/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700 dark:border-sky dark:text-sky dark:hover:bg-white/10"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/><path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244 .637c-.079 .186 .074 .394 .273 .362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711 .074c-.387 .196 -1.24 .57 -2.634 .893a11 11 0 0 0 .398 -2"/></svg>
                  Share Your Feedback
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterLanguageBar />

      <div className="border-t border-border bg-background/90 transition-colors">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t('footer.followUs')}</span>
            <a href="https://au.linkedin.com/company/mosaic-multicultural-connections" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn" className="p-2 rounded-full border border-border text-ocean dark:text-sky transition hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg>
            </a>
            <a href="https://www.instagram.com/mosaicmc/" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram" className="p-2 rounded-full border border-border text-ocean dark:text-sky transition hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
            </a>
            <a href="https://www.facebook.com/mosaicmulticulturalconnections/" target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook" className="p-2 rounded-full border border-border text-ocean dark:text-sky transition hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
