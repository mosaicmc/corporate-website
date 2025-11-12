import React from 'react';
import { Link } from 'react-router-dom';
import { prefetchOnHover } from '@/lib/prefetch';
import { Helmet } from 'react-helmet-async';
import { FileText, Phone, AlertTriangle, Book, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '../components/RelatedServices';

const ResourcesPage = () => {
  // Removed Downloads and FAQs per request; keeping page focused on key links

  const emergencyContacts = [
    { service: "Police, Fire, Ambulance", number: "000", available: "24/7" },
    { service: "Lifeline Crisis Support", number: "13 11 14", available: "24/7" },
    { service: "Domestic Violence Helpline", number: "1800 737 732", available: "24/7" },
    { service: "Mental Health Crisis Line", number: "1800 011 511", available: "24/7" },
    { service: "Mosaic Multicultural Connections", number: "1800 813 205", available: "Business hours (Mon–Fri 9am–5pm)" },
    { service: "Translating & Interpreting Service", number: "131 450", available: "24/7" }
  ];

  // Resource quality stats matching the screenshot design
  const qualityStats = [
    { 
      number: "100%", 
      label: "Accuracy Verified",
      description: "All resources professionally reviewed",
      color: "sky"
    },
    { 
      number: "25+", 
      label: "Languages Available",
      description: "Multilingual resource access",
      color: "earth"
    },
    { 
      number: "24/7", 
      label: "Online Access",
      description: "Resources available anytime",
      color: "leaf"
    },
    { 
      number: "4", 
      label: "Office Locations",
      description: "Physical support across NSW",
      color: "sun"
    }
  ];

  // Removed color class helper used only by the downloads section

  const getAccentColor = (color: string) => {
    const colorMap = {
      sky: "bg-sky",
      earth: "bg-earth", 
      leaf: "bg-leaf",
      sun: "bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Resources & Support</title>
        <meta name="description" content="Access guides, policies, FAQs, and emergency contacts. Multilingual resources and professionally reviewed information to support multicultural communities." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-background transition-colors duration-300 overflow-hidden">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-foreground/80 font-medium">Resources</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-foreground">Resources & Support</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access important information, emergency contacts, and downloadable resources in multiple languages.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell key services that complement resources */}
      <RelatedServices />

      {/* Sticky Emergency Alert */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/10 bg-background/95 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-2 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-sun" />
              <span className="font-medium">In an emergency call <a href="tel:000" className="text-primary hover:underline">000</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-earth" />
              <span className="font-medium">Interpreter available — TIS <a href="tel:131450" className="text-primary hover:underline">131 450</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Quick Actions */}
      <section className="py-6 bg-background border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="tel:000"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-4 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-between group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              aria-label="Call 000 for Police, Fire, Ambulance"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sun text-white p-2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Call 000</div>
                  <div className="text-xs text-muted-foreground">Police • Fire • Ambulance</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:131450"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-4 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-between group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              aria-label="Call TIS National 131 450 for interpreters"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-earth text-white p-2">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">TIS 131 450</div>
                  <div className="text-xs text-muted-foreground">Translating & Interpreting Service</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://www.nsw.gov.au/emergency"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-4 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-between group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              aria-label="Open NSW Government emergency information"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-leaf text-white p-2">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">NSW Emergency Info</div>
                  <div className="text-xs text-muted-foreground">Official guidance and contacts</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Resources: Quick access to priority categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Featured Resources</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Explore our most requested resources: Emergency Services, Translation Services,
              Annual Reports, and Knowledge Base.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/resources/emergency-translation"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              {...prefetchOnHover('/resources/emergency-translation')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-sun text-white p-3">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Emergency & Translation</h3>
                  <p className="text-sm text-muted-foreground">Emergency contacts and interpreter support (NSW compliance)</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                View <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link
              to="/resources/annual-reports"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              {...prefetchOnHover('/resources/annual-reports')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-leaf text-white p-3">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Annual Reports</h3>
                  <p className="text-sm text-muted-foreground">2007–2024 with interactive viewer</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                View <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link
              to="/company/knowledge-base"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
              {...prefetchOnHover('/company/knowledge-base')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-earth text-white p-3">
                  <Book className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground">All organisational policies and governance resources</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                View <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Quality Stats - Premium Glass Morphism Design */}
      <section className="relative py-24 bg-background overflow-hidden transition-colors duration-300">
        <AnimatedBackground variant="subtle" className="opacity-70" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-foreground/80 font-medium">Quality Assurance</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">Resource Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to providing reliable, accessible, and professionally maintained resources
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {qualityStats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center transform transition-all duration-700"
              >
                {/* Premium glass morphism card */}
                <div className="relative backdrop-blur-xl bg-card/70 rounded-2xl p-6 lg:p-8 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-card/80">
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className="text-4xl lg:text-6xl font-bold mb-2 transition-all duration-300 text-foreground dark:text-white drop-shadow-lg">
                        {stat.number}
                      </div>
                      
                      {/* Animated accent line */}
                      <div className="w-12 h-1 mx-auto rounded-full overflow-hidden bg-muted">
                        <div 
                          className={`h-full transition-all duration-2000 ease-out rounded-full ${getAccentColor(stat.color)}`}
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-lg font-semibold text-foreground dark:text-white mb-2 drop-shadow-sm">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </div>
                  </div>

                  {/* Subtle top accent */}
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${getAccentColor(stat.color)} opacity-60`}></div>
                  
                  {/* Corner glow effect */}
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getAccentColor(stat.color)} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sun rounded-full mb-6 shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-foreground dark:text-white mb-4">Emergency Contacts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Important phone numbers for crisis situations and immediate support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-lg p-6 shadow-lg border border-white/40 dark:border-white/15">
                <h3 className="font-bold text-foreground dark:text-white mb-2">{contact.service}</h3>
                <div className="text-2xl font-bold text-sun mb-2">
                  <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="hover:underline">
                    {contact.number}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{contact.available}</p>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-lg p-6 shadow-lg max-w-2xl mx-auto border border-white/40 dark:border-white/15">
              <h3 className="text-xl font-bold text-foreground dark:text-white mb-4">Need an Interpreter?</h3>
              <p className="text-muted-foreground mb-4">
                Call the Translating & Interpreting Service (TIS) on <strong>131 450</strong> for immediate language support during emergencies.
              </p>
              <p className="text-sm text-muted-foreground">
                Available 24/7 in over 160 languages
              </p>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact for More Resources */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold mb-6">Need Additional Resources?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Our multilingual staff can help you access the information and support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-earth to-earth/90 hover:from-earth/90 hover:to-earth text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
              <a
                href="mailto:info@mosaicmc.org.au"
                className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10"
              >
                Email for Resources
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;