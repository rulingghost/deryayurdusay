'use client';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A0F13] text-white pt-32 pb-12 overflow-hidden relative border-t border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Main Brand Area */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src="/logo.png" alt="Derya Yurdusay" className="h-24 mb-10 brightness-0 invert" />
              <h3 className="text-3xl font-black mb-6 tracking-tighter leading-tight max-w-sm">
                Sanatın ve Zarafetin Tırnaklarınızdaki <span className="text-primary">İmzası</span>.
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                Çorum'da tırnak tasarımının sınırlarını zorluyoruz. Her uygulama bir sanat eseri, her müşteri bizim için özeldir.
              </p>
              <div className="flex gap-5">
                <a href="https://instagram.com/nailarts.deryayurdusay" target="_blank" className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all group">
                  <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="tel:+905540265767" className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all group">
                  <Phone size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Nav Links Area */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Keşfet</h4>
              <ul className="space-y-4">
                {['Hizmetlerimiz', 'Galerimiz', 'Hakkımda', 'Yorumlar'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/#${item.toLowerCase().replace('İ', 'i').replace('ü', 'u')}`} 
                      className="text-gray-400 font-bold hover:text-white flex items-center gap-2 group transition-all"
                    >
                      {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">İletişim</h4>
              <ul className="space-y-6">
                <li className="flex flex-col gap-2">
                   <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Adres</span>
                   <p className="text-gray-400 font-bold text-sm leading-relaxed">Üçtutlar Mah. Osmancık Cd.<br/>Fatih 1. Sokak No:1/A<br/>Merkez/Çorum</p>
                </li>
                <li className="flex flex-col gap-2">
                   <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Email</span>
                   <a href="mailto:info@deryayurdusay.com" className="text-gray-400 font-bold hover:text-white transition-colors">info@deryayurdusay.com</a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Motto</h4>
              <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 relative overflow-hidden group">
                 <Sparkles className="absolute -top-2 -right-2 text-primary/10 group-hover:scale-125 transition-transform duration-700" size={60} />
                 <p className="text-sm font-bold text-gray-400 italic relative z-10">"Her detaya sevgi, her dokunuşa sanat katıyoruz."</p>
                 <div className="mt-4 flex items-center gap-2">
                    <Heart size={14} className="text-primary fill-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nail Art Studio</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            <p>&copy; 2025 Derya Yurdusay Studio</p>
            <span className="hidden md:block">|</span>
            <p>Made With ❤️ For Art</p>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={scrollToTop}
                className="p-5 bg-white/5 rounded-full border border-white/10 hover:border-primary transition-all group"
             >
                <ArrowUpRight size={20} className="-rotate-45 group-hover:text-primary transition-all" />
             </button>
             <div className="text-right">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Yukarı Dön</p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
