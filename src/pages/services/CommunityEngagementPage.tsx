import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Handshake, Phone, ArrowRight, CheckCircle, Calendar, Globe, ChevronDown, ChevronUp, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';
import RelatedServices from '../../components/RelatedServices';

const CommunityEngagementPage = () => {
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default

  const teamMembers = [
    {
      name: "Chiyedza Magwerekwete",
      role: "Multicultural Case Worker",
      qualifications: "Multicultural casework and community support",
      languages: ["English"],
      email: "c.magwerekwete@mosaicmc.org.au"
    },
    {
      name: "Natalia Meliendrez",
      role: "Multicultural Community Development Lead – Central Coast",
      qualifications: "Community services leadership and multicultural community development",
      phone: "0431 491 748",
      email: "n.meliendrez@mosaicmc.org.au"
    },
    {
      name: "Michael Freund",
      role: "Coordinator Settlement Volunteers – Newcastle",
      qualifications: "Volunteer coordination and community engagement",
      languages: ["English"],
      email: "m.freund@mosaicmc.org.au"
    }
  ];

  const faqData = [
    {
      question: "What types of community engagement programs do you offer?",
      answer: "We offer diverse community engagement opportunities including cultural festivals and celebrations, leadership development programs, volunteer coordination and training, advocacy and representation services, community consultation projects, and multicultural awareness training. Our programs are designed to celebrate cultural diversity while building stronger, more inclusive communities across NSW."
    },
    {
      question: "How can I get involved in community leadership?",
      answer: "Our leadership development programs provide training in public speaking, community advocacy, project management, and cultural competency. We offer mentorship opportunities, leadership workshops, and pathways to join community advisory groups. Whether you're interested in representing your cultural community or advocating for multicultural issues, we provide the skills and support you need to become an effective community leader."
    },
    {
      question: "What volunteer opportunities are available?",
      answer: "Volunteer opportunities include cultural event coordination, community program assistance, translation and interpretation support, mentoring new arrivals, administrative support, and advocacy campaign participation. We provide comprehensive training, flexible scheduling, and ongoing support for all volunteers. Volunteering is a great way to give back while developing new skills and building community connections."
    },
    {
      question: "How do you support cultural celebrations and festivals?",
      answer: "We coordinate annual multicultural festivals, provide funding and logistical support for cultural events, assist with venue booking and permits, offer event planning expertise and volunteer coordination, and help promote cultural celebrations throughout the community. Our goal is to showcase the rich cultural diversity of our communities while creating opportunities for cross-cultural understanding and celebration."
    },
    {
      question: "What advocacy services do you provide?",
      answer: "Our advocacy services include representing community interests in policy discussions, providing submissions to government consultations, advocating for improved multicultural services, supporting individual advocacy needs, and raising awareness about multicultural issues. We work at local, state, and federal levels to ensure multicultural voices are heard and multicultural communities receive appropriate support and recognition."
    },
    {
      question: "How can organisations partner with you?",
      answer: "Organisations can partner with us through joint program development, cultural competency training provision, event collaboration and sponsorship, volunteer program partnerships, and policy advocacy initiatives. We work with businesses, government agencies, educational institutions, and community organisations to create more inclusive and culturally responsive services and programs throughout NSW."
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
        <title>Mosaic Multicultural - Community Engagement</title>
        <meta name="description" content="Community engagement programs including cultural festivals, leadership development, volunteering, and advocacy to build inclusive communities." />
      </Helmet>
      <FAQSchema faqs={faqData} name="Community Engagement FAQs" />
      {/* Hero Section with enhanced animations */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        {/* Accent tint overlay to differentiate page */}
        <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Handshake className="mr-2 h-4 w-4 text-leaf" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Community Engagement</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Building Stronger, More Inclusive Communities Together</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Community engagement is at the heart of everything we do at Mosaic. Our Community Engagement programs create meaningful opportunities for participation, cultural celebration, leadership development, and social connection across diverse communities. From organising vibrant multicultural festivals to developing community leaders and advocating for inclusive policies, we work to ensure every voice is heard and every culture is celebrated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="#programs"
                className="bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-leaf/25 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2"
              >
                Explore Community Programs
              </Link>
              <a
                href="tel:1800813205"
                className="border-2 border-leaf text-leaf hover:bg-leaf hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                Get Involved Today - 1800 813 205
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who Can Get Involved?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Multicultural families wanting to learn about gambling risks or needing support with gambling concerns, and adults over 18 and young people experiencing gambling harm.</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Community members from all cultural backgrounds, especially families with children, plus aspiring community leaders seeking mentorship, volunteers looking to contribute, and organisations interested in partnerships and cultural programs.</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Students from migrant and refugee backgrounds enrolled in local primary and secondary schools who are referred by their EALD (English as an Additional Language or Dialect) teacher. Programs run during school terms only.</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                <div className="aspect-video">
                  <img
                    src="/images/community-engagement/eligibility.png"
                    alt="Community engagement participation"
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

      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-leaf font-semibold mb-3">How community engagement works</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Three simple steps from first hello to active participation</h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              Start with a conversation, find events that fit, and grow into leadership and advocacy with support at every step.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "1. Reach out",
                description: "Call 1800 813 205 or visit a hub to discuss interests and goals.",
                bullets: ["Interpreter support available", "Flexible paths for individuals and groups"],
                icon: <Phone className="h-6 w-6 text-leaf" />
              },
              {
                title: "2. Participate",
                description: "Join festivals, workshops, playgroups, and volunteer roles that suit you.",
                bullets: ["Clear schedules and supportive coordinators", "Skills-building while celebrating culture"],
                icon: <Calendar className="h-6 w-6 text-leaf" />
              },
              {
                title: "3. Lead & advocate",
                description: "Access leadership training and represent your community in consultations.",
                bullets: ["Mentoring and advisory group pathways", "Opportunities to influence programs and policy"],
                icon: <Award className="h-6 w-6 text-leaf" />
              }
            ].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-leaf/10 rounded-2xl">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-leaf mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Showcase with enhanced animations */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Programs</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Comprehensive Community Engagement Programs</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Our community engagement programs are designed to celebrate cultural diversity, develop community leadership, create meaningful connections, and advocate for inclusive policies that benefit all members of our multicultural communities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Gambling Awareness",
                description: "The Gamble Aware program offers culturally appropriate education and support where multicultural families learn about gambling risks and access specialist help when needed.",
                features: [
                  "Culturally sensitive workshops in your language",
                  "Individual family support up to 4 sessions",
                  "Direct connections to specialist gambling counsellors",
                  "Education about gambling risks and impacts"
                ],
                who: "Multicultural families wanting to learn about gambling risks or needing support with gambling concerns, and adults over 18 and young people experiencing gambling harm.",
                icon: <Heart className="h-8 w-8" />,
                color: "leaf"
              },
              {
                title: "Multicultural Community Development",
                description: "Mosaic’s Multicultural Community Groups are safe spaces where families build real connections, maintain their cultural identity, and strengthen ties to the wider community. Our community groups welcome drop-ins.",
                features: [
                  "Weekly playgroups & mothers' groups",
                  "Citizenship preparation and English practice",
                  "Regular information sessions, community workshops and cultural celebrations",
                  "\"Playing Around the World\" activities"
                ],
                who: "Community members from all cultural backgrounds, especially families with children, plus aspiring community leaders seeking mentorship, volunteers looking to contribute, and organisations interested in partnerships and cultural programs.",
                icon: <Globe className="h-8 w-8" />,
                color: "leaf"
              },
              {
                title: "Homework & Learning Centres",
                description: "Supportive learning environments where students from migrant and refugee backgrounds develop academic skills, build social confidence, and achieve educational success alongside their peers.",
                features: [
                  "Free weekly tutoring during school terms",
                  "One-on-one support in small learning groups (maximum 15 students)",
                  "Help with English, numeracy and homework tasks",
                  "Progress reports and social confidence building"
                ],
                who: "Students from migrant and refugee backgrounds enrolled in local primary and secondary schools who are referred by their EALD (English as an Additional Language or Dialect) teacher. Programs run during school terms only.",
                icon: <Award className="h-8 w-8" />,
                color: "leaf"
              }
            ].map((program, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
                      program.color === 'sun' ? 'bg-gradient-to-br from-sun to-sun/80' :
                      program.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      program.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      'bg-gradient-to-br from-leaf to-leaf/80'
                    }`}>
                      <div className="text-white">
                        {program.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{program.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">{program.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      program.color === 'sun' ? 'text-sun' :
                      program.color === 'sky' ? 'text-sky' :
                      program.color === 'earth' ? 'text-earth' :
                      'text-leaf'
                    }`} />
                    What We Provide:
                  </h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          program.color === 'sun' ? 'bg-sun' :
                          program.color === 'sky' ? 'bg-sky' :
                          program.color === 'earth' ? 'bg-earth' :
                          'bg-leaf'
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

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-leaf font-semibold mb-3">Impact stories</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Celebrating culture, building leaders, growing community</h2>
              <p className="text-gray-600 dark:text-white/80 mb-5">
                Stories from participants and volunteers highlight how cultural celebrations, leadership pathways and advocacy create lasting community impact.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>Festival highlights with captions and multilingual voiceovers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>Volunteer journeys into leadership and advisory roles.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>Community advocacy wins and partnership outcomes.</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white font-semibold mb-2">Impact video placeholder</p>
                  <p className="text-white/80 text-sm mb-4">Embed your video via CMS with transcripts and captions.</p>
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
        title="Meet Your Community Engagement Team"
        description="Our community engagement team brings together expertise in event management, community development, volunteer coordination, and advocacy. Each team member is passionate about celebrating cultural diversity and creating opportunities for meaningful community participation and leadership development."
        teamMembers={teamMembers}
        accentColor="leaf"
        bottomSection={{
          title: "Collaborative Community Approach",
          description: "Our community engagement team works collaboratively with community leaders, cultural organisations, government agencies, and local businesses to create inclusive programs that celebrate diversity and build stronger communities. We believe that the best community engagement happens when everyone has a voice and an opportunity to contribute their unique perspectives and talents."
        }}
      />

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Questions About Community Engagement</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Get answers to common questions about our community engagement programs and how you can get involved
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

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">Join Our Community</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">
              Be part of building stronger, more inclusive communities across NSW. Whether you want to volunteer, participate in cultural events, or develop your leadership skills, there's a place for you in our community engagement programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-leaf/25"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1800 813 205
              </a>
              <Link
                to="/contact"
                className="border-2 border-leaf text-leaf hover:bg-leaf hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                Contact Us Online
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-white/70 text-sm">
                All community members welcome • Flexible participation options • Professional development opportunities available
              </p>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices current="community-engagement" />
    </div>
  );
};

export default CommunityEngagementPage;
