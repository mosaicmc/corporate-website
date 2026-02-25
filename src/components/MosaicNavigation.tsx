import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu-trigger-style";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { prefetchOnHover, prefetchRoute } from "@/lib/prefetch";
import { Menu, Phone, X, Home, Heart, Users, Globe, LucideIcon, AlertTriangle, Book, ShieldCheck, Search } from "lucide-react";
import { logSearchQuery, getMonthlyTop } from '@/lib/searchAnalytics';
import { ThemeToggle } from './ui/theme-toggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const services: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Settlement Support",
    href: "/services/settlement-support",
    description: "Help new migrants settle into Australian life with practical support and guidance.",
    icon: Home,
  },
  {
    title: "Aged Care",
    href: "/services/aged-care",
    description: "Culturally appropriate aged care services for multicultural communities.",
    icon: Heart,
  },
  {
    title: "Family Support",
    href: "/services/family-support",
    description: "Supporting families with children, parenting resources, and family wellbeing.",
    icon: Users,
  },
  {
    title: "Community Engagement",
    href: "/services/community-engagement",
    description: "Building stronger communities through events, programs, and connections.",
    icon: Globe,
  },
];

const mainNavigation = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Stories", href: "/stories" },
  { title: "Resources", href: "/resources" },
];

const resourcesLinks: { title: string; href: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Emergency & Translation",
    href: "/resources/emergency-translation",
    description: "Emergency contacts and interpreter support (NSW compliance)",
    icon: AlertTriangle,
  },
  {
    title: "Helpful Links",
    href: "/resources/helpful-links",
    description: "Legal Aid NSW, interpreter support, emergency info",
    icon: Globe,
  },
  {
    title: "Knowledge Base",
    href: "/company/knowledge-base",
    description: "Organisational policies and governance resources",
    icon: Book,
  },
  {
    title: "FAQs",
    href: "/resources/faqs",
    description: "Common questions across services and access",
    icon: Book,
  },
];

type SearchItem = { path: string; title: string; body: string; tags: string[]; lang?: string };
let runtimeIndex: SearchItem[] = [];
let indexLoaded = false;
async function loadSearchIndex() {
  if (indexLoaded) return;
  try {
    const res = await fetch('/search-index.json');
    const data = await res.json();
    runtimeIndex = Array.isArray(data.items) ? data.items : [];
    indexLoaded = true;
  } catch {
    runtimeIndex = [];
    indexLoaded = true;
  }
}

type ListItemProps = {
  title: string;
  to: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, to, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={to}
            ref={ref}
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
              // Improved hover/focus visibility in dark mode
              "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
              "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
              "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background",
              className
            )}
            {...prefetchOnHover(to)}
            {...props}
          >
            <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
              {Icon && <Icon className="h-5 w-5" />}
              {title}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link to="/" className="flex-shrink-0 group relative flex items-center">
      <img
        className="transition-all duration-500 group-hover:scale-105 hover:drop-shadow-lg h-16 sm:h-18 lg:h-20 w-auto max-w-none"
        src={theme === 'dark' ? '/3.png' : '/4.png'}
        alt="Mosaic Multicultural Connections"
      />
    </Link>
  );
};

