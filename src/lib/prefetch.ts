// Lightweight route prefetch utility to warm up lazy-loaded chunks
// Maps pathname to dynamic import functions matching React.lazy definitions in App.tsx

const prefetched = new Set<string>();

type Prefetcher = () => Promise<unknown>;

const routeImportMap: Record<string, Prefetcher> = {
  '/': () => import('../pages/HomePage'),
  '/about': () => import('../pages/AboutPage'),
  '/services': () => import('../pages/ServicesPage'),
  '/services/settlement-support': () => import('../pages/services/SettlementSupportPage'),
  '/services/aged-care': () => import('../pages/services/AgedCarePage'),
  '/services/family-support': () => import('../pages/services/FamilySupportPage'),
  '/services/community-engagement': () => import('../pages/services/CommunityEngagementPage'),
  '/locations': () => import('../pages/LocationsPage'),
  '/get-involved': () => import('../pages/GetInvolvedPage'),
  '/resources': () => import('../pages/ResourcesPage'),
  // Legacy routes redirected to combined page
  '/resources/emergency-services': () => import('../pages/resources/EmergencyTranslationPage'),
  '/resources/translation-services': () => import('../pages/resources/EmergencyTranslationPage'),
  '/resources/emergency-translation': () => import('../pages/resources/EmergencyTranslationPage'),
  '/resources/annual-reports': () => import('../pages/resources/AnnualReportsPage'),
  '/resources/helpful-links': () => import('../pages/resources/HelpfulLinksPage'),
  '/stories': () => import('../pages/StoriesPage'),
  '/contact': () => import('../pages/ContactPage'),
  '/donate': () => import('../pages/DonatePage'),
  // Policies
  '/policies/code-of-conduct': () => import('../pages/policies/CodeOfConductPolicyPage'),
  '/policies/diversity-inclusion': () => import('../pages/policies/DiversityInclusionPolicyPage'),
  '/policies/whistleblower': () => import('../pages/policies/WhistleblowerPolicyPage'),
  '/policies/quality-management': () => import('../pages/policies/QualityManagementPolicyPage'),
  '/policies/work-health-safety': () => import('../pages/policies/WorkHealthSafetyPolicyPage'),
  '/company/knowledge-base': () => import('../pages/company/KnowledgeBasePage'),
};

export function prefetchRoute(path: string) {
  if (!path || prefetched.has(path)) return;
  const loader = routeImportMap[path];
  if (!loader) return; // no matching lazy route
  // Trigger dynamic import; ignore errors to avoid UI disruption
  loader().catch(() => {});
  prefetched.add(path);
}

// Convenience helper to attach to link components
export function prefetchOnHover(path: string) {
  return {
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
  };
}