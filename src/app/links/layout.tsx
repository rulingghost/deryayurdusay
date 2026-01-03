import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Derya Yurdusay | Hızlı Bağlantılar',
  description: 'Derya Yurdusay Nail Art Studio iletişim, konum ve sosyal medya bağlantıları. Çorum protez tırnak, nail art ve randevu için hızlı erişim.',
  openGraph: {
    title: 'Derya Yurdusay | Hızlı Bağlantılar',
    description: 'Tüm bağlantılarım ve iletişim bilgilerim.',
  }
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
