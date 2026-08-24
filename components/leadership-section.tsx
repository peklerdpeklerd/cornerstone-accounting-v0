"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

export function LeadershipSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    const intro = introRef.current;
    const story = storyRef.current;

    if (!intro || !story) return;

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          introObserver.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const storyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          storyObserver.disconnect();
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    introObserver.observe(intro);
    storyObserver.observe(story);

    return () => {
      introObserver.disconnect();
      storyObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative w-full overflow-clip border-y border-border/70 bg-[#f5f4f1]"
    >
      <div
        ref={introRef}
        className="relative mx-auto grid min-h-[calc(100svh-var(--header-height))] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_minmax(330px,410px)] lg:gap-16 lg:px-10 lg:py-20 xl:gap-24"
      >
        <p
          aria-hidden="true"
          className={`pointer-events-none absolute top-[9%] left-1/2 -translate-x-1/2 text-[clamp(4.5rem,12vw,10rem)] leading-none font-bold tracking-[-0.07em] text-[#263246]/[0.045] uppercase transition-[opacity,transform] duration-1000 ease-out ${
            introVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          Leadership
        </p>

        <div className="relative z-10 max-w-2xl">
          <div
            className={`flex items-center gap-4 transition-[opacity,transform] duration-700 ease-out ${
              introVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-px bg-primary transition-[width] delay-100 duration-700 ease-out ${
                introVisible ? "w-10" : "w-0"
              }`}
            />
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase sm:text-sm">
              The Leadership Behind AccountingDC
            </p>
          </div>

          <div className="mt-7 overflow-hidden">
            <p
              className={`text-xl font-medium text-muted-foreground transition-[opacity,transform] delay-150 duration-700 ease-out sm:text-2xl ${
                introVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              Introducing
            </p>
          </div>

          <div className="mt-1 overflow-hidden pb-2">
            <h2
              id="leadership-heading"
              className={`max-w-3xl text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance text-primary transition-[opacity,transform] delay-[250ms] duration-1000 ease-out sm:text-6xl lg:text-[4.6rem] ${
                introVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[115%] opacity-0"
              }`}
            >
              Rowena Moyer<span className="text-foreground">, CMA</span>
            </h2>
          </div>

          <div
            className={`mt-6 transition-[opacity,transform] delay-[450ms] duration-700 ease-out ${
              introVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold tracking-[0.24em] text-foreground uppercase sm:text-sm">
              Founder and Chief Executive Officer
            </p>
            <p className="mt-6 max-w-xl text-xl leading-relaxed font-medium text-foreground/80 sm:text-2xl sm:leading-relaxed">
              More than 40 years of hands-on accounting and financial
              leadership.
            </p>
          </div>

          <a
            href="#leadership-story"
            className={`group mt-9 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase transition-[opacity,transform,color] delay-[650ms] duration-700 ease-out hover:text-accent ${
              introVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Discover her story
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 transition-colors group-hover:border-accent group-hover:bg-primary group-hover:text-white">
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 animate-bounce"
              />
            </span>
          </a>
        </div>

        <div
          className={`relative z-10 mx-auto w-full max-w-[350px] transition-[opacity,transform] delay-150 duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[380px] lg:max-w-[410px] ${
            introVisible
              ? "translate-x-0 translate-y-0 scale-100 opacity-100"
              : "translate-x-16 translate-y-10 scale-[0.94] opacity-0"
          }`}
        >
          <div
            aria-hidden="true"
            className={`absolute -bottom-5 -left-5 h-[62%] bg-primary shadow-[0_24px_60px_-32px_rgba(122,20,22,0.75)] transition-[width] delay-[550ms] duration-1000 ease-out sm:-bottom-7 sm:-left-7 ${
              introVisible ? "w-[44%]" : "w-0"
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute -top-5 -right-5 border-t border-r border-primary/35 transition-[width,height] delay-[500ms] duration-1000 ease-out sm:-top-7 sm:-right-7 ${
              introVisible ? "h-28 w-28 sm:h-36 sm:w-36" : "h-0 w-0"
            }`}
          />

          <div className="group relative ml-4 aspect-4/5 overflow-hidden border border-white/90 bg-[#e6e6e9] shadow-[0_36px_80px_-40px_rgba(31,42,58,0.8)] sm:ml-6">
            <Image
              src="/images/rowena-moyer.png"
              alt="Rowena Moyer, Founder and Chief Executive Officer of CornerStone Business Accounting Solutions"
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 380px, 410px"
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />

            <div
              aria-hidden="true"
              className={`absolute inset-0 z-20 origin-right bg-primary transition-transform delay-200 duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                introVisible ? "scale-x-0" : "scale-x-100"
              }`}
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-1/2 h-14 w-px origin-bottom bg-primary/25 transition-transform delay-[750ms] duration-700 ${
            introVisible ? "scale-y-100" : "scale-y-0"
          }`}
        />
      </div>

      <div
        id="leadership-story"
        ref={storyRef}
        className="relative border-t border-border/70 bg-background"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-10 lg:py-24">
          <div
            className={`transition-[opacity,transform] duration-[800ms] ease-out ${
              storyVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              A Record of Leadership
            </p>
            <h3 className="mt-5 border-l-2 border-primary pl-5 text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
              Clarity, discipline, and practical financial leadership.
            </h3>
          </div>

          <div
            className={`transition-[opacity,transform] delay-200 duration-[800ms] ease-out ${
              storyVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex max-w-[720px] flex-col gap-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
              <p className="text-[16px] leading-7 text-foreground/85 sm:text-[17px] sm:leading-8">
                Rowena Moyer, CMA, founded Cornerstone Business Accounting
                Solutions after a career spanning more than 40 years in
                accounting, finance, financial management, and business
                consulting. Her work has included controllership, budgeting,
                audits, forensic accounting, tax debt resolution, grant
                funding, cost accounting, financial analysis, and the
                restructuring of accounting systems and business operations.
              </p>

              <p>
                During her career, she negotiated a favorable $300,000 HUD
                contract claim, managed a $12 million HoDAG cost-certification
                audit, completed three fiscal-year audits within two years, and
                helped restore delayed accounting operations across six business
                entities.
              </p>

              <p>
                Rowena has also worked in real estate development and deep coal
                mining, where cost accounting and financial controls were an
                important part of the job. She has managed and supported DCAA
                (Defense Contract Audit Agency) audits and worked with
                government-contracting requirements involving compliance, cost
                controls, financial accountability, and federal acquisition
                requirements. A recurring part of her work has been helping
                businesses strengthen their financial structure. That has meant
                reviewing how a business operates, identifying weak points, and
                reorganizing financial and operating processes so management has
                better information and better control.
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
      </div>
    </section>
  );
}
