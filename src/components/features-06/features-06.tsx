import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceFeature {
  category: string;
  title: string;
  details: string;
  tutorialLink: string;
}

interface ServicesListProps {
  title?: string;
  features?: ServiceFeature[];
}

const defaultFeatures: ServiceFeature[] = [
  {
    category: "Settlement Support",
    title: "SETS Program for New Arrivals",
    details: "Comprehensive support for new arrivals to help establish their lives in Australia with dignity and independence. Housing assistance, employment guidance, and community orientation.",
    tutorialLink: "/services/settlement-support",
  },
  {
    category: "Aged Care Services",
    title: "Culturally Appropriate Care",
    details: "Honoring traditions while providing professional aged care services in familiar languages. Home care packages, personal care, and cultural activities.",
    tutorialLink: "/services/aged-care",
  },
  {
    category: "Family Support",
    title: "Strengthening Families",
    details: "Programs designed to strengthen families and build resilient community connections. Family counseling, parenting support, and crisis intervention services.",
    tutorialLink: "/services/family-support",
  },
  {
    category: "Community Engagement",
    title: "Building Connections",
    details: "Creating opportunities for participation, cultural celebration, and meaningful social connection. Cultural festivals, leadership development, and volunteer programs.",
    tutorialLink: "/services/community-engagement",
  },
];

const ServicesList = ({ title = "Our Comprehensive Services", features = defaultFeatures }: ServicesListProps) => {
  const textColorClass = (category: string) => {
    return category === "Settlement Support"
      ? "text-sky"
      : category === "Aged Care Services"
      ? "text-care"
      : category === "Family Support"
      ? "text-sun"
      : category === "Community Engagement"
      ? "text-leaf"
      : "text-sky";
  };
  const buttonColorClass = (category: string) => {
    return category === "Settlement Support"
      ? "bg-sky hover:bg-sky/90"
      : category === "Aged Care Services"
      ? "bg-care hover:bg-care/90"
      : category === "Family Support"
      ? "bg-sun hover:bg-sun/90"
      : category === "Community Engagement"
      ? "bg-leaf hover:bg-leaf/90"
      : "bg-sky hover:bg-sky/90";
  };
  return (
    <Section overlay containerClassName="max-w-screen-lg w-full py-10 px-6">
      <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto text-foreground">
          {title}
      </h2>
      <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
        {features.map((feature) => (
          <div
            key={feature.category}
            className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
          >
              <div className="w-full aspect-[6/4] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-gray-200 dark:border-gray-700 basis-1/2 flex items-center justify-center">
                <div className="text-6xl opacity-20 dark:opacity-30">
                  {feature.category === "Settlement Support" && "🏠"}
                  {feature.category === "Aged Care Services" && "❤️"}
                  {feature.category === "Family Support" && "👨‍👩‍👧‍👦"}
                  {feature.category === "Community Engagement" && "🤝"}
                </div>
              </div>
              <div className="basis-1/2 shrink-0">
                <span className={`uppercase font-semibold text-sm ${textColorClass(feature.category)}`}>
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-[17px]">
                  {feature.details}
                </p>
                <Button
                  asChild
                  className={`mt-6 rounded-full min-w-40 text-[15px] ${buttonColorClass(feature.category)} text-white`}
                >
                  <Link to={feature.tutorialLink}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Section>
  );
};

export default ServicesList;
