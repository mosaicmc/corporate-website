import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import FooterLanguageBar from '@/components/FooterLanguageBar';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const quickLinks = useMemo(
    () => [
      { label: t('nav.home'), to: '/' },
      { label: t('nav.services'), to: '/services' },
      { label: t('nav.locations'), to: '/locations' },
      { label: t('nav.stories'), to: '/stories' },
      { label: t('nav.contact'), to: '/contact' },
      { label: t('nav.getInvolved'), to: '/get-involved' },
    ],
    [t],
  );

  const socialLinks = useMemo(
    () => [
      {
        label: 'Facebook',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'Instagram',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'LinkedIn',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.09h4.6V23.5H.2zM8.45 8.09h4.4v2.11h.06c.61-1.15 2.11-2.36 4.34-2.36 4.64 0 5.5 3.05 5.5 7.02v8.64h-4.6V15.7c0-1.86-.03-4.26-2.6-4.26-2.6 0-3 2.03-3 4.12v8.94H8.45z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'YouTube',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
    [],
  );

  const acknowledgementCopy =
    "Mosaic Multicultural Connections acknowledges the Traditional Owners of the lands where we work and pay our respects to Elders, past and present. As an organisation supporting people from many cultures in building new connections, we honour First Nations peoples' continuing connection to country and culture.";

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/30 via-transparent to-transparent" />
        <div className="absolute inset-y-0 right-[-20%] w-2/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-y-0 left-[-30%] w-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="space-y-7">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                className="h-12 w-auto sm:h-14 lg:h-16"
                src={theme === 'dark' ? '/3.png' : '/4.png'}
                alt="Mosaic Multicultural Connections"
              />
            </Link>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Acknowledgement of Country</p>
              <p className="text-base leading-relaxed text-slate-100/90">{acknowledgementCopy}</p>
              <p className="text-sm text-slate-300/90">
                We walk alongside Elders, knowledge holders, and communities to ensure our work honours their custodianship.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('footer.quickLinks')}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200/90">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex w-full items-center justify-between rounded-2xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/5"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400 transition group-hover:text-white">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('footer.contactInfo')}</p>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Head Office</p>
                <p className="text-base text-white">123 Multicultural Street, Newcastle NSW 2300</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
                <a className="text-base text-white transition hover:text-primary" href="mailto:info@mosaic.org.au">
                  info@mosaic.org.au
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Phone</p>
                <a className="text-base text-white transition hover:text-primary" href="tel:+61212345678">
                  (02) 1234 5678
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Community Hours</p>
                <p className="text-base text-white">Mon – Fri · 9:00am – 5:00pm</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('footer.followUs')}</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-sm text-slate-300">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base text-slate-100">{t('footer.description')}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <span className="rounded-full border border-white/15 px-4 py-2">40+ Years of Impact</span>
              <span className="rounded-full border border-white/15 px-4 py-2">Guided by First Nations partners</span>
            </div>
          </div>
        </div>
      </div>

      <FooterLanguageBar />

      <div className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-slate-300 transition hover:border-white/40 hover:text-white"
              >
                {social.icon}
                <span className="text-xs font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
