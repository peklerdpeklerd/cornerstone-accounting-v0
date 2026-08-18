"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: "clients",
    question: "What types of clients does Cornerstone assist?",
    answer:
      "Cornerstone assists individuals, businesses, nonprofit organizations, property owners, real estate developers, regulated businesses, and other organizations needing accounting, financial, tax, compliance, funding, or business support.",
  },
  {
    id: "legal",
    question: "Does Cornerstone provide legal representation?",
    answer:
      "No. Cornerstone provides accounting, financial analysis, documentation, and litigation-related financial support. Legal advice and legal representation must be provided by a qualified attorney.",
  },
  {
    id: "outcomes",
    question: "Are grants, loans, licenses, or tax outcomes guaranteed?",
    answer:
      "No. Cornerstone assists clients with financial analysis, documentation, preparation, and application support, but approval and final outcomes are determined by the relevant agency, lender, tax authority, licensing authority, or other decision-maker.",
  },
  {
    id: "documents",
    question: "What documents may be required?",
    answer:
      "Required documents depend on the service and may include financial statements, bank records, tax notices, rental records, property tax documents, budgets, contracts, business plans, applications, invoices, expense records, or other supporting materials.",
  },
  {
    id: "real-estate",
    question: "Does Cornerstone assist with real estate matters?",
    answer:
      "Yes. Services include cost accounting for real estate development, rental and property tax analysis, and accounting or financial support for certain landlord-tenant and property-related disputes.",
  },
  {
    id: "confidential",
    question: "Is client information kept confidential?",
    answer:
      "Cornerstone handles client financial information professionally and confidentially, subject to applicable laws, engagement requirements, and necessary disclosures authorized by the client.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div id="faq" className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" />
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Frequently Asked Questions
          </p>
        </div>

        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.15]">
          Answers to Common Client Questions
        </h2>

        <ul className="mt-10 flex max-w-4xl flex-col gap-3 lg:mt-12">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const ToggleIcon = isOpen ? Minus : Plus;

            return (
              <li
                key={faq.id}
                className="overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() =>
                      setOpenId((current) => (current === faq.id ? null : faq.id))
                    }
                    className="flex w-full items-center gap-4 px-[18px] py-[18px] text-left transition-colors hover:bg-muted focus-visible:-outline-offset-2 sm:px-6"
                  >
                    <span className="min-w-0 flex-1 text-[16px] leading-snug font-semibold text-foreground sm:text-[17px]">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-primary">
                      <ToggleIcon aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  hidden={!isOpen}
                  className="panel-reveal border-t border-border px-[18px] pt-4 pb-[18px] sm:px-6"
                >
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
