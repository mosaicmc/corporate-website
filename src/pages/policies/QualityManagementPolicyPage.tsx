import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ClipboardList, CheckCircle2, Layers, AlertTriangle } from "lucide-react";

export default function QualityManagementPolicyPage() {
  const pdfHref = "https://mosaicmc.org.au/wp-content/uploads/2025/10/Aged-Care-Services.pdf";
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Quality Management Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Quality standards, continuous improvement and assurance practices at Mosaic."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quality Management Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Our commitment to safe, effective, and culturally responsive services through quality assurance and
            continuous improvement.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Standards & Framework */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Layers className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Standards & Framework</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Alignment to relevant national standards and Mosaic policies.</li>
              <li>Documented procedures support consistent, safe delivery.</li>
            </ul>
          </div>

          {/* Assurance & Monitoring */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Assurance & Monitoring</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Regular audits, feedback collection and incident review.</li>
              <li>Corrective actions tracked to resolution.</li>
            </ul>
          </div>

          {/* Continuous Improvement */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Continuous Improvement</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Data-informed changes and periodic policy reviews.</li>
              <li>Staff training maintains competence and cultural safety.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">This page summarises Mosaic’s Quality Management Policy. For detailed procedures, contact the Quality team.</p>
        <div className="mt-6">
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm shadow-sm hover:shadow-md transition"
          >
            Download full policy (PDF)
          </a>
        </div>

        <div className="mt-8 text-sm space-x-4">
          <Link to="/policies/code-of-conduct" className="text-primary hover:underline">View Code of Conduct</Link>
          <Link to="/policies/work-health-safety" className="text-primary hover:underline">View Work Health & Safety</Link>
        </div>
      </section>
    </div>
  );
}