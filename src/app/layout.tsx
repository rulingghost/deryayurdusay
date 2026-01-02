import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deryayurdusay.com.tr"),
  title: {
    default: "Çorum Nail Art & Protez Tırnak | Derya Yurdusay | En İyi Güzellik Merkezi",
    template: "%s | Derya Yurdusay Çorum Nail Art",
  },
  description: "Çorum'un en iyi Nail Art stüdyosu. Protez tırnak, kalıcı oje, manikür, pedikür ve ipek kirpik hizmetleri. Derya Yurdusay ile tırnaklarınız sanat eserine dönüşsün. Profesyonel tırnak bakımı için hemen randevu alın!",
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
    title: "Çorum Nail Art & Protez Tırnak | Derya Yurdusay",
    description: "Çorum'da profesyonel tırnak bakımı ve nail art sanatının adresi. Protez tırnak, kalıcı oje ve daha fazlası.",
    url: "https://deryayurdusay.com.tr",
    siteName: "Derya Yurdusay Nail Art Çorum",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Derya Yurdusay Nail Art Studio Çorum",
      },
    ],
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
