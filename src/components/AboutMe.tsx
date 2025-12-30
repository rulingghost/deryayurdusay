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
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-[60px] rotate-3 -z-10"></div>
            <div className="bg-[#FFF5F7] p-10 rounded-[60px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
               <div className="space-y-6 relative z-10">
                  <div className="w-20 h-2 bg-primary rounded-full"></div>
                  <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                     "Tırnaklar, kendinize verdiğiniz önemin en zarif aynasıdır."
                  </h3>
                  <div className="flex items-center gap-4 pt-6">
                     <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-primary/10 flex items-center justify-center p-2">
                        <img src="/logo.png" alt="logo" className="h-full object-contain" />
                     </div>
                     <div>
                        <p className="font-black text-gray-800 uppercase tracking-widest text-sm">Derya Yurdusay</p>
                        <p className="text-xs font-bold text-primary uppercase">Founder & Master Stylist</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
          
          {/* Text Side */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="w-full lg:w-1/2"
          >
            <span className="text-primary font-script text-3xl">Hakkımızda</span>
            <h2 className="text-5xl md:text-6xl font-black mt-2 mb-8 tracking-tighter">Sanatla <span className="text-primary">Güzelleşen</span> Eller</h2>
            
            <p className="text-gray-500 text-xl leading-relaxed mb-10 font-medium">
              Çorum'da başladığımız bu yolculukta, güzelliği bir standart değil, bir sanat olarak ele alıyoruz. 
              Modern teknikleri, hijyenik koşullarla birleştirerek stüdyomuzda size sadece yeni bir tırnak değil, yenilenmiş bir özgüven sunuyoruz.
            </p>

            <div className="space-y-6">
               {highlights.map((item, idx) => (
                 <div key={idx} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 bg-white shadow-xl shadow-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                       <item.icon size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-gray-800 tracking-tight">{item.title}</h4>
                       <p className="text-sm text-gray-400 font-bold">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="mt-12 p-1 bg-gradient-to-r from-primary to-gold rounded-full inline-block"
            >
               <a href="#booking" className="block px-10 py-4 bg-white rounded-full font-black text-primary uppercase tracking-widest hover:bg-transparent hover:text-white transition-all">
                  Randevu Al & Tanışalım
               </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
