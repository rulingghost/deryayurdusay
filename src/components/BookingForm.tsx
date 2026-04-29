'use client';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Heart, ArrowRight, Phone, Clock, Star } from 'lucide-react';

export default function BookingForm() {
  const whatsappUrl = `https://wa.me/905540265767?text=${encodeURIComponent('Merhaba! Randevu almak istiyorum. 💅')}`;

  return (
    <section id="booking" className="section-padding bg-bg-pink-deep overflow-hidden relative">
      {/* Premium Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-3 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-16"
        >
          <span className="text-primary font-script text-lg md:text-3xl">Güzellik İçin Zaman Ayırın</span>
          <h2 className="text-2xl md:text-8xl font-black mt-1.5 md:mt-2 mb-3 md:mb-6 tracking-tighter uppercase leading-none">
            Randevu <span className="glitter-text">Alın</span>
          </h2>
          <div className="w-20 md:w-40 h-1 md:h-2 bg-gradient-to-r from-primary to-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-16 rounded-[30px] md:rounded-[60px] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#25D366]/5 rounded-bl-[100px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-[80px] -z-0"></div>
            <Heart className="absolute top-8 right-8 text-primary/5" size={120} />

            <div className="relative z-10">
              {/* WhatsApp Icon */}
              <div className="flex justify-center mb-6 md:mb-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 md:w-28 md:h-28 bg-[#25D366] rounded-[28px] md:rounded-[38px] flex items-center justify-center shadow-2xl shadow-[#25D366]/30 rotate-6"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 md:w-14 md:h-14 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-6 md:mb-10">
                <h3 className="text-xl md:text-4xl font-black text-gray-800 tracking-tight uppercase mb-3 md:mb-4">
                  WhatsApp ile Randevu Alın
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                  Randevu almak için bize WhatsApp üzerinden mesaj gönderin. 
                  Size en kısa sürede dönüş yapacağız! 🌸
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                <div className="flex items-center gap-3 p-3 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl text-primary">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Hızlı Cevap</span>
                    <p className="text-xs md:text-sm font-bold text-gray-600">Anında dönüş</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl text-primary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">7/24</span>
                    <p className="text-xs md:text-sm font-bold text-gray-600">Mesaj atabilirsiniz</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl text-primary">
                    <Star size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Kolay</span>
                    <p className="text-xs md:text-sm font-bold text-gray-600">Tek tıkla ulaşın</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 md:gap-4 px-10 md:px-16 py-5 md:py-7 bg-[#25D366] hover:bg-[#1fba59] text-white rounded-full text-sm md:text-lg font-black uppercase tracking-widest shadow-2xl shadow-[#25D366]/30 transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-7 md:h-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp'tan Yazın
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </motion.a>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                  veya arayın: <a href="tel:+905540265767" className="text-primary hover:underline">0554 026 57 67</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
