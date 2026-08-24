"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Building,
  ChevronDown,
  FileCheck2,
  Handshake,
  Landmark,
  Leaf,
  LineChart,
  Receipt,
  Scale,
  SearchCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useId, useState } from "react";

import { requestServiceInquiry } from "@/lib/inquiry";

type ServiceTheme = {
  iconWrap: string;
  hoverBorder: string;
  link: string;
};

const themes: Record<string, ServiceTheme> = {
  // Tax related - muted burgundy
  tax: {
    iconWrap: "bg-[#f7eaea] text-[#7a1416]",
    hoverBorder: "hover:border-[#a3272b]",
    link: "text-[#7a1416]",
  },
  // Forensic / investigative - muted amber
  forensic: {
    iconWrap: "bg-[#fbf0e1] text-[#8a5a12]",
    hoverBorder: "hover:border-[#b8802b]",
    link: "text-[#8a5a12]",
  },
  // Grants / funding - muted teal
  grants: {
    iconWrap: "bg-[#e7f1ef] text-[#155e56]",
    hoverBorder: "hover:border-[#2b7d74]",
    link: "text-[#155e56]",
  },
  // Accounting - muted slate / indigo
  accounting: {
    iconWrap: "bg-[#ecedf3] text-[#3e4a68]",
    hoverBorder: "hover:border-[#5a6786]",
    link: "text-[#3e4a68]",
  },
  // Compliance - muted blue
  compliance: {
    iconWrap: "bg-[#e8eff7] text-[#1f4f83]",
    hoverBorder: "hover:border-[#3a6da3]",
    link: "text-[#1f4f83]",
  },
  // Consulting - muted navy / purple
  consulting: {
    iconWrap: "bg-[#eeecf6] text-[#453a75]",
    hoverBorder: "hover:border-[#61568f]",
    link: "text-[#453a75]",
  },
};

type Service = {
  id: string;
  title: string;
  description: string;
  details: string[];
  note?: string;
  icon: LucideIcon;
  theme: ServiceTheme;
};

