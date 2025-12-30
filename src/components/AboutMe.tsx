'use client';
import { motion } from 'framer-motion';
import { Award, Clock, Heart } from 'lucide-react';

export default function AboutMe() {
  return (
    <section className="section-padding bg-bg-studio overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Text Side - Now Full Width */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="w-full max-w-4xl text-center"
          >
            <span className="text-primary font-script text-2xl">Merhaba, Ben Derya</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-6">Tırnaklarınıza Sanat Dokunuşu</h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Çorum'da başladığım bu yolculukta, yıllar içinde binlerce kadının ellerine sihirli bir dokunuş katmanın mutluluğunu yaşadım. 
              Benim için nail art, sadece bir güzellik uygulaması değil, kişinin kendini ifade etme biçimidir.
              <br /><br />
              Stüdyomda kullandığım her ürün, uyguladığım her teknik dünya standartlarındadır. 
              Sürekli eğitimlerle kendimi geliştiriyor, en yeni trendleri Çorum'a taşıyorum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                   <Award size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg mb-1">Sertifikalı Uzmanlık</h4>
                   <p className="text-sm text-gray-500">Uluslararası geçerliliğe sahip masterclass sertifikaları.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                   <Heart size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg mb-1">Kişiye Özel Tasarım</h4>
                   <p className="text-sm text-gray-500">Sizin tarzınıza ve el yapınıza en uygun form ve renkler.</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
              <img src="/imza.png" alt="" className="h-16 opacity-50" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
