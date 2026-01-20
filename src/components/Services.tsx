'use client';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Fingerprint, Crown, Gem } from 'lucide-react';

const services = [
  {
    title: 'Nail Art Tasarımı',
    description: 'Kişiye özel, el yapımı sanat eserlerini tırnaklarınıza taşıyoruz.',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-500',
    lightColor: 'bg-pink-50'
  },
  {
    title: 'Protez Tırnak',
    description: 'Dayanıklı, estetik ve doğal görünümlü jel ve akrilik sistemler.',
    icon: Crown,
    color: 'from-amber-400 to-orange-500',
    lightColor: 'bg-amber-50'
  },
  {
    title: 'Kalıcı Oje',
    description: 'Haftalarca süren parlaklık ve kusursuz renk deneyimi.',
    icon: Heart,
    color: 'from-red-400 to-rose-600',
    lightColor: 'bg-red-50'
  },
  {
    title: 'Medikal Manikür',
    description: 'Sağlıklı ve bakımlı eller için profesyonel medikal bakım.',
    icon: Gem,
    color: 'from-blue-400 to-cyan-500',
    lightColor: 'bg-blue-50'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-bg-pink-medium relative overflow-hidden">
      <div className="container mx-auto px-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-20"
        >
          <span className="text-primary font-script text-lg md:text-3xl">Lüks ve Zarafet</span>
          <h2 className="text-2xl md:text-7xl font-black mt-1.5 md:mt-2 mb-3 md:mb-6 tracking-tighter">Uzmanlık <span className="text-primary">Alanlarımız</span></h2>
          <div className="w-20 md:w-40 h-1 md:h-2 bg-gradient-to-r from-primary to-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 md:gap-8 pb-8 md:pb-0 px-4 md:px-0 snap-x snap-mandatory no-scrollbar -mx-3 md:mx-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                rotateY: 10, 
                rotateX: -5,
                translateZ: 20,
                y: -15 
              }}
              className="min-w-[260px] md:min-w-0 snap-center bg-white p-5 md:p-10 rounded-[24px] md:rounded-[50px] shadow-xl md:shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center relative overflow-hidden group border border-transparent hover:border-primary/20 transition-all duration-500 preserve-3d"
            >
              <div className={`absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br ${service.color} opacity-[0.03] rounded-bl-[100px] group-hover:opacity-[0.08] transition-opacity`}></div>
              
              <motion.div 
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.8 }}
                className={`mb-4 md:mb-8 p-3 md:p-6 ${service.lightColor} rounded-[20px] md:rounded-[30px] relative shadow-inner`}
              >
                <service.icon className="text-primary w-6 h-6 md:w-8 md:h-8" />
                <div className="absolute inset-0 bg-primary/20 rounded-[20px] md:rounded-[30px] scale-0 group-hover:scale-110 transition-transform blur-lg -z-10"></div>
              </motion.div>

              <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-4 text-gray-800 tracking-tight">{service.title}</h3>
              <p className="text-xs md:text-base text-gray-500 mb-4 md:mb-8 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                {service.description}
              </p>

              <motion.a 
                whileHover={{ scale: 1.1, x: 5 }}
                href="#booking" 
                className={`mt-auto text-[10px] md:text-sm font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 hover:border-primary pb-1 transition-all flex items-center gap-1.5`}
              >
                Hizmet Detayı <ChevronIcon size={12} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ChevronIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

