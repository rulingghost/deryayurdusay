'use client';
import { motion } from 'framer-motion';
import { Instagram, MapPin, ChevronRight, Sparkles, Share2, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function BioLinks() {
  const links = [
    {
      title: 'Instagram',
      subtitle: '@nailarts.deryayurdusay',
      icon: Instagram,
      url: 'https://instagram.com/nailarts.deryayurdusay',
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      primary: true
    },
    {
      title: 'Konum & Yol Tarifi',
      subtitle: 'Stüdyomuza kolayca ulaşın',
      icon: MapPin,
      url: 'https://maps.app.goo.gl/xxxx', 
      color: 'bg-[#4285F4]',
      primary: false
    }
  ];

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Derya Yurdusay Nail Art Studio',
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0708] text-white flex flex-col items-center relative overflow-hidden">
      
      {/* Background with Luxury Overlay */}
      <div className="fixed inset-0 z-0">
         <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover mix-blend-overlay"
            alt="Nail Art Background"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0708]"></div>
      </div>

      {/* Mini Logo mark in Top Right */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 right-4 md:top-8 md:right-8 z-50 p-1.5 md:p-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10"
      >
         <img src="/logo.png" alt="Derya Yurdusay" className="h-8 md:h-10 w-auto brightness-0 invert" />
      </motion.div>

      {/* High-End Typography Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 mt-36 md:mt-32 relative z-10 px-6 w-full max-w-lg"
      >
        <div className="mb-4">
           <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter leading-none"
           >
              Derya
           </motion.h1>
           <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-4xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary mt-1 md:mt-2"
           >
              Yurdusay
           </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-6 bg-primary/30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Nail Art Studio</span>
            <div className="h-0.5 w-6 bg-primary/30"></div>
        </div>
      </motion.div>

      {/* Minimal Designer Links */}
      <div className="w-full max-w-sm space-y-6 relative z-10 px-6 pb-20">
        {links.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (index * 0.1) }}
          >
            <Link 
              href={link.url}
              className="flex items-center p-1 bg-white/[0.03] backdrop-blur-3xl rounded-[40px] border border-white/10 hover:border-primary transition-all hover:scale-[1.02] active:scale-95 group shadow-2xl"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${link.primary ? link.color : 'bg-white/10'}`}>
                <link.icon size={26} className="text-white" />
              </div>
              <div className="flex-1 ml-5 pr-4">
                <div className="font-black text-white text-lg tracking-tight group-hover:text-primary transition-colors">{link.title}</div>
                <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mt-0.5">{link.subtitle}</div>
              </div>
              <div className="mr-6 text-gray-700 group-hover:text-primary">
                 <ChevronRight size={20} />
              </div>
            </Link>
          </motion.div>
        ))}

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="pt-6"
        >
          <button 
             onClick={shareProfile}
             className="w-full py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <Share2 size={16} /> Profili Paylaş
          </button>
        </motion.div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-[20%] left-[-10%] w-60 h-60 bg-primary/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-60 h-60 bg-gold/5 rounded-full blur-[100px] -z-0"></div>

      {/* Minimal Footer */}
      <div className="mt-auto pb-10 text-center opacity-30">
        <p className="text-[8px] font-black uppercase text-gray-500 tracking-[0.5em]">Derya Yurdusay &copy; 2025</p>
      </div>
    </div>
  );
}
