import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Phone, AlertTriangle, ArrowRight, CheckCircle, Heart, Home, Shield, Clock, MapPin, Mail, ChevronDown, ChevronUp } from 'lucide-react';
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
      qualifications: "Master's in Public Governance, counseling/psychotherapy training, case management specialist",
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
      name: "Chiyedza Magwerekwete",
      role: "TEI Family Worker",
      qualifications: "Social Science + disability support expertise",
      phone: "(02) 4960 8405",
      email: "c.magwerekwete@mosaicmc.org.au"
    },
    {
      name: "Helen Mieres",
      role: "PAW Program Leader",
      qualifications: "Bachelor's Primary/Early Education + Community Services + Disability Services + Parenting Programs Accreditation",
      phone: "0434 426 981",
      email: "h.mieres@mosaicmc.org.au"
    },
    {
      name: "Natalia Meliendrez",
      role: "PAW Facilitator",
      qualifications: "Community Services qualifications with multicultural backgrounds",
      phone: "0431 491 748",
      email: "n.meliendrez@mosaicmc.org.au"
    }
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
        {/* Using the reusable AnimatedBackground component */}
        <AnimatedBackground variant="vibrant" />
        {/* Accent tint overlay to differentiate page */}
        <div className="absolute inset-0 bg-sun/10 dark:bg-sun/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Users className="mr-2 h-4 w-4 text-sun" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Family Support</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Every Family Deserves Support That Understands Their Journey</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Raising children in a new country while honoring your culture is one of life's greatest challenges. At Mosaic, we offer two complementary family support programs designed for multicultural families at every stage. From intensive one-on-one support during difficult times to joyful community playgroups that celebrate your heritage, we're here to help your family not just survive, but truly thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="#programs"
                className="bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
              >
                Explore Our Family Programs
              </Link>
              <a
                href="tel:0249608400"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to Us Today - (02) 4960 8400
              </a>
            </div>
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
                    <p className="text-lg text-sun font-semibold">Professional Parenting Support & Casework</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-4">
                    When you need focused, professional help with parenting challenges, family relationships, or connecting to essential services. Our TEI program provides qualified family workers for 3-6 months of individual support, plus evidence-based parenting workshops like Circle of Security and Bringing Up Great Kids.
                  </p>
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                    Perfect for families dealing with specific challenges, wanting to improve family relationships, needing help accessing services, or seeking professional guidance on parenting approaches that work in Australian contexts while respecting your cultural values.
                  </p>
                </div>

                {/* Service Highlights */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-sun mr-2" />
                    Service Highlights:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Individual family casework with qualified social workers",
                      "Circle of Security and Bringing Up Great Kids workshops", 
                      "Professional referrals and crisis intervention",
                      "Home visits and flexible meeting locations",
                      "Available to any multicultural parent with children under 18"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href="tel:0249608400"
                  className="w-full bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-sun/25 hover:scale-105"
                >
                  Get Professional Family Support
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
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
                    <p className="text-lg text-sun font-semibold">Cultural Playgroup & Community Connection</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-4">
                    When you want your young children to celebrate their heritage while building school readiness and making friends with other multicultural families. PAW offers weekly cultural journeys where children explore different countries through arts, crafts, stories, and play while parents build community connections.
                  </p>
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                    Ideal for families with children aged 0-6 who want ongoing community support, cultural celebration, early learning development, and the chance to meet other multicultural families in a welcoming, no-pressure environment.
                  </p>
                </div>

                {/* Service Highlights */}
                <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-sun mr-2" />
                    Service Highlights:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Weekly cultural exploration sessions (Blue Haven, The Entrance, Watanobbi)",
                      "School readiness through play-based learning",
                      "Community garden activities and morning tea",
                      "Drop-in access - no registration required for first visit",
                      "Open to all families with children 0-6 years"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href="tel:0243343877"
                  className="w-full bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-sun/25 hover:scale-105"
                >
                  Join Cultural Playgroup
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-b-full bg-gradient-to-r from-sun to-sun/80 opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sun opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
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

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:scale-105 transition-transform duration-300">Still Have Questions?</h3>
              <p className="text-gray-600 dark:text-white/80 mb-6">
                Our multilingual team is here to help you understand which program is right for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1800813205"
                  className="bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  1800 813 205
                </a>
                <Link
                to="/contact"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
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
      <RelatedServices current="family-support" />

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
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">TEI Family Support</h3>
                <a
                  href="tel:1800813205"
                  className="w-full bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  1800 813 205
                </a>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">PAW Playgroups</h3>
                <a
                  href="tel:1800813205"
                  className="w-full bg-gradient-to-r from-sun to-sun/90 hover:from-sun/90 hover:to-sun text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  1800 813 205
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
    </div>
  );
};

export default FamilySupportPage;