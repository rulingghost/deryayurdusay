'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, Users, Clock, Save, 
  Trash2, Plus, Check, Info, Bell, Shield,
  Globe, Layout, Palette
} from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState<any>({
    studio_name: '',
    working_hours: { start: '09:00', end: '19:00' },
    holiday_days: [],
    auto_notify: true
  });
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'staff' | 'working'>('general');

  useEffect(() => {
    fetchSettings();
    fetchStaff();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch('/api/admin/settings');
    if (res.ok) setSettings(await res.json());
  };

  const fetchStaff = async () => {
    const res = await fetch('/api/admin/staff');
    if (res.ok) setStaff(await res.json());
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
        alert('Ayarlar kaydedildi!');
    }
    setLoading(false);
  };

  const handleAddStaff = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const role = e.target.role.value;
    if (!name) return;

    const res = await fetch('/api/admin/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role })
    });
    if (res.ok) {
        fetchStaff();
        e.target.reset();
    }
  };

  const handleDeleteStaff = async (id: number) => {
    if (!confirm('Bu personeli silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/staff?id=${id}`, { method: 'DELETE' });
    fetchStaff();
  };

  const toggleHoliday = (day: string) => {
    const holidays = settings.holiday_days.includes(day)
      ? settings.holiday_days.filter((d: string) => d !== day)
      : [...settings.holiday_days, day];
    setSettings({ ...settings, holiday_days: holidays });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayNames: any = {
    'Monday': 'Pazartesi', 'Tuesday': 'Salı', 'Wednesday': 'Çarşamba', 
    'Thursday': 'Perşembe', 'Friday': 'Cuma', 'Saturday': 'Cumartesi', 'Sunday': 'Pazar'
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
         <div>
            <h2 className="text-xl font-black">Sistem Ayarları</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">İşletme ve personel yönetimi</p>
         </div>
         <div className="flex bg-gray-50 p-1 rounded-2xl w-full md:w-auto overflow-x-auto">
            {['general', 'staff', 'working'].map((tab: any) => (
               <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-tight transition-all whitespace-nowrap ${activeSubTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                  {tab === 'general' ? 'Genel' : tab === 'staff' ? 'Personel' : 'Çalışma Saatleri'}
               </button>
            ))}
         </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-3 gap-8">
        
        {/* TAB CONTENT: GENERAL settings */}
        {activeSubTab === 'general' && (
          <div className="lg:col-span-2 space-y-6">
             <motion.div variants={item} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Globe size={20} /></div>
                   <h3 className="font-black text-lg text-gray-800">İşletme Bilgileri</h3>
                </div>
                
                <div className="space-y-6">
                   <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-2 block ml-2">İşletme Adı</label>
                      <input 
                        value={settings.studio_name}
                        onChange={e => setSettings({...settings, studio_name: e.target.value})}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 ring-primary/20 transition-all"
                        placeholder="Örn: Derya Yurdusay Nail Art"
                      />
                   </div>
                   
                   <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all border border-transparent hover:border-primary/10">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Bell size={20} /></div>
                         <div>
                            <h4 className="font-bold text-gray-800">Otomatik Bildirimler</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">WhatsApp üzerinden hatırlatma mesajları</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, auto_notify: !settings.auto_notify})}
                        className={`w-14 h-8 rounded-full p-1.5 transition-colors ${settings.auto_notify ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                         <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.auto_notify ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                   </div>
                </div>
             </motion.div>

             <motion.div variants={item} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><Shield size={20} /></div>
                   <h3 className="font-black text-lg text-gray-800">Güvenlik & Yedekleme</h3>
                </div>
                <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                   <p className="text-sm font-bold text-purple-700 mb-4">Veritabanı yedeğini her gün otomatik olarak alıyoruz.</p>
                   <button className="px-6 py-3 bg-purple-600 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-purple-200">Yedek İndir (İleri Seviye)</button>
                </div>
             </motion.div>
          </div>
        )}

        {/* TAB CONTENT: STAFF management */}
        {activeSubTab === 'staff' && (
          <div className="lg:col-span-2 space-y-6">
             <motion.div variants={item} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl"><Users size={20} /></div>
                   <h3 className="font-black text-lg text-gray-800">Ekip Üyeleri</h3>
                </div>

                <form onSubmit={handleAddStaff} className="grid md:grid-cols-5 gap-4 mb-8">
                   <div className="md:col-span-2">
                       <input name="name" placeholder="Personel Adı" className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none" required />
                   </div>
                   <div className="md:col-span-2">
                       <input name="role" placeholder="Pozisyon (Örn: Junior Artist)" className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none" />
                   </div>
                   <button type="submit" className="bg-gray-900 text-white p-4 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2">
                      <Plus size={20} />
                   </button>
                </form>

                <div className="space-y-4">
                   {staff.map(s => (
                     <div key={s.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-lg">
                              {s.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-black text-gray-800">{s.name}</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{s.role || 'Personel'}</p>
                           </div>
                        </div>
                        <button onClick={() => handleDeleteStaff(s.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                           <Trash2 size={18} />
                        </button>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>
        )}

        {/* TAB CONTENT: WORKING HOURS */}
        {activeSubTab === 'working' && (
          <div className="lg:col-span-2 space-y-6">
             <motion.div variants={item} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Clock size={20} /></div>
                   <h3 className="font-black text-lg text-gray-800">Çalışma Saatleri</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                   <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-2 block ml-2">Açılış Saati</label>
                      <input 
                        type="time"
                        value={settings.working_hours.start}
                        onChange={e => setSettings({
                          ...settings, 
                          working_hours: { ...settings.working_hours, start: e.target.value }
                        })}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none"
                      />
                   </div>
                   <div>
                      <label className="text-xs font-black uppercase text-gray-400 mb-2 block ml-2">Kapanış Saati</label>
                      <input 
                        type="time"
                        value={settings.working_hours.end}
                        onChange={e => setSettings({
                          ...settings, 
                          working_hours: { ...settings.working_hours, end: e.target.value }
                        })}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none"
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-xs font-black uppercase text-gray-400 block ml-2">Tatil Günleri (Kapalı)</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {days.map(day => (
                        <button 
                          key={day}
                          onClick={() => toggleHoliday(day)}
                          className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settings.holiday_days.includes(day) ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                           {dayNames[day]}
                        </button>
                      ))}
                   </div>
                </div>
             </motion.div>
          </div>
        )}

        {/* SIDEBAR Info & Save */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><SettingsIcon size={120} /></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Değişiklikleri Kaydet</h3>
              <p className="text-xs text-gray-400 font-medium mb-8 leading-relaxed relative z-10">Tüm sistem ayarlarını ve personel bilgisini kaydetmek için aşağıdaki butonu kullanın.</p>
              
              <button 
                onClick={handleSaveSettings}
                disabled={loading}
                className="w-full py-5 bg-primary text-white rounded-3xl font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 relative z-10"
              >
                 {loading ? 'Kaydediliyor...' : <><Save size={20} /> Güncelle</>}
              </button>
           </div>

           <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 italic">
              <div className="flex items-center gap-3 mb-4 text-primary">
                 <Info size={20} />
                 <h4 className="font-extrabold text-sm uppercase tracking-widest">Hatırlatma</h4>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Tatil günleri seçildiğinde, randevu ekranında o günlere ait tüm slotlar otomatik olarak devre dışı kalacaktır.</p>
           </div>
        </div>

      </motion.div>
    </div>
  );
}