export const services: Service[] = [
  {
    id: "forensic-accounting",
    title: "Forensic Accounting",
    description:
      "We review and, when necessary, rebuild financial records to trace transactions, identify discrepancies, and explain what happened in clear terms.",
    details: [
      "Reconstruction of incomplete or disorganized financial records",
      "Transaction tracing and reconciliation of accounts",
      "Review of irregularities, discrepancies, and unexplained activity",
      "Clear written findings that non-accountants can follow",
    ],
    icon: SearchCheck,
    theme: themes.forensic,
  },
  {
    id: "financial-analysis",
    title: "Financial Analysis",
    description:
      "We review financial statements, cash flow, budgets, forecasts, and other financial information to help clients understand performance and make informed decisions.",
    details: [
      "Financial statement review and ratio analysis",
      "Cash-flow analysis, budgeting, and forecasting",
      "Financial modeling and scenario comparison",
      "Performance evaluation and management decision support",
    ],
    icon: LineChart,
    theme: themes.accounting,
  },
  {
    id: "grant-support",
    title: "Grant Acquisition and Application Support",
    description:
      "We help clients identify appropriate grant opportunities, organize financial records, prepare budgets and supporting documents, and assemble application materials.",
    details: [
      "Identification of grant opportunities that fit the organization",
      "Preparation of budgets and required financial documentation",
      "Organization and review of application materials",
      "Support through government and nonprofit grant submissions",
    ],
    note: "Cornerstone recently assisted clients in securing a combined $325,000 in grant funding. Results are not guaranteed.",
    icon: Landmark,
    theme: themes.grants,
  },
  {
    id: "landlord-tenant-support",
    title: "Rental and Landlord-Tenant Litigation Financial Support",
    description:
      "We review rental income, expenses, payment histories, ledgers, and other financial records for landlord-tenant and property-related matters.",
    details: [
      "Review of rental income, expenses, and payment histories",
      "Reconciliation of ledgers, deposits, and credits",
      "Organized schedules and exhibits prepared from source records",
      "Financial summaries that support counsel and the client",
    ],
    note: "Financial and accounting litigation support only. Cornerstone does not provide legal representation.",
    icon: Scale,
    theme: themes.compliance,
  },
  {
    id: "property-tax-analysis",
    title: "Rental and Property Tax Analysis",
    description:
      "We analyze rental activity, property expenses, and property tax records, including multi-year reviews when complete records are available.",
    details: [
      "Historical rental activity and occupancy analysis",
      "Property-related expense and capital cost review",
      "Property tax record review and reconciliation",
      "Multi-year reviews of up to five years when records are complete",
    ],
    icon: Receipt,
    theme: themes.tax,
  },
  {
    id: "clean-hands",
    title: "DC Certificate of Clean Hands Assistance",
    description:
      "We help clients review tax and compliance records, organize supporting documents, and prepare the financial information needed for a DC Certificate of Clean Hands.",
    details: [
      "Review of outstanding balances and compliance documentation",
      "Organization of tax filings and supporting records",
      "Preparation of the financial documentation needed to apply",
      "Guidance on records required to maintain compliance",
    ],
    note: "Issuance of a Certificate of Clean Hands is determined by the District of Columbia and is not guaranteed.",
    icon: BadgeCheck,
    theme: themes.compliance,
  },
  {
    id: "cannabis-license",
    title: "Cannabis License Acquisition Support",
    description:
      "We assist with the business and financial side of cannabis license applications, including budgets, projections, financial documentation, and application organization.",
    details: [
      "Business and financial documentation for license applications",
      "Startup budgeting, projections, and capitalization schedules",
      "Application package preparation and organization",
      "Accounting and operational readiness support",
    ],
    note: "Cornerstone does not provide legal representation and does not guarantee license approval.",
    icon: Leaf,
    theme: themes.grants,
  },
  {
    id: "real-estate-cost-accounting",
    title: "Cost Accounting for Real Estate Development",
    description:
      "We track construction and development costs by project, phase, unit, or cost code; compare budgets with actual spending; and help management understand project costs and profitability.",
    details: [
      "Project-level cost tracking for construction and development",
      "Cost allocation across phases, units, and cost codes",
      "Budget-to-actual analysis and variance reporting",
      "Profitability analysis and development financial controls",
    ],
    icon: Building,
    theme: themes.accounting,
  },
  {
    id: "tax-resolution",
    title: "Tax Resolution",
    description:
      "We help individuals and businesses review tax notices, organize missing records, understand outstanding obligations, and prepare financial information for dealing with tax authorities.",
    details: [
      "Review of tax notices and outstanding obligations",
      "Organization of records and missing documentation",
      "Analysis of payment capacity and available options",
      "Support communicating financial information to tax authorities",
    ],
    note: "Outcomes are determined by the applicable tax authority. No particular tax result is guaranteed.",
    icon: FileCheck2,
    theme: themes.tax,
  },
  {
    id: "offer-in-compromise",
    title: "Offer in Compromise Support",
    description:
      "For taxpayers pursuing an Offer in Compromise, we help analyze income, expenses, assets, and equity and prepare the supporting financial documentation required by the tax authority.",
    details: [
      "Analysis of income, expenses, assets, and equity",
      "Preparation of the supporting financial documentation",
      "Review of the financial information required by the application",
      "Assistance responding to follow-up documentation requests",
    ],
    note: "Eligibility and acceptance are determined by the applicable tax authority and are not guaranteed.",
    icon: Handshake,
    theme: themes.tax,
  },
  {
    id: "loan-funding",
    title: "Loan Funding Acquisition Support",
    description:
      "We help businesses prepare for a loan application by organizing financial statements, projections, business documents, and the lender package.",
    details: [
      "Preparation of financial statements and projections",
      "Lender-readiness review of business documentation",
      "Assembly and organization of the loan package",
      "Support through the funding application process",
    ],
    note: "Lending decisions are made by the lender. Loan approval is not guaranteed.",
    icon: Wallet,
    theme: themes.grants,
  },
  {
    id: "business-management",
    title: "Business Management Consultation",
    description:
      "We work with owners and managers to improve financial controls, reporting, budgeting, internal processes, cost management, and the information they use to make business decisions.",
    details: [
      "Review of financial controls and reporting",
      "Budgeting, planning, and internal process review",
      "Cost management and process improvement",
      "Ongoing support for management decisions",
    ],
    icon: BriefcaseBusiness,
    theme: themes.consulting,
  },
];

