import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, Ban, FileWarning, HandCoins, Users, AlertTriangle } from "lucide-react";

export default function CodeOfConductPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Code of Conduct Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Standards of behaviour that reflect Mosaic’s values of respect, integrity, safety and inclusion for staff, volunteers and partners."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Code of Conduct Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mosaic Multicultural Connections expects all staff, volunteers, contractors and partners to act with
            respect, integrity and care. This policy outlines acceptable behaviour and how concerns can be raised.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Our values */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Our Values</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We embed these values in our decisions and day‑to‑day behaviour:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
              <li><span className="font-medium">Respect</span> — Treat everyone with dignity, courtesy and cultural sensitivity.</li>
              <li><span className="font-medium">Integrity</span> — Be honest and transparent; declare conflicts of interest.</li>
              <li><span className="font-medium">Safety</span> — Prioritise physical, psychological and cultural safety.</li>
              <li><span className="font-medium">Inclusion</span> — Champion diversity and equitable access to services.</li>
              <li><span className="font-medium">Accountability</span> — Take responsibility for actions and outcomes.</li>
            </ul>
          </div>

          {/* Expected behaviours */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Expected Behaviours</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Act professionally and courteously with clients, colleagues and partners.</li>
              <li>Follow Mosaic policies, procedures and lawful directions.</li>
              <li>Protect confidential information and people’s privacy.</li>
              <li>Use Mosaic resources responsibly and for authorised purposes.</li>
              <li>Report hazards, risks, misconduct or suspected breaches promptly.</li>
            </ul>
          </div>

          {/* Unacceptable behaviours */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Ban className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Unacceptable Behaviours</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Bullying, harassment, discrimination or vilification.</li>
              <li>Violence, threats, stalking or unsafe conduct.</li>
              <li>Fraud, corruption, theft or misuse of funds/resources.</li>
              <li>Sharing confidential information without authorisation.</li>
              <li>Alcohol or drug impairment while performing duties.</li>
            </ul>
          </div>

          {/* Conflicts, gifts & resources */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HandCoins className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Conflicts of Interest, Gifts & Resources</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Declare actual, perceived or potential conflicts to your manager.</li>
              <li>Do not accept gifts/benefits that may influence decisions; record any offered gifts in line with policy.</li>
              <li>Use Mosaic assets (e.g. devices, vehicles, systems) for approved purposes only.</li>
            </ul>
          </div>

          {/* Reporting & support */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileWarning className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Reporting Concerns & Getting Support</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              If you witness or experience misconduct, raise it early. You will be treated with respect and concerns will
              be handled confidentially wherever possible.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Speak with your manager or HR representative.</li>
              <li>
                Use our confidential process — see the <Link className="text-primary hover:underline" to="/policies/whistleblower">Whistleblower Policy</Link>.
              </li>
              <li>
                For safety matters, refer to the <Link className="text-primary hover:underline" to="/policies/work-health-safety">Work Health & Safety Policy</Link>.
              </li>
              <li>
                For inclusion concerns, see the <Link className="text-primary hover:underline" to="/policies/diversity-inclusion">Diversity & Inclusion Policy</Link>.
              </li>
              <li>
                You can also contact us via the <Link className="text-primary hover:underline" to="/contact">Contact page</Link>.
              </li>
            </ul>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>

          {/* Consequences */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Consequences of Breach</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Breaches of this Code may result in disciplinary action, up to and including termination of employment or
              cessation of engagement. Criminal behaviour will be referred to relevant authorities.
            </p>
          </div>

          {/* Review */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Policy Review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This policy is reviewed regularly to ensure it remains current and effective.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">This page summarises Mosaic’s Code of Conduct. For detailed procedures, speak with HR.</p>
        <div className="mt-6">
          <a
            href="https://mosaicmc.org.au/wp-content/uploads/2025/10/Mosaic-Code-of-Conduct.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm shadow-sm hover:shadow-md transition"
          >
            Download full policy (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}