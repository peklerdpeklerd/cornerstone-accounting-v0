const steps = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "We discuss the client's situation, goals, deadlines, available records, and the type of assistance required.",
  },
  {
    step: "02",
    title: "Document and Financial Review",
    description:
      "Cornerstone reviews the available financial records, tax documents, property records, applications, reports, or supporting materials.",
  },
  {
    step: "03",
    title: "Analysis and Action Plan",
    description:
      "We identify the relevant financial issues and develop a practical plan based on the engagement.",
  },
  {
    step: "04",
    title: "Ongoing Support",
    description:
      "We provide the agreed accounting, financial analysis, documentation, application, resolution, or advisory support.",
  },
];

export function ClientProcess() {
  return (
    <section className="w-full bg-[#fcfcfd]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div id="process" className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            How We Work
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          A Clear and Practical Client Process
        </h2>

        <ol className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 xl:gap-6">
          {steps.map((item) => (
            <li key={item.step} className="h-full">
              <article className="relative flex h-full flex-col rounded-[15px] border border-border bg-background p-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-[0_10px_24px_-12px_rgba(16,24,40,0.18)] motion-reduce:transform-none motion-reduce:transition-none lg:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-primary text-[15px] font-bold text-primary-foreground">
                  {item.step}
                </span>

                <h3 className="mt-[18px] text-[18px] leading-snug font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Each engagement is different. The steps above describe Cornerstone&apos;s
          general working approach and do not represent a uniform legal or
          regulatory process for every service.
        </p>
      </div>
    </section>
  );
}
