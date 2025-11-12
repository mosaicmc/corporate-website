import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BackLink from "../../components/ui/BackLink";
import { Globe, FileText, Radio, MapPin, Phone, Languages, ShieldCheck, ExternalLink, AlertTriangle } from "lucide-react";

export default function HelpfulLinksPage() {
  const links = [
    {
      title: "Legal Aid NSW",
      desc: "Free legal help and advice across NSW",
      href: "https://www.legalaid.nsw.gov.au/",
      icon: ShieldCheck,
    },
    {
      title: "Translating & Interpreting Service (TIS National)",
      desc: "131 450 — 24/7 interpreter support",
      href: "https://www.tisnational.gov.au/",
      icon: Languages,
    },
    {
      title: "NSW Government Emergencies",
      desc: "Official guidance and contacts",
      href: "https://www.nsw.gov.au/emergencies",
      icon: MapPin,
    },
    {
      title: "Hazards Near Me NSW",
      desc: "Local emergency information app",
      href: "https://www.nsw.gov.au/emergencies/near-me",
      icon: AlertTriangle,
    },
    {
      title: "Bureau of Meteorology",
      desc: "Weather updates and flood warnings",
      href: "https://www.bom.gov.au/",
      icon: Radio,
    },
    {
      title: "Live Traffic NSW",
      desc: "Traffic updates and road closures",
      href: "https://www.livetraffic.com/",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Helpful Links | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Curated external resources including Legal Aid NSW, interpreter support, official emergency and traffic information."
        />
      </Helmet>

      <section className="relative mx-auto max-w-6xl px-6 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/40 to-indigo-100/20 dark:from-blue-900/15 dark:via-purple-900/10 dark:to-indigo-900/15 pointer-events-none"></div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Helpful Links</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Trusted resources to support you during emergencies, with language assistance and official information.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon as any;
            return (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative backdrop-blur-xl bg-white/90 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col justify-between group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15"
                aria-label={`Open ${link.title}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-earth text-white p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{link.title}</div>
                      <div className="text-xs text-muted-foreground">{link.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">Open</span>
                    <ExternalLink className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10">
          <BackLink to="/resources">Back to Resources</BackLink>
        </div>
      </section>
    </div>
  );
}