import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acepool.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ace Pool | Expert Pool Service & Repair Since 1996 | San Fernando Valley",
    template: "%s | Ace Pool",
  },
  description:
    "Family-owned pool service trusted since 1996. Monthly cleaning, maintenance, heaters, pumps, lights, acid wash & more. Serving the San Fernando Valley. Call 818-442-1763.",
  keywords: [
    "pool service",
    "pool cleaning",
    "pool repair",
    "pool maintenance",
    "San Fernando Valley pool service",
    "pool heater repair",
    "pool pump repair",
    "acid wash",
    "spa service",
    "family owned pool service",
    "Ace Pool",
    "Ki Mo Kim",
  ],
  authors: [{ name: "Ace Pool" }],
  creator: "Ace Pool",
  publisher: "Ace Pool",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ace Pool",
    title: "Ace Pool | Expert Pool Service & Repair Since 1996",
    description:
      "Family-owned pool service trusted since 1996. Monthly cleaning, maintenance, heaters, pumps, lights & more. San Fernando Valley.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ace Pool — Expert Pool Service Since 1996",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Pool | Expert Pool Service Since 1996",
    description:
      "Family-owned pool service trusted since 1996. Monthly cleaning, maintenance & repairs. San Fernando Valley.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c1f3f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured data for local business SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Ace Pool",
  description: "Family-owned pool service and repair company serving the San Fernando Valley since 1996.",
  url: SITE_URL,
  telephone: "+18184421763",
  email: "contactacepool@gmail.com",
  foundingDate: "1996-05-01",
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.1975,
    longitude: -118.5359,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "San Fernando Valley, California",
  },
  priceRange: "$$",
  image: `${SITE_URL}/og-image.jpg`,
  sameAs: [],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pool Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Pool Cleaning & Maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Heater Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Pump & Motor Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Filter Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acid Wash" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Lighting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spa Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wireless Remote Control Systems" } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
