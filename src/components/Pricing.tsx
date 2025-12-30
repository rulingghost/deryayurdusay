'use client';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Heart, Crown, Gem, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Pricing() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const getIcon = (category: string) => {
    switch(category) {
      case 'art': return Sparkles;
      case 'protez': return Crown;
      case 'french': return Heart;
      case 'care': return Gem;
      default: return Star;
    }
  };

  return (
    <section id="pricing" className="section-padding bg-bg-pink-soft relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-script text-3xl">Şeffaf Fiyatlandırma</span>
          <h2 className="text-5xl md:text-7xl font-black mt-2 mb-4 tracking-tighter">İşlemler & <span className="text-primary">Fiyatlar</span></h2>
          <div className="w-40 h-2 bg-gradient-to-r from-primary to-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = getIcon(service.category);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-[#FDFCFD] p-8 rounded-[40px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-white rounded-2xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="font-black text-xl text-gray-800 tracking-tight">{service.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                       <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black uppercase text-gray-400 flex items-center gap-1.5">
                          <Clock size={12} /> {service.duration} dk
                       </span>
                       <span className="px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase text-primary tracking-widest">
                          {service.category}
                       </span>
                    </div>
                    <p className="text-3xl font-black text-primary leading-none">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Offer Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
          <div className="bg-white p-10 md:p-16 rounded-[60px] max-w-4xl mx-auto border-2 border-primary/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-primary/10">
                <Sparkles size={80} />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                   <h3 className="font-black text-3xl mb-4 text-gray-800 tracking-tight">💎 VIP Tasarım Paketleri</h3>
                   <p className="text-gray-500 max-w-md font-medium">
                     Gelin tırnakları, özel etkinlikler veya tamamen size özel tasarım paketlerimiz için ücretsiz danışmanlık alabilirsiniz.
                   </p>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#booking" 
                  className="glitter-btn px-12 py-5 rounded-full font-black text-lg shadow-xl shadow-primary/20 whitespace-nowrap"
                >
                  Randevu Al & Bilgi Edin
                </motion.a>
             </div>
          </div>
        </motion.div>

        <p className="text-center text-xs font-black text-gray-300 mt-12 uppercase tracking-[0.3em]">
          * Fiyatlar tırnak durumuna ve ek isteklere göre değişkenlik gösterebilir.
        </p>
      </div>
    </section>
  );
}
