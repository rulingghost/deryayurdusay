'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';

export default function MapsSection() {
  return (
    <section id="location" className="py-24 bg-bg-studio relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[60px] p-8 md:p-16 shadow-2xl shadow-gray-200/50 border border-white overflow-hidden relative">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            {/* Info Side */}
            <div className="w-full lg:w-1/3 space-y-10">
               <div>
                  <span className="text-primary font-script text-3xl">Bize Ulaşın</span>
                  <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tighter uppercase leading-none">
                     Stüdyo <span className="glitter-text">Konumu</span>
                  </h2>
               </div>

               <div className="space-y-8">
                  <div className="flex gap-6">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <h4 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-2">Adres</h4>
                        <p className="text-gray-500 font-bold leading-relaxed">
                           Üçtutlar Mah. Osmancık Cd. No:45/A<br />
                           Çorum / Türkiye
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <h4 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-2">Telefon</h4>
                        <p className="text-gray-500 font-bold leading-relaxed">+90 5XX XXX XX XX</p>
                     </div>
                  </div>

                  <div className="flex gap-6">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <Clock size={24} />
                     </div>
                     <div>
                        <h4 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-2">Çalışma Saatleri</h4>
                        <p className="text-gray-500 font-bold leading-relaxed">Pzt - Cmt: 09:00 - 19:00<br />Pazar: Kapalı</p>
                     </div>
                  </div>
               </div>

               <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  className="glitter-btn px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 w-full"
               >
                  Yol Tarifi Al <Navigation size={18} />
               </a>
            </div>

            {/* Map Side */}
            <div className="w-full lg:w-2/3 h-[500px] rounded-[40px] overflow-hidden border-8 border-gray-50 shadow-inner group">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1526.4678912345!2d34.9535!3d40.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMzJzAwLjAiTiAzNMKwNTcnMTIuNiJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale transition-all duration-700 group-hover:grayscale-0"
               ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
