import { Helmet } from "react-helmet-async";
import { Globe, Phone, Info } from "lucide-react";

export default function TranslationServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Translation Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Access translating and interpreting services, including TIS National (131 450) for language support."
        />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Translation Services</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              If you need language support, these services can help you talk to
              government agencies, emergency services, and community organisations.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 text-primary p-3">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">TIS National (Translating & Interpreting Service)</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    24/7 phone interpreting service accessible from anywhere in Australia.
                    Ask for an interpreter in your language.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <a href="tel:131450" className="inline-flex items-center gap-2 text-primary hover:underline">
                      <Phone className="h-4 w-4" /> Call 131 450
                    </a>
                    <a
                      href="https://www.tisnational.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      More about TIS National
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 text-primary p-3">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Using interpreters with services</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Many services can arrange an interpreter when you call. If you
                    need help speaking to police, a hospital, or a government agency,
                    ask them to connect to an interpreter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            In an emergency, call <a className="text-primary hover:underline" href="tel:000">000</a> first, then ask for
            an interpreter.
          </div>
        </div>
      </section>
    </div>
  );
}