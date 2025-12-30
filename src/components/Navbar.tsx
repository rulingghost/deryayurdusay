'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Derya Yurdusay Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="hover:text-primary transition-colors">Hizmetler</Link>
          <Link href="#gallery" className="hover:text-primary transition-colors">Galeri</Link>
          
          <button className="relative p-2 hover:text-primary transition-colors" title="Favorilerim">
            <Heart size={24} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {favorites.length}
              </span>
            )}
          </button>

          <Link href="#booking" className="glitter-btn px-6 py-2 rounded-full font-medium">Randevu Al</Link>
        </div>
        
        {/* Mobile Toggle & Fav (Mobile) */}
        <div className="flex items-center gap-4 md:hidden">
             <button className="relative p-2 text-gray-800" title="Favorilerim">
                <Heart size={24} />
                 {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass py-6 flex flex-col items-center gap-4 shadow-xl">
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>Hizmetler</Link>
          <Link href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Galeri</Link>
          <Link href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="glitter-btn px-8 py-3 rounded-full">Randevu Al</Link>
        </div>
      )}

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        nav { color: var(--foreground); }
      `}</style>
    </nav>
  );
}
