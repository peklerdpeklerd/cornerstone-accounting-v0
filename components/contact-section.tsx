"use client";

import {
  AlertCircle,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  LockKeyhole,
  Mail,
  Pencil,
  Phone,
  Share2,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  CONTACT_METHODS,
  EMAIL_PATTERN,
  HONEYPOT_FIELD,
  MAX_LENGTHS,
  MIN_MESSAGE_LENGTH,
  SERVICE_INQUIRY_EVENT,
  SERVICE_OPTIONS,
} from "@/lib/inquiry";

const serviceOptions = SERVICE_OPTIONS;
const contactMethods = CONTACT_METHODS;

const PHONE_COUNTRIES = [
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "VN", name: "Vietnam", dial: "+84" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "TW", name: "Taiwan", dial: "+886" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "BH", name: "Bahrain", dial: "+973" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "IL", name: "Israel", dial: "+972" },
  { iso: "TR", name: "Turkey", dial: "+90" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "AT", name: "Austria", dial: "+43" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "FI", name: "Finland", dial: "+358" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "CZ", name: "Czech Republic", dial: "+420" },
  { iso: "GR", name: "Greece", dial: "+30" },
  { iso: "RO", name: "Romania", dial: "+40" },
  { iso: "HU", name: "Hungary", dial: "+36" },
  { iso: "UA", name: "Ukraine", dial: "+380" },
  { iso: "RU", name: "Russia", dial: "+7" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "AR", name: "Argentina", dial: "+54" },
  { iso: "CL", name: "Chile", dial: "+56" },
  { iso: "CO", name: "Colombia", dial: "+57" },
  { iso: "PE", name: "Peru", dial: "+51" },
  { iso: "VE", name: "Venezuela", dial: "+58" },
  { iso: "CR", name: "Costa Rica", dial: "+506" },
  { iso: "PA", name: "Panama", dial: "+507" },
  { iso: "DO", name: "Dominican Republic", dial: "+1" },
  { iso: "PR", name: "Puerto Rico", dial: "+1" },
  { iso: "JM", name: "Jamaica", dial: "+1" },
  { iso: "TT", name: "Trinidad and Tobago", dial: "+1" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "GH", name: "Ghana", dial: "+233" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "MA", name: "Morocco", dial: "+212" },
  { iso: "TN", name: "Tunisia", dial: "+216" },
  { iso: "OTHER", name: "Other / International", dial: "" },
] as const;

type PhoneCountryIso = (typeof PHONE_COUNTRIES)[number]["iso"];

function getPhoneCountry(iso: string) {
  return (
    PHONE_COUNTRIES.find((country) => country.iso === iso) ??
    PHONE_COUNTRIES[0]
  );
}

function detectPhoneCountryIso(): PhoneCountryIso {
  if (typeof navigator === "undefined") return "US";

  const languageTags =
    navigator.languages?.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const tag of languageTags) {
    const region = tag.match(/[-_]([A-Za-z]{2})(?:$|[-_])/i)?.[1]?.toUpperCase();
    if (
      region &&
      PHONE_COUNTRIES.some((country) => country.iso === region)
    ) {
      return region as PhoneCountryIso;
    }
  }

  return "US";
}

function buildInternationalPhone(dial: string, localNumber: string) {
  const trimmed = localNumber.trim();
  if (!trimmed) return "";
  return dial ? `${dial} ${trimmed}` : trimmed;
}

function localPhoneMaxLength(dial: string) {
  return Math.max(1, MAX_LENGTHS.phone - dial.length - (dial ? 1 : 0));
}

type FormValues = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredContact: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  preferredContact: "Email",
  consent: false,
};

const CONTACT_ENDPOINT = "/api/contact";

const SUCCESS_MESSAGE =
  "Thank you! Your inquiry has been received. A confirmation email has been sent to you.";

const ERROR_MESSAGE = "We couldn't send your inquiry. Please try again.";

const inputClasses =
  "mt-1.5 w-full rounded-[10px] border border-border bg-background px-3.5 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const labelClasses = "block text-sm font-semibold text-foreground";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-accent"
    >
      <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "kingcq.com",
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "yopmail.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "10minutemail.net",
  "throwawaymail.com",
  "getnada.com",
  "emailondeck.com",
  "trashmail.com",
  "maildrop.cc",
  "sharklasers.com",
  "grr.la",
  "dispostable.com",
  "fakeinbox.com",
  "mintemail.com",
  "mohmal.com",
]);

