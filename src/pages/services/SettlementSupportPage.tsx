import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, Phone, AlertTriangle, ArrowRight, CheckCircle, Users, MapPin, Clock, ChevronDown, ChevronUp, Mail, Globe, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';
import RelatedServices from '../../components/RelatedServices';

const SettlementSupportPage = () => {
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Settlement Services Manager",
      qualifications: "Master's in Social Work, Settlement Services Specialist, Multicultural Community Development",
      languages: ["English", "Mandarin", "Cantonese"],
      phone: "(02) 4926 1301",
      email: "s.chen@mosaicmc.org.au"
    },
    {
      name: "Ahmed Hassan",
      role: "Senior Settlement Worker",
      qualifications: "Bachelor's Social Science, Former refugee advocate, Community liaison specialist",
      languages: ["English", "Arabic", "French"],
      phone: "(02) 4926 1302",
      email: "a.hassan@mosaicmc.org.au"
    },
    {
      name: "Maria Santos",
      role: "Settlement Worker",
      qualifications: "Community Services qualifications, Housing support specialist",
      languages: ["English", "Spanish", "Portuguese"],
      phone: "(02) 4926 1303",
      email: "m.santos@mosaicmc.org.au"
    },
    {
      name: "Jennifer Kim",
      role: "Employment Support Coordinator",
      qualifications: "Career counseling certification, Job placement specialist",
      languages: ["English", "Korean", "Japanese"],
      phone: "(02) 4926 1304",
      email: "j.kim@mosaicmc.org.au"
    },
    {
      name: "Hassan Al-Rashid",
      role: "Community Orientation Worker",
      qualifications: "Community development background, Cultural competency trainer",
      languages: ["English", "Arabic", "Kurdish"],
      phone: "(02) 4926 1305",
      email: "h.alrashid@mosaicmc.org.au"
    },
    {
      name: "Elena Ferguson",
      role: "Housing Support Specialist",
      qualifications: "Property management background, Tenant advocacy specialist",
      languages: ["English", "Russian", "Ukrainian"],
      phone: "(02) 4926 1306",
      email: "e.ferguson@mosaicmc.org.au"
    }
  ];

  const faqData = [
    {
      question: "Who is eligible for settlement support services?",
      answer: "Settlement support is available to recent migrants and refugees within their first 5 years in Australia, family members of eligible migrants, people from culturally and linguistically diverse backgrounds, and anyone needing assistance navigating Australian systems and services. There are no visa status restrictions - we support all multicultural families regardless of their immigration status."
    },
    {
      question: "What housing assistance do you provide?",
      answer: "We help with finding suitable accommodation, understanding rental processes and tenant rights, connecting with real estate agents and housing services, assistance with rental applications and bond support, understanding utility connections and services, and advocacy with housing providers. Our housing workers can accompany you to property inspections and help negotiate rental agreements."
    },
    {
      question: "How do you help with employment?",
      answer: "Our employment support includes resume writing and interview preparation, job search assistance and connecting with employers, understanding Australian workplace culture and rights, skills recognition and qualification assessment support, referrals to training and education programs, and ongoing career development guidance. We work with local employers who value cultural diversity."
    },
    {
      question: "What government services can you help me access?",
      answer: "We provide navigation support for Centrelink services and payments, Medicare registration and healthcare access, taxation and Australian Business Number (ABN) applications, driver's license and transport services, school enrollment for children, and legal services and advocacy support. Our workers can accompany you to appointments and help with paperwork."
    },
    {
      question: "Do you provide language support?",
      answer: "Yes, we offer professional interpreter services for all appointments and meetings, translation of important documents, referrals to English language programs and classes, assistance with understanding official correspondence, and support in your preferred language during service delivery. Many of our staff speak multiple languages and understand the challenges of language barriers."
    },
    {
      question: "How long can I access settlement support?",
      answer: "Settlement support is typically available for up to 5 years after arrival in Australia, though this can vary based on individual circumstances and needs. We provide intensive support in the first 6-12 months, then ongoing assistance as needed. Our goal is to help you become independent and confident in navigating Australian systems, but we're here for as long as you need support."
    }
  ];

  // Split FAQs into two columns
  const leftColumnFaqs = faqData.slice(0, 3);
  const rightColumnFaqs = faqData.slice(3, 6);

  const AccordionItem = ({ faq, index, value, onValueChange, columnPrefix }: {
    faq: typeof faqData[0];
    index: number;
    value: string | undefined;
    onValueChange: (value: string | undefined) => void;
    columnPrefix: string;
  }) => {
    const itemValue = `${columnPrefix}-${index}`;
    const isOpen = value === itemValue;

    const toggleItem = () => {
      onValueChange(isOpen ? undefined : itemValue);
    };

    return (
      <div className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:scale-[1.01]">
        {/* Question Button */}
        <button
          onClick={toggleItem}
          className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 group"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4 leading-relaxed">
            "{faq.question}"
          </h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-6 w-6 text-sky transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-6 w-6 text-sky transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>
        </button>

        {/* Answer Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'max-h-[500px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 border-t border-white/30 dark:border-white/20 pt-6">
            <p className="text-gray-600 dark:text-white/80 leading-relaxed text-base">
              {faq.answer}
            </p>
          </div>
        </div>

        {/* Subtle accent line */}
        <div className={`h-1 bg-gradient-to-r from-sky to-sky/80 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Settlement Support</title>
        <meta name="description" content="Comprehensive settlement services: housing, employment, government navigation, language support, and community orientation for new arrivals." />
      </Helmet>
      {/* Crisis Banner with subtle animation */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="font-semibold">Need Settlement Support Now?</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="tel:000" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Emergency: Call 000</a>
              <a href="tel:1800813205" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Settlement Support: 1800 813 205</a>
              <a href="tel:131450" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Interpreter: 131 450</a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with enhanced animations */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Home className="mr-2 h-4 w-4 text-sky" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Settlement Support</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Your Journey to Independence Starts Here</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Starting life in a new country is one of life's biggest challenges. At Mosaic, our Settlement Support program provides comprehensive assistance to help new arrivals establish their lives in Australia with dignity, independence, and confidence. From finding housing and employment to understanding government services and community connections, we're here to guide you through every step of your settlement journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="#services"
                className="bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky/25"
              >
                Explore Settlement Services
              </Link>
              <a
                href="tel:1800813205"
                className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Get Support Today - 1800 813 205
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase with enhanced animations */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Programs</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Comprehensive Settlement Support Programs</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Our settlement support program addresses every aspect of establishing life in Australia. From immediate practical needs to long-term integration goals, we provide culturally appropriate assistance that respects your background while helping you navigate Australian systems with confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Housing & Accommodation Support",
                description: "Finding safe, affordable housing is often the first priority for new arrivals. Our housing specialists provide comprehensive support throughout your housing journey.",
                features: [
                  "Property search assistance and real estate liaison",
                  "Rental application support and bond assistance",
                  "Tenant rights education and advocacy",
                  "Utility connections and household setup",
                  "Emergency accommodation referrals"
                ],
                icon: <Home className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Employment & Career Development",
                description: "Securing meaningful employment is crucial for independence and community integration. Our employment team provides tailored support for your career goals.",
                features: [
                  "Resume writing and interview preparation",
                  "Job search strategies and employer connections",
                  "Skills recognition and qualification assessment",
                  "Workplace culture orientation and rights education",
                  "Career development and training referrals"
                ],
                icon: <Users className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Government Services Navigation",
                description: "Understanding and accessing government services can be overwhelming. We provide step-by-step guidance through essential systems and processes.",
                features: [
                  "Centrelink registration and payment assistance",
                  "Medicare enrollment and healthcare access",
                  "Tax file number and banking setup",
                  "Driver's license and transport services",
                  "Legal services and advocacy support"
                ],
                icon: <FileText className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Community Orientation & Integration",
                description: "Building connections and understanding Australian culture while maintaining your heritage is essential for successful settlement.",
                features: [
                  "Local area orientation and community tours",
                  "School enrollment and education support",
                  "Healthcare system navigation",
                  "Cultural orientation and social connections",
                  "Community group referrals and participation"
                ],
                icon: <Globe className="h-8 w-8" />,
                color: "sky"
              }
            ].map((service, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
                      service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      service.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      service.color === 'leaf' ? 'bg-gradient-to-br from-leaf to-leaf/80' :
                      'bg-gradient-to-br from-sun to-sun/80'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      service.color === 'sky' ? 'text-sky' :
                      service.color === 'earth' ? 'text-earth' :
                      service.color === 'leaf' ? 'text-leaf' :
                      'text-sun'
                    }`} />
                    What We Provide:
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          service.color === 'sky' ? 'bg-sky' :
                          service.color === 'earth' ? 'bg-earth' :
                          service.color === 'leaf' ? 'bg-leaf' :
                          'bg-sun'
                        }`}></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team05
        title="Meet Your Settlement Support Team"
        description="Our settlement support team combines professional expertise with lived experience of migration and cultural diversity. Each team member brings specialized skills in settlement services, cultural competency, and community development to ensure you receive comprehensive, culturally appropriate support."
        teamMembers={teamMembers}
        accentColor="sky"
        bottomSection={{
          title: "Comprehensive Settlement Approach",
          description: "Our team works collaboratively to provide integrated settlement support that addresses all aspects of establishing life in Australia. From immediate practical needs to long-term community integration, we ensure no aspect of your settlement journey is overlooked. Professional interpreters are available for all services, and we maintain strong partnerships with local employers, housing providers, and community organizations."
        }}
      />

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sun animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Questions New Arrivals Ask About Settlement Support</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Get answers to common questions about our settlement support services and how we can help you establish your new life in Australia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {leftColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  value={leftColumnValue}
                  onValueChange={setLeftColumnValue}
                  columnPrefix="left"
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {rightColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  value={rightColumnValue}
                  onValueChange={setRightColumnValue}
                  columnPrefix="right"
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:scale-105 transition-transform duration-300">Still Have Questions?</h3>
              <p className="text-gray-600 dark:text-white/80 mb-6">
                Our multilingual settlement team is here to help you understand how we can support your settlement journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1800813205"
                  className="bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sky/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call 1800 813 205
                </a>
                <Link
                  to="/contact"
                  className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
                >
                  Contact Us Online
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services cross-sell */}
      <RelatedServices current="settlement-support" />

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">Ready to Start Your Settlement Journey?</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">
              Our experienced settlement team is here to guide you through every step of establishing your new life in Australia. Contact us today to begin your journey to independence and community connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sky/25"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
              <Link
                to="/contact"
                className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                Contact Us Online
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-white/70 text-sm">
                Professional interpreters available • No appointment necessary for initial consultation • All services completely free
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettlementSupportPage;