import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldAlert, FileWarning, ShieldCheck, Scale, AlertTriangle } from "lucide-react";

export default function WhistleblowerPolicyPage() {
  const pdfHref = "https://mosaicmc.org.au/wp-content/uploads/2025/10/Mosaic-Whistleblower-Policy-.pdf";
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Whistleblower Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="How to report misconduct safely at Mosaic, protections provided, and investigation process."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Whistleblower Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Guidance for reporting misconduct, ensuring confidentiality, and protections against retaliation.
          </p>
        </div>

        <div className="grid gap-6">
          {/* What is Reportable */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileWarning className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Reportable Concerns</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Fraud, corruption, or serious misconduct.</li>
              <li>Risks to health, safety, or the public.</li>
              <li>Breach of law or Mosaic policies.</li>
            </ul>
          </div>

        {/* Protections */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Protections</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Confidential reporting channels and anonymity options.</li>
              <li>No retaliation for good-faith reports.</li>
              <li>Support available throughout the process.</li>
            </ul>
          </div>

          {/* Investigation */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Investigation Process</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Prompt assessment of reports and triage.</li>
              <li>Evidence-based investigation respecting confidentiality.</li>
              <li>Findings inform corrective actions and improvements.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">This page summarises Mosaic’s Whistleblower Policy. For confidential advice, contact HR.</p>
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