import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MosaicNavigation from './components/MosaicNavigation';
import Footer from './components/Footer';
import Breadcrumbs from './components/ui/Breadcrumbs';
import QuickLinks from './components/ui/QuickLinks';
import ScrollToTop from './components/ui/ScrollToTop';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const GetInvolvedPage = lazy(() => import('./pages/GetInvolvedPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const StoriesPage = lazy(() => import('./pages/StoriesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
// Resources subpages
const EmergencyServicesPage = lazy(() => import('./pages/resources/EmergencyServicesPage'));
const TranslationServicesPage = lazy(() => import('./pages/resources/TranslationServicesPage'));
const AnnualReportsPage = lazy(() => import('./pages/resources/AnnualReportsPage'));
const EmergencyTranslationPage = lazy(() => import('./pages/resources/EmergencyTranslationPage'));
const HelpfulLinksPage = lazy(() => import('./pages/resources/HelpfulLinksPage'));
// Policy pages
const CodeOfConductPolicyPage = lazy(() => import('./pages/policies/CodeOfConductPolicyPage'));
const DiversityInclusionPolicyPage = lazy(() => import('./pages/policies/DiversityInclusionPolicyPage'));
const WhistleblowerPolicyPage = lazy(() => import('./pages/policies/WhistleblowerPolicyPage'));
  const QualityManagementPolicyPage = lazy(() => import('./pages/policies/QualityManagementPolicyPage'));
  const WorkHealthSafetyPolicyPage = lazy(() => import('./pages/policies/WorkHealthSafetyPolicyPage'));
  const KnowledgeBasePage = lazy(() => import('./pages/company/KnowledgeBasePage'));
const SettlementSupportPage = lazy(() => import('./pages/services/SettlementSupportPage'));
const AgedCarePage = lazy(() => import('./pages/services/AgedCarePage'));
const FamilySupportPage = lazy(() => import('./pages/services/FamilySupportPage'));
const CommunityEngagementPage = lazy(() => import('./pages/services/CommunityEngagementPage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 bg-white dark:bg-slate-800 text-blue-700 dark:text-white px-3 py-2 rounded shadow"
          >
            Skip to content
          </a>
          <ScrollToTop />
          <MosaicNavigation />
          <main id="main">
            <Breadcrumbs />
            <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/settlement-support" element={<SettlementSupportPage />} />
                <Route path="/services/aged-care" element={<AgedCarePage />} />
                <Route path="/services/family-support" element={<FamilySupportPage />} />
                <Route path="/services/community-engagement" element={<CommunityEngagementPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/get-involved" element={<GetInvolvedPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/emergency-services" element={<Navigate to="/resources/emergency-translation" replace />} />
                <Route path="/resources/translation-services" element={<Navigate to="/resources/emergency-translation" replace />} />
                <Route path="/resources/emergency-translation" element={<EmergencyTranslationPage />} />
                <Route path="/resources/annual-reports" element={<AnnualReportsPage />} />
                <Route path="/resources/helpful-links" element={<HelpfulLinksPage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/donate" element={<DonatePage />} />
                {/* Policies */}
                <Route path="/policies/code-of-conduct" element={<CodeOfConductPolicyPage />} />
                <Route path="/policies/diversity-inclusion" element={<DiversityInclusionPolicyPage />} />
                <Route path="/policies/whistleblower" element={<WhistleblowerPolicyPage />} />
        <Route path="/policies/quality-management" element={<QualityManagementPolicyPage />} />
        <Route path="/policies/work-health-safety" element={<WorkHealthSafetyPolicyPage />} />
        <Route path="/company/knowledge-base" element={<KnowledgeBasePage />} />
              </Routes>
            </Suspense>
            <QuickLinks />
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;