import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteName = "AccountingDC";
const businessName = "Cornerstone Business Accounting Solutions";

const siteTitle =
  "AccountingDC | Cornerstone Business Accounting Solutions";

const siteDescription =
  "AccountingDC by Cornerstone Business Accounting Solutions provides forensic accounting, financial analysis, tax resolution, grant support, real estate development cost accounting, litigation financial support, compliance assistance, funding support, and business consultation.";

function normalizeUrl(url: string) {
  return `https://${url
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")}`;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    : "https://www.accountingdc.com";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: siteTitle,
    template: "%s | AccountingDC",
  },

  description: siteDescription,

  applicationName: siteName,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/images/about-cornerstone.png",
        width: 1200,
        height: 900,
        alt: "AccountingDC by Cornerstone Business Accounting Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/about-cornerstone.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#7a1416",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      alternateName: [
        "Accounting DC",
        businessName,
      ],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: businessName,
      alternateName: [
        siteName,
        "Accounting DC",
      ],
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/about-cornerstone.png`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full bg-background antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        {children}
      </body>
    </html>
  );
}