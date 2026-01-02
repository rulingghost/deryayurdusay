'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Sparkles, CheckCircle, ChevronRight, ChevronLeft, Tag, Info, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingForm() {
  const [services, setServices] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    service_id: '',
    service_name: '',
    duration: 60,
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(res => res.json()),
      fetch('/api/admin/campaigns').then(res => res.json())
    ]).then(([servicesData, campaignsData]) => {
      setServices(servicesData);
      setCampaigns(campaignsData); 
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.appointment_date && formData.service_id) {
      setFetchingSlots(true);
      fetch(`/api/availability?date=${formData.appointment_date}&serviceId=${formData.service_id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAvailableSlots(data);
          else setAvailableSlots([]);
        })
        .finally(() => setFetchingSlots(false));
    }
  }, [formData.appointment_date, formData.service_id]);

  const getActiveCampaign = () => {
    if (!formData.appointment_date) return null;
    return campaigns.find(c => 
      c.active && 
      c.start_date && c.end_date &&
      formData.appointment_date >= c.start_date && 
      formData.appointment_date <= c.end_date
    );
  };

  const activeCampaign = getActiveCampaign();
  const selectedService = services.find(s => s.id.toString() === formData.service_id);

  // Helper to parse price (assuming price is string like "400₺")
  const getPriceValue = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\D/g, '')) || 0;
  };

  const originalPrice = selectedService ? getPriceValue(selectedService.price) : 0;
  const discountAmount = activeCampaign ? (originalPrice * activeCampaign.discount_percent) / 100 : 0;
  const finalPrice = originalPrice - discountAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.customer_name,
          email: formData.email,
          phone: formData.phone,
          service_id: parseInt(formData.service_id),
          service_name: formData.service_name,
          date: formData.appointment_date,
          time: formData.appointment_time,
          duration: formData.duration,
          notes: formData.notes
        })
      });

      if (res.ok) {
        setSuccess(true);
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-[25px] pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 border-2 border-primary/20`}>
            <div className="flex-1 w-0 p-1">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Onay E-postası Gönderildi!</p>
                  <p className="mt-1 text-xs text-gray-500 font-bold">Randevu isteğiniz merkezimize ulaştı. 🌸</p>
                </div>
              </div>
            </div>
          </div>
        ));
      } else {
        setError('Randevu oluşturulamadı. Lütfen tekrar deneyin.');
        toast.error('Girdiğiniz bilgilerde bir sorun olabilir.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.service_id) { setError('Lütfen bir hizmet seçin'); return; }
    if (step === 2 && (!formData.appointment_date || !formData.appointment_time)) { setError('Lütfen tarih ve saat seçin'); return; }
    if (step === 3 && (!formData.customer_name || !formData.phone)) { setError('Lütfen adınızı ve telefonunuzu girin'); return; }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => { setStep(step - 1); setError(''); };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (success) {
    return (
      <section id="booking" className="section-padding bg-studio">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-[0_32px_64px_rgba(0,0,0,0.05)] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-bl-[100px] -z-0"></div>
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-green-500 rounded-[35px] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-100 rotate-6">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black mb-6 tracking-tighter text-gray-800 uppercase">Talep Alındı!</h2>
                  <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed max-w-sm mx-auto">
                    {formData.customer_name}, randevu isteğiniz bize ulaştı. Onaylandığında e-posta ve WhatsApp üzerinden haber vereceğiz! 🌸
                  </p>
                  <button onClick={() => window.location.reload()} className="glitter-btn px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl">
                    Ana Sayfaya Dön
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-bg-pink-deep overflow-hidden relative">
      {/* Premium Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
          <span className="text-primary font-script text-3xl">Güzellik İçin Zaman Ayırın</span>
          <h2 className="text-5xl md:text-8xl font-black mt-2 mb-6 tracking-tighter uppercase leading-none">
            Online <span className="glitter-text">Randevu</span>
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-primary to-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-4 mb-16 overflow-x-auto pb-4 px-4 no-scrollbar">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-3">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all duration-700 ${
                    step >= s ? 'bg-primary text-white shadow-2xl shadow-primary/30 rotate-12' : 'bg-white text-gray-300 border border-gray-100'
                 }`}>
                    {s === 1 ? <Tag size={20} /> : s === 2 ? <Calendar size={20} /> : s === 3 ? <User size={20} /> : <CheckCircle size={20} />}
                 </div>
                 {s < 4 && <div className={`w-12 h-1 rounded-full ${step > s ? 'bg-primary' : 'bg-gray-100'}`}></div>}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden animate-in fade-in zoom-in duration-500">
            {/* Form Inner */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10">
                    <div className="text-center mb-10">
                       <h3 className="text-3xl font-black text-gray-800 tracking-tight uppercase">İşlem Seçin</h3>
                       <p className="text-gray-400 font-bold text-sm tracking-widest mt-2 uppercase">Hizmetlerimizden birini tercih edin</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service_id: service.id.toString(), service_name: service.name, duration: service.duration })}
                          className={`p-8 rounded-[40px] text-left transition-all duration-500 relative group border-4 ${
                            formData.service_id === service.id.toString()
                              ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20 translate-y-[-5px]'
                              : 'bg-gray-50/50 hover:bg-white border-transparent hover:border-primary/10 hover:shadow-xl'
                          }`}
                        >
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start mb-6">
                               <span className={`font-black text-xl tracking-tight leading-tight ${formData.service_id === service.id.toString() ? 'text-white' : 'text-gray-800'}`}>{service.name}</span>
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${formData.service_id === service.id.toString() ? 'bg-white/20' : 'bg-primary/5 text-primary'}`}>
                                  {service.duration} dk
                               </span>
                            </div>
                            <div className="flex items-center justify-between">
                               <div className={`text-2xl font-black ${formData.service_id === service.id.toString() ? 'text-white' : 'text-primary'}`}>{service.price}</div>
                               <div className={`p-2 rounded-xl transition-all ${formData.service_id === service.id.toString() ? 'bg-white/20' : 'bg-primary/5 opacity-0 group-hover:opacity-100'}`}>
                                  <ChevronRight size={20} />
                               </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-10">
                    <div className="text-center">
                       <h3 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Tarih & Saat</h3>
                       <p className="text-gray-400 font-bold text-sm tracking-widest mt-2 uppercase text-center flex items-center justify-center gap-2">
                          <Clock size={14} /> Müsaitlik durumunuza göre seçin
                       </p>
                    </div>
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-6">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block ml-4">Geleceğiniz Gün</label>
                        <div className="relative group">
                           <div className={`relative bg-gray-50 p-6 md:p-8 rounded-[40px] border-2 transition-all flex items-center justify-between ${formData.appointment_date ? 'border-primary/20 bg-primary/5' : 'border-transparent group-hover:border-primary/10'}`}>
                              <input
                                  type="date"
                                  min={minDate}
                                  value={formData.appointment_date}
                                  onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value, appointment_time: '' })}
                                  onClick={(e) => {
                                    try {
                                      // @ts-ignore
                                      e.currentTarget.showPicker?.();
                                    } catch (err) { }
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <span className={`text-xl md:text-2xl font-black ${formData.appointment_date ? 'text-primary' : 'text-gray-400'}`}>
                                {formData.appointment_date ? new Date(formData.appointment_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }) : 'Tarih Seçiniz'}
                              </span>
                              <Calendar className={`${formData.appointment_date ? 'text-primary' : 'text-gray-300'}`} size={28} />
                           </div>
                        </div>
                        
                        {activeCampaign && (
                           <div className="bg-primary/10 p-4 rounded-3xl flex items-center gap-3 border border-primary/20 animate-pulse">
                              <Sparkles className="text-primary animate-spin-slow" size={24} />
                              <div>
                                 <h4 className="font-black text-primary text-sm uppercase">{activeCampaign.title}</h4>
                                 <p className="text-xs font-bold text-gray-600">% {activeCampaign.discount_percent} indirim tanımlandı!</p>
                              </div>
                           </div>
                        )}
                        
                        <div className="bg-primary/5 p-6 rounded-3xl flex items-center gap-4 text-primary">
                           <Info size={20} className="shrink-0" />
                           <p className="text-xs font-bold leading-relaxed">Pazar günleri stüdyomuz kapalıdır. Hafta içi ve Cumartesi günlerini tercih ediniz.</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block ml-4">Uygun Saat</label>
                        {fetchingSlots ? (
                          <div className="grid grid-cols-3 gap-4">
                            {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="h-14 md:h-16 bg-gray-50 rounded-2xl animate-pulse"></div>)}
                          </div>
                        ) : availableSlots.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {availableSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setFormData({ ...formData, appointment_time: time })}
                                className={`py-3 md:py-4 rounded-2xl text-xs md:text-sm font-black transition-all border-2 ${
                                  formData.appointment_time === time
                                    ? 'bg-primary text-white border-primary shadow-xl scale-105'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-primary/20 hover:text-primary'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : formData.appointment_date ? (
                          <div className="p-8 md:p-12 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                             <p className="font-bold text-gray-400 text-sm">Bu tarih için uygun saat kalmadı.</p>
                          </div>
                        ) : (
                          <div className="p-8 md:p-12 text-center bg-gray-50 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center gap-4 opacity-70">
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-200"><Calendar size={24} /></div>
                             <p className="text-gray-300 font-black uppercase tracking-widest text-[10px]">Lütfen önce tarih seçimi yapınız</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-12 max-w-2xl mx-auto">
                    <div className="text-center">
                       <h3 className="text-3xl font-black text-gray-800 tracking-tight uppercase">İletişim Bilgileri</h3>
                       <p className="text-gray-400 font-bold text-sm tracking-widest mt-2 uppercase">Size ulaşmamız ve konfirmasyon için</p>
                    </div>
                    <div className="space-y-6">
                       <div className="relative group">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={24} />
                          <input
                            type="text"
                            placeholder="ADINIZ SOYADINIZ"
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all font-black text-gray-700 tracking-tight"
                          />
                       </div>
                       <div className="relative group">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={24} />
                          <input
                            type="tel"
                            placeholder="TELEFON NUMARANIZ"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all font-black text-gray-700 tracking-tight"
                          />
                       </div>
                       <div className="relative group">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={24} />
                          <input
                            type="email"
                            placeholder="E-POSTA ADRESİNİZ (OPSİYONEL)"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all font-black text-gray-700 tracking-tight"
                          />
                       </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                    <div className="text-center">
                       <h3 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Son Kontrol</h3>
                       <p className="text-gray-400 font-bold text-sm tracking-widest mt-2 uppercase">Randevunuzu tamamlamaya hazırız</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="bg-gray-50 rounded-[40px] p-10 space-y-6 relative overflow-hidden">
                          <Heart className="absolute -top-4 -left-4 text-primary/5" size={120} />
                          <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Hizmet</span>
                             <span className="font-black text-primary">{formData.service_name}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tarih</span>
                             <span className="font-black text-gray-800">{formData.appointment_date}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Saat</span>
                             <span className="font-black text-gray-800">{formData.appointment_time}</span>
                          </div>
                          {activeCampaign ? (
                             <>
                                <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                                   <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Normal Tutar</span>
                                   <span className="font-bold text-gray-400 line-through decoration-red-500">{originalPrice} ₺</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                                   <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1"><Sparkles size={10} /> İndirim ({activeCampaign.title})</span>
                                   <span className="font-black text-primary">-{activeCampaign.discount_percent}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                   <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Toplam Tutar</span>
                                   <span className="font-black text-2xl text-gray-800">{finalPrice} ₺</span>
                                </div>
                             </>
                          ) : (
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tahmini Tutar</span>
                                <span className="font-black text-2xl text-gray-800">{selectedService?.price}</span>
                             </div>
                          )}
                          <div className="flex justify-between items-center border-t border-gray-200/50 pt-4 mt-2">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Müşteri</span>
                             <span className="font-black text-gray-800">{formData.customer_name}</span>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-4">Notlarınız (Opsiyonel)</label>
                          <textarea
                            placeholder="Söylemek istediklerinizi buraya yazabilirsiniz..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full p-8 rounded-[40px] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all font-bold text-gray-600 h-full min-h-[200px]"
                          />
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-red-50 text-red-500 rounded-[30px] text-center font-black text-sm uppercase tracking-widest border-2 border-red-100">
                  {error}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-16">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="flex-1 px-10 py-6 rounded-full border-2 border-gray-100 hover:border-primary hover:text-primary transition-all font-black uppercase tracking-widest text-xs text-gray-400 flex items-center justify-center gap-2">
                    <ChevronLeft size={18} /> Geri Dön
                  </button>
                )}
                {step < 4 ? (
                  <button type="button" onClick={nextStep} className="flex-[2] glitter-btn px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                    Sonraki Adım <ChevronRight size={18} />
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="flex-[2] glitter-btn px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-3">
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                    ) : (
                      <>Randevuyu Gönder <Sparkles size={18} /></>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E89BB7; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
