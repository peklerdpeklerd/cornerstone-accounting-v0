/**
 * Shared contract for the Cornerstone contact form.
 *
 * Used by both the client form (components/contact-section.tsx) and the
 * server route handler (app/api/contact/route.ts) so client-side and
 * server-side validation stay in sync.
 */

export const SERVICE_OPTIONS = [
  "Forensic Accounting",
  "Financial Analysis",
  "Grant Support",
  "Landlord-Tenant Litigation Financial Support",
  "Rental and Property Tax Analysis",
  "DC Certificate of Clean Hands Assistance",
  "Cannabis License Acquisition Support",
  "Real Estate Development Cost Accounting",
  "Tax Resolution",
  "Offer in Compromise Support",
  "Loan Funding Acquisition Support",
  "Business Management Consultation",
  "Other",
] as const;

export const CONTACT_METHODS = ["Email", "Phone", "Either"] as const;

/** Maximum accepted length per text field, enforced on the client and server. */
export const MAX_LENGTHS = {
  fullName: 120,
  organization: 160,
  email: 254,
  phone: 40,
  service: 120,
  message: 4000,
  preferredContact: 20,
  sourceUrl: 500,
  requestId: 100,
} as const;

export const MIN_MESSAGE_LENGTH = 20;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Name of the visually hidden honeypot field. */
export const HONEYPOT_FIELD = "companyWebsite";

/**
 * Custom event used by the "Ask about ..." service buttons to preselect a
 * service in the contact form without clearing anything already entered.
 */
export const SERVICE_INQUIRY_EVENT = "cornerstone:service-inquiry";

/**
 * Maps each service card to the matching option in the "Service Needed"
 * dropdown. Card headings and dropdown labels are worded slightly
 * differently, so the mapping is explicit rather than inferred.
 */
export const SERVICE_CARD_TO_OPTION: Record<string, string> = {
  "forensic-accounting": "Forensic Accounting",
  "financial-analysis": "Financial Analysis",
  "grant-support": "Grant Support",
  "landlord-tenant-support": "Landlord-Tenant Litigation Financial Support",
  "property-tax-analysis": "Rental and Property Tax Analysis",
  "clean-hands": "DC Certificate of Clean Hands Assistance",
  "cannabis-license": "Cannabis License Acquisition Support",
  "real-estate-cost-accounting": "Real Estate Development Cost Accounting",
  "tax-resolution": "Tax Resolution",
  "offer-in-compromise": "Offer in Compromise Support",
  "loan-funding": "Loan Funding Acquisition Support",
  "business-management": "Business Management Consultation",
};

/**
 * Dispatches the preselect event and lets the browser handle the smooth
 * scroll to the contact form (html has scroll-behavior: smooth and a
 * header-aware scroll-padding-top).
 */
export function requestServiceInquiry(serviceCardId: string) {
  const option = SERVICE_CARD_TO_OPTION[serviceCardId];
  if (!option || typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<string>(SERVICE_INQUIRY_EVENT, { detail: option }),
  );
}
