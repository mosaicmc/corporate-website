import { Helmet } from 'react-helmet-async';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { AlertTriangle } from 'lucide-react';

export default function TamworthVolunteerPage() {
  

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Volunteer in Tamworth | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Volunteer opportunities in Tamworth: settlement support, tutoring, ACVVS visitor, citizenship assistance and community events."
        />
      </Helmet>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Tamworth Volunteering</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Strengthen Community in Tamworth</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Partner with Mosaic to support multicultural families in Tamworth with practical care and connection.
          </p>
          <div className="mt-6 flex justify-center relative z-10">
            <VolunteerLocationNav currentSlug="tamworth" />
          </div>
        </div>
      </section>

      <Section overlay>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <GlassCard padding="md" className="rounded-2xl w-full max-w-6xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sand text-foreground flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">No Opportunities Currently Available</h2>
              </div>
              <p className="mt-2 text-muted-foreground">Sorry, we currently have no volunteering opportunities available in this location.</p>
            </GlassCard>
            
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

        <VolunteerLocationNav currentSlug="tamworth" />
      </Section>
    </div>
  );
}
