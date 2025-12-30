'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Sparkles, Check, ChevronRight, ChevronLeft } from 'lucide-react';

const services = [
  { id: 'art', name: 'Nail Art Tasarımı', duration: '90 dk', price: '₺450', icon: '🎨' },
  { id: 'protez', name: 'Protez Tırnak', duration: '120 dk', price: '₺750', icon: '💅' },
  { id: 'kalici', name: 'Kalıcı Oje', duration: '60 dk', price: '₺350', icon: '✨' },
  { id: 'manikur', name: 'Manikür & Bakım', duration: '45 dk', price: '₺250', icon: '💆‍♀️' },
];

// Mock time slots
const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const resp = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (resp.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const isStep1Valid = !!formData.service;
  const isStep2Valid = !!formData.date && !!formData.time;
  const isStep3Valid = !!formData.name && !!formData.email && !!formData.phone;

  if (status === 'success') {
    return (
      <section id="booking" className="section-padding bg-bg-studio">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <Check size={48} />
            </div>
            <h2 className="text-3xl font-serif mb-4">Randevunuz Alındı!</h2>
            <p className="text-gray-600 mb-8">
              Teşekkürler {formData.name}, randevu talebiniz bize ulaştı. 
              En kısa sürede {formData.phone} numarasından teyit için sizinle iletişime geçeceğiz.
            </p>
            <button 
              onClick={() => {
                setStatus('idle');
                setStep(1);
                setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '' });
              }}
              className="glitter-btn px-8 py-3 rounded-full"
            >
              Yeni Randevu
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-bg-studio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-script text-2xl">Online Randevu</span>
          <h2 className="text-4xl font-serif mt-2">Kendinizi Şımartın</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-12 px-12 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 h-1 bg-primary -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 bg-bg-studio px-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    s <= step ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s}
                </div>
                <span className={`text-sm font-medium ${s <= step ? 'text-primary' : 'text-gray-400'}`}>
                  {s === 1 ? 'Hizmet Seçimi' : s === 2 ? 'Tarih & Saat' : 'Bilgileriniz'}
                </span>
              </div>
            ))}
          </div>

          <div className="glass p-8 md:p-12 min-h-[400px]">
             <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setFormData({ ...formData, service: svc.name })}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg flex items-center justify-between group ${
                        formData.service === svc.name 
                          ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                          : 'border-transparent bg-white/50 hover:border-primary/30'
                      }`}
                    >
                      <div>
                        <span className="text-4xl mb-4 block">{svc.icon}</span>
                        <h3 className="font-serif text-xl font-bold">{svc.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{svc.duration}</p>
                      </div>
                      <span className="text-primary font-bold text-lg">{svc.price}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-lg font-serif mb-4">Hangi tarihte gelmek istersiniz?</label>
                    <input
                      type="date"
                      className="w-full p-4 rounded-xl border border-primary/20 bg-white/80 focus:ring-2 focus:ring-primary/40 outline-none text-lg"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-serif mb-4">Size uygun saati seçin</label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          disabled={!formData.date} // Disable if no date selected
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-3 rounded-lg border transition-all ${
                            formData.time === time
                              ? 'bg-primary text-white border-primary shadow-lg'
                              : 'bg-white/50 border-gray-200 hover:border-primary/50 hover:bg-white'
                          } ${!formData.date ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-lg mx-auto space-y-4"
                >
                  <div className="bg-primary/5 p-6 rounded-2xl mb-6 border border-primary/10">
                    <h4 className="font-serif text-lg mb-2">Randevu Özeti</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Hizmet:</span>
                      <span className="font-bold text-gray-900">{formData.service}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tarih & Saat:</span>
                      <span className="font-bold text-gray-900">{formData.date} / {formData.time}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız"
                      className="w-full p-4 rounded-xl border border-primary/20 bg-white/80 focus:ring-2 focus:ring-primary/40 outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="E-posta Adresiniz"
                      className="w-full p-4 rounded-xl border border-primary/20 bg-white/80 focus:ring-2 focus:ring-primary/40 outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Telefon Numaranız"
                      className="w-full p-4 rounded-xl border border-primary/20 bg-white/80 focus:ring-2 focus:ring-primary/40 outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
               <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ChevronLeft size={20} /> Geri
                </button>

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                    className="glitter-btn px-8 py-3 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Devam Et <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep3Valid || status === 'loading'}
                    className="glitter-btn px-10 py-3 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    {status === 'loading' ? 'İşleniyor...' : 'Randevuyu Onayla'}
                    {!status.startsWith('load') && <Check size={20} />}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
