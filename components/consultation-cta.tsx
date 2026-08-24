export function ConsultationCta() {
  return (
    <section id="consultation" className="w-full bg-primary">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance text-primary-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.4rem] lg:leading-[1.15]">
            Need Help With an Accounting or Financial Matter?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/85 sm:text-base">
            Tell us what you need help with. We&apos;ll review the situation and
            determine whether Cornerstone is the right fit for the work.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
          <a
            href="#contact"
            aria-label="Request a consultation — go to the contact form"
            className="inline-flex items-center justify-center rounded-md bg-background px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background motion-reduce:transform-none"
          >
            Request a Consultation
          </a>
          <a
            href="#services"
            aria-label="Review our services — go back to the professional services section"
            className="inline-flex items-center justify-center rounded-md border border-primary-foreground/50 px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-foreground hover:bg-primary-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background motion-reduce:transform-none"
          >
            Review Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
