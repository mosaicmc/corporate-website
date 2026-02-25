import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import RelatedServices from '@/components/RelatedServices';
import { logFaqFeedback, logFaqView } from '@/lib/searchAnalytics';

type QA = { question: string; answer: string };

export default function FAQPage() {
  const [query, setQuery] = useState('');
  const faqs: QA[] = useMemo(() => ([
    { question: 'Am I eligible for services in NSW?', answer: 'If you live in NSW and need support with settlement, family wellbeing, aged care or community connection, we can help. Eligibility varies by program — contact us to check your pathway.' },
    { question: 'How do I start getting support?', answer: 'Call 1800 813 205 or visit a local office in Newcastle, Tamworth, Armidale or the Central Coast. We discuss your goals, agree a plan, and connect you to housing, work, language and community supports.' },
    { question: 'Do you provide interpreters?', answer: 'Yes. Ask for an interpreter in your language. In emergencies, call 000. For interpreters, call TIS National on 131 450.' },
    { question: 'What settlement support do you offer?', answer: 'Housing and tenancy guidance, employment preparation and connections, government service navigation (Centrelink, Medicare, tax, licences), and community orientation including language programs.' },
    { question: 'Which family program is right for us?', answer: 'TEI family support helps with casework and parenting. PAW playgroups (0–6) offer community connection and cultural celebration. Many families use both at different times — we help you choose.' },
    { question: 'Are programs free?', answer: 'Settlement, family and community programs are free to access. Interpreters are provided at no cost. Aged care supports are funded via My Aged Care pathways (SaH/CHSP) and may include client co‑payments based on government assessment. We help you understand any fees and support options.' },
    { question: 'What aged care supports are available?', answer: 'Culturally responsive in‑home and community care across NSW: Support at Home and CHSP. We match workers to language/culture where possible, and organise nursing or allied health when needed.' },
    { question: 'Where are services available?', answer: 'Across NSW with hubs in Newcastle, Tamworth, Armidale and the Central Coast — plus outreach, home visits, and phone/video options where appropriate.' },
    { question: 'How do I refer a client?', answer: 'Use the Contact page or call 1800 813 205. Provide consent, language needs, and brief context. We acknowledge referrals, contact the client promptly, and share progress updates with permission.' },
    { question: 'Do you provide warm handovers and interpreters?', answer: 'Yes. We welcome joint appointments and provide interpreter support. Our approach ensures smooth transitions and coordinated care that respects privacy and consent.' },
    { question: 'How can I donate and is it tax‑deductible?', answer: 'Donate online via the Donate page or partner on programs. Eligible donations may be tax‑deductible; receipts provided. Funds support practical services across NSW.' },
    { question: 'How are donations used?', answer: 'Funding supports settlement casework, family support, culturally appropriate aged care and community engagement activities. We report impact transparently.' },
    { question: 'How do you track outcomes and report?', answer: 'We measure service utilisation, casework outcomes and community impact, and report in line with NSW compliance, privacy and ethics. Annual reports and governance resources are publicly available.' },
    { question: 'What is Mosaic Multicultural Connections?', answer: 'Mosaic Multicultural Connections is a community organisation supporting multicultural communities across NSW with settlement support, family services, culturally responsive aged care and community engagement.' },
    { question: 'How long has Mosaic served communities?', answer: 'We have supported multicultural communities in NSW for over 40 years, partnering with communities to improve access, inclusion and wellbeing.' },
    { question: 'Where can I find policies and annual reports?', answer: 'Visit the Resources section for Annual Reports and the Knowledge Base for organisational policies and governance resources.' },
    { question: 'Where are your offices located?', answer: 'We operate across NSW with hubs in Newcastle, Tamworth, Armidale and the Central Coast, with outreach, home visits and phone/video support where appropriate.' },
    { question: 'Which languages do you support?', answer: 'Our multilingual team and professional interpreters support many languages. Ask for an interpreter in your language; in emergencies call 000 or TIS National 131 450.' },
    { question: 'How can I provide feedback or make a complaint?', answer: 'Use the Contact page to share feedback. We follow transparent, respectful processes and respond promptly, consistent with our governance standards and duty of care.' },
    { question: 'Do you offer volunteer opportunities?', answer: 'Yes. Explore opportunities in the Get Involved section and our volunteer pages for Newcastle, Central Coast, Armidale and Tamworth.' },
    { question: 'Do you partner with organisations?', answer: 'We collaborate with schools, health services, community groups and government to deliver coordinated programs, cultural competency training and inclusive community initiatives.' },
    { question: 'How do I apply to volunteer?', answer: 'Apply online via our Volunteer application form. Visit Get Involved or local volunteer pages (Newcastle, Central Coast, Armidale, Tamworth). We provide training and flexible scheduling. Application form: https://tally.so/r/3qoXjg' },
    { question: 'What volunteer roles are available?', answer: 'Roles include ACVVS visitor (residential or home), homework and settlement tutoring, citizenship assistance and community events. Local volunteer pages include role descriptions and links to position documents.' },
    { question: 'Do volunteers receive training?', answer: 'Yes. We provide comprehensive onboarding, cultural competency training and support. Scheduling is flexible and we help match roles to your interests and availability.' },
    { question: 'Where can I find volunteer role descriptions?', answer: 'Role descriptions are available on local volunteer pages. Some roles include downloadable position descriptions (PDs) with responsibilities and time commitments.' },
    { question: 'What are your office hours?', answer: 'Business Hours: Monday to Friday, 9:00 AM – 5:00 PM.' },
    { question: 'How do I get directions to your offices?', answer: 'See the Contact page and the Locations page for addresses and directions. Call 1800 813 205 if you need assistance finding an office.' },
    { question: 'Where can I read community stories?', answer: 'Visit the Stories section to learn how Mosaic supports communities across NSW through real experiences and outcomes.' },
  ]), []);

  const allFaqs = faqs;
  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q));
  }, [query, faqs]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQs | Mosaic Multicultural Connections</title>
        <meta name="description" content="Frequently asked questions about eligibility, getting support, interpreters, aged care, family programs, referrals, donations and reporting in NSW." />
      </Helmet>
      <FAQSchema faqs={allFaqs} name="Mosaic Multicultural Connections FAQs" />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Find clear answers to common questions. Use the search to filter by topic.
          </p>
        </div>

        <div className="mx-auto max-w-3xl mb-8">
          <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ocean focus-within:ring-offset-2 focus-within:ring-offset-background">
            <SearchIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="faq-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs"
              className="w-full bg-transparent text-sm text-foreground focus:outline-none"
              aria-label="Search FAQs"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((item, idx) => {
            const id = `faq-${idx}`;
            const panelId = `${id}-panel`;
            return (
              <div key={id} className="rounded-xl border bg-card p-4 shadow-sm">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between text-left"
                        aria-expanded="false"
                        aria-controls={panelId}
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          const expanded = btn.getAttribute('aria-expanded') === 'true';
                          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                          const panel = document.getElementById(panelId);
                          if (panel) panel.hidden = expanded;
                          if (!expanded) logFaqView(item.question);
                        }}
                      >
                        <span className="font-medium text-foreground">{item.question}</span>
                        <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      </button>
                      <div id={panelId} hidden className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                            aria-label="Mark this answer as helpful"
                            onClick={() => logFaqFeedback(item.question, true)}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> Helpful
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                            aria-label="Report this answer needs improvement"
                            onClick={() => logFaqFeedback(item.question, false)}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" /> Needs improvement
                          </button>
                        </div>
                      </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="/resources" className="text-primary hover:underline">Back to Resources →</a>
        </div>
      </section>

      <RelatedServices />
    </div>
  );
}
