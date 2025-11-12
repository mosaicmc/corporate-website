import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, FileWarning, AlertTriangle, Users, ClipboardCheck, HardHat, LifeBuoy } from "lucide-react";

export default function WorkHealthSafetyPolicyPage() {
  const pdfHref = "https://mosaicmc.org.au/wp-content/uploads/2025/10/Mosaic-Work-Health-and-Safety-Policy.pdf";
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Work Health and Safety Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Responsibilities, hazard reporting, incident response and safety practices to keep staff, volunteers and clients safe."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Work Health & Safety Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mosaic is committed to providing a safe, healthy and inclusive environment. This summary outlines key
            responsibilities, how to report hazards and incidents, and emergency procedures.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Safety responsibilities */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Responsibilities</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Follow WHS procedures and lawful directions at all times.</li>
              <li>Use equipment safely and report faults or hazards promptly.</li>
              <li>Participate in training and emergency drills when scheduled.</li>
              <li>Support psychological safety and respectful behaviour across teams.</li>
            </ul>
          </div>

          {/* Hazard identification & risk management */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Hazards & Risk Management</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Identify hazards (physical, environmental, psychosocial) and reduce risk.</li>
              <li>Escalate high-risk issues to your manager immediately.</li>
              <li>Document controls and review effectiveness regularly.</li>
              <li>Wear appropriate PPE where required and maintain good housekeeping.</li>
            </ul>
          </div>

          {/* Incident reporting & response */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileWarning className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Incident Reporting & Response</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Report incidents, near misses and injuries as soon as possible. Seek first aid or medical support if
              needed and notify your manager.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Record incidents using Mosaic’s reporting process and forms.</li>
              <li>Cooperate with investigations and corrective actions.</li>
              <li>Respect confidentiality and privacy of individuals involved.</li>
            </ul>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If anyone is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>

          {/* Training & PPE */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HardHat className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Training & PPE</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Complete induction and role-specific WHS training modules.</li>
              <li>Use, store and maintain PPE correctly; replace damaged items.</li>
              <li>Know the location of first aid kits, fire extinguishers and exits.</li>
            </ul>
          </div>

          {/* Emergency procedures */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <LifeBuoy className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Emergency Procedures</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Follow evacuation procedures and instructions from wardens.</li>
              <li>Assist clients or visitors who may need help exiting safely.</li>
              <li>Report post-incident observations to improve future responses.</li>
            </ul>
          </div>

          {/* Review */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Policy Review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This policy is reviewed regularly to ensure it remains current and effective.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">This page summarises Mosaic’s Work Health & Safety Policy. For detailed procedures, speak with HR.</p>
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

        <div className="mt-8 text-sm">
          <Link to="/policies/code-of-conduct" className="text-primary hover:underline">View Code of Conduct</Link>
        </div>
      </section>
    </div>
  );
}