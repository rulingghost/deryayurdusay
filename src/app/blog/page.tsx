import Navbar from '@/components/Navbar';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata = {
  title: 'Blog | Derya Yurdusay',
  description: 'Nail art trendleri, tırnak bakımı ipuçları ve daha fazlası.',
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      <Navbar />
      <BlogSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
