import { AboutCornerstone } from "@/components/about-cornerstone";
import { ClientProcess } from "@/components/client-process";
import { ConsultationCta } from "@/components/consultation-cta";
import { ContactSection } from "@/components/contact-section";
import { ExperienceHighlights } from "@/components/experience-highlights";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { IndustriesServed } from "@/components/industries-served";
import { LeadershipSection } from "@/components/leadership-section";
import { ProfessionalServices } from "@/components/professional-services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyChooseCornerstone } from "@/components/why-choose-cornerstone";

// Structured data intentionally omits a street address because no verified
// business address has been provided for this business.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Cornerstone Business Accounting Solutions",
  email: "info@accountingdc.com",
  telephone: "+1-202-422-2963",
  sameAs: [
    "https://www.facebook.com/CornerstoneBAS",
    "https://www.instagram.com/1accountingdc/",
  ],
  description:
    "Cornerstone Business Accounting Solutions provides forensic accounting, financial analysis, tax resolution, grant support, real estate development cost accounting, litigation financial support, compliance assistance, funding support, and business consultation.",
  knowsAbout: [
    "Forensic Accounting",
    "Financial Analysis",
    "Grant Acquisition and Application Support",
    "Rental and Landlord-Tenant Litigation Financial Support",
    "Rental and Property Tax Analysis",
    "DC Certificate of Clean Hands Assistance",
    "Cannabis License Acquisition Support",
    "Cost Accounting for Real Estate Development",
    "Tax Resolution",
    "Offer in Compromise Support",
    "Loan Funding Acquisition Support",
    "Business Management Consultation",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <AboutCornerstone />
        <LeadershipSection />
        <ExperienceHighlights />
        <ProfessionalServices />
        <IndustriesServed />
        <WhyChooseCornerstone />
        <ClientProcess />
        <FaqSection />
        <ConsultationCta />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
