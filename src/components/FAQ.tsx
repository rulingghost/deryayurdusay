'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Randevu almak için ne yapmam gerekiyor?',
    answer: 'Sayfamızın alt kısmındaki randevu formunu doldurabilir veya WhatsApp hattımızdan bize ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.'
  },
  {
    question: 'Protez tırnak ne kadar dayanır?',
    answer: 'Kaliteli protez tırnak uygulaması ortalama 3-4 hafta dayanır. Bakım ve kullanıma göre bu süre değişebilir. Düzenli bakım randevuları ile tırnaklarınız her zaman kusursuz görünür.'
  },
  {
    question: 'Tırnak sağlığıma zarar verir mi?',
    answer: 'Profesyonel uygulamada ve doğru bakımda tırnak sağlığınıza zarar vermez. Kaliteli ürünler kullanıyoruz ve tırnaklarınızın sağlığını ön planda tutuyoruz.'
  },
  {
    question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    answer: 'Nakit ve kredi kartı ile ödeme yapabilirsiniz. Ayrıca havale/EFT seçeneği de mevcuttur.'
  },
  {
    question: 'Randevumu iptal edebilir miyim?',
    answer: 'Evet, randevunuzu en az 24 saat önceden haber vererek iptal edebilir veya erteleyebilirsiniz.'
  },
  {
    question: 'Evde bakım için önerileriniz nelerdir?',
    answer: 'Tırnaklarınızı aşırı sıcak sudan koruyun, eldiven kullanın, tırnak yağı uygulayın ve sert kimyasallardan uzak durun. Detaylı bakım önerileri için randevunuzda size özel rehber vereceğiz.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Merak ettiğiniz her şey burada! Başka sorularınız için bize ulaşabilirsiniz.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-white/50 transition-colors"
              >
                <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Sorunuza cevap bulamadınız mı?</p>
          <a
            href="https://wa.me/905540265767"
            target="_blank"
            rel="noopener noreferrer"
            className="glitter-btn px-8 py-3 rounded-full font-bold inline-block"
          >
            WhatsApp'tan Sorun
          </a>
        </motion.div>
      </div>
    </section>
  );
}
