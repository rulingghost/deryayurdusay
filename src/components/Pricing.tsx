'use client';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Heart } from 'lucide-react';

const services = [
  { name: 'Nail Art Tasarımı', price: '400₺ - 800₺', icon: Sparkles },
  { name: 'Protez Tırnak (Gel)', price: '600₺', icon: Sparkles },
  { name: 'Protez Tırnak (Akrilik)', price: '700₺', icon: Sparkles },
  { name: 'French Manikür', price: '500₺', icon: Heart },
  { name: 'Kalıcı Oje', price: '300₺', icon: Heart },
  { name: 'Tırnak Bakımı', price: '250₺', icon: Clock },
  { name: 'Protez Dolgu', price: '400₺', icon: Clock },
  { name: 'Tırnak Takviyesi', price: '350₺', icon: Heart },
];

export default function Pricing() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-bg-studio">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Hizmetlerimiz & Fiyatlar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tüm hizmetlerimizde premium kalite ürünler ve profesyonel uygulama garantisi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-4">💎 Özel Tasarım Paketleri</h3>
            <p className="text-gray-600 mb-4">
              Özel gün, düğün veya etkinlikler için kişiye özel tasarım paketlerimiz mevcuttur.
            </p>
            <a href="#booking" className="glitter-btn px-8 py-3 rounded-full font-bold inline-block">
              Detaylı Bilgi Al
            </a>
          </div>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-8">
          * Fiyatlar değişkenlik gösterebilir. Güncel fiyatlar için lütfen bizimle iletişime geçin.
        </p>
      </div>
    </section>
  );
}
