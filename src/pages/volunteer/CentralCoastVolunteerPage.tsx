import { Helmet } from 'react-helmet-async';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Heart, ChevronRight, FileDown, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

export default function CentralCoastVolunteerPage() {
  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const short = (s: string) => (s.length > 220 ? s.slice(0, 220) + '…' : s);


  const agedCareRoles = [
    {
      title: 'Aged Care Facility Visitor',
      blurb:
        "Bring companionship and joy to an older person living in residential care. You'll visit a designated resident at least twice monthly, building a genuine friendship through conversation, shared activities, and consistent presence that brightens their days and enriches both your lives. If you have genuine empathy for older people, demonstrated reliability, excellent listening skills, and the commitment to maintain appropriate boundaries while building a friendship that matters, this role offers profound rewards beyond volunteering.",
    },
    {
      title: 'Home Visitor',
      blurb:
        "Provide companionship and social connection for older people living independently in their own homes. You'll visit an aged care recipient at least twice monthly, helping combat isolation while respecting their independence and dignity in their own environment. If you combine reliability with respectful sensitivity, can work independently while knowing when to seek guidance, and you understand that aging at home is about preserving independence and identity, this role allows you to make an enormous difference in someone's daily life.",
    },
  ];


  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Volunteer on the Central Coast | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Volunteer opportunities on the Central Coast: settlement support, tutoring, ACVVS visitor, citizenship assistance and community events."
        />
      </Helmet>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Central Coast Volunteering</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Support Community on the Central Coast</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join Mosaic on the Central Coast to help families access services and build strong community connections.
          </p>
          <div className="mt-6 flex justify-center relative z-10">
            <VolunteerLocationNav currentSlug="central-coast" />
          </div>
        </div>
      </section>

      <Section overlay>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <Tabs.Root defaultValue="aged-care">
              <Tabs.List className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 backdrop-blur-md p-1">
                <Tabs.Trigger value="aged-care" className="px-4 py-2 text-sm rounded-full transition data-[state=active]:bg-ocean data-[state=active]:text-white hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background">
                  Aged Care
                </Tabs.Trigger>
              </Tabs.List>

              <div className="mt-6">
                <Tabs.Content value="aged-care">
                  <GlassCard padding="md" className="rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-sky text-white flex items-center justify-center">
                        <Heart className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Aged Care Volunteer Visitor Scheme</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {agedCareRoles.map((r) => (
                        <div key={r.title} className="group relative backdrop-blur-md bg-earth/10 dark:bg-earth/5 rounded-xl p-6 border border-earth/20 dark:border-earth/10 shadow-sm transition-transform transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-earth/15 dark:hover:bg-earth/10">
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
                                        href={`/pd/central-coast/${toSlug(r.title)}.pdf`}
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

        <VolunteerLocationNav currentSlug="central-coast" />
      </Section>
    </div>
  );
}
