import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FileText, ExternalLink } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Report = { year: string; href: string };

const reports: Report[] = [
  { year: "2007", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2007.pdf" },
  { year: "2008", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2008-1.pdf" },
  { year: "2009", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2009.pdf" },
  { year: "2010", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2010-1.pdf" },
  { year: "2011", href: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2011-1.pdf" },
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
];

export default function AnnualReportsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);

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

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {reports.map((r) => (
              <div
                key={r.year}
                className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition"
              >
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
            ))}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* Hidden trigger; we programmatically control open state */}
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
    </div>
  );
}