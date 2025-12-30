'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Ayşe K.',
    comment: 'Derya Hanım harika, tırnaklarım hiç bu kadar güzel olmamıştı! İstediğim modeli birebir uyguladı.',
    stars: 5,
    role: 'Sadık Müşteri'
  },
  {
    id: 2,
    name: 'Zeynep B.',
    comment: 'Çok hijyenik ve profesyonel bir ortam. Nail art konusunda gerçekten bir numaralar. Kesinlikle tavsiye ederim.',
    stars: 5,
    role: 'Yeni Müşteri'
  },
  {
    id: 3,
    name: 'Elif S.',
    comment: 'Randevu sistemi çok pratik, bekleme derdi yok. Güleryüzlü hizmet için teşekkürler.',
    stars: 5,
    role: 'Müdavim'
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-bg-studio overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-script text-2xl">Sizden Gelenler</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-2 mb-4">Mutlu Müşteriler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass p-8 relative group"
            >
              <Quote className="absolute top-6 right-6 text-primary/10 rotate-180" size={64} />
              
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={20} />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic relative z-10 leading-relaxed">
                "{review.comment}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold font-serif">{review.name}</h4>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
