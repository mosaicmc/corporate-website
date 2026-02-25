import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Users, Phone, AlertTriangle, ArrowRight, CheckCircle, Heart, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import RelatedServices from '../../components/RelatedServices';

const FamilySupportPage = () => {
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default

  const teamMembers = [
    {
      name: "Gener Lapina",
      role: "TEI Team Leader",
      qualifications: "Master's in Public Governance, counselling/psychotherapy training, case management specialist",
      phone: "(02) 4960 8401",
      email: "g.lapina@mosaicmc.org.au"
    },
    {
      name: "Miza Torlakovic",
      role: "TEI Family Worker",
      qualifications: "Social Welfare + multilingual",
      phone: "(02) 4960 8402",
      email: "m.torlakovic@mosaicmc.org.au"
    },
    {
      name: "Juanita Purcell Lolli",
      role: "TEI Family Worker", 
      qualifications: "Social Science + family intervention",
      phone: "(02) 4960 8403",
      email: "j.lolli@mosaicmc.org.au"
    },
    {
      name: "Elena Ferguson",
      role: "TEI Family Worker",
      qualifications: "Social Science + disability support expertise",
      phone: "(02) 4960 8404",
      email: "e.ferguson@mosaicmc.org.au"
    },
    
    {
      name: "Helen Mieres",
      role: "PAW- Playgroup Facilitator",
      qualifications: "Bachelor's Primary/Early Education + Community Services + Disability Services + Parenting Programs Accreditation",
      phone: "0434 426 981",
      email: "h.mieres@mosaicmc.org.au"
    },
    {
      name: "Natalia Meliendrez",
      role: "Multicultural Community Development Lead – Central Coast",
      qualifications: "Community services leadership and multicultural community development",
      phone: "0431 491 748",
      email: "n.meliendrez@mosaicmc.org.au"
    },
    
  ];

  const faqData = [
    {
      question: "Which program is right for my family?",
      answer: "It depends on what you need right now. If you're facing specific parenting challenges, family stress, or need help accessing services, TEI's professional family support is ideal. If you have young children (0-6) and want community connection with cultural celebration, PAW playgroups are perfect. Many families use both programs at different times. Call us and we'll help you decide what fits best. Our staff can assess your needs and recommend the most appropriate support pathway."
    },
    {
      question: "Are both programs really free?",
      answer: "Yes, completely free. TEI family support is funded by NSW Department of Communities and Justice. PAW playgroups are funded through government grants and community support. This includes individual casework, parenting workshops, cultural playgroup sessions, professional interpreters, materials, and morning tea. There are no hidden costs or fees for any family support services. Government funding agreements ensure ongoing free access for all eligible multicultural families."
    },
    {
      question: "Can I access help if I don't speak much English?",
      answer: "Absolutely - language is never a barrier. We provide professional interpreters through government-approved services for all programs. Many staff speak multiple languages and represent diverse cultural backgrounds. PAW sessions encourage families to use their home language, and TEI workers can arrange interpreter support for all meetings and workshops. We respect and celebrate multilingual families. Professional interpreter services meet government quality standards and are available in all required languages."
    },
    {
      question: "How do I start accessing family support?",
      answer: "Multiple easy ways to begin: Call our main number (02) 4960 8400 for TEI family support or (02) 4334 3877 for PAW playgroups. You can self-refer or ask teachers, doctors, or community workers to refer your family. For PAW, just drop in to any session - no registration needed before your first visit. We'll connect you with the right support quickly. Same-day response for urgent family support needs and immediate access to community playgroup sessions."
    },
    {
      question: "Can professionals refer families to your programs?",
      answer: "Yes, we welcome professional referrals for both programs. Teachers, social workers, doctors, community workers, and other service providers can refer families to TEI or PAW programs. We always get family consent before accepting referrals and keep referring professionals updated with family permission. We can provide joint case management for complex situations through TEI. Professional collaboration follows Australian Privacy Principles and helps ensure families get comprehensive support."
    },
    {
      question: "Where are your family support programs available?",
      answer: "TEI family support: Available across Newcastle, Hunter region, with outreach to Central Coast families. We offer home visits, office appointments, and phone/video support. PAW playgroups: Central Coast locations including Blue Haven (Tuesdays), The Entrance (Thursdays), and Watanobbi (Fridays). All venues are wheelchair accessible with family-friendly facilities. Regional coverage ensures multicultural families can access culturally appropriate support regardless of location."
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
              <ChevronUp className="h-6 w-6 text-leaf transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-6 w-6 text-leaf transition-transform duration-300 group-hover:scale-110" />
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
        <div className={`h-1 bg-gradient-to-r from-leaf to-leaf/80 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Family Support</title>
        <meta name="description" content="Free multicultural family support including TEI casework and PAW playgroups, with interpreters and culturally safe programs." />
      </Helmet>
      <FAQSchema faqs={faqData} name="Family Support FAQs" />
      {/* Crisis Banner with subtle animation */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="font-semibold">Need Family Support Now?</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="tel:000" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Emergency: Call 000</a>
              <a href="tel:0249608400" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Family Support: (02) 4960 8400</a>
              <a href="tel:1800737732" className="hover:underline font-medium transition-all duration-300 hover:scale-105">Family Violence: 1800 RESPECT</a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with enhanced animations */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <AnimatedBackground variant="vibrant" />
        <div className="absolute inset-0 bg-sun/10 dark:bg-sun/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Users className="mr-2 h-4 w-4 text-sun" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Family Support</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Every Family Deserves Support That Understands Their Journey</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Raising children in a new country while honouring your culture is one of life's greatest challenges. At Mosaic, we offer two complementary family support programs designed for multicultural families at every stage. From intensive one-on-one support during difficult times to joyful community playgroups that celebrate your heritage, we're here to help your family not just survive, but truly thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="#programs"
                className="bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sun/25 focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2"
              >
                Explore Our Family Programs
              </Link>
              <a
                href="tel:1800813205"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
            </div>
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
                    <CheckCircle className="h-5 w-5 text-sun mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Multicultural families seeking parenting support or community connection</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sun mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Parents of children 0 to 18 for TEI; 0 to 6 for PAW playgroups</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sun mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Families needing interpreters or culturally safe support</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sun mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">Drop-in welcome for PAW; quick intake for TEI</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                  <div className="aspect-video">
                    <img
                      src="/images/family-support/eligibility.png"
                      alt="Family support eligibility"
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
      
      

      

      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-sun font-semibold mb-3">How family support works</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Three steps from first call to confident parenting</h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              We listen, assess your goals, and match you to TEI casework or PAW playgroups. We check in until you feel supported and connected.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "1. Reach out",
                description: "Call 1800 813 205 or ask a professional to refer you.",
                bullets: ["Free service with interpreters", "Simple intake and quick response"],
                icon: <Phone className="h-6 w-6 text-sun" />
              },
              {
                title: "2. Plan together",
                description: "We assess needs and create a plan: professional casework or community playgroups, or both.",
                bullets: ["Clear actions for family goals", "Warm referrals and safety supports"],
                icon: <CheckCircle className="h-6 w-6 text-sun" />
              },
              {
                title: "3. Ongoing support",
                description: "We deliver sessions and workshops, check progress, and connect you with local services.",
                bullets: ["Evidence-based parenting", "Cultural celebration and community"],
                icon: <Users className="h-6 w-6 text-sun" />
              }
            ].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-sun/10 rounded-2xl">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-sun mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase - Enhanced Features Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        {/* Enhanced glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sun animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Programs</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Comprehensive Family Support Programs</h2>
          </div>

          {/* Features Grid - Inspired by shadcn features-03 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* TEI Family Support */}
            <div className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-left">
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-sun to-sun/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-sun/25 transition-all duration-300 group-hover:scale-110">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">TEI Family Support Program</h3>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                    Focused, professional help with parenting challenges, family relationships, and access to essential services. Qualified family workers provide 3 to 6 months of individual support plus evidence‑based parenting workshops like Circle of Security and Bringing Up Great Kids.
                  </p>
                </div>

                {/* What We Provide */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-sun mr-2" />
                    What We Provide:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Qualified casework tailored to your family's goals",
                      "Evidence‑based parenting (Circle of Security, BUGK)",
                      "Referrals to services and crisis support",
                      "Flexible appointments at home, office or online"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                

                {/* CTA intentionally omitted to match Settlement Support card hierarchy */}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-b-full bg-gradient-to-r from-sun to-sun/80 opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sun opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
            </div>

            {/* PAW Playgroup */}
            <div className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-right">
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-sun to-sun/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-sun/25 transition-all duration-300 group-hover:scale-110">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">Playing Around the World (PAW)</h3>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                    Weekly cultural playgroups where children explore different countries through arts, crafts, stories and play while parents build community connections. Supports heritage celebration and early learning development in a welcoming environment.
                  </p>
                </div>

                {/* What We Provide */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-sun mr-2" />
                    What We Provide:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Weekly cultural playgroups in Central Coast locations",
                      "Play‑based early learning and school readiness",
                      "Community garden activities and morning tea",
                      "Drop‑in friendly; interpreter support available"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                

                {/* CTA intentionally omitted to match Settlement Support card hierarchy */}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-b-full bg-gradient-to-r from-sun to-sun/80 opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sun opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sun font-semibold mb-3">Impact stories</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Families finding confidence and connection</h2>
              <p className="text-gray-600 dark:text-white/80 mb-5">
                Short videos share how TEI and PAW helped parents navigate services, build skills, and celebrate culture with their children.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
                  <span>One story per program or region.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
                  <span>Captions and interpreter voiceovers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
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
        title="Meet Your Complete Family Support Team"
        description="Our family support programs are led by university-qualified professionals with specialized training in multicultural family support, early childhood development, trauma-informed care, and evidence-based parenting interventions. Our team represents diverse cultural backgrounds and understands both professional best practices and the lived experience of multicultural families."
        teamMembers={teamMembers}
        accentColor="sun"
        bottomSection={{
          title: "Integrated Support Approach",
          description: "Both programs work together to provide families with seamless support. TEI workers can recommend PAW for ongoing community connection, while PAW facilitators can identify families who might benefit from professional family support. This integrated approach ensures your family gets the right level of support at the right time."
        }}
      />

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Enhanced glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sun animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Questions Families Ask About Our Support Programs</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Get answers to common questions about our family support services and programs
            </p>
          </div>

          {/* FAQ Accordion - 2 Column Layout with Independent State */}
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

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">Ready to Get Family Support?</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">
              Our experienced family support team understands the unique challenges facing multicultural families. Contact us today to discuss which program is right for your family.
            </p>
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <a
                  href="tel:1800813205"
                  className="w-full bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  call 1800 813 205
                </a>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/contact"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center hover:scale-105"
              >
                Contact Us Online
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="family-support" />
    </div>
  );
};

export default FamilySupportPage;
