import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Forensic Accounting",
  "Financial Analysis",
  "Grant Acquisition Support",
  "Landlord-Tenant Financial Support",
  "Rental and Property Tax Analysis",
  "DC Certificate of Clean Hands Assistance",
  "Cannabis License Support",
  "Real Estate Cost Accounting",
  "Tax Resolution",
  "Offer in Compromise Support",
  "Loan Funding Support",
  "Business Management Consultation",
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <a
              href="/"
              aria-label="CornerStone Business Accounting Solutions — go to homepage"
              className="inline-flex rounded-md transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/accounting-dc-cornerstone-logo-transparent.png"
                alt="CornerStone Business Accounting Solutions"
                width={760}
                height={328}
                className="h-auto w-[210px] object-contain"
              />
            </a>

            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              CornerStone Business Accounting Solutions provides forensic
              accounting, financial analysis, tax resolution, compliance and
              licensing assistance, grant and loan funding support, real estate
              cost accounting, property tax analysis, landlord-tenant financial
              support, and business management consultation—backed by more than
              40 years of professional financial experience.
            </p>

            <ul className="mt-5 flex flex-col gap-1.5 text-[14px] text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">EMAIL:</span>{" "}
                <a
                  href="mailto:info@accountingdc.com"
                  className="rounded-sm transition-colors hover:text-primary"
                >
                  info@accountingdc.com
                </a>
              </li>

              <li>
                <span className="font-medium text-foreground">
                  PHILIPPINES:
                </span>{" "}
                <a
                  href="tel:+639564529364"
                  className="rounded-sm transition-colors hover:text-primary"
                >
                  +639-564-529-364
                </a>
              </li>

              <li>
                <span className="font-medium text-foreground">
                  TELEPHONE:
                </span>{" "}
                <a
                  href="tel:+12024222963"
                  className="rounded-sm transition-colors hover:text-primary"
                >
                  202-422-2963
                </a>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href="https://www.facebook.com/CornerstoneBAS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit AccountingDC on Facebook"
                className="group inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[13px] font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Facebook
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Facebook
              </a>

              <a
                href="https://www.instagram.com/1accountingdc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit AccountingDC on Instagram"
                className="group inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[13px] font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Instagram
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Instagram
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-foreground uppercase">
              Explore
            </h2>

            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block rounded-sm text-[14px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-foreground uppercase">
              Services
            </h2>

            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="inline-block rounded-sm text-[14px] leading-snug text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted-foreground">
            &copy; {year} CornerStone Business Accounting Solutions. All rights
            reserved.
          </p>

          <a
            href="#contact"
            className="inline-block rounded-sm text-[13px] font-semibold text-primary transition-colors hover:text-accent"
          >
            Request a Consultation
          </a>
        </div>
      </div>
    </footer>
  );
}
