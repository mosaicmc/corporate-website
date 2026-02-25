import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Home, Phone, AlertTriangle, ArrowRight, CheckCircle, Users, ChevronDown, ChevronUp, Globe, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';
import RelatedServices from '../../components/RelatedServices';

const SettlementSupportPage = () => {
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default

  const teamMembers = [
    {
      name: "Mirja Colding-Moran",
      role: "Settlement Team Leader",
      qualifications: "Leadership in settlement services, community partnerships specialist",
      languages: ["English"],
      image: "/images/Mirja.png"
    },
    {
      name: "Madan Narayanamurthy",
      role: "Regional Coordinator (Armidale)",
      qualifications: "Regional programme coordination, multicultural engagement specialist",
      languages: ["English"],
      image: "/images/Madan Narayanamurthy.png"
    },
    {
      name: "Maram Mohamed",
      role: "Settlement Caseworker",
      qualifications: "Settlement case management, community liaison experience",
      languages: ["English"],
      image: "/images/Maram2.png"
    },
    {
      name: "Rose Oku",
      role: "Settlement Worker",
      qualifications: "Community services background, family support facilitation",
      languages: ["English"],
      image: "/images/Rose.png"
    },
    {
      name: "Bronwyn Lin",
      role: "Settlement Case Worker",
      qualifications: "Social services qualifications, multicultural youth support",
      languages: ["English"],
      image: "/images/Bron.png"
    },
    {
      name: "Mohammad Sami Zakhil",
      role: "Settlement Caseworker / Youth Connector",
      qualifications: "Youth mentoring, bicultural advocacy",
      languages: ["English"],
      image: "/images/Sami.png"
    },
    {
      name: "Michael de Laroche Souvestre",
      role: "Settlement Worker (Tamworth)",
      qualifications: "Regional settlement support, community orientation specialist",
      languages: ["English"],
      image: "/images/Mike2.png"
    },
    {
      name: "Basim Khudeda",
      role: "Settlement Worker (Armidale)",
      qualifications: "Community engagement, multilingual client support",
      languages: ["English"],
      image: "/images/Basim Khudeda.png"
    },
    {
      name: "Patricia Camilleri",
      role: "Settlement Worker (Central Coast)",
      qualifications: "Regional case management, family settlement support",
      languages: ["English"],
      image: "/images/Patricia 01.png"
    }
  ];

  const faqData = [
    {
      question: "Who is eligible for settlement support services?",
      answer: "Settlement support is available to recent migrants and multicultural community members within their first 5 years in Australia, family members of eligible migrants, people from culturally and linguistically diverse backgrounds, and anyone needing assistance navigating Australian systems and services. There are no visa status restrictions - we support all multicultural families regardless of their immigration status."
    },
    {
      question: "What housing assistance do you provide?",
      answer: "We help with finding suitable accommodation, understanding rental processes and tenant rights, connecting with real estate agents and housing services, preparing rental applications, understanding utility connections, and advocating with housing providers. Our settlement workers guide you through inspections and negotiations so you feel confident engaging with real estate agents."
    },
    {
      question: "How do you help with employment?",
      answer: "Our employment support includes resume writing and interview preparation, job search assistance and connecting with employers, understanding Australian workplace culture and rights, skills recognition and qualification assessment support, referrals to training and education programmes, and ongoing career development guidance. We work with local employers who value cultural diversity."
    },
    {
      question: "What government services can you help me access?",
      answer: "We provide navigation support for Centrelink services and payments, Medicare registration and healthcare access, taxation and Australian Business Number (ABN) applications, driver licence and transport services, school enrolment for children, and legal services and advocacy support. Our workers can accompany you to appointments and help with paperwork."
    },
    {
      question: "Do you provide language support?",
      answer: "Yes, we offer professional interpreter services for all appointments and meetings, translation of important documents, referrals to English language programmes and classes, assistance with understanding official correspondence, and support in your preferred language during service delivery. Many of our staff speak multiple languages and understand the challenges of language barriers."
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
        <title>Settlement Support & Refugee Services | Central Coast, Newcastle & Northern NSW</title>
        <meta
          name="description"
          content="Free settlement services for migrants and multicultural communities across the Central Coast, Newcastle, Lake Macquarie, Maitland, Tamworth and Armidale. Practical help with housing, work, English, safety and legal support."
        />
      </Helmet>
      <FAQSchema faqs={faqData} name="Settlement Support FAQs" />
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
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Starting Again in Australia? We Walk With You.</h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              You’re not alone. Starting fresh in Australia can feel overwhelming when rentals, work and government systems are unfamiliar. For more than 40 years Mosaic Multicultural Connections has walked beside migrants and multicultural communities across the Central Coast, Newcastle, Maitland, Tamworth and Armidale so they can access services with confidence. We listen, map out a simple plan, and stay with you until you feel safe, connected and capable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <Link
                to="#programs"
                className="bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky/25 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                Explore Settlement Programs
              </Link>
              <a
                href="tel:1800813205"
                className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              Free service • Interpreters available • Bring a trusted friend or family member.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who Can Access Our Services?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">New migrants and multicultural communities within first 5 years</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Families needing help with housing, work, English or legal support</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Anyone seeking guidance to navigate Australian systems and services</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Professional interpreters available for all appointments</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                  <div className="aspect-video">
                    <img
                      src="/images/settlement/eligibility.png"
                      alt="Settlement support eligibility"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-sky font-semibold mb-3">How settlement support works</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Three simple steps from first call to feeling at home</h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              Every pathway starts with your story. We match you with a settlement worker, agree on priorities, then check in until the plan is complete.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "1. Reach out",
                description: "Call 1800 813 205, visit a Mosaic hub or ask a service provider to refer you.",
                bullets: ["Free service with interpreters on request", "Available across Central Coast, Newcastle, Maitland, Tamworth & Armidale"],
                icon: <Phone className="h-6 w-6 text-sky" />
              },
              {
                title: "2. Plan together",
                description: "We listen, map urgent needs, and create a settlement plan that fits your goals and family life.",
                bullets: ["Housing, work, English, legal and safety actions prioritised", "Clear steps with dates, contacts and responsibilities"],
                icon: <CheckCircle className="h-6 w-6 text-sky" />
              },
              {
                title: "3. Walk the journey",
                description: "Your worker walks beside you at appointments, checks forms, and keeps you connected to community supports.",
                bullets: ["Warm referrals to local partners and programmes", "Stay with us until you feel confident navigating Australia"],
                icon: <Users className="h-6 w-6 text-sky" />
              }
            ].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-sky/10 rounded-2xl">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-sky mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">What We Help You Tackle First</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Tell us whether housing, work, government forms or community connections feel hardest right now. We break each step into plain-language actions so you can see progress every week.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Housing & Accommodation Support",
                description: "Gain confidence finding a safe, affordable home with a settlement worker who helps you prepare for inspections, explains leasing rules and rehearses paperwork before you submit it.",
                features: [
                  "Property search coaching and real estate liaison",
                  "Rental application preparation and reference support",
                  "Tenant rights education and advocacy",
                  "Guidance for setting up utilities and household services",
                  "Rapid referrals to emergency accommodation partners"
                ],
                icon: <Home className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Employment & Career Development",
                description: "Turn your skills into local job opportunities with resume mentoring, interview practice and introductions to inclusive employers.",
                features: [
                  "Resume reviews and tailored interview coaching",
                  "Job search strategies and employer introductions",
                  "Support with skills recognition and qualification assessment",
                  "Workplace culture orientation and rights education",
                  "Career development advice and training referrals"
                ],
                icon: <Users className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Government Services Navigation",
                description: "Work alongside a settlement worker who breaks down Centrelink, Medicare, tax and licensing steps so every form is correct and deadlines are met.",
                features: [
                  "Centrelink registration guidance and payment assistance",
                  "Medicare enrolment support and healthcare access",
                  "Tax file number applications and banking setup assistance",
                  "Driver licensing preparation and transport advice",
                  "Warm referrals to legal and advocacy services"
                ],
                icon: <FileText className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Community Orientation & Integration",
                description: "Learn your new city, schools, doctors and community hubs while staying proud of your culture and traditions, with guidance tailored to your family.",
                features: [
                  "Local area orientation and community tours",
                  "School enrolment preparation and education support",
                  "Healthcare system navigation and GP introductions",
                  "Cultural orientation and social connection sessions",
                  "Community group referrals and participation planning"
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

      

      {/* Impact video stories */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky font-semibold mb-3">Impact stories</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Watch how support sparks confidence</h2>
              <p className="text-gray-600 dark:text-white/80 mb-5">
                Short videos from Mosaic clients showcase practical wins: finding a rental, enrolling children, or feeling safe enough to volunteer, supported by settlement workers.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
                  <span>Feature one impact story per region or service stream.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
                  <span>Include captions and interpreter voiceovers for accessibility.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
                  <span>Close with a call to contact Mosaic for settlement planning.</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white font-semibold mb-2">Impact video placeholder</p>
                  <p className="text-white/80 text-sm mb-4">Embed your YouTube, Vimeo or hosted video here via CMS.</p>
                  <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow hover:scale-105 transition">
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
        title="Meet Your Settlement Support Team"
        description="Our settlement support team combines professional expertise with lived experience of migration and cultural diversity. Each team member brings specialized skills in settlement services, cultural competency, and community development to ensure you receive comprehensive, culturally appropriate support."
        teamMembers={teamMembers}
        accentColor="sky"
        bottomSection={{
          title: "Comprehensive Settlement Approach",
          description: "Our team works collaboratively to provide integrated settlement support that addresses all aspects of establishing life in Australia. From immediate practical needs to long-term community integration, we ensure no aspect of your settlement journey is overlooked. Professional interpreters are available for all services, and we maintain strong partnerships with local employers, housing providers, and community organisations."
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

          
        </div>
      </section>

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

      <RelatedServices current="settlement-support" />

      
    </div>
  );
};

export default SettlementSupportPage;
