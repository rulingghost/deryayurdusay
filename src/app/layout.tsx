import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.deryayurdusay.com.tr'),
  title: {
    default: 'Çorum Protez Tırnak & Nail Art | Derya Yurdusay Studio',
    template: '%s | Derya Yurdusay'
  },
  description: 'Çorum protez tırnak, nail art ve kalıcı oje uzmanı Derya Yurdusay. Rus manikürü, jel tırnak ve profesyonel el ayak bakımı için en doğru adres.',
  keywords: [
    "çorum protez tırnak",
    "çorum nail art",
    "çorum kalıcı oje",
    "protez tırnak çorum", 
    "nail art çorum", 
    "kalıcı oje çorum", 
    "tırnak tasarımı çorum", 
    "derya yurdusay", 
    "derya yurdusay çorum",
    "çorum güzellik merkezi",
    "çorum güzellik salonu",
    "manikür çorum",
    "pedikür çorum",
    "jel tırnak çorum",
    "nail art fiyatları çorum",
    "en iyi tırnak stüdyosu çorum",
    "çorum protez tırnak yapan yerler",
    "derya yurdusay nail art",
    "çorum nail art studio",
    "çorum tırnak süsleme",
    "rus manikürü çorum",
    "kalıcı oje modelleri çorum",
    "protez tırnak fiyatları çorum",
    "gelin tırnağı çorum",
    "çorum tırnak bakım merkezi",
    "nail art modelleri",
    "akrilik tırnak çorum",
    "çorum manikürcü",
    "çorum tırnak merkezi",
    "çorum medikal manikür",
    "çorum el ayak bakımı"
  ],
  authors: [{ name: "Derya Yurdusay" }],
  creator: "Derya Yurdusay",
  publisher: "Derya Yurdusay",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Çorum Protez Tırnak & Nail Art | Derya Yurdusay',
    description: 'Çorum\'da uzman protez tırnak ve nail art tasarımları. Derya Yurdusay ile hayalinizdeki tırnaklara kavuşun. Hemen randevu alın.',
    url: 'https://www.deryayurdusay.com.tr',
    siteName: 'Derya Yurdusay Nail Art Studio',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Derya Yurdusay Nail Art Studio Çorum",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Çorum Protez Tırnak & Nail Art | Derya Yurdusay",
    description: "Çorum'un en prestijli protez tırnak ve nail art stüdyosu. Uzman dokunuşlar için randevu alın.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.deryayurdusay.com.tr",
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
    "image": "https://deryayurdusay.com.tr/og-image.jpg",
    "@id": "https://deryayurdusay.com.tr",
    "url": "https://deryayurdusay.com.tr",
    "telephone": "+905540265767",
    "priceRange": "₺₺",
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
    "areaServed": {
      "@type": "City",
      "name": "Çorum"
    },
    "paymentAccepted": [ "Cash", "Credit Card" ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nail Art Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Protez Tırnak Uygulaması"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kalıcı Oje"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nail Art Tasarım"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rus Manikürü"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jel Tırnak"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manikür & Pedikür"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gelin Tırnağı"
          }
        }
      ]
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
