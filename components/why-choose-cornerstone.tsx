import {
  Award,
  Lightbulb,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  {
    title: "Decades of Financial Leadership",
    description:
      "Cornerstone's founder brings more than 40 years of professional experience in accounting, finance, financial management, business consulting, and strategic business solutions.",
    icon: Award,
  },
  {
    title: "Practical, Real-World Perspective",
    description:
      "Recommendations are based on hands-on leadership and operational experience, not theory alone.",
    icon: Lightbulb,
  },
  {
    title: "Specialized Financial Analysis",
    description:
      "Clear analysis of complex financial records, transactions, costs, taxes, property activity, and business performance.",
    icon: Target,
  },
  {
    title: "Confidential and Professional Service",
    description:
      "Client information and financial matters are handled with professionalism, discretion, and care.",
    icon: ShieldCheck,
  },
  {
    title: "Solutions Tailored to the Client",
    description:
      "Services are adapted to the client's records, goals, industry, financial circumstances, and operational needs.",
    icon: SlidersHorizontal,
  },
  {
    title: "Clear Communication",
    description:
      "Complex accounting and financial matters are explained in practical and understandable language.",
    icon: MessagesSquare,
  },
];

export function WhyChooseCornerstone() {
  return (
    <section id="why-cornerstone" className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Why Choose Cornerstone
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          Experienced Guidance Built Around Real Business Needs
        </h2>

        <ul className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <li key={benefit.title} className="h-full">
                <article className="flex h-full flex-col rounded-[15px] border border-border bg-background p-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-[0_10px_24px_-12px_rgba(16,24,40,0.18)] motion-reduce:transform-none motion-reduce:transition-none lg:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                    <Icon
                      aria-hidden="true"
                      className="h-[22px] w-[22px]"
                      strokeWidth={1.75}
                    />
                  </span>

                  <h3 className="mt-[18px] text-[18px] leading-snug font-semibold text-foreground">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                    {benefit.description}
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
