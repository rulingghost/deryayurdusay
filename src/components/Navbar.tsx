'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, Calendar, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hizmetler', href: '#services' },
    { name: 'Fiyatlar', href: '#pricing' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Yorumlar', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-3 md:py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`relative flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/40 p-2 md:p-4 rounded-[28px] md:rounded-[32px] shadow-2xl shadow-primary/5 transition-all duration-500 overflow-hidden ${
            isScrolled ? 'translate-y-0' : 'translate-y-0 md:translate-y-2'
        }`}>
          {/* Animated Background for Bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-gold/5 opacity-50 -z-10"></div>

          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="p-2 text-gray-200 hover:text-primary transition-all rounded-full hover:bg-primary/5 group"
              title="Admin Girişi"
            >
              <Lock size={14} className="group-hover:rotate-12 transition-transform" />
            </Link>

            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="h-9 w-9 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl p-1 shadow-sm transition-transform group-hover:rotate-12">
                 <img src="/logo.png" alt="Derya Yurdusay Logo" className="h-full w-full object-contain" />
              </div>
              <div className="hidden xs:block">
                 <span className="block text-[10px] md:text-sm font-black tracking-tight leading-none text-gray-900 uppercase">Derya Yurdusay</span>
                 <span className="block text-[7px] md:text-[8px] font-black tracking-[0.2em] uppercase text-primary mt-0.5 md:mt-1">Nail Art Studio</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-black uppercase tracking-widest text-gray-600 hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a 
                href="https://instagram.com/nailarts.deryayurdusay" 
                target="_blank"
                className="hidden sm:flex p-3 bg-gray-50 text-gray-400 hover:text-pink-500 rounded-2xl transition-all hover:bg-white hover:shadow-md"
            >
              <Instagram size={18} />
            </a>
            <Link 
                href="#booking" 
                className="glitter-btn px-5 md:px-8 py-2.5 md:py-3 rounded-[20px] md:rounded-2xl text-[9px] md:text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Calendar size={12} className="hidden md:block" /> Randevu 
            </Link>
            
            {/* Mobile Toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 bg-gray-50 text-gray-800 rounded-2xl md:hidden active:scale-95 transition-transform"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-[calc(100%+8px)] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 flex flex-col items-center gap-6 shadow-2xl border border-white/50"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-black uppercase tracking-[0.2em] text-gray-800 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="w-full h-px bg-gray-100"></div>
            <div className="flex flex-col items-center gap-4">
                <a href="https://instagram.com/nailarts.deryayurdusay" className="flex items-center gap-2 text-pink-500 font-bold text-sm">
                <Instagram size={18} /> @nailarts.deryayurdusay
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

