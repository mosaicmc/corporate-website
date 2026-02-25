import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Heart, Phone, ArrowRight, CheckCircle, Users, Home, Clock, ShieldCheck, Megaphone, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';
import { GlassCard } from '@/components/ui/GlassCard';
import RelatedServices from '../../components/RelatedServices';

const AgedCarePage = () => {
  // FAQ state and data (matching other services pages)
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>('faq-1');

  const teamMembers = [
    {
      name: "Stacey Anderson",
      role: "Care Coordinator (CHSP)",
      qualifications: "Endorsed Enrolled Nurse; Diploma Community Services (in progress). Varied nursing experience including Emergency, Theatres, outpatients; Treatment Nurse in medical centres; Red Cross Lifeblood; Continuous Improvement Coach; Manager of dementia‑specific day centre.",
      languages: ["English", "Spanish (learning)"]
    },
    {
      name: "Corinne Rietdijk",
      role: "Care Coordinator (SaH)",
      qualifications: "Certificate III in Aged Care. 20+ years in aged, dementia, palliative, community, residential disability and mental health care.",
      languages: ["English"]
    },
    {
      name: "Dianne Rainbow",
      role: "Care Coordinator (CHSP)",
      qualifications: "Care Coordinator – CHSP.",
      languages: ["English"]
    },
    {
      name: "Sally Wiltshire",
      role: "ACVVS Coordinator",
      qualifications: "ACVVS program coordination, volunteer visitor matching, multicultural community outreach.",
      languages: ["English"]
    }
  ];

  const faqData = [
    {
      question: "What is Support at Home (SaH)?",
      answer:
        "Support at Home helps you stay independent at home with a tailored care plan built around your life. Services range from everyday support (like showering, meals, and transport) to nursing and allied health. We match you with workers who speak your language and understand your culture.",
    },
    {
      question: "What is CHSP and who is it for?",
      answer:
        "The Commonwealth Home Support Programme (CHSP) is entry‑level aged care for people who need a little help to remain independent at home. It’s ideal if you’re beginning to think about support, or waiting for a Support at Home allocation. Mosaic delivers Individual Social Support and Flexible Respite under CHSP.",
    },
    {
      question: "Am I eligible for your services?",
      answer:
        "Generally, people aged 65+ (or 50+ for Aboriginal and Torres Strait Islander people) living at home are eligible for aged care supports. Carers may access Flexible Respite. If you’re unsure, contact us and we’ll help you understand options and pathways.",
    },
    {
      question: "How do I get started?",
      answer:
        "Call 1800 813 205 or contact us online. We can support you to navigate My Aged Care, arrange assessments, and develop a culturally appropriate support plan that fits your goals and preferences.",
    },
    {
      question: "Do you match workers to language and culture?",
      answer:
        "Yes. Wherever possible we match you with care workers who share your language or cultural background. We also provide interpreters and culturally responsive services to ensure you feel respected and understood.",
    },
    {
      question: "What if I need nursing or clinical care?",
      answer:
        "Under Support at Home we coordinate nursing and allied health services aligned to your care plan. We work with you, your family, and health providers to ensure safe, dignified support that meets your clinical needs.",
    },
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
    return (
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-md bg-white/60 dark:bg-white/10 ${
          isOpen ? 'border-care shadow-xl' : 'border-white/40 dark:border-white/20'
        }`}
      >
        <button
          className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
          onClick={() => onValueChange(isOpen ? undefined : itemValue)}
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-care"></span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</span>
          </div>
          <span
            className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${
              isOpen ? 'bg-care text-white border-care' : 'border-white/40 dark:border-white/20 text-gray-600 dark:text-white/70'
            }`}
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          className={`px-6 pt-0 pb-6 text-gray-700 dark:text-gray-100 transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {faq.answer}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Aged Care Services</title>
        <meta name="description" content="Culturally appropriate aged care with multilingual staff, home care packages, and family support across NSW." />
      </Helmet>
      <FAQSchema faqs={faqData} name="Aged Care FAQs" />
      {/* Announcement: New Aged Care Act commencement (single line) */}
      <section className="bg-gradient-to-r from-care to-care/90 text-white py-4 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 whitespace-nowrap overflow-x-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 flex-shrink-0"><path d="M3 10a6 6 0 016-6h7a1 1 0 011 1v2.382a2 2 0 010 3.236V13a1 1 0 01-1 1H9a6 6 0 01-6-6z"/><path d="M13 16h2a3 3 0 013 3v2H8v-2a3 3 0 013-3h2z"/></svg>
            <span className="font-semibold">The new Aged Care Act is now in effect</span>
            <span className="text-white/90 text-sm">• Effective 1 November 2025</span>
            <a
              href="https://www.health.gov.au/our-work/aged-care-act/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 flex-shrink-0"
            >
              About the Act
            </a>
            <a
              href="https://www.health.gov.au/news/new-aged-care-act-to-start-from-1-november"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/60 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 flex-shrink-0"
            >
              Official announcement
            </a>
            <span className="text-white/90 text-sm">• Rights-based framework · Stronger safeguards</span>
          </div>
        </div>
      </section>
      {/* Hero Section with enhanced animations */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        {/* Accent tint overlay to align with care */}
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Heart className="mr-2 h-4 w-4 text-care" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Aged Care Services</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Culturally Appropriate Aged Care</h1>
            <p className="text-xl text-gray-700 dark:text-gray-100 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Honouring traditions and providing comfort in familiar languages while delivering professional aged care services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="#programs"
                className="bg-gradient-to-r from-care to-care/90 hover:from-care/90 hover:to-care text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-care/25 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2"
              >
                Explore Our Aged Care Programs
              </Link>
              <a
                href="tel:1800813205"
                className="border-2 border-care text-care hover:bg-care hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2"
                aria-label="Call Mosaic on 1800 813 205"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to Us Today - 1800 813 205
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility section placed directly after hero */}
      <section className="relative py-20 bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who Can Access Our Services?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Seniors from multicultural backgrounds requiring aged care support</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">People with approved home care packages</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Families seeking culturally appropriate care options</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Individuals requiring respite care services</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                <div className="aspect-video">
                  <img
                    src="/images/aged-care/eligibility.png"
                    alt="Multicultural aged care support"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-care font-semibold mb-3">How aged care works</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Understanding rights, eligibility and getting started</h2>
          </div>
          <div className="space-y-16">
            <div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Your Rights',
                    description:
                      'A new Statement of Rights outlines what you deserve: respect, quality care, and choice, regardless of language or background.',
                    icon: <ShieldCheck className="h-6 w-6 text-care" />,
                  },
                  {
                    title: 'Your Choice',
                    description:
                      'You can formally register people who support your choices: family, friends, advocates, so your values guide your care.',
                    icon: <Megaphone className="h-6 w-6 text-care" />,
                  },
                  {
                    title: 'Your Voice',
                    description:
                      'Complaints have clearer pathways to resolution. Providers are more accountable for respectful, safe, and quality care.',
                    icon: <Scale className="h-6 w-6 text-care" />,
                  },
                ].map((card, i) => (
                  <GlassCard key={i} className="rounded-xl hover:shadow-lg hover:ring-1 hover:ring-care/30" padding="lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-3 bg-care/10 rounded-2xl">{card.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-100">{card.description}</p>
                  </GlassCard>
                ))}
              </div>
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Prepare</h3>
                  <ul className="space-y-3">
                    {[
                      'Understand your rights under the new Statement of Rights',
                      'Think about who will support your decisions',
                      'Review your current care plan and preferences',
                      'Know how to raise concerns if something isn’t right',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-care mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-6 backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">We’re Here to Help</h3>
                  <p className="text-gray-700 dark:text-gray-100 mb-6">
                    Our multilingual team can explain the changes in your language and help you prepare for the transition.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:1800813205"
                      className="bg-gradient-to-r from-care to-care/90 hover:from-care/90 hover:to-care text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-care/25"
                    >
                      <Phone className="h-5 w-5 mr-2" /> Call 1800 813 205
                    </a>
                    <Link
                      to="/contact"
                      className="border-2 border-care text-care hover:bg-care hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
                    >
                      Contact Us Online <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Overview with enhanced animations */}
      <section id="programs" className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg animate-fade-in-down">
                <span className="mr-2 h-2 w-2 rounded-full bg-care animate-pulse"></span>
                <span className="text-gray-700 dark:text-white/90 font-medium">Our Programs</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Comprehensive Aged Care Programs</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Support at Home (SaH)",
                  description: "Tailored in‑home care to help you stay independent — from everyday support to nursing and allied health.",
                  icon: <Home className="h-6 w-6" />,
                  features: [
                    "Domestic assistance and personal care",
                    "Meal preparation and shopping",
                    "Transport to appointments",
                    "Care coordination in your language"
                  ]
                },
                {
                  title: "CHSP Individual Social Support",
                  description: "Entry‑level one‑to‑one support to keep you connected to community, culture, and everyday activities.",
                  icon: <Users className="h-6 w-6" />,
                  features: [
                    "Friendly home visits and welfare checks",
                    "Assisted outings and social connection",
                    "Help with technology and communication",
                    "Links to community groups"
                  ]
                },
                {
                  title: "CHSP Flexible Respite",
                  description: "Short‑term in‑home support so carers can rest, attend appointments, or take a break.",
                  icon: <Clock className="h-6 w-6" />,
                  features: [
                    "In‑home day or overnight respite",
                    "Planned respite with culturally aware staff",
                    "Support for carers during emergencies",
                    "Coordination with your care plan"
                  ]
                },
                {
                  title: "ACVVS (Volunteer Visitors)",
                  description: "Regular volunteer visits to reduce social isolation — matched by language or culture where possible.",
                  icon: <Users className="h-6 w-6" />,
                  features: [
                    "Matched volunteers who share culture or language",
                    "Companionship and conversation",
                    "Community outings where possible",
                    "Ongoing coordinator support"
                  ]
                }
              ].map((program, index) => (
                <GlassCard key={index} className="rounded-xl hover:shadow-lg hover:ring-1 hover:ring-care/30 group hover:scale-105 animate-fade-in-up" padding="lg" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-care rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {program.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-care transition-colors">{program.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-100 mb-4">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="w-2 h-2 rounded-full bg-care mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700 dark:text-gray-100 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-care font-semibold mb-3">Impact stories</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dignity, independence and cultural comfort</h2>
              <p className="text-gray-700 dark:text-gray-100 mb-5">
                Short videos show clients staying independent at home with support in familiar languages and respectful care.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-100 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-care mt-1">•</span>
                  <span>Stories matched to language or culture.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-care mt-1">•</span>
                  <span>Captions and interpreter voiceovers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-care mt-1">•</span>
                  <span>Invite families to contact Mosaic.</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white font-semibold mb-2">Impact video placeholder</p>
                  <p className="text-white/80 text-sm mb-4">Embed a video via CMS.</p>
                  <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow transition">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team05
        title="Meet Your Aged Care Team"
        description="Our aged care team combines professional nursing expertise with deep cultural understanding. Each team member is trained in culturally appropriate care delivery and speaks multiple languages to ensure your comfort and dignity are maintained throughout your care journey."
        teamMembers={teamMembers}
        accentColor="care"
        bottomSection={{
          title: "Culturally Sensitive Care Approach",
          description: "Our team understands that quality aged care goes beyond medical needs. We honour cultural traditions, dietary requirements, religious practices, and family dynamics while delivering professional care services. Our multilingual staff and cultural competency training ensure every client receives care that respects their heritage and values."
        }}
      />

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-care animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Questions About Our Aged Care Programs</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              Clear answers about Support at Home, CHSP services, eligibility, and getting started.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
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

          
        </div>
      </section>

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">Discuss Your Care Needs</h2>
            <p className="text-xl text-gray-700 dark:text-gray-100 mb-8 max-w-3xl mx-auto">
              Our experienced aged care team understands the importance of cultural sensitivity in care delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-care to-care/90 hover:from-care/90 hover:to-care text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-care/25"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
              <Link
                to="/contact"
                className="border-2 border-care text-care hover:bg-care hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                Contact Us Online
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="aged-care" />
    </div>
  );
};

export default AgedCarePage;