export default function MosaicNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [topQueries, setTopQueries] = useState<{ query: string; count: number }[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  // Check if current path matches navigation item
  const isActivePath = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      return location.pathname.startsWith(href);
    }
    return location.pathname === href;
  };

  const handleCloseCrisisBanner = () => {
    setShowCrisisBanner(false);
  };

  React.useEffect(() => {
    loadSearchIndex();
    const onKey = (e: KeyboardEvent) => {
      const isMetaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isMetaK) {
        e.preventDefault();
        setShowOverlay((v) => !v);
        setIsSearchOpen(true);
        setTimeout(() => {
          const el = document.getElementById('header-search-input');
          (el as HTMLInputElement | null)?.focus();
        }, 20);
      } else if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          const el = document.getElementById('header-search-input');
          (el as HTMLInputElement | null)?.focus();
        }, 20);
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        const next = !(localStorage.getItem('mosaic-owner') === '1');
        localStorage.setItem('mosaic-owner', next ? '1' : '0');
        setIsOwner(next);
      }
    };
    window.addEventListener('keydown', onKey);
    const initialOwner = localStorage.getItem('mosaic-owner') === '1' || (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV;
    setIsOwner(!!initialOwner);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function expandSynonyms(q: string): string[] {
    const base = q.toLowerCase();
    const syn: Record<string, string[]> = {
      volunteer: ['get involved', 'help', 'participate'],
      interpreting: ['translation', 'language', 'tis'],
      donate: ['support', 'give', 'funding'],
      services: ['programs', 'support'],
      emergency: ['000', 'police', 'fire', 'ambulance'],
      'aged care': ['elder care', 'elderly', 'senior', 'seniors'],
      'elder care': ['aged care', 'elderly', 'senior', 'seniors'],
      elder: ['aged care'],
      employment: ['jobs', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
      jobs: ['employment', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
      job: ['employment', 'jobs', 'career', 'work', 'get involved', 'work for us', 'join our team'],
      career: ['employment', 'jobs', 'work', 'get involved', 'work for us', 'join our team'],
      work: ['employment', 'jobs', 'career', 'get involved', 'work for us', 'join our team'],
      'old people': ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
      old: ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
    };
    const acc = new Set<string>([base]);
    for (const [k, arr] of Object.entries(syn)) {
      if (base.includes(k)) arr.forEach((a) => acc.add(a));
      for (const a of arr) if (base.includes(a)) acc.add(k);
    }

    const lang = (i18n.language || 'en').toLowerCase();
    const trans: Record<string, Record<string, string[]>> = {
      hi: {
        'रोजगार': ['employment', 'jobs', 'work'],
        'नौकरी': ['jobs', 'employment'],
        'करियर': ['career'],
        'काम': ['work', 'employment'],
        'वृद्ध': ['aged care', 'elder care'],
        'वृद्ध देखभाल': ['aged care', 'elder care'],
        'बुजुर्ग': ['aged care', 'elder care'],
        'सेवाएं': ['services'],
        'स्वयंसेवी': ['volunteer', 'get involved'],
        'naukri': ['jobs', 'employment'],
        'kaam': ['work', 'employment'],
        'buzurg': ['aged care', 'elder care'],
        'sewa': ['services'],
        'dekhbhal': ['aged care', 'elder care']
      },
      es: {
        'empleo': ['employment', 'jobs', 'work'],
        'trabajo': ['work', 'employment'],
        'carrera': ['career'],
        'ancianos': ['aged care', 'elder care'],
        'cuidado de mayores': ['aged care', 'elder care'],
        'servicios': ['services'],
        'voluntariado': ['volunteer', 'get involved']
      },
      vi: {
        'việc làm': ['employment', 'jobs', 'work'],
        'nghề nghiệp': ['career'],
        'người già': ['aged care', 'elder care'],
        'chăm sóc người cao tuổi': ['aged care', 'elder care'],
        'dịch vụ': ['services'],
        'tình nguyện': ['volunteer', 'get involved']
      },
      ar: {
        'عمل': ['work', 'employment'],
        'وظائف': ['jobs', 'employment'],
        'وظيفة': ['job', 'employment'],
        'مسار مهني': ['career'],
        'مسن': ['aged care', 'elder care'],
        'رعاية المسنين': ['aged care', 'elder care'],
        'خدمات': ['services'],
        'تطوع': ['volunteer', 'get involved']
      }
    };
    const langMap = trans[lang];
    if (langMap) {
      for (const [k, arr] of Object.entries(langMap)) {
        if (base.includes(k)) {
          acc.add(k);
          arr.forEach((a) => acc.add(a));
        }
      }
    }
    return Array.from(acc);
  }

  function rankResults(q: string, items: SearchItem[]): SearchItem[] {
    const qs = expandSynonyms(q);
    const lang = (i18n.language || 'en').toLowerCase();
    const scored = items.map((it) => {
      const hay = `${it.title} ${it.body} ${(it.tags || []).join(' ')}`.toLowerCase();
      let score = 0;
      for (const term of qs) {
        if (!term) continue;
        if (it.title.toLowerCase() === term) score += 8;
        if (it.title.toLowerCase().startsWith(term)) score += 6;
        if (it.title.toLowerCase().includes(term)) score += 5;
        if (hay.includes(term)) score += 3;
      }
      if (it.lang && it.lang.toLowerCase() === lang) score += 4;
      return { it, score };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.it);
  }

  return (
    <>
      {/* Crisis Support Banner */}
      {showCrisisBanner && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium relative z-[120]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 sm:space-x-4">
            <span className="text-sm">🚨 Crisis and Emergency Services</span>
            <Link 
              to="/resources"
              className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-colors text-sm font-medium"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              View Emergency Services
            </Link>
            <button
              onClick={handleCloseCrisisBanner}
              className="ml-2 p-1 hover:bg-red-700 rounded transition-colors"
              aria-label="Close crisis banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <nav className="border-b bg-white dark:bg-slate-800 sticky top-0 z-50 shadow-lg border-gray-200 dark:border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActivePath('/')
                            ? "text-white dark:text-ocean bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                            : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                          "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                        )}
                        {...prefetchOnHover('/')}
                      >
                        {t('nav.home')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      isActivePath('/services', true)
                        ? "text-white dark:text-ocean bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                        : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                      "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    )}
                      onMouseEnter={() => {
                        prefetchRoute('/services');
                        services.forEach(s => prefetchRoute(s.href));
                      }}
                      onFocus={() => {
                        prefetchRoute('/services');
                        services.forEach(s => prefetchRoute(s.href));
                      }}
                    >{t('nav.services')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            Core Services
                          </h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3">
                            {services.map((service) => (
                              <ListItem
                                key={service.title}
                                title={service.title}
                                to={service.href}
                                icon={service.icon}
                              >
                                {service.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>

                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            Quick Links
                          </h6>
                          <ul className="mt-2.5 grid gap-3">
                            <ListItem
                              title="All Services"
                              to="/services"
                              icon={Globe}
                            >
                              Explore our complete range of multicultural support services
                            </ListItem>
                            <ListItem
                              title="Get Support"
                              to="/contact"
                              icon={Phone}
                            >
                              Contact us for immediate assistance and guidance
                            </ListItem>
                            <ListItem
                              title="Locations"
                              to="/locations"
                              icon={Home}
                            >
                              Find service locations across New South Wales
                            </ListItem>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Other Navigation Items (About, Stories) */}
                  {mainNavigation.slice(1, 3).map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            isActivePath(item.href)
                              ? "text-white dark:text-ocean bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                              : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                            "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                          )}
                          {...prefetchOnHover(item.href)}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                  {/* Resources Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        isActivePath('/resources', true)
                          ? "text-white dark:text-ocean bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                          : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                        "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      onMouseEnter={() => {
                        prefetchRoute('/resources');
                        resourcesLinks.forEach(r => prefetchRoute(r.href));
                      }}
                      onFocus={() => {
                        prefetchRoute('/resources');
                        resourcesLinks.forEach(r => prefetchRoute(r.href));
                      }}
                    >Resources</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-border">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">Key Resources</h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3">
                            {resourcesLinks.map((res) => (
                              <ListItem key={res.title} title={res.title} to={res.href} icon={res.icon}>
                                {res.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">Explore</h6>
                          <ul className="mt-2.5 grid gap-3">
                            <ListItem title="All Resources" to="/resources" icon={Globe}>
                              Browse brochures, annual reports, helpful links, emergency & translation
                            </ListItem>
                            <ListItem title="Contact" to="/contact" icon={Phone}>
                              Reach us for guidance and support
                            </ListItem>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3 relative">
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setIsSearchOpen((v) => !v)}
                className="p-2 rounded-lg text-ocean dark:text-sky hover:bg-sand/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className={`${showOverlay ? 'fixed inset-0 max-w-2xl mx-auto mt-24' : 'absolute right-0 top-12'} z-50 w-80 sm:w-[36rem] rounded-xl border border-border bg-background p-3 shadow-2xl`}>
                  <div className="flex items-center gap-2">
                    <input
                      id="header-search-input"
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search the site (Cmd+K)"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    />
                    <button
                      type="button"
                      aria-label="Close search"
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="p-2 rounded-md text-muted-foreground hover:bg-sand/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 max-h-64 overflow-auto">
                    {searchQuery.trim() ? (
                      <ul className="space-y-1">
                        {rankResults(searchQuery, runtimeIndex).slice(0, 12).map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="block rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                          {...prefetchOnHover(item.path)}
                              onClick={() => { logSearchQuery(searchQuery, i18n.language); setIsSearchOpen(false); setSearchQuery(""); setShowOverlay(false); }}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                        {rankResults(searchQuery, runtimeIndex).length === 0 && (
                          <li className="px-2 py-1.5 text-sm text-muted-foreground">No results</li>
                        )}
                      </ul>
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">Type to search</div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Press Esc to close</div>
                    {isOwner && (
                      <button
                        type="button"
                        className="text-xs rounded-md px-2 py-1 border border-border hover:bg-sand/50 dark:hover:bg-slate-800/50"
                        onClick={() => { setTopQueries(getMonthlyTop(undefined, 20)); }}
                      >View monthly top searches</button>
                    )}
                  </div>
                  {isOwner && topQueries.length > 0 && (
                    <div className="mt-2 border-t border-border pt-2">
                      <div className="text-xs font-semibold mb-1">Top searches</div>
                      <ul className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                        {topQueries.map((x) => (
                          <li key={x.query} className="flex justify-between"><span>{x.query}</span><span>{x.count}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
            {/* Theme Toggle */}
            <ThemeToggle />

              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Action Buttons Group */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="cta"
                  size="default"
                  asChild
                  className="bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-ocean font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                >
                  <Link to="/get-involved" {...prefetchOnHover('/get-involved')}>{t('nav.getInvolved')}</Link>
                </Button>
                {/* Prominent Donate Button */}
                <Button 
                  variant="cta"
                  size="default" 
                  asChild
                  className="bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-ocean font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                >
                  <Link to="/donate" {...prefetchOnHover('/donate')}>Donate</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu + Quick Actions */}
            <div className="md:hidden flex items-center gap-2">
              {/* Compact Language Switcher visible in header on mobile */}
              <LanguageSwitcher showText={false} />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link 
                      to="/" 
                      className={cn("text-lg font-medium transition-colors",
                        isActivePath('/')
                          ? "text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                        "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      {...prefetchOnHover('/')}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.home')}
                    </Link>
                    
                    <Link 
                      to="/services" 
                      className={cn("text-lg font-medium transition-colors",
                        isActivePath('/services', true)
                          ? "text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                        "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      {...prefetchOnHover('/services')}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.services')}
                    </Link>
                    <div className="pl-4 space-y-3">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.title}
                            to={service.href}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            {...prefetchOnHover(service.href)}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            {service.title}
                          </Link>
                        );
                      })}
                    </div>
                    
                    {mainNavigation.slice(1, 3).map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={cn("text-lg font-medium transition-colors",
                          isActivePath(item.href)
                            ? "text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                            : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                          "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                        )}
                        {...prefetchOnHover(item.href)}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}

                    {/* Resources sub-links */}
                    <Link 
                      to="/resources" 
                      className={cn("text-lg font-medium transition-colors",
                        isActivePath('/resources')
                          ? "text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                        "focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      {...prefetchOnHover('/resources')}
                      onClick={() => setIsOpen(false)}
                    >
                      Resources
                    </Link>
                    <div className="pl-4 space-y-3">
                      {resourcesLinks.map((res) => {
                        const Icon = res.icon;
                        return (
                          <Link
                            key={res.title}
                            to={res.href}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            {...prefetchOnHover(res.href)}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            {res.title}
                          </Link>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200/30 dark:border-slate-700/30 space-y-3">
                      {/* Full Language Switcher inside mobile menu */}
                      <LanguageSwitcher />
                      <Button variant="outline" size="sm" asChild className="w-full border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-sand/50 dark:hover:bg-slate-800/50">
                        <a href="tel:1800813205">📞 Call 1800 813 205</a>
                      </Button>
                      <Button
                        size="default"
                        asChild
                        className="w-full bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-ocean font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <Link to="/get-involved" onClick={() => setIsOpen(false)}>
                          {/* Prefetch Get Involved route on hover/focus */}
                          <span {...prefetchOnHover('/get-involved')}> 
                          🤝 {t('nav.getInvolved')}
                          </span>
                        </Link>
                      </Button>
                      {/* Prominent Mobile Donate Button */}
                      <Button 
                        size="default" 
                        asChild 
                        className="w-full bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-ocean font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <Link to="/donate" {...prefetchOnHover('/donate')} onClick={() => setIsOpen(false)}>
                          Donate to Support Our Community
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
