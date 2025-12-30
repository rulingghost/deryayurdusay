import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Derya Yurdusay | Nail Art Studio",
  description: "Zarafetin ve sanatın tırnaklarınızla buluştuğu nokta. Derya Yurdusay Nail Art Studio ile mükemmel görünümünüzü keşfedin.",
  keywords: "nail art, tırnak sanatı, protez tırnak, manikür, pedikür, derya yurdusay",
};

import ClientProviders from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
