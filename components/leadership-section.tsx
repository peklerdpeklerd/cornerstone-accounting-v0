"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

function segment(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export function LeadershipSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [introProgress, setIntroProgress] = useState(0);
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    const intro = introRef.current;

    if (!intro) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setIntroProgress(1);
      return;
    }

    let frameId = 0;

    const updateProgress = () => {
      const rect = intro.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travelDistance = Math.max(intro.offsetHeight, 1);
      const nextProgress = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / travelDistance),
      );

      setIntroProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) > 0.001
          ? nextProgress
          : currentProgress,
      );
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const story = storyRef.current;

    if (!story) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(story);

    return () => observer.disconnect();
  }, []);

  const eyebrowProgress = easeOutCubic(segment(introProgress, 0.05, 0.3));
  const introducingProgress = easeOutCubic(
    segment(introProgress, 0.12, 0.42),
  );
  const nameProgress = easeOutCubic(segment(introProgress, 0.2, 0.58));
  const photoProgress = easeOutCubic(segment(introProgress, 0.14, 0.68));
  const copyProgress = easeOutCubic(segment(introProgress, 0.38, 0.74));
  const actionProgress = easeOutCubic(segment(introProgress, 0.55, 0.86));
  const backgroundProgress = easeOutCubic(segment(introProgress, 0, 0.62));

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative w-full overflow-clip border-y border-border/70 bg-[#f5f4f1]"
    >
      <div ref={introRef} className="relative h-[160svh] lg:h-[175svh]">
        <div className="sticky top-[var(--header-height)] min-h-[calc(100svh-var(--header-height))] overflow-hidden">
          <div className="relative mx-auto grid min-h-[calc(100svh-var(--header-height))] w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_minmax(330px,410px)] lg:gap-16 lg:px-10 xl:gap-24">
            <p
              aria-hidden="true"
              className="pointer-events-none absolute top-[9%] left-1/2 -translate-x-1/2 text-[clamp(4.5rem,12vw,10rem)] leading-none font-bold tracking-[-0.07em] text-[#263246]/[0.045] uppercase will-change-transform"
              style={{
                opacity: backgroundProgress,
                transform: `translate(-50%, ${(1 - backgroundProgress) * 64}px)`,
              }}
            >
              Leadership
            </p>

            <div className="relative z-10 max-w-2xl">
              <div
                className="flex items-center gap-4 will-change-transform"
                style={{
                  opacity: eyebrowProgress,
                  transform: `translate3d(0, ${(1 - eyebrowProgress) * 28}px, 0)`,
                }}
              >
                <span className="h-px w-10 bg-primary" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase sm:text-sm">
                  The Leadership Behind AccountingDC
                </p>
              </div>

              <div className="mt-7 overflow-hidden">
                <p
                  className="text-xl font-medium text-muted-foreground will-change-transform sm:text-2xl"
                  style={{
                    opacity: introducingProgress,
                    transform: `translate3d(0, ${(1 - introducingProgress) * 105}%, 0)`,
                  }}
                >
                  Introducing
                </p>
              </div>

              <div className="mt-1 overflow-hidden pb-2">
                <h2
                  id="leadership-heading"
                  className="max-w-3xl text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance text-primary will-change-transform sm:text-6xl lg:text-[4.6rem]"
                  style={{
                    opacity: nameProgress,
                    transform: `translate3d(0, ${(1 - nameProgress) * 112}%, 0)`,
                  }}
                >
                  Rowena Moyer<span className="text-foreground">, CMA</span>
                </h2>
              </div>

              <div
                className="mt-6 will-change-transform"
                style={{
                  opacity: copyProgress,
                  transform: `translate3d(0, ${(1 - copyProgress) * 42}px, 0)`,
                }}
              >
                <p className="text-xs font-semibold tracking-[0.24em] text-foreground uppercase sm:text-sm">
                  Chief Executive Officer
                </p>
                <p className="mt-6 max-w-xl text-xl leading-relaxed font-medium text-foreground/80 sm:text-2xl sm:leading-relaxed">
                  Experience that guides every decision and leadership grounded
                  in measurable results.
                </p>
              </div>

              <a
                href="#leadership-story"
                className="group mt-9 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase will-change-transform hover:text-accent"
                style={{
                  opacity: actionProgress,
                  transform: `translate3d(0, ${(1 - actionProgress) * 28}px, 0)`,
                }}
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
              className="relative z-10 mx-auto w-full max-w-[350px] will-change-transform sm:max-w-[380px] lg:max-w-[410px]"
              style={{
                opacity: photoProgress,
                transform: `translate3d(${(1 - photoProgress) * 110}px, ${(1 - photoProgress) * 64}px, 0) scale(${0.92 + photoProgress * 0.08})`,
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 h-[62%] w-[44%] bg-primary shadow-[0_24px_60px_-32px_rgba(122,20,22,0.75)] sm:-bottom-7 sm:-left-7"
              />
              <div
                aria-hidden="true"
                className="absolute -top-5 -right-5 h-28 w-28 border-t border-r border-primary/35 sm:-top-7 sm:-right-7 sm:h-36 sm:w-36"
              />
              <div
                aria-hidden="true"
                className="absolute top-0 -left-3 h-full w-px origin-top bg-primary/50 sm:-left-5"
                style={{ transform: `scaleY(${photoProgress})` }}
              />

              <div className="group relative ml-4 aspect-4/5 overflow-hidden border border-white/90 bg-[#e6e6e9] shadow-[0_36px_80px_-40px_rgba(31,42,58,0.8)] sm:ml-6">
                <Image
                  src="/images/rowena-moyer.webp"
                  alt="Rowena Moyer, Chief Executive Officer of CornerStone Business Accounting Solutions"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 380px, 410px"
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-14 w-px origin-bottom bg-primary/25"
              style={{ transform: `scaleY(${actionProgress})` }}
            />
          </div>
        </div>
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
                Rowena Moyer leads CornerStone Business Accounting Solutions
                with more than three decades of experience in financial
                leadership, government and commercial contracting, forensic
                accounting, tax resolution, budgeting, audits, and
                accounting-system restructuring.
              </p>

              <p>
                Her career has included negotiating a favorable $300,000 HUD
                contract claim, managing a $12 million HoDAG cost-certification
                audit, completing three fiscal-year audits within two years,
                and helping restore delayed accounting operations across six
                business entities.
              </p>

              <p>
                As a Certified Management Accountant with academic training in
                accounting, mathematics, budget analysis, and federal
                acquisition regulations, Rowena brings disciplined financial
                insight and practical leadership to every engagement.
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
