"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative w-full overflow-hidden border-y border-border/70 bg-[#f7f7f5]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-[31%] bg-[#efeeee] lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full border-[44px] border-primary/[0.045]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[7%] bottom-10 h-px w-32 bg-primary/20"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-16 lg:px-10 lg:py-24 xl:gap-24">
        <div
          className={`relative mx-auto w-full max-w-[390px] transition-[opacity,transform] duration-700 ease-out lg:max-w-[420px] ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 h-[64%] w-[48%] bg-primary shadow-[0_22px_55px_-28px_rgba(122,20,22,0.65)] sm:-left-7"
          />
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 h-28 w-28 border-t border-r border-primary/35 sm:-top-6 sm:-right-6 sm:h-36 sm:w-36"
          />

          <div className="group relative ml-4 aspect-4/5 overflow-hidden border border-white/80 bg-[#e6e6e9] shadow-[0_30px_70px_-36px_rgba(31,42,58,0.7)] sm:ml-6">
            <Image
              src="/images/rowena-moyer.webp"
              alt="Rowena Moyer, Chief Executive Officer of CornerStone Business Accounting Solutions"
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 390px, 420px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#172234]/45 to-transparent"
            />
            <p className="absolute right-4 bottom-4 left-4 border-l-2 border-white/85 pl-3 text-[10px] font-semibold tracking-[0.18em] text-white uppercase drop-shadow-sm sm:text-[11px]">
              Certified Management Accountant
            </p>
          </div>
        </div>

        <div
          className={`max-w-2xl transition-[opacity,transform] delay-150 duration-700 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase sm:text-sm">
              The Leadership Behind AccountingDC
            </p>
          </div>

          <h2
            id="leadership-heading"
            className="mt-6 max-w-2xl text-3xl leading-[1.12] font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-[3.05rem]"
          >
            Experience That Guides Every Decision.
          </h2>

          <div className="mt-7 border-l-2 border-primary pl-5">
            <h3 className="text-2xl font-bold text-primary sm:text-[2rem]">
              Rowena Moyer, CMA
            </h3>
            <p className="mt-1.5 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              Chief Executive Officer
            </p>
          </div>

          <div className="mt-7 flex max-w-[680px] flex-col gap-4 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-7">
            <p className="text-[16px] leading-7 text-foreground/85 sm:text-[17px] sm:leading-8">
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
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