const COMMON_EMAIL_DOMAIN_TYPOS: Record<string, string> = {
  "gmail.comr": "gmail.com",
  "gmail.comrr": "gmail.com",
  "gmail.con": "gmail.com",
  "gmal.com": "gmail.com",
  "gmial.com": "gmail.com",
  "yahoo.con": "yahoo.com",
  "yaho.com": "yahoo.com",
  "outlook.con": "outlook.com",
  "hotmail.con": "hotmail.com",
};

const COMMON_TLD_TYPOS: Record<string, string> = {
  comm: "com",
  con: "com",
  cmo: "com",
  coom: "com",
  nett: "net",
  netr: "net",
  orgg: "org",
  orgr: "org",
  eduu: "edu",
  edur: "edu",
  phh: "ph",
};

function getEmailDomain(email: string) {
  const atIndex = email.lastIndexOf("@");
  return atIndex >= 0 ? email.slice(atIndex + 1).toLowerCase() : "";
}

function getSuggestedEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const atIndex = normalizedEmail.lastIndexOf("@");

  if (atIndex <= 0 || atIndex === normalizedEmail.length - 1) {
    return null;
  }

  const emailName = normalizedEmail.slice(0, atIndex);
  const domain = normalizedEmail.slice(atIndex + 1);
  const knownDomainCorrection = COMMON_EMAIL_DOMAIN_TYPOS[domain];

  if (knownDomainCorrection) {
    return `${emailName}@${knownDomainCorrection}`;
  }

  const domainParts = domain.split(".");
  const currentTld = domainParts[domainParts.length - 1] ?? "";
  const knownTldCorrection = COMMON_TLD_TYPOS[currentTld];

  if (knownTldCorrection) {
    domainParts[domainParts.length - 1] = knownTldCorrection;
    return `${emailName}@${domainParts.join(".")}`;
  }

  // Reject anything appended directly after an intended final `.com`,
  // such as `.comr`, `.comrr`, or `.comaikldjasjlkdasjd`.
  // Multi-part domains such as `company.com.ph` remain valid because
  // their final extension is `.ph`, not a malformed `.com...` extension.
  if (currentTld.startsWith("com") && currentTld !== "com") {
    domainParts[domainParts.length - 1] = "com";
    return `${emailName}@${domainParts.join(".")}`;
  }

  return null;
}

