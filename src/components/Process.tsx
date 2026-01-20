'use client';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, ShieldCheck, Star, Gem } from 'lucide-react';

const steps = [
  {
    title: 'Kişisel Analiz',
    desc: 'Tırnak yapınızı inceliyor ve tarzınıza en uygun tasarımı birlikte seçiyoruz.',
    icon: Zap,
    color: 'bg-pink-100 text-pink-500'
  },
  {
    title: 'Sanatsal Dokunuş',
    desc: 'Dünya markası ürünlerle, hijyenik bir ortamda hayalinizdeki sanatı tırnaklarınıza işliyoruz.',
    icon: Sparkles,
    color: 'bg-primary/10 text-primary'
  },
  {
    title: 'Lüks Bitiş',
    desc: 'Detaylı bakım ve özel yağlarla işleminizi kusursuz bir parıltıyla sonlandırıyoruz.',
    icon: Gem,
    color: 'bg-gold/10 text-gold'
  }
];

export default function Process() {
  return (
    <section className="section-padding bg-bg-pink-medium relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-10 opacity-10"
        >
          <Sparkles size={120} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 50, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-10 opacity-10"
        >
          <Heart size={100} />
        </motion.div>
      </div>

      <div className="container mx-auto px-3 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px]"
          >
            Nasıl Çalışıyoruz?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-7xl font-black mt-2 mb-4 md:mb-6 tracking-tighter"
          >
            Kırılmayan <span className="text-primary">Güzellik</span> Yolculuğu
          </motion.h2>
          <div className="w-16 md:w-24 h-1 md:h-2 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-12 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connector Line */}
              {idx !== 2 && (
                <div className="hidden lg:block absolute top-1/4 left-[80%] w-full h-[2px] bg-gradient-to-r from-primary/20 to-transparent -z-0"></div>
              )}
              
              <div className="bg-white/40 backdrop-blur-xl p-5 md:p-10 rounded-[25px] md:rounded-[50px] border border-white shadow-xl hover:shadow-primary/5 transition-all hover:-translate-y-4 group">
                <div className={`${step.color} w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-8 shadow-inner transform group-hover:rotate-12 transition-transform`}>
                  <step.icon size={24} className="md:w-10 md:h-10" />
                </div>
                <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-4 tracking-tight text-gray-800">{step.title}</h3>
                <p className="text-xs md:text-base text-gray-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
                
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center font-black text-xs md:text-base text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 md:mt-24 text-center"
        >
           <div className="inline-flex items-center gap-3 md:gap-6 px-5 py-3 md:px-10 md:py-5 bg-white shadow-xl rounded-full border border-primary/5">
              <div className="flex items-center gap-1.5 md:gap-2">
                 <ShieldCheck className="text-green-500" size={16} />
                 <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-400">100% Steril</span>
              </div>
              <div className="w-px h-4 md:h-6 bg-gray-100"></div>
              <div className="flex items-center gap-1.5 md:gap-2">
                 <Star className="text-gold" fill="currentColor" size={16} />
                 <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-400">Üst Segment Ürünler</span>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
