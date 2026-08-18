import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative w-full overflow-hidden bg-[#fbfaf8]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-10 lg:py-24">
        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-5 h-[72%] w-[58%] bg-primary sm:-left-8"
          />

          <div
            aria-hidden="true"
            className="absolute left-0 top-[22%] h-32 w-32 rotate-45 border border-primary/40 sm:-left-4 sm:h-40 sm:w-40"
          />

          <div className="relative ml-5 aspect-4/5 overflow-hidden bg-[#ececef] shadow-lg sm:ml-8">
            <Image
              src="/images/rowena-moyer.webp"
              alt="Rowena Moyer, Chief Executive Officer of CornerStone Business Accounting Solutions"
              fill
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.24em] text-primary uppercase sm:text-sm">
            The Leadership Behind AccountingDC
          </p>

          <div className="mt-4 h-px w-full bg-primary/45" />

          <h2
            id="leadership-heading"
            className="mt-7 max-w-xl text-4xl leading-[1.08] font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.45rem]"
          >
            Experience That Guides Every Decision.
          </h2>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl">
              Rowena Moyer, CMA
            </h3>

            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              Chief Executive Officer
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
            <p>
              Rowena Moyer leads CornerStone Business Accounting Solutions with
              more than three decades of experience in financial leadership,
              government and commercial contracting, forensic accounting, tax
              resolution, budgeting, audits, and accounting-system
              restructuring.
            </p>

            <p>
              Her career has included negotiating a favorable $300,000 HUD
              contract claim, managing a $12 million HoDAG cost-certification
              audit, completing three fiscal-year audits within two years, and
              helping restore delayed accounting operations across six business
              entities.
            </p>

            <p>
              As a Certified Management Accountant with academic training in
              accounting, mathematics, budget analysis, and federal acquisition
              regulations, Rowena brings disciplined financial insight and
              practical leadership to every engagement.
            </p>
          </div>

          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-3 border-b border-primary pb-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Request a Consultation
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
