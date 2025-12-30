'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80")' }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.png" alt="Derya Yurdusay" className="mx-auto h-48 md:h-64 mb-6 drop-shadow-xl" />
          <h1 className="text-4xl md:text-7xl font-bold mb-4 serif text-[#C23E70]">
            Zarafetin <span className="glitter-text">Sanatla</span> Buluştuğu Nokta
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto text-[#2D1B22]/80">
            Derya Yurdusay Nail Art Studio ile mükemmel görünümünüzü keşfedin. Profesyonel dokunuşlar, eşsiz tasarımlar.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#booking" className="glitter-btn px-10 py-4 rounded-full text-xl font-bold shadow-lg">
              Randevu Oluştur
            </a>
            <a href="#gallery" className="glass px-10 py-4 rounded-full text-xl font-bold hover:bg-white/80 transition-all border-[#D45A8A]/30">
              Çalışmalarımı İncele
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        section { padding-top: 80px; }
        .text-shadow { text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      `}</style>
    </section>
  );
}
