import Image from "next/image";

export function AboutCornerstone() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-10 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-start md:gap-10 lg:gap-16 lg:px-10 lg:py-24">
        <div className="w-full shrink-0 md:w-[45%]">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[18px] shadow-md">
            <Image
              src="/images/about-cornerstone.png"
              alt="Cornerstone accountants reviewing financial statements with a business client"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div id="about" className="w-full md:w-[55%]">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" />

            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              About Cornerstone
            </p>
          </div>

          <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
            Real Experience. Practical Financial Guidance.
          </h2>

          <div className="mt-6 flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Cornerstone Business Accounting Solutions was founded by Rowena
              Moyer, CMA, who brings more than 40 years of experience in
              accounting, finance, financial management, and business
              consulting.
            </p>

            <p>
              Over the years, she has worked with businesses and organizations
              facing everything from day-to-day accounting problems to audits,
              tax matters, financial restructuring, government-contracting
              requirements, and complex financial reviews.
            </p>

            <p>
              That experience shapes how Cornerstone works today: understand
              the records, identify the problem, explain what the numbers mean,
              and help the client decide what to do next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
