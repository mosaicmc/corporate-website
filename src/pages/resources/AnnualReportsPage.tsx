import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import RelatedServices from '@/components/RelatedServices';
import { FileText, ExternalLink } from "lucide-react";
import DecadeCards, { computeDecadeGroups } from '@/components/DecadeCards';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Report = { year: string; href: string };

const reports: Report[] = [
  { year: "1991", href: "/annual-reports/Annual Report 1990-1991.pdf" },
  { year: "1992", href: "/annual-reports/Annual Report 1992.pdf" },
  { year: "1993", href: "/annual-reports/Annual Report 1993.pdf" },
  { year: "1994", href: "/annual-reports/Annual Report 1994.pdf" },
  { year: "1995", href: "/annual-reports/Annual Report 1995.pdf" },
  { year: "1996", href: "/annual-reports/Annual Report 1996.pdf" },
  { year: "1997", href: "/annual-reports/Annual Report 1997.pdf" },
  { year: "1998", href: "/annual-reports/Annual Report 1998.pdf" },
  { year: "1999", href: "/annual-reports/Annual Report 1999.pdf" },
  { year: "2000", href: "/annual-reports/Annual Report 2000.pdf" },
  { year: "2001", href: "/annual-reports/Annual Report 2001.pdf" },
  { year: "2002", href: "/annual-reports/Annual Report 2002.pdf" },
  { year: "2003", href: "/annual-reports/Annual Report 2003.pdf" },
  { year: "2004", href: "/annual-reports/Annual Report 2004.pdf" },
  { year: "2005", href: "/annual-reports/Annual Report 2005.pdf" },
  { year: "2006", href: "/annual-reports/Annual Report 2006.pdf" },
  { year: "2007", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2007.pdf" },
  { year: "2008", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2008-1.pdf" },
  { year: "2009", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2009.pdf" },
  { year: "2010", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2010-1.pdf" },
  { year: "2011", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2011-1.pdf" },
  { year: "2012", href: "/annual-reports/Annual Report  2012-2013.pdf" },
  { year: "2014", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2014-1.pdf" },
  { year: "2015", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2015.pdf" },
  { year: "2016", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2016-1.pdf" },
  { year: "2017", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2017-1.pdf" },
  { year: "2018", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2018.pdf" },
  { year: "2019", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2019.pdf" },
  { year: "2020", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2020.pdf" },
  { year: "2021", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2021.pdf" },
  { year: "2022", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2022.pdf" },
  { year: "2023", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2023.pdf" },
  { year: "2024", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2024.pdf" },
  { year: "2025", href: "/annual-reports/Annual Report 2025.pdf" },
];

export default function AnnualReportsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);
  const [activeDecade, setActiveDecade] = useState<string | null>(null);

  const groups = useMemo(() => computeDecadeGroups(reports), []);
  const decadeOrder = groups.map((g) => g.id);
  const latestYear = useMemo(() => {
    const nums = reports
      .map((r) => parseInt(r.year, 10))
      .filter((n) => Number.isFinite(n));
    return nums.length ? Math.max(...nums) : null;
  }, []);
  const latestYearStr = latestYear ? String(latestYear) : null;

  useEffect(() => {
    if (latestYearStr) {
      const r = reports.find((x) => x.year === latestYearStr);
      if (r) {
        setSelected(r);
        setOpen(true);
        setActiveDecade('2021-present');
      }
    }
  }, [latestYearStr]);

  const filteredReports = useMemo(() => {
    if (!activeDecade) return reports.slice().sort((a, b) => parseInt(b.year) - parseInt(a.year));
    const g = groups.find((x) => x.id === activeDecade);
    return (g?.items ?? []);
  }, [activeDecade, groups]);

  const goPrevDecade = () => {
    if (!activeDecade) return;
    const idx = decadeOrder.indexOf(activeDecade);
    if (idx > 0) setActiveDecade(decadeOrder[idx - 1]);
  };
  const goNextDecade = () => {
    if (!activeDecade) return;
    const idx = decadeOrder.indexOf(activeDecade);
    if (idx >= 0 && idx < decadeOrder.length - 1) setActiveDecade(decadeOrder[idx + 1]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Annual Reports | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Explore Mosaic’s annual reports from 2007 to 2024. View reports in an interactive panel or download PDFs."
        />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Annual Reports</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Click a year to open the report in a smooth side panel, or use the
              external link to download directly.
            </p>
          </div>

          <div className="mb-8">
            <DecadeCards
              reports={reports}
              selected={activeDecade}
              onSelect={(id) => setActiveDecade((prev) => (prev === id ? null : id))}
            />
            <div className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">
              {activeDecade ? (
                <span>
                  Showing <span className="font-semibold text-foreground">{activeDecade}</span>
                </span>
              ) : (
                <span>Showing all years</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3" role="navigation" aria-label="Decade navigation">
              <button
                className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 px-4 py-2 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                onClick={goPrevDecade}
                disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === 0}
                aria-disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === 0}
              >
                Previous Decade
              </button>
              <button
                className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 px-4 py-2 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                onClick={goNextDecade}
                disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === decadeOrder.length - 1}
                aria-disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === decadeOrder.length - 1}
              >
                Next Decade
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in-up">
            {filteredReports.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">No reports in this decade yet.</div>
            )}
            {filteredReports.map((r) => {
              const isLatest = latestYearStr ? r.year === latestYearStr : false;
              return (
                <div
                  key={r.year}
                  className={`relative rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md ${isLatest ? 'border-ocean ring-2 ring-ocean' : ''}`}
                  aria-label={isLatest ? `Annual Report ${r.year}, latest` : `Annual Report ${r.year}`}
                >
                  {isLatest && (
                    <span className="absolute top-2 right-2 rounded-full bg-ocean text-white text-xs px-2 py-1" aria-label="Latest report">
                      Latest
                    </span>
                  )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 text-primary p-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{r.year}</h3>
                      <p className="text-sm text-muted-foreground">Annual Report</p>
                    </div>
                  </div>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    aria-label={`Download Annual Report ${r.year}`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <div className="mt-4">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => {
                      setSelected(r);
                      setOpen(true);
                    }}
                  >
                    Open in panel →
                  </button>
                </div>
                </div>
              );
            })}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <span className="sr-only">Open report</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>
                  {selected ? `Annual Report ${selected.year}` : "Annual Report"}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 h-[70vh]">
                {selected ? (
                  <iframe
                    src={selected.href}
                    title={`Annual Report ${selected.year}`}
                    className="w-full h-full rounded-lg border"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">Select a report to view.</div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>
      <RelatedServices />
    </div>
  );
}
