'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// ...

export default function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error(err));
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="section-padding bg-bg-pink-medium overflow-hidden">
// ...
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-script text-3xl">Yardım Merkezi</span>
          <h2 className="text-5xl md:text-7xl font-black mt-2 mb-6 tracking-tighter">Merak Edilen <span className="text-primary">Sorular</span></h2>
          <div className="w-40 h-2 bg-gradient-to-r from-primary to-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${
                 openIndex === index ? 'border-primary bg-white shadow-2xl shadow-primary/5' : 'border-gray-100 bg-white/50 hover:bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl transition-all duration-500 ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                      <HelpCircle size={20} />
                   </div>
                   <h3 className={`font-black text-lg transition-colors duration-500 ${openIndex === index ? 'text-gray-900' : 'text-gray-600'}`}>
                      {faq.question}
                   </h3>
                </div>
                <div className={`p-2 rounded-xl transition-all duration-500 ${openIndex === index ? 'bg-primary/10 text-primary rotate-180' : 'bg-gray-50 text-gray-300'}`}>
                   <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 ml-14">
                      <p className="text-gray-500 font-medium text-lg leading-relaxed border-l-4 border-primary/20 pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass p-10 rounded-[40px] max-w-2xl mx-auto border-2 border-white/50">
             <p className="text-gray-500 font-bold mb-6 text-xl">Başka bir sorunuz mu var?</p>
             <a
               href="https://wa.me/905540265767"
               target="_blank"
               className="glitter-btn px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm inline-flex items-center gap-3"
             >
               <MessageSquareIcon size={20} /> WhatsApp'tan Sorun
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const MessageSquareIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
