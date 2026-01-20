'use client';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, Sparkles, Check } from 'lucide-react';

export default function AboutMe() {
  const highlights = [
    { title: 'Sertifikalı Uzmanlık', desc: 'Uluslararası masterclass eğitimleri.', icon: Award },
    { title: 'Kişiye Özel Tasarım', desc: 'Tarzınıza uygun form ve renkler.', icon: Heart },
    { title: 'Premium Ekipman', desc: 'En kaliteli ve steril ekipmanlar.', icon: Sparkles }
  ];

  return (
    <section className="section-padding bg-bg-pink-soft relative overflow-hidden">
      <div className="container mx-auto px-6">
          {/* Text Content - Centered */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="w-full max-w-4xl mx-auto text-center"
          >
            <span className="text-primary font-script text-xl md:text-3xl">Hakkımızda</span>
            <h2 className="text-3xl md:text-6xl font-black mt-2 mb-6 tracking-tighter">Sanatla <span className="text-primary">Güzelleşen</span> Eller</h2>
            
            <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium">
              Çorum protez tırnak ve nail art alanında başladığımız bu yolculukta, güzelliği bir standart değil, bir sanat olarak ele alıyoruz. 
              Modern teknikleri, hijyenik koşullarla birleştirerek stüdyomuzda size sadece yeni bir tırnak tasarımı değil, yenilenmiş bir özgüven sunuyoruz.
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-left mt-8 md:mt-12">
               {highlights.map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100">
                    <div className="w-10 h-10 mb-3 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                       <item.icon size={20} />
                    </div>
                    <h4 className="font-black text-gray-800 tracking-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-bold">{item.desc}</p>
                 </div>
               ))}
            </div>
            
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="mt-8 md:mt-12 p-0.5 bg-gradient-to-r from-primary to-gold rounded-full inline-block"
            >
               <a href="#booking" className="block px-6 py-3 bg-white rounded-full font-black text-sm text-primary uppercase tracking-widest hover:bg-transparent hover:text-white transition-all">
                  Randevu Al & Tanışalım
               </a>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}
