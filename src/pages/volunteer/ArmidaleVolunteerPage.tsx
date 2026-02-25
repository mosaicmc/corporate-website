import { Helmet } from 'react-helmet-async';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Users, ChevronRight, FileDown, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

export default function ArmidaleVolunteerPage() {
  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const short = (s: string) => (s.length > 220 ? s.slice(0, 220) + '…' : s);

  const settlementRoles = [
    {
      title: 'English Literacy & Conversation Tutor',
      blurb:
        "Help someone find their voice in a new language. You'll meet weekly for one to two hours with clients—mainly from refugee backgrounds—building conversational confidence and literacy skills through formal coursework, everyday practice, and creative learning tools. If you have teaching or tutoring experience, genuine patience, and you understand that language learning is about belonging and possibility as much as grammar, this role offers the chance to watch people discover their capabilities week by week.",
    },
    {
      title: 'Citizenship Test Preparation Tutor',
      blurb:
        "Be part of someone's journey to calling Australia home in the fullest sense. You'll work one-on-one preparing clients for their citizenship test, using government resources and Mosaic materials to break down complex concepts and support English comprehension at the right pace. If you have knowledge of the citizenship test process, enjoy tutoring, and understand that this milestone represents years of hope and hard work, this five-month commitment could be your perfect match.",
    },
    {
      title: 'Homework & Learning Centre Tutor',
      blurb:
        "Help recently-arrived young people overcome educational disadvantage and discover their academic potential. You'll volunteer at a school venue for 90 minutes weekly, supporting refugee and migrant students with English skills, homework, and academic confidence through fun learning activities (primary) or one-on-one tutoring (secondary). If you have strong English proficiency, enjoy working with young people, and you're committed to showing up consistently because these students need that reliability, this role offers enormous rewards for a two-term commitment.",
    },
    {
      title: 'Employment Mentor',
      blurb:
        "Help someone rebuild their career in a new country. Meeting at our local office for at least two hours weekly or fortnightly, you'll support clients—mainly from refugee backgrounds—with resume writing, interview practice, job search skills, and navigating Australian employment pathways, working alongside caseworkers to provide comprehensive support. If you understand job search processes, have strong computer skills, and you recognize that employment is about rebuilding identity and independence after displacement, this three-month minimum commitment offers the chance to change trajectories.",
    },
    {
      title: 'Housing Mentor',
      blurb:
        "Help families find a place to call home. Working from our local office for at least two hours weekly or fortnightly, you'll support clients in searching for properties, liaising with real estate agents, preparing rental applications, and building comprehensive housing resource lists. If you understand how the rental market works, have strong communication skills for dealing with housing professionals, and you recognize that housing is the foundation for everything else in a new life, this three-month minimum commitment lets you provide something essential.",
    },
  ];


  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Volunteer in Armidale | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Volunteer opportunities in Armidale: settlement support, tutoring, ACVVS visitor, citizenship assistance and community events."
        />
      </Helmet>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Armidale Volunteering</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Support Families in Armidale</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Volunteer with Mosaic in Armidale to strengthen local multicultural communities with practical care.
          </p>
          <div className="mt-6 flex justify-center relative z-10">
            <VolunteerLocationNav currentSlug="armidale" />
          </div>
        </div>
      </section>

      <Section overlay>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <Tabs.Root defaultValue="settlement">
              <Tabs.List className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 backdrop-blur-md p-1">
                <Tabs.Trigger value="settlement" className="px-4 py-2 text-sm rounded-full transition data-[state=active]:bg-ocean data-[state=active]:text-white hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background">
                  Settlement Support
                </Tabs.Trigger>
              </Tabs.List>

              <div className="mt-6">
                <Tabs.Content value="settlement">
                  <GlassCard padding="md" className="rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-sky text-white flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Settlement Support</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {settlementRoles.map((r) => (
                        <div key={r.title} className="group relative backdrop-blur-md bg-ocean/10 dark:bg-ocean/5 rounded-xl p-6 border border-ocean/20 dark:border-ocean/10 shadow-sm transition-transform transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-ocean/15 dark:hover:bg-ocean/10">
                          <div className="flex items-start justify-between">
                            <div className="font-semibold text-foreground">{r.title}</div>
                            <Dialog.Root>
                              <Dialog.Trigger aria-label="View details" aria-haspopup="dialog" title="View details" className="inline-flex items-center justify-center text-sm text-muted-foreground hover:text-sky dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background rounded p-2 min-w-[40px] min-h-[40px]">
                                <ChevronRight className="h-4 w-4" />
                              </Dialog.Trigger>
                              <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 z-[60] backdrop-blur-sm bg-background/40 dark:bg-background/50" />
                                <Dialog.Content className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                                  <div className="relative w-full max-w-lg rounded-3xl border border-border dark:border-border bg-card/95 dark:bg-card/90 p-6 shadow-2xl transition-all duration-300">
                                    <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-ocean/10 via-transparent to-sky/10"></div>
                                    <Dialog.Title className="text-xl font-semibold text-foreground">{r.title}</Dialog.Title>
                                    <Dialog.Description className="mt-2 text-base leading-relaxed text-foreground">{r.blurb}</Dialog.Description>
                                    <div className="mt-4 flex gap-3">
                                      <a
                                        href={`/pd/armidale/${toSlug(r.title)}.pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                                      >
                                        <FileDown className="h-4 w-4 mr-2" />
                                        Download PD
                                      </a>
                                      <a
                                        href="https://tally.so/r/3qoXjg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-lg bg-ocean text-white px-4 py-2 text-sm hover:bg-ocean/90"
                                      >
                                        Apply
                                      </a>
                                    </div>
                                    <Dialog.Close className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-white/10 border border-white/40 dark:border-white/20 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background">
                                      <X className="h-4 w-4 text-muted-foreground" />
                                    </Dialog.Close>
                                  </div>
                                </Dialog.Content>
                              </Dialog.Portal>
                            </Dialog.Root>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{short(r.blurb)}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </Tabs.Content>


              </div>
            </Tabs.Root>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://tally.so/r/3qoXjg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Apply to Volunteer
          </a>
          <Link
            to="/get-involved"
            className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            More Ways to Get Involved
          </Link>
        </div>

        <VolunteerLocationNav currentSlug="armidale" />
      </Section>
    </div>
  );
}
