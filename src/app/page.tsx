import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Pricing from '@/components/Pricing';
import AboutMe from '@/components/AboutMe';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <AboutMe />
      <Gallery />
      <Pricing />
      <FAQ />
      <Testimonials />
      <BookingForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
