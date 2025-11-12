import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BackLink from "../../components/ui/BackLink";
import { ShieldCheck, BadgeCheck, Scale, Layers, ClipboardList, ChevronRight } from "lucide-react";

type KBItem = {
  title: string;
  href: string;
  desc: string;
  icon: any;
};

export default function KnowledgeBasePage() {
  const items: KBItem[] = [
    {
      title: "Code of Conduct",
      href: "/policies/code-of-conduct",
      desc: "Values, expected behaviours, and reporting processes.",
      icon: BadgeCheck,
    },
    {
      title: "Work Health & Safety",
      href: "/policies/work-health-safety",
      desc: "Safety responsibilities, hazard reporting, and emergency procedures.",
      icon: ShieldCheck,
    },
    {
      title: "Diversity & Inclusion",
      href: "/policies/diversity-inclusion",
      desc: "Equity, inclusion and cultural safety principles.",
      icon: Layers,
    },
    {
      title: "Whistleblower",
      href: "/policies/whistleblower",
      desc: "Protected disclosure, investigations and confidentiality.",
      icon: Scale,
    },
    {
      title: "Quality Management",
      href: "/policies/quality-management",
      desc: "Continuous improvement and compliance practices.",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Knowledge Base | Mosaic Multicultural Connections</title>
        <meta name="description" content="Browse Mosaic’s organisational policies and governance resources." />
      </Helmet>

      <section className="relative mx-auto max-w-6xl px-6 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Subtle overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/40 to-indigo-100/20 dark:from-blue-900/15 dark:via-purple-900/10 dark:to-indigo-900/15 pointer-events-none"></div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Organisational policies and governance resources for staff, volunteers, partners and stakeholders.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon as any;
            return (
              <Link
                key={item.title}
                to={item.href}
                className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-earth text-white p-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary">View</span>
                  <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <BackLink to="/about">Back to About</BackLink>
        </div>
      </section>
    </div>
  );
}