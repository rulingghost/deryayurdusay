import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata = {
  title: 'Galeri | Derya Yurdusay Nail Art Antreman',
  description: 'Sanatımızın ve çalışmalarımızın görsel bir şöleni.',
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <Navbar />
      <Gallery />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
