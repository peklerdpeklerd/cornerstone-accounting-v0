"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:gap-6 lg:px-10 lg:py-2">
        <a
          href="#home"
          aria-label="Cornerstone Business Accounting Solutions — back to top"
          className="flex shrink-0 items-center rounded-md transition-opacity hover:opacity-80"
        >
          <span className="flex items-center bg-transparent p-0 shadow-none">
            <Image
              src="/images/accounting-dc-cornerstone-logo-transparent.png"
              alt="Cornerstone Business Accounting Solutions"
              width={760}
              height={328}
              priority
              className="h-auto w-[170px] object-contain sm:w-[190px] md:w-[210px] xl:w-[250px]"
            />
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-flex flex-col items-center rounded-sm text-[14px] font-medium text-foreground transition-colors hover:text-primary xl:text-[15px]"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="mt-1 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-md bg-primary px-5 py-3 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-md motion-reduce:transform-none xl:inline-flex"
          >
            Request a Consultation
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
              >
                Request a Consultation
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
