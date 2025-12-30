'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Check, X, LogOut, Image as ImageIcon, Settings, 
  Calendar, RefreshCcw, Clock, ChevronLeft, ChevronRight, 
  Phone, Coffee, Bell, MessageSquare, MapPin, Sparkles
} from 'lucide-react';
import GalleryManager from '@/components/admin/GalleryManager';
import ServiceManager from '@/components/admin/ServiceManager';
import ReportManager from '@/components/admin/ReportManager';
import CampaignManager from '@/components/admin/CampaignManager';
import PostManager from '@/components/admin/PostManager';

const WHATSAPP_TEMPLATES = [
  {
    id: 'standard',
    label: 'Standart Onay',
    message: (name: string, date: string, time: string) => 
      `Merhaba ${name}, Derya Yurdusay Nail Art randevunuz onaylanmıştır. 🌸\n📅 Tarih: ${date}\n⏰ Saat: ${time}\nBekleriz!`
  },
  {
    id: 'prepare',
    label: 'İşlem Hazırlık Notu',
    message: (name: string, date: string, time: string) => 
      `Selam ${name}! Yarınki randevun için sabırsızlanıyoruz. ✨\nRica etsek gelmeden önce tırnaklarındaki ojeleri temizlemiş olabilir misin? Bu sayede tasarımına daha çok vakit ayırabiliriz.💅\nSaatimiz: ${time}`
  },
  {
    id: 'location',
    label: 'Konum Tarifi',
    message: (name: string, date: string, time: string) => 
      `Merhaba ${name}, stüdyomuz için konum bilgisi:\n📍 Üçtutlar Mah. Osmancık Cd. Fatih 1. Sokak No:1/A (Çorum Merkez)\nGoogle Haritalar: https://maps.app.goo.gl/xxxx\nSaatimiz: ${time} görüşmek üzere! 🌸`
  }
];

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'gallery' | 'services' | 'reports' | 'campaigns' | 'posts'>('appointments');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploading, setUploading] = useState(false);
  const [prevPendingCount, setPrevPendingCount] = useState<number | null>(null);
  
  // Modal states for templates
  const [showTemplateModal, setShowTemplateModal] = useState<any>(null); // { app: any }
  
  const router = useRouter();

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const [prevPendingIds, setPrevPendingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const pendingAppointments = appointments.filter(a => a.status === 'pending');
    const currentIds = new Set(pendingAppointments.map(a => a.id));
    
    // Find new IDs that weren't in the previous set
    if (prevPendingIds.size > 0) {
      const newApps = pendingAppointments.filter(a => !prevPendingIds.has(a.id));
      
      if (newApps.length > 0) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log('Audio play failed', e));
        
        if (Notification.permission === "granted") {
          newApps.forEach(app => {
            new Notification(`Yeni Randevu: ${app.customer_name}`, { 
              body: `📅 ${app.appointment_date} | ⏰ ${app.appointment_time}\n${app.service_name || 'Hizmet belirtilmedi'}`, 
              icon: "/logo.png" 
            });
          });
        }
      }
    }
    
    setPrevPendingIds(currentIds);
  }, [appointments]);

  const fetchAll = async () => {
    if (appointments.length === 0) setLoading(true);
    await Promise.all([fetchAppointments(), fetchGallery(), fetchServices()]);
    setLoading(false);
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/admin/appointments');
      if (res.ok) setAppointments(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) setGallery(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) setServices(await res.json());
    } catch (e) { console.error(e); }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch('/api/admin/appointments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    fetchAppointments();
  };

  const sendWhatsApp = (app: any, template: any) => {
    let phone = app.phone.replace(/\D/g, '');
    if (!phone.startsWith('90')) phone = '90' + phone;
    const msg = encodeURIComponent(template.message(app.customer_name, app.appointment_date, app.appointment_time));
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const dailyAppointments = appointments.filter(app => app.appointment_date === selectedDate && app.status !== 'cancelled');
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const hours = Array.from({ length: 11 }, (_, i) => i + 9);

  // Tomorrow's appointments for reminders
  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const tomorrowApps = appointments.filter(a => a.appointment_date === tomorrowDate && a.status === 'confirmed');

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="bg-white p-6 rounded-[32px] shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
               <div className="p-4 bg-primary rounded-3xl text-white shadow-xl shadow-primary/20">
                  {activeTab === 'appointments' ? <Calendar size={32} /> : activeTab === 'gallery' ? <ImageIcon size={32} /> : <Settings size={32} />}
               </div>
               <div>
                  <h1 className="text-3xl font-black tracking-tight">Derya Yurdusay Admin</h1>
                  <nav className="flex gap-6 mt-2">
                    {['appointments', 'reports', 'campaigns', 'posts', 'gallery', 'services'].map((t) => (
                      <button 
                        key={t}
                        onClick={() => setActiveTab(t as any)}
                        className={`text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === t ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {t === 'appointments' ? 'Ajanda' : t === 'reports' ? 'Raporlar' : t === 'campaigns' ? 'Kampanyalar' : t === 'posts' ? 'Blog' : t === 'gallery' ? 'Galeri' : 'Hizmetler'}
                        {t === 'appointments' && pendingCount > 0 && (
                          <span className="absolute -top-2 -right-4 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center">{pendingCount}</span>
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={fetchAll} className="p-4 bg-gray-50 text-gray-400 hover:text-primary rounded-2xl transition-all shadow-inner"><RefreshCcw size={20} className={loading ? 'animate-spin' : ''} /></button>
               <button onClick={handleLogout} className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-inner"><LogOut size={20} /></button>
            </div>
          </div>
        </header>

        {activeTab === 'appointments' && (
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {/* TOMORROW REMINDERS */}
              {tomorrowApps.length > 0 && (
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-[32px] text-white shadow-xl shadow-primary/30">
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                    <Bell size={20} className="animate-swing" /> Yarınki Randevular
                  </h3>
                  <div className="space-y-3">
                    {tomorrowApps.map(app => (
                      <div key={app.id} className="bg-white/10 p-3 rounded-2xl border border-white/20 flex justify-between items-center">
                        <div className="flex-1">
                           <div className="font-bold text-sm truncate">{app.customer_name}</div>
                           <div className="text-[10px] opacity-60 font-black">{app.appointment_time} @ {app.service_name}</div>
                        </div>
                        <button 
                          onClick={() => {
                            const template = WHATSAPP_TEMPLATES.find(t => t.id === 'standard');
                            sendWhatsApp(app, template);
                          }}
                          className="p-2 bg-white text-primary rounded-xl hover:scale-105 transition-transform"
                        >
                           <MessageSquare size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] mt-4 opacity-50 italic text-center text-white">Yarın için toplam {tomorrowApps.length} randevu var.</p>
                </div>
              )}

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
                <h3 className="font-black text-xl mb-6">Tarih Seçimi</h3>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none font-black text-gray-700"
                />
                
                <button 
                  onClick={() => {
                    const time = prompt("Saat (SS:DD):", "12:00");
                    const dur = prompt("Süre (dk):", "60");
                    if (time && dur) {
                      fetch('/api/appointments', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          name: 'KAPALI ARALIK', email: 'admin@derya.com', phone: '-', service_id: 0, service_name: 'MOLA', date: selectedDate, time: time, duration: parseInt(dur), notes: 'Mola'
                        })
                      }).then(() => fetchAppointments());
                    }
                  }}
                  className="w-full mt-6 p-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all"
                >
                   <Coffee size={20} /> Zamanı Kapat
                </button>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="font-black text-xl mb-4">İstekler</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {appointments.filter(a => a.status === 'pending').map(app => (
                    <div key={app.id} className="p-4 bg-gray-50 rounded-3xl border border-gray-100">
                      <h4 className="font-black text-sm">{app.customer_name}</h4>
                      <p className="text-[10px] font-bold text-primary uppercase">{app.service_name}</p>
                      <div className="flex gap-2 mt-4">
                         <button 
                            onClick={() => {
                              updateStatus(app.id, 'confirmed');
                              setShowTemplateModal(app);
                            }} 
                            className="flex-1 py-2 bg-green-500 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-green-200"
                         >
                            Onayla & Yaz
                         </button>
                         <button onClick={() => updateStatus(app.id, 'cancelled')} className="p-2 bg-white text-red-500 rounded-xl"><X size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 min-h-[850px] overflow-hidden">
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                   <h2 className="text-2xl font-black">{new Date(selectedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}</h2>
                   <div className="flex gap-2">
                      <button onClick={() => {const d = new Date(selectedDate); d.setDate(d.getDate()-1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-2 bg-white/20 rounded-xl"><ChevronLeft size={24} /></button>
                      <button onClick={() => {const d = new Date(selectedDate); d.setDate(d.getDate()+1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-2 bg-white/20 rounded-xl"><ChevronRight size={24} /></button>
                   </div>
                </div>
                <div className="p-8 relative">
                   <div className="border-l-2 border-dashed border-gray-100 ml-20">
                      {hours.map(hour => (
                        <div key={hour} className="h-28 border-t border-gray-50/50 relative">
                           <span className="absolute -left-20 top-0 -translate-y-1/2 text-sm font-bold text-gray-300 w-16 text-right pr-4">{hour.toString().padStart(2, '0')}:00</span>
                           <div className="relative">
                              {dailyAppointments.map(app => (
                                app.appointment_time.startsWith(hour.toString().padStart(2, '0')) && (
                                  <div 
                                    key={app.id} 
                                    className={`absolute left-4 right-4 rounded-[24px] p-5 shadow-xl transition-all border-2 ${app.service_name === 'MOLA' ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white border-primary/10 shadow-primary/5'}`}
                                    style={{ top: `${(parseInt(app.appointment_time.split(':')[1]) / 60) * 100}%`, minHeight: `${(app.duration / 60) * 100}%`, zIndex: 10 }}
                                  >
                                     <div className="flex justify-between items-start">
                                        <div>
                                           <div className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-1">{app.appointment_time} @ {app.duration} dk</div>
                                           <h4 className="font-black text-gray-800 leading-tight">{app.customer_name}</h4>
                                           <p className="text-[10px] font-bold text-primary uppercase mt-1 tracking-widest">{app.service_name}</p>
                                        </div>
                                        <div className="flex gap-2">
                                           {app.service_name !== 'MOLA' && (
                                              <button onClick={() => setShowTemplateModal(app)} className="p-2.5 bg-green-50 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all"><MessageSquare size={16} /></button>
                                           )}
                                           <button onClick={() => updateStatus(app.id, 'cancelled')} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={16} /></button>
                                        </div>
                                     </div>
                                  </div>
                                )
                              ))}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL FOR WHATSAPP TEMPLATES */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative">
                <button onClick={() => setShowTemplateModal(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                <div className="mb-8">
                   <h2 className="text-2xl font-black text-gray-800">Mesaj Şablonu Seç</h2>
                   <p className="text-gray-400 text-sm">{showTemplateModal.customer_name} için WhatsApp mesajı gönderin</p>
                </div>
                <div className="space-y-4">
                   {WHATSAPP_TEMPLATES.map(t => (
                     <button 
                       key={t.id}
                       onClick={() => { sendWhatsApp(showTemplateModal, t); setShowTemplateModal(null); }}
                       className="w-full p-6 bg-gray-50 border-2 border-transparent hover:border-primary hover:bg-primary/5 rounded-3xl text-left transition-all active:scale-95 group"
                     >
                        <div className="flex items-center gap-3 mb-2">
                           <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">{t.id === 'standard' ? <Check size={18} /> : t.id === 'prepare' ? <Sparkles size={18} /> : <MapPin size={18} />}</div>
                           <span className="font-black text-gray-800">{t.label}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed italic line-clamp-2">{t.message(showTemplateModal.customer_name, showTemplateModal.appointment_date, showTemplateModal.appointment_time)}</p>
                     </button>
                   ))}
                </div>
             </motion.div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <GalleryManager
            gallery={gallery}
            onUpload={async (file, cat, cap) => {
               setUploading(true);
               const fd = new FormData(); fd.append('file', file); fd.append('category', cat); fd.append('caption', cap);
               await fetch('/api/admin/gallery', { method: 'POST', body: fd });
               fetchGallery(); setUploading(false);
            }}
            onDelete={async (id) => { if (confirm('Emin misiniz?')) { await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' }); fetchGallery(); } }}
            uploading={uploading}
          />
        )}
        {activeTab === 'services' && <ServiceManager services={services} onRefresh={fetchServices} />}
        {activeTab === 'reports' && <ReportManager appointments={appointments} services={services} />}
        {activeTab === 'campaigns' && <CampaignManager />}
        {activeTab === 'posts' && <PostManager />}
      </div>
    </div>
  );
}
