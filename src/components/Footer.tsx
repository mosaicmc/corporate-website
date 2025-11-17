import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterLanguageBar from '@/components/FooterLanguageBar';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-background transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Navigation Sections */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.sections.overview')}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link to="/about" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.allServices')}
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.locations')}
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.stories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.sections.services')}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link to="/services/settlement-support" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('services.settlement')}
                </Link>
              </li>
              <li>
                <Link to="/services/aged-care" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('services.agedCare')}
                </Link>
              </li>
              <li>
                <Link to="/services/family-support" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('services.familySupport')}
                </Link>
              </li>
              <li>
                <Link to="/services/community-engagement" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('services.communityEngagement')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.sections.getInvolved')}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link to="/get-involved" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.getInvolved')}
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.getInvolved')}
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.donate')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.sections.help')}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link to="/resources" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link to="/resources/emergency-translation" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.emergencyTranslation')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.terms')}
                </a>
              </li>
            </ul>
            {/* Language tools moved to a global footer strip */}
          </div>

          {/* About Mosaic */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.sections.aboutMosaic')}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link to="/company/knowledge-base" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.knowledgeBase')}
                </Link>
              </li>
              <li>
                <Link to="/resources/annual-reports" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.links.annualReports')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo and Newsletter Section - Side by Side */}
        <div className="mt-16 flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Logo and Description - Optimized sizing */}
          <div className="space-y-8 lg:max-w-md">
            <Link to="/" className="flex items-center">
              <img
                className="h-12 w-auto sm:h-14 lg:h-16"
                src={theme === 'dark' ? '/3.png' : '/4.png'}
                alt="Mosaic Multicultural Connections"
              />
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Newsletter Signup with Animated Input-Button */}
          <div className="mt-16 lg:mt-0 lg:max-w-md">
            <h3 className="text-sm font-semibold leading-6 text-foreground">{t('footer.newsletter.title')}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t('footer.newsletter.description')}
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="relative flex items-center max-w-md">
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 h-12 px-4 pr-32 text-sm bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-6 bg-ocean hover:bg-ocean/90 text-white text-sm font-semibold rounded-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
                >
                  {t('footer.newsletter.subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Flags Language Bar */}
      <FooterLanguageBar />

      {/* Bottom Section */}
      <div className="bg-transparent transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="md:order-1">
            <p className="text-center text-xs leading-5 text-muted-foreground md:text-left">
              {t('footer.copyright')}
            </p>
          </div>
          <div className="mt-4 flex justify-center space-x-6 md:order-2 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
