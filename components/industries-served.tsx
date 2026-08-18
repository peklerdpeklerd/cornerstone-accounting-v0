import {
  Building2,
  HeartPulse,
  Home,
  Landmark,
  ScrollText,
  Store,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

type Industry = {
  name: string;
  icon: LucideIcon;
};

const industries: Industry[] = [
  { name: "Government Contracting", icon: Landmark },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Nonprofit Organizations", icon: Users },
  { name: "Restaurants and Hospitality", icon: Store },
  { name: "Real Estate Development", icon: Building2 },
  { name: "Rental Property and Landlord Matters", icon: Home },
  { name: "Small and Growing Businesses", icon: TrendingUp },
  { name: "Regulated and Licensed Businesses", icon: ScrollText },
];

export function IndustriesServed() {
  return (
    <section className="w-full bg-[#fcfcfd]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div id="industries" className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Industries and Organizations Served
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          Financial Experience Across Diverse Sectors
        </h2>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Cornerstone&apos;s broad accounting and financial leadership
          experience supports businesses, organizations, property owners,
          developers, and professionals facing a wide range of financial and
          operational challenges.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <li key={industry.name} className="h-full">
                <div className="flex h-full items-center gap-3.5 rounded-[14px] border border-border bg-background p-[18px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-[0_10px_24px_-12px_rgba(16,24,40,0.18)] motion-reduce:transform-none motion-reduce:transition-none">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-muted text-primary">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="text-[15px] leading-snug font-semibold text-foreground">
                    {industry.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
