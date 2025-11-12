import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const titleMap: Record<string, string> = {
  '': 'Home',
  'about': 'About',
  'services': 'Services',
  'services/settlement-support': 'Settlement Support',
  'services/aged-care': 'Aged Care Services',
  'services/family-support': 'Family Support',
  'services/community-engagement': 'Community Engagement',
  'locations': 'Locations',
  'get-involved': 'Get Involved',
  'resources': 'Resources',
  'resources/emergency-translation': 'Emergency Translation',
  'resources/annual-reports': 'Annual Reports',
  'resources/helpful-links': 'Helpful Links',
  'stories': 'Stories',
  'contact': 'Contact',
  'donate': 'Donate',
  'policies/code-of-conduct': 'Code of Conduct',
  'policies/diversity-inclusion': 'Diversity & Inclusion',
  'policies/whistleblower': 'Whistleblower',
  'policies/quality-management': 'Quality Management',
  'policies/work-health-safety': 'Work Health & Safety',
  'company/knowledge-base': 'Knowledge Base',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname.replace(/^\/+/, '');
  const segments = path.split('/').filter(Boolean);

  const crumbs = segments.map((_, i) => segments.slice(0, i + 1).join('/'));

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center text-sm text-muted-foreground gap-2 flex-wrap">
          <li>
            <Link to="/" className="hover:text-foreground">Home</Link>
          </li>
          {crumbs.map((c, idx) => {
            const isLast = idx === crumbs.length - 1;
            const to = `/${c}`;
            const title = titleMap[c] || c.split('/').slice(-1)[0]?.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
            return (
              <li key={c} className="flex items-center gap-2">
                <span className="text-muted-foreground">/</span>
                {isLast ? (
                  <span className="text-foreground font-medium">{title}</span>
                ) : (
                  <Link to={to} className="hover:text-foreground">{title}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}