const INITIAL_COUNT = 6;

function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;
  const uid = useId();
  const panelId = `${uid}-panel`;
  const triggerId = `${uid}-trigger`;

  return (
    <article
      id={service.id}
      className={`scroll-mt-28 flex h-full flex-col rounded-[15px] border border-border bg-background p-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_10px_24px_-12px_rgba(16,24,40,0.18)] motion-reduce:transform-none motion-reduce:transition-none lg:p-6 ${service.theme.hoverBorder}`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-[13px] ${service.theme.iconWrap}`}
      >
        <Icon
          aria-hidden="true"
          className="h-[22px] w-[22px]"
          strokeWidth={1.75}
        />
      </span>

      <h3 className="mt-[18px] text-[19px] leading-snug font-semibold text-foreground">
        {service.title}
      </h3>

      <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
        {service.description}
      </p>

      {service.note ? (
        <p className="mt-4 rounded-[10px] border border-border bg-muted/60 px-3 py-2 text-[13px] leading-relaxed text-muted-foreground">
          {service.note}
        </p>
      ) : null}

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!expanded}
        className="panel-reveal mt-5 border-t border-border pt-4"
      >
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          What this can include
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {service.details.map((detail) => (
            <li
              key={detail}
              className="flex gap-2.5 text-[14px] leading-[1.55] text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${service.theme.link} bg-current`}
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          // Preselects the matching "Service Needed" option. Everything the
          // visitor already typed in the form is preserved, and the browser
          // handles the smooth scroll via the #contact anchor.
          onClick={() => requestServiceInquiry(service.id)}
          className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-semibold hover:underline hover:underline-offset-4 ${service.theme.link}`}
        >
          Ask about {service.title}
        </a>
      </div>

      <button
        type="button"
        id={triggerId}
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className={`group mt-auto inline-flex w-fit items-center gap-1.5 rounded-sm pt-5 text-sm font-semibold transition-colors duration-200 ease-out hover:underline hover:underline-offset-4 ${service.theme.link}`}
      >
        {expanded ? "Show Less" : "Learn More"}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
            expanded ? "rotate-180" : ""
          }`}
        />
        <span className="sr-only">{` about ${service.title}`}</span>
      </button>
    </article>
  );
}

export function ProfessionalServices() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, INITIAL_COUNT);

  return (
    <section className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div id="services" className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Our Professional Services
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          Accounting, Financial, Tax, and Business Services
        </h2>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Every client comes to us with a different situation. Our work ranges
          from reviewing financial records and resolving accounting problems to
          tax matters, funding applications, real estate cost accounting,
          compliance, and business consulting.
        </p>

        <ul
          id="services-list"
          className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:gap-6"
        >
          {visibleServices.map((service) => (
            <li key={service.id} className="h-full">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3 lg:mt-12">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            aria-controls="services-list"
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/5"
          >
            {showAll
              ? "Show Fewer Services"
              : `Explore All ${services.length} Services`}
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
          <p aria-live="polite" className="text-[13px] text-muted-foreground">
            {`Showing ${visibleServices.length} of ${services.length} services`}
          </p>
        </div>
      </div>
    </section>
  );
}
