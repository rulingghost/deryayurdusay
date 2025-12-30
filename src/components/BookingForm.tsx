'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Sparkles, CheckCircle } from 'lucide-react';

const services = [
  'Nail Art Tasarımı',
  'Protez Tırnak (Gel)',
  'Protez Tırnak (Akrilik)',
  'French Manikür',
  'Kalıcı Oje',
  'Tırnak Bakımı',
  'Protez Dolgu',
  'Tırnak Takviyesi',
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    service: '',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          customer_name: '',
          email: '',
          phone: '',
          service: '',
          appointment_date: '',
          appointment_time: '',
          notes: ''
        });
        setStep(1);
      } else {
        setError('Randevu oluşturulamadı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.service) {
      setError('Lütfen bir hizmet seçin');
      return;
    }
    if (step === 2 && (!formData.appointment_date || !formData.appointment_time)) {
      setError('Lütfen tarih ve saat seçin');
      return;
    }
    if (step === 3 && (!formData.customer_name || !formData.email || !formData.phone)) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (success) {
    return (
      <section id="booking" className="section-padding bg-gradient-to-b from-bg-studio to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass p-12 rounded-3xl">
              <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Randevunuz Alındı! 🎉</h2>
              <p className="text-gray-600 mb-6">
                Randevu talebiniz başarıyla oluşturuldu. En kısa sürede size dönüş yapacağız.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="glitter-btn px-8 py-3 rounded-full font-bold"
              >
                Yeni Randevu Al
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-bg-studio to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Randevu Oluştur</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hızlı ve kolay randevu sistemi ile yerinizi ayırtın
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    step > s ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  Hizmet Seçin
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setFormData({ ...formData, service })}
                      className={`p-4 rounded-xl text-left transition-all ${
                        formData.service === service
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="text-primary" />
                  Tarih ve Saat Seçin
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tarih</label>
                    <input
                      type="date"
                      min={minDate}
                      value={formData.appointment_date}
                      onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Saat</label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, appointment_time: time })}
                          className={`p-3 rounded-lg text-sm transition-all ${
                            formData.appointment_time === time
                              ? 'bg-primary text-white'
                              : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="text-primary" />
                  İletişim Bilgileri
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none"
                      placeholder="0555 555 55 55"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">Randevu Özeti</h3>
                <div className="bg-white p-6 rounded-xl space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hizmet:</span>
                    <span className="font-bold">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarih:</span>
                    <span className="font-bold">{formData.appointment_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saat:</span>
                    <span className="font-bold">{formData.appointment_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ad Soyad:</span>
                    <span className="font-bold">{formData.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-bold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telefon:</span>
                    <span className="font-bold">{formData.phone}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Not (Opsiyonel)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none"
                    rows={3}
                    placeholder="Özel bir isteğiniz varsa buraya yazabilirsiniz..."
                  />
                </div>
              </motion.div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all font-bold"
                >
                  Geri
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 glitter-btn px-6 py-3 rounded-xl font-bold"
                >
                  İleri
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 glitter-btn px-6 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {loading ? 'Gönderiliyor...' : 'Randevu Oluştur'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
