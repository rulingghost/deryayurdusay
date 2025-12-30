'use client';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    comment: "Hayatımda gördüğüm en temiz ve profesyonel nail art stüdyosu. Derya Hanım gerçek bir sanatçı!",
    rating: 5,
    service: "Nail Art Tasarımı"
  },
  {
    name: "Merve Demir",
    comment: "Protez tırnak konusunda üzerine tanımam. Aylardır kullanıyorum, en ufak bir sorun yaşamadım. Kesinlikle tavsiye ederim.",
    rating: 5,
    service: "Protez Tırnak"
  },
  {
    name: "Zeynep Kaya",
    comment: "Güler yüzü ve titizliği için çok teşekkür ederim. Her gelişimde buradan çok mutlu ayrılıyorum.",
    rating: 5,
    service: "Kalıcı Oje"
  },
  {
    name: "Selin Akın",
    comment: "Tırnaklarım hiç bu kadar sağlıklı ve güzel görünmemişti. İşini aşkla yapan nadir stüdyolardan biri.",
    rating: 5,
    service: "Tırnak Bakımı"
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-bg-pink-soft relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-script text-2xl">Müşteri Deneyimleri</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-4">Sizden Gelenler</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[40px] border border-white/50 shadow-xl hover:shadow-primary/10 transition-all group flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 text-primary/10" size={40} />
                <p className="text-gray-600 italic relative z-10 leading-relaxed min-h-[80px]">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">{item.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
        >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-md rounded-full border border-white shadow-sm">
                <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                    ))}
                </div>
                <p className="text-xs font-bold text-gray-500">500+ Mutlu Müşteri</p>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
