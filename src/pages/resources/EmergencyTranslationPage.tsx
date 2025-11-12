import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, AlertTriangle, Flame, CloudLightning, Satellite, Radio, Zap, MapPin, Languages } from "lucide-react";

import BackLink from "../../components/ui/BackLink";

export default function EmergencyTranslationPage() {
  const emergencyItems = [
    {
      title: "For life threatening emergencies",
      desc: "Police, Fire or Ambulance",
      action: { label: "Call 000", href: "tel:000" },
      icon: AlertTriangle,
    },
    {
      title: "Major bushfire incident updates",
      desc: "NSW Rural Fire Service",
      action: { label: "1800 679 737", href: "tel:1800679737" },
      icon: Flame,
    },
    {
      title: "Floods, storms and tsunamis",
      desc: "State Emergency Service (SES)",
      action: { label: "132 500", href: "tel:132500" },
      icon: CloudLightning,
    },
    {
      title: "NSW SES general enquiries",
      desc: "Non-emergency / general",
      action: { label: "138 737", href: "tel:138737" },
      icon: Phone,
    },
    {
      title: "Power outages / fallen powerlines",
      desc: "Ausgrid",
      action: { label: "13 13 88", href: "tel:131388" },
      icon: Zap,
    },
    {
      title: "Weather updates & flood warnings",
      desc: "Bureau of Meteorology",
      link: { label: "bom.gov.au", href: "https://www.bom.gov.au/" },
      icon: Satellite,
    },
    {
      title: "Live traffic & road closures",
      desc: "Live Traffic NSW",
      link: { label: "livetraffic.com", href: "https://www.livetraffic.com/" },
      icon: MapPin,
    },
    {
      title: "Local emergency information",
      desc: "Hazards Near Me NSW app",
      link: { label: "Download app", href: "https://www.nsw.gov.au/emergencies/near-me" },
      icon: AlertTriangle,
    },
    {
      title: "Live radio updates",
      desc: "1233 ABC Newcastle",
      link: { label: "Listen live", href: "https://www.abc.net.au/newcastle/" },
      icon: Radio,
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Emergency & Translation Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Quick access to emergency contacts and language support. Includes TIS National 131 450 and NSW emergency services links."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        {/* Subtle glass morphism overlays for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/40 to-indigo-100/20 dark:from-blue-900/15 dark:via-purple-900/10 dark:to-indigo-900/15 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400/20 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Emergency & Translation Services</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Required information for NSW compliance and user safety. Use the quick actions below or read guidance on
              getting language support during emergencies.
            </p>
          </div>

          {/* Quick Actions Bar - unified styling */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <a href="tel:000" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label="Call 000 for Police, Fire, Ambulance">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sun text-white p-2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Call 000</div>
                  <div className="text-xs text-muted-foreground">Police • Fire • Ambulance</div>
                </div>
              </div>
              <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition">Call</span>
            </a>
            <a href="tel:131450" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label="Call TIS National 131 450 for interpreters">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-earth text-white p-2">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">TIS 131 450</div>
                  <div className="text-xs text-muted-foreground">Translating & Interpreting Service</div>
                </div>
              </div>
              <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition">Call</span>
            </a>
            <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label="Open NSW Government emergency information">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-leaf text-white p-2">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">NSW Emergency Info</div>
                  <div className="text-xs text-muted-foreground">Official guidance and contacts</div>
                </div>
              </div>
              <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition">Open</span>
            </a>
          </div>

          {/* Emergency Contacts */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {emergencyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group rounded-xl border backdrop-blur-md bg-white/70 dark:bg-white/10 p-6 shadow-sm border-white/40 dark:border-white/15">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-sky/15 dark:bg-sky/20 text-sky p-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      {item.action ? (
                        <a href={item.action.href} className="inline-flex items-center gap-2 text-primary hover:underline">
                          <Phone className="h-4 w-4" /> {item.action.label}
                        </a>
                      ) : item.link ? (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                          {item.link.label}
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Translation Guidance */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-2">Translation & Interpreting (TIS National)</h2>
            <p className="text-sm text-muted-foreground">
              If you need language support, call the Translating & Interpreting Service on <a className="text-primary hover:underline" href="tel:131450">131 450</a>.
              Ask for an interpreter and the language you speak. Public agencies can use interpreters for you.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Tell emergency operators you need an interpreter — they will connect TIS.</li>
              <li>Hospitals, police and many government services can arrange interpreters.</li>
              <li>Have key personal information ready (name, location, phone number).</li>
            </ul>
            <div className="mt-4">
              <a href="https://www.tisnational.gov.au/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Visit TIS National →
              </a>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="rounded-xl border bg-card p-6 shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-2">Helpful Links</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                NSW Government Emergencies: <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nsw.gov.au/emergencies</a>
              </li>
              <li>
                Hazards Near Me NSW app: <a href="https://www.nsw.gov.au/emergencies/near-me" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nsw.gov.au/emergencies/near-me</a>
              </li>
              <li>
                Live Traffic NSW: <a href="https://www.livetraffic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">livetraffic.com</a>
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <BackLink to="/resources">Back to Resources</BackLink>
          </div>
        </div>
      </section>
    </div>
  );
}