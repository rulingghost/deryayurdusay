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
                        <p className="text-gray-500 font-bold leading-relaxed">+90 554 026 57 67</p>
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
                  href="https://www.google.com/maps/dir/?api=1&destination=Derya+Yurdusay+Nail+Art+Studio+Çorum" 
                  target="_blank"
                  className="glitter-btn px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 w-full"
               >
                  Yol Tarifi Al <Navigation size={18} />
               </a>
            </div>

            {/* Map Side */}
            <div className="w-full lg:w-2/3 h-[500px] rounded-[40px] overflow-hidden border-8 border-gray-50 shadow-inner group">
               <iframe 
                  src="https://www.google.com/maps?q=Derya%20Yurdusay%20Nail%20Art%20Studio%20Çorum&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-700"
               ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
