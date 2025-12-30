import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import AboutMe from '@/components/AboutMe';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import CampaignBanner from '@/components/CampaignBanner';
import BlogSection from '@/components/BlogSection';
import MapsSection from '@/components/MapsSection';
import BeforeAfter from '@/components/BeforeAfter';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <AboutMe />
      <BeforeAfter />
      <Gallery />
      <Pricing />
      <FAQ />
      <Testimonials />
      <BlogSection />
      <MapsSection />
      <BookingForm />
      <Footer />
      <CampaignBanner />
      <FloatingWhatsApp />
    </main>
  );
}
