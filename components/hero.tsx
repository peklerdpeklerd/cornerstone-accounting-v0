const trustFeatures = [
  {
    title: "Accounting",
    subtitle: "and Financial Services",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Rowena Moyer",
    subtitle: "40+ Years of Experience",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M16 6.5a3 3 0 010 5.6" />
        <path d="M18 14c2.1.6 3.5 2.4 3.5 4.6" />
      </svg>
    ),
  },
  {
    title: "Confidential",
    subtitle: "Client Information",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="4" y="10" width="16" height="11" rx="2.5" />
        <path d="M8 10V7.5a4 4 0 018 0V10" />
        <path d="M12 14.5v2.5" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section id="home" className="w-full bg-background">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-10 px-5 pt-6 pb-12 sm:px-8 sm:pt-8 sm:pb-16 md:grid-cols-2 md:gap-10 lg:gap-14 lg:px-10 lg:pt-10 lg:pb-20">
        {/* Left column: copy */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Accounting and Financial Services
          </p>

          <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl md:text-[2.6rem] lg:text-[3.2rem] lg:leading-[1.1]">
            Your Turn-Key Solutions for{" "}
            <span className="text-accent">Business Growth</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cornerstone works with businesses, organizations, property owners,
            and individuals on accounting, tax, funding, compliance, and other
            financial matters. We review the situation, help make sense of the
            numbers, and work with clients on the next steps.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contact"
              aria-label="Request a consultation — go to the contact form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 whitespace-nowrap text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none"
            >
              Request a Consultation
            </a>

            <a
              href="#services"
              aria-label="Explore our services — go to the professional services section"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3.5 whitespace-nowrap text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-muted hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none"
            >
              Explore Our Services
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3 sm:gap-3">
            {trustFeatures.map((feature) => (
              <li
                key={feature.subtitle}
                className="flex min-w-0 items-center gap-2.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                  {feature.icon}
                </span>

                <span className="min-w-0 text-[13px] leading-tight font-medium text-foreground">
                  {feature.title}
                  <br />
                  <span className="text-muted-foreground">
                    {feature.subtitle}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: video */}
        <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-border bg-muted shadow-sm sm:min-h-[360px] md:min-h-full">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videobackground.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Accountant reviewing financial charts and reports"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
