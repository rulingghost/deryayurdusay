import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deryayurdusay.com"),
  title: {
    default: "Derya Yurdusay | Premium Nail Art Studio Çorum",
    template: "%s | Derya Yurdusay",
  },
  description: "Derya Yurdusay Nail Art Studio ile mükemmel görünümünüzü keşfedin. Çorum'da profesyonel protez tırnak, kalıcı oje ve nail art hizmetleri.",
  keywords: ["nail art çorum", "protez tırnak çorum", "kalıcı oje çorum", "tırnak tasarımı", "derya yurdusay", "en iyi tırnak stüdyosu"],
  authors: [{ name: "Derya Yurdusay" }],
  creator: "Derya Yurdusay",
  publisher: "Derya Yurdusay",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Derya Yurdusay | Premium Nail Art Studio Çorum",
    description: "Zerafetin ve sanatın tırnaklarınızla buluştuğu nokta. Randevunuzu hemen alın.",
    url: "https://deryayurdusay.com",
    siteName: "Derya Yurdusay Nail Art",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Derya Yurdusay Nail Art Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derya Yurdusay | Premium Nail Art Studio Çorum",
    description: "Zerafetin ve sanatın tırnaklarınızla buluştuğu nokta.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "uMFheA7hsuZU0WDk10qNRPJN3pAzWv8FBCT3vscyjUQ",
  },
};

import ClientProviders from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Derya Yurdusay Nail Art Studio",
    "image": "https://deryayurdusay.com/og-image.jpg",
    "@id": "https://deryayurdusay.com",
    "url": "https://deryayurdusay.com",
    "telephone": "+905XXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Üçtutlar Mah. Osmancık Cd. No:45/A",
      "addressLocality": "Çorum",
      "postalCode": "19100",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.5500,
      "longitude": 34.9535
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/nailarts.deryayurdusay"
    ]
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