function isDisposableEmail(email: string) {
  const domain = getEmailDomain(email);

  return Array.from(DISPOSABLE_EMAIL_DOMAINS).some(
    (blockedDomain) =>
      domain === blockedDomain || domain.endsWith(`.${blockedDomain}`),
  );
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (values.fullName.trim().length > MAX_LENGTHS.fullName) {
    errors.fullName = "Please shorten your name.";
  }

  if (values.organization.trim().length > MAX_LENGTHS.organization) {
    errors.organization = "Please shorten your company or organization name.";
  }

  const normalizedEmail = values.email.trim().toLowerCase();
  const suggestedEmail = getSuggestedEmail(normalizedEmail);

  if (!normalizedEmail) {
    errors.email = "Please enter an email address.";
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email =
      "Please enter a valid email address, such as name@example.com.";
  } else if (normalizedEmail.length > MAX_LENGTHS.email) {
    errors.email = "Please enter a shorter email address.";
  } else if (suggestedEmail) {
    errors.email = `Please check your email address. Did you mean ${suggestedEmail}?`;
  } else if (isDisposableEmail(normalizedEmail)) {
    errors.email =
      "Temporary or disposable email addresses are not accepted. Please use a personal, school, or company email address.";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone =
      "Please enter a valid international phone number with 7 to 15 digits.";
  } else if (values.phone.trim().length > MAX_LENGTHS.phone) {
    errors.phone = "Please enter a shorter phone number.";
  }

  if (!values.service) {
    errors.service = "Please select the service you need.";
  }

  if (!values.message.trim()) {
    errors.message = "Please provide a brief description of the matter.";
  } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please provide at least ${MIN_MESSAGE_LENGTH} characters so we can review your inquiry.`;
  } else if (values.message.trim().length > MAX_LENGTHS.message) {
    errors.message = `Please keep the description under ${MAX_LENGTHS.message} characters.`;
  }

  if (!values.consent) {
    errors.consent = "Please confirm you understand this notice before submitting.";
  }

  return errors;
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error" }
  | { kind: "success" };

function createRequestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
} 

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [phoneCountryIso, setPhoneCountryIso] =
    useState<PhoneCountryIso>("US");
  const [phoneLocalNumber, setPhoneLocalNumber] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const inFlightRef = useRef(false);
  const requestIdRef = useRef<string>("");

  const selectedPhoneCountry = getPhoneCountry(phoneCountryIso);
  const phoneInputMaxLength = localPhoneMaxLength(selectedPhoneCountry.dial);

  useEffect(() => {
    setPhoneCountryIso(detectPhoneCountryIso());
  }, []);

  useEffect(() => {
    const handleServiceInquiry = (event: Event) => {
      const option = (event as CustomEvent<string>).detail;
      if (!option || !(serviceOptions as readonly string[]).includes(option)) {
        return;
      }

      setValues((current) => ({ ...current, service: option }));
      setErrors((current) => {
        if (!current.service) return current;
        const next = { ...current };
        delete next.service;
        return next;
      });
      setStatus((current) =>
        current.kind === "success" ? { kind: "idle" } : current,
      );
      serviceRef.current?.focus({ preventScroll: true });
    };

    window.addEventListener(SERVICE_INQUIRY_EVENT, handleServiceInquiry);
    return () =>
      window.removeEventListener(SERVICE_INQUIRY_EVENT, handleServiceInquiry);
  }, []);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handlePhoneCountryChange = (iso: string) => {
    const nextCountry = getPhoneCountry(iso);
    const nextMaxLength = localPhoneMaxLength(nextCountry.dial);
    const nextLocalNumber = phoneLocalNumber.slice(0, nextMaxLength);

    setPhoneCountryIso(nextCountry.iso);
    setPhoneLocalNumber(nextLocalNumber);
    update(
      "phone",
      buildInternationalPhone(nextCountry.dial, nextLocalNumber),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inFlightRef.current) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: "idle" });
      const firstKey = Object.keys(nextErrors)[0];
      const field = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstKey}"]`,
      );
      field?.focus();
      return;
    }

    setStatus({ kind: "idle" });
    setIsReviewOpen(true);
  };

  const confirmSubmit = async () => {
    if (inFlightRef.current) return;

    inFlightRef.current = true;
    setStatus({ kind: "submitting" });

    if (!requestIdRef.current) {
      requestIdRef.current = createRequestId();
    }

    const honeypot =
      (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as
        | HTMLInputElement
        | null) ?? null;

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: honeypot?.value ?? "",
          requestId: requestIdRef.current,
          sourceUrl: window.location.href,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean }
        | null;

      if (!response.ok || result?.ok !== true) {
        throw new Error("Submission was not confirmed.");
      }

      setValues(initialValues);
      setErrors({});
      setPhoneLocalNumber("");
      setPhoneCountryIso(detectPhoneCountryIso());
      requestIdRef.current = "";
      if (honeypot) honeypot.value = "";
      setIsReviewOpen(false);
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error" });
    } finally {
      inFlightRef.current = false;
    }
  };

  const closeReview = () => {
    if (status.kind === "submitting") return;
    setIsReviewOpen(false);
    setStatus({ kind: "idle" });
  };

  return (
    <section className="w-full bg-[#fcfcfd]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div
          id="contact"
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 rounded-full bg-primary" />
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Contact Cornerstone
              </p>
            </div>

            <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.1rem] lg:text-[2.4rem] lg:leading-[1.15]">
              Request a Confidential Consultation
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Provide a brief description of the assistance you need. Cornerstone
              will review your inquiry and follow up regarding the appropriate
              next step.
            </p>

            <ul className="mt-8 flex max-w-xl flex-col gap-4">
              <li className="flex gap-4 rounded-[14px] border border-border bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                  <Mail
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.75}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Email
                  </p>

                  <a
                    href="mailto:info@accountingdc.com"
                    className="mt-1 inline-block break-all text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    info@accountingdc.com
                  </a>

                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                    We&apos;ll respond as soon as possible.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-[14px] border border-border bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                  <Phone
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.75}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Phone
                  </p>

                  <a
                    href="tel:+12024222963"
                    className="mt-1 inline-block text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    202-422-2963
                  </a>
                </div>
              </li>

              <li className="flex gap-4 rounded-[14px] border border-border bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                  <Smartphone
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.75}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Cellphone
                  </p>

                  <div className="mt-2">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                        Philippines
                      </span>

                      <a
                        href="tel:+639564529364"
                        className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        +639-564-529-364
                      </a>
                    </div>
                  </div>

                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    Call or send us a message directly.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-[14px] border border-border bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                  <Share2
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.75}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Follow AccountingDC
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2.5">
                    <a
                      href="https://www.facebook.com/CornerstoneBAS"
                      target="_blank"
                      rel="noopener noreferrer"
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

                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Follow our official pages for updates and announcements.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-[14px] border border-border bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f7eaea] text-primary">
                  <Clock
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.75}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Business Hours
                  </p>

                  <p className="mt-1 text-[15px] font-semibold text-foreground">
                    Monday to Friday, 9:00 AM to 5:00 PM
                  </p>

                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                    Appointments available outside business hours.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[18px] border border-border bg-background p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-7">
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <div aria-hidden="true" className="sr-only">
                <label htmlFor={HONEYPOT_FIELD}>
                  Company website (leave this field empty)
                </label>
                <input
                  id={HONEYPOT_FIELD}
                  name={HONEYPOT_FIELD}
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelClasses}>
                    Full Name <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={MAX_LENGTHS.fullName}
                    value={values.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className={inputClasses}
                  />
                  <FieldError id="fullName-error" message={errors.fullName} />
                </div>

                <div>
                  <label htmlFor="organization" className={labelClasses}>
                    Company or Organization
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    maxLength={MAX_LENGTHS.organization}
                    value={values.organization}
                    onChange={(event) =>
                      update("organization", event.target.value)
                    }
                    aria-invalid={Boolean(errors.organization)}
                    aria-describedby={
                      errors.organization ? "organization-error" : undefined
                    }
                    className={inputClasses}
                  />
                  <FieldError
                    id="organization-error"
                    message={errors.organization}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={MAX_LENGTHS.email}
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClasses}
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>

                  <div
                    className={`mt-1.5 flex h-[47px] w-full overflow-hidden rounded-[10px] border bg-background transition-colors hover:border-primary/40 focus-within:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary ${
                      errors.phone ? "border-accent" : "border-border"
                    }`}
                  >
                    <div className="relative h-full w-[112px] shrink-0 border-r border-border sm:w-[118px]">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none flex h-full w-full items-center justify-between gap-1 px-3 text-[15px] font-normal leading-normal text-foreground"
                        style={{ fontFamily: "inherit" }}
                      >
                        <span className="min-w-0 truncate">
                          {selectedPhoneCountry.iso === "OTHER"
                            ? "INTL"
                            : `${selectedPhoneCountry.iso} ${selectedPhoneCountry.dial}`}
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      </div>

                      <select
                        aria-label="Country or region and dialing code"
                        value={phoneCountryIso}
                        onChange={(event) =>
                          handlePhoneCountryChange(event.target.value)
                        }
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        style={{ fontFamily: "inherit" }}
                      >
                        {PHONE_COUNTRIES.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {country.iso} {country.name}
                            {country.dial ? ` (${country.dial})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      inputMode="tel"
                      required
                      maxLength={phoneInputMaxLength}
                      value={phoneLocalNumber}
                      placeholder={
                        selectedPhoneCountry.dial
                          ? "Phone number"
                          : "+Country code and phone number"
                      }
                      onChange={(event) => {
                        const localNumber = event.target.value;
                        setPhoneLocalNumber(localNumber);
                        update(
                          "phone",
                          buildInternationalPhone(
                            selectedPhoneCountry.dial,
                            localNumber,
                          ),
                        );
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="h-full min-w-0 flex-1 border-0 bg-background px-3.5 text-[15px] font-normal leading-normal text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                      style={{ fontFamily: "inherit" }}
                    />
                  </div>

                  <FieldError id="phone-error" message={errors.phone} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="service" className={labelClasses}>
                    Service Needed <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <select
                    ref={serviceRef}
                    id="service"
                    name="service"
                    required
                    value={values.service}
                    onChange={(event) => update("service", event.target.value)}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                    className={inputClasses}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError id="service-error" message={errors.service} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClasses}>
                    Brief Description of the Matter {" "}
                    <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={MAX_LENGTHS.message}
                    value={values.message}
                    onChange={(event) => update("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : "message-hint"
                    }
                    className={`${inputClasses} resize-y`}
                  />
                  {errors.message ? (
                    <FieldError id="message-error" message={errors.message} />
                  ) : (
                    <p
                      id="message-hint"
                      className="mt-1.5 text-[13px] text-muted-foreground"
                    >
                      A short summary of the situation, records available, and any
                      deadlines is helpful.
                    </p>
                  )}
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className={labelClasses}>
                    Preferred Contact Method
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {contactMethods.map((method) => {
                      const checked = values.preferredContact === method;

                      return (
                        <label
                          key={method}
                          className={`inline-flex cursor-pointer items-center gap-2 rounded-[10px] border px-3.5 py-2.5 text-sm font-medium transition-colors ${
                            checked
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={checked}
                            onChange={() => update("preferredContact", method)}
                            className="h-4 w-4 accent-[#7a1416]"
                          />
                          {method}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="consent"
                    className="flex cursor-pointer gap-3 text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={values.consent}
                      onChange={(event) =>
                        update("consent", event.target.checked)
                      }
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#7a1416]"
                    />
                    <span>
                      I understand that submitting this form does not create an
                      accountant-client, attorney-client, or other professional
                      relationship. <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </span>
                  </label>
                  <FieldError id="consent-error" message={errors.consent} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status.kind === "submitting"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none sm:w-auto"
              >
                {status.kind === "submitting" ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>

              <div aria-live="polite" aria-atomic="true" className="mt-5">
                {status.kind === "submitting" ? (
                  <p className="flex items-center gap-2 rounded-[12px] border border-border bg-muted/70 px-4 py-3 text-[13px] leading-relaxed text-foreground">
                    <Loader2
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 animate-spin"
                    />
                    Sending your inquiry...
                  </p>
                ) : null}

                {status.kind === "error" ? (
                  <p className="rounded-[12px] border border-accent/40 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-accent">
                    {ERROR_MESSAGE}
                  </p>
                ) : null}

                {status.kind === "success" ? (
                  <p className="rounded-[12px] border border-border bg-muted/70 px-4 py-3 text-[13px] leading-relaxed text-foreground">
                    {SUCCESS_MESSAGE}
                  </p>
                ) : null}

                {Object.keys(errors).length > 0 ? (
                  <p className="mt-3 text-[13px] font-medium text-accent">
                    Please correct the highlighted fields and submit again.
                  </p>
                ) : null}
              </div>

              <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
                Please do not submit highly sensitive personal, tax, banking,
                medical, legal, or identification information through this
                general inquiry form.
              </p>
            </form>

            {isReviewOpen ? (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-dialog-title"
              >
                <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[18px] border border-border bg-background p-5 shadow-2xl sm:p-7">
                  <button
                    type="button"
                    onClick={closeReview}
                    disabled={status.kind === "submitting"}
                    aria-label="Close review"
                    className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>

                  <div className="pr-10">
                    <h3
                      id="review-dialog-title"
                      className="text-2xl font-bold tracking-tight text-foreground"
                    >
                      Review Your Information
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Please review the details below before submitting your
                      consultation request. You can edit your information if
                      needed.
                    </p>
                  </div>

                  <dl className="mt-6 divide-y divide-border rounded-[14px] border border-border">
                    {[
                      ["Full Name", values.fullName],
                      [
                        "Company or Organization",
                        values.organization.trim() || "Not provided",
                      ],
                      ["Email Address", values.email],
                      ["Phone Number", values.phone],
                      ["Service Needed", values.service],
                      ["Preferred Contact Method", values.preferredContact],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-1 px-4 py-3 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="text-sm font-semibold text-foreground">
                          {label}
                        </dt>
                        <dd className="min-w-0 break-words text-sm text-muted-foreground">
                          {value}
                        </dd>
                      </div>
                    ))}

                    <div className="px-4 py-3">
                      <dt className="text-sm font-semibold text-foreground">
                        Brief Description of the Matter
                      </dt>
                      <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                        {values.message}
                      </dd>
                    </div>
                  </dl>

                  {status.kind === "error" ? (
                    <p
                      aria-live="polite"
                      className="mt-4 rounded-[12px] border border-accent/40 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-accent"
                    >
                      {ERROR_MESSAGE}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeReview}
                      disabled={status.kind === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                    >
                      <Pencil aria-hidden="true" className="h-4 w-4" />
                      Edit Information
                    </button>

                    <button
                      type="button"
                      onClick={confirmSubmit}
                      disabled={status.kind === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-70"
                    >
                      {status.kind === "submitting" ? (
                        <>
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <LockKeyhole
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                          Confirm and Submit
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-muted-foreground">
                    <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
                    Your information is kept confidential.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
