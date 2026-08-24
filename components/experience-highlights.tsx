import {
  BadgeCheck,
  Building2,
  CalendarClock,
  ClipboardList,
  HandCoins,
  Landmark,
  type LucideIcon,
} from "lucide-react";

type Highlight = {
  metric: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const highlights: Highlight[] = [
  {
    metric: "40+ Years",
    label: "Professional Experience",
    description:
      "Rowena Moyer brings more than 40 years of experience in accounting, finance, financial management, and business consulting.",
    icon: CalendarClock,
  },
  {
    metric: "$60 Million Company",
    label: "Executive leadership",
    description:
      "Former Chief Financial Officer of a $60 million deep-mining company.",
    icon: Building2,
  },
  {
    metric: "$325,000 Grant",
    label: "Recent client result",
    description: "Secured a $325,000 grant for clients.",
    icon: HandCoins,
  },
  {
    metric: "$2 Million Grant Funding",
    label: "Combined client funding",
    description:
      "Assisted clients in securing a combined $2 million in grant funding.",
    icon: Landmark,
  },
  {
    metric: "Certificate of Clean Hands",
    label: "Compliance assistance",
    description: "DC Certificate of Clean Hands Assistance.",
    icon: BadgeCheck,
  },
  {
    metric: "Five-Year Financial Review",
    label: "Litigation support engagement",
    description:
      "Completed a five-year rental and property tax analysis for a landlord-tenant litigation matter.",
    icon: ClipboardList,
  },
];

export function ExperienceHighlights() {
  return (
    <section className="w-full bg-[#fcfcfd]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div id="experience" className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Experience and Recent Highlights
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          Proven Experience. Practical Client Results.
        </h2>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Rowena&apos;s career combines decades of financial leadership with
          hands-on work involving accounting, audits, tax matters, property,
          compliance, funding, and business operations.
        </p>

        <ul className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <li key={highlight.metric} className="h-full">
                <article className="flex h-full flex-col rounded-[15px] border border-border bg-background p-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-[0_10px_24px_-12px_rgba(16,24,40,0.18)] motion-reduce:transform-none motion-reduce:transition-none lg:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                    <Icon
                      aria-hidden="true"
                      className="h-[22px] w-[22px]"
                      strokeWidth={1.75}
                    />
                  </span>

                  <p className="mt-[18px] text-[21px] leading-snug font-bold tracking-tight text-foreground">
                    {highlight.metric}
                  </p>

                  <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {highlight.label}
                  </p>

                  <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                    {highlight.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
