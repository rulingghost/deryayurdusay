import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2D1B22] text-white pt-20 pb-10 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-[150px]"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-gold rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Derya Yurdusay" className="h-12 mb-6 brightness-0 invert" />
            <p className="text-gray-400 leading-relaxed mb-6">
              Çorum'da tırnak sanatının öncüsü. Sadece bir uygulama değil, size özel bir deneyim sunuyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              {/* Add more icons if needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-gold">Keşfet</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#services" className="hover:text-primary transition-colors">Hizmetlerimiz</Link></li>
              <li><Link href="#gallery" className="hover:text-primary transition-colors">Galeri & Portfolio</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">Hakkımda</Link></li>
              <li><Link href="/referanslar" className="hover:text-primary transition-colors">Müşteri Yorumları</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-primary transition-colors">Yönetici Girişi</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-gold">İletişim</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span>Üçtutlar Mah. Osmancık Cd. Fatih 1. Sokak No:1/A<br/>19000 Merkez/Çorum</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+905540265767" className="hover:text-white">+90 554 026 57 67</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:info@deryayurdusay.com" className="hover:text-white">info@deryayurdusay.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-gold">Bülten</h4>
            <p className="text-gray-400 mb-4 text-sm">
              En yeni trendler ve özel kampanyalardan haberdar olmak için kaydolun.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary hover:bg-primary-dark px-4 rounded-r-lg transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Derya Yurdusay. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-white">Gizlilik Politikası</Link>
             <Link href="#" className="hover:text-white">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
