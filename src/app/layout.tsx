import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.deryayurdusay.com.tr'),
  title: {
    default: 'Derya Yurdusay | Çorum Nail Art & Protez Tırnak',
    template: '%s | Derya Yurdusay'
  },
  description: 'Çorum profesyonel nail art stüdyosu. Kişiye özel tırnak tasarımları, protez tırnak ve bakım hizmetleri.',
  keywords: [
    "nail art çorum", 
    "protez tırnak çorum", 
    "kalıcı oje çorum", 
    "tırnak tasarımı", 
    "derya yurdusay", 
    "çorum güzellik merkezi",
    "manikür çorum",
    "pedikür çorum",
    "jel tırnak çorum",
    "nail art fiyatları çorum",
    "çorum tırnak yeme tedavisi",
    "en iyi tırnak stüdyosu çorum"
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
    title: 'Derya Yurdusay | Nail Art Studio',
    description: 'Çorum\'da hayalinizdeki tırnaklara kavuşun.',
    url: 'https://www.deryayurdusay.com.tr',
    siteName: 'Derya Yurdusay',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Derya Yurdusay Nail Art Studio Çorum",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Çorum Nail Art & Protez Tırnak | Derya Yurdusay",
    description: "Çorum'un en prestijli nail art ve protez tırnak stüdyosu.",
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
    "image": "https://deryayurdusay.com.tr/og-image.jpg",
    "@id": "https://deryayurdusay.com.tr",
    "url": "https://deryayurdusay.com.tr",
    "telephone": "+905300000000",
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
            "name": "Protez Tırnak"
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
            "name": "Nail Art"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "İpek Kirpik"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Manikür & Pedikür"
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
