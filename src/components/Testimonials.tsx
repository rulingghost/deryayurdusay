'use client';
import { motion } from 'framer-motion';
import { Star, Quote, User, X, MessageSquarePlus, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// ...imports

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5, service: '' });
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));

    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/testimonials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        if(res.ok) {
            toast.success('Yorumunuz gönderildi! Onaylandıktan sonra yayınlanacaktır.');
            setShowForm(false);
            setFormData({ name: '', comment: '', rating: 5, service: '' });
        } else {
            toast.error('Gönderilemedi.');
        }
    } catch (e) {
        toast.error('Hata oluştu.');
    }
  };

  // Use empty array check instead of loading state for simpler transition
  if (testimonials.length === 0) return null; 

  return (
    <>
    <section className="section-padding bg-bg-pink-soft relative overflow-hidden">
// ...
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
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
             <MessageSquarePlus size={20} /> Yorum Bırak
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item: any, index: number) => (
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

      {/* Submission Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl relative">
                <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-800">Deneyiminizi Paylaşın</h3>
                    <p className="text-gray-500 text-sm">Görüşleriniz bizim için çok değerli. 🌸</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">İsim Soyisim</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 ring-primary/20"
                            placeholder="Adınız"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Aldığınız Hizmet</label>
                        <select 
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 ring-primary/20"
                            value={formData.service}
                            onChange={(e) => setFormData({...formData, service: e.target.value})}
                        >
                            <option value="">Hizmet Seçiniz...</option>
                            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Puanınız</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({...formData, rating: star})}
                                    className="p-1 transition-transform hover:scale-110"
                                >
                                    <Star 
                                        size={32} 
                                        className={`${formData.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Yorumunuz</label>
                        <textarea 
                            required
                            className="w-full h-32 p-4 bg-gray-50 rounded-2xl font-medium text-gray-600 outline-none focus:ring-2 ring-primary/20 resize-none"
                            placeholder="Deneyiminizi anlatın..."
                            value={formData.comment}
                            onChange={(e) => setFormData({...formData, comment: e.target.value})}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                        <Send size={18} /> Gönder
                    </button>
                </form>
            </motion.div>
        </div>
      )}
    </>
  );
}
