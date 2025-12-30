'use client';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Calendar, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10"></div>
         <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Nail Art Background"
         />
      </div>

      {/* Mini Logo in Top Right */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-24 right-4 md:top-28 md:right-8 z-30"
      >
         <div className="p-2 md:p-3 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
            <img src="/logo.png" alt="Logo" className="h-8 md:h-14 w-auto brightness-0 invert" />
         </div>
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 text-center pt-24 md:pt-20">
        {/* Animated Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-6 md:mb-10 inline-flex items-center gap-3 px-5 py-1.5 md:px-6 md:py-2 bg-primary/10 backdrop-blur-xl rounded-full border border-primary/20"
        >
           <Sparkles className="text-primary" size={14} />
           <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary-light">The Master of Nail Art</span>
        </motion.div>

        {/* Elegant Typography - Magazine Style */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="mb-12 md:mb-16"
        >
           <h1 className="text-6xl md:text-[140px] font-serif italic text-white leading-[0.8] tracking-tighter mb-2 md:mb-4 drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
             Derya <br className="md:hidden" /> <span className="text-primary not-italic font-black">Yurdusay</span>
           </h1>
           <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-0">
              <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent to-primary opacity-50"></div>
              <p className="text-[10px] md:text-xl font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/60">Nail Art Studio</p>
              <div className="h-px w-8 md:w-24 bg-gradient-to-l from-transparent to-primary opacity-50"></div>
           </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-2xl text-white/70 font-medium mb-12 leading-relaxed italic">
             "Güzellik detaylarda gizlidir, biz o detayları sanata dönüştürüyoruz."
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#booking" 
              className="glitter-btn px-12 py-5 rounded-full text-lg font-black shadow-2xl flex items-center gap-3"
            >
              Randevu Al <ArrowRight size={20} />
            </motion.a>
            <motion.a 
              href="#gallery" 
              className="px-12 py-5 rounded-full text-lg font-black border-2 border-white/20 hover:border-white text-white transition-all backdrop-blur-sm"
            >
              Galeriyi Gez
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Sparkles Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/3 left-10 text-primary/20"><Sparkles size={80} /></motion.div>
         <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/3 right-10 text-gold/10"><Sparkles size={120} /></motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
}
