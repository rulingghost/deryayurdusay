'use client';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Scissors } from 'lucide-react';

const services = [
  {
    title: 'Nail Art Tasarımı',
    description: 'Kişiye özel, el yapımı sanat eserlerini tırnaklarınıza taşıyoruz.',
    icon: <Sparkles className="text-primary" size={32} />,
    price: '₺250\'den başlayan'
  },
  {
    title: 'Protez Tırnak',
    description: 'Dayanıklı, estetik ve doğal görünümlü jel ve akrilik sistemler.',
    icon: <Star className="text-primary" size={32} />,
    price: '₺450\'den başlayan'
  },
  {
    title: 'Kalıcı Oje',
    description: 'Haftalarca süren parlaklık ve kusursuz renk deneyimi.',
    icon: <Heart className="text-primary" size={32} />,
    price: '₺200\'den başlayan'
  },
  {
    title: 'Manikür & Bakım',
    description: 'Sağlıklı ve bakımlı eller için profesyonel medikal manikür.',
    icon: <Scissors className="text-primary" size={32} />,
    price: '₺150\'den başlayan'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[#FFF9FA]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold serif mb-4">Hizmetlerimiz</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 inline-block p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="font-bold text-primary">{service.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
