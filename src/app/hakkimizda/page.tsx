import Navbar from '@/components/Navbar';
import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata = {
  title: 'Hakkımda | Derya Yurdusay Nail Art Antreman',
  description: 'Derya Yurdusay kimdir? Protez tırnak ve nail art konusundaki deneyimlerim.',
};

export default function AboutPage() {
  return (
    <main className="pt-20"> {/* Navbar için üstten boşluk */}
      <Navbar />
      <AboutMe />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
