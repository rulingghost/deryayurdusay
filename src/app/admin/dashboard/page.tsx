'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Check, X, LogOut, Image as ImageIcon, Settings, Menu,
  Calendar, RefreshCcw, Clock, ChevronLeft, ChevronRight, 
  Phone, Coffee, Bell, MessageSquare, MapPin, Sparkles, Search, Download, Filter
} from 'lucide-react';
import TemplateManager from '@/components/admin/TemplateManager';
import GalleryManager from '@/components/admin/GalleryManager';
import ServiceManager from '@/components/admin/ServiceManager';
import ReportManager from '@/components/admin/ReportManager';
import CampaignManager from '@/components/admin/CampaignManager';
import PostManager from '@/components/admin/PostManager';
import BeforeAfterManager from '@/components/admin/BeforeAfterManager';
import TestimonialManager from '@/components/admin/TestimonialManager';
import FAQManager from '@/components/admin/FAQManager';
import ExpenseManager from '@/components/admin/ExpenseManager';
import SettingsManager from '@/components/admin/SettingsManager';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'gallery' | 'services' | 'reports' | 'campaigns' | 'posts' | 'beforeafter' | 'templates' | 'testimonials' | 'faqs' | 'expenses' | 'settings'>('appointments');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTimeBlockModal, setShowTimeBlockModal] = useState(false);
  const [blockTimeData, setBlockTimeData] = useState({ time: '12:00', duration: '60', note: 'Mola' });
  
  // Modal states for templates
  const [showTemplateModal, setShowTemplateModal] = useState<any>(null); // { app: any }
  const [editingMessage, setEditingMessage] = useState<string | null>(null);

  // Modal state for rescheduling
  const [showEditModal, setShowEditModal] = useState<any>(null); // { app: any }
  const [editFormData, setEditFormData] = useState({ date: '', time: '', duration: 60, status: '' });
  
  const router = useRouter();

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
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
    await Promise.all([fetchAppointments(), fetchGallery(), fetchServices(), fetchCampaigns(), fetchTemplates(), fetchExpenses()]);
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
  
  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/admin/campaigns');
      if (res.ok) setCampaigns(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/admin/templates');
      if (res.ok) setTemplates(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/admin/expenses');
      if (res.ok) setExpenses(await res.json());
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

  const handleUpdateAppointment = async () => {
      if(!showEditModal) return;
      try {
          const res = await fetch('/api/admin/appointments', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: showEditModal.id,
                  status: editFormData.status,
                  date: editFormData.date,
                  time: editFormData.time,
                  duration: editFormData.duration
              })
          });

          if(res.ok) {
              alert('Randevu güncellendi!');
              fetchAppointments();
              setShowEditModal(null);
          } else {
              const err = await res.json();
              alert(err.error || 'Güncelleme başarısız (Çakışma olabilir)');
          }
      } catch(e) {
          alert('Hata oluştu');
      }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const dailyAppointments = appointments.filter(app => app.appointment_date === selectedDate && app.status !== 'cancelled' && app.status !== 'rejected');
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const hours = Array.from({ length: 11 }, (_, i) => i + 9);

  // Tomorrow's appointments for reminders
  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const tomorrowApps = appointments.filter(a => a.appointment_date === tomorrowDate && a.status === 'confirmed');

  const processTemplate = (content: string, app: any) => {
    return content
      .replace('{name}', app.customer_name)
      .replace('{date}', app.appointment_date)
      .replace('{time}', app.appointment_time);
  };

  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return appointments;
    const lower = searchQuery.toLowerCase();
    return appointments.filter(app => 
      app.customer_name.toLowerCase().includes(lower) || 
      app.service_name.toLowerCase().includes(lower) ||
      app.status.toLowerCase().includes(lower) ||
      (app.phone && app.phone.includes(lower))
    );
  }, [appointments, searchQuery]);

  const exportToCSV = useCallback(() => {
    const headers = ['ID', 'Müşteri', 'Email', 'Telefon', 'Hizmet', 'Tarih', 'Saat', 'Süre', 'Durum', 'Notlar'];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + filteredAppointments.map(app => {
        return [
          app.id,
          `"${app.customer_name}"`,
          app.email,
          app.phone,
          `"${app.service_name}"`,
          app.appointment_date,
          app.appointment_time,
          app.duration,
          app.status,
          `"${app.notes || ''}"`
        ].join(",");
      }).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `randevular_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredAppointments]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-3 md:p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Responsive Header */}
        <header className="bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm mb-6 md:mb-8 border border-gray-100 relative z-50">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-primary rounded-2xl md:rounded-3xl text-white shadow-lg shadow-primary/20">
                   {activeTab === 'appointments' ? <Calendar size={24} /> : activeTab === 'gallery' ? <ImageIcon size={24} /> : <Settings size={24} />}
                </div>
                <div>
                   <h1 className="text-xl md:text-3xl font-black tracking-tight">DY Admin</h1>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden md:block">Yönetim Paneli</p>
                </div>
             </div>

             <div className="flex items-center gap-2">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-3 bg-gray-50 rounded-xl text-gray-600">
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <div className="hidden md:flex gap-2">
                    <button onClick={fetchAll} className="p-4 bg-gray-50 text-gray-400 hover:text-primary rounded-2xl transition-all shadow-inner"><RefreshCcw size={20} className={loading ? 'animate-spin' : ''} /></button>
                    <button onClick={handleLogout} className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-inner"><LogOut size={20} /></button>
                </div>
             </div>
          </div>

          {/* Mobile Navigation & Desktop Navigation Combined */}
          <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-2 md:gap-6 mt-6 md:mt-4 md:items-center border-t md:border-0 border-gray-100 pt-4 md:pt-0 overflow-x-auto pb-2 md:pb-0`}>
            {['appointments', 'reports', 'expenses', 'campaigns', 'posts', 'beforeafter', 'gallery', 'services', 'templates', 'testimonials', 'faqs', 'settings'].map((t) => (
              <button 
                key={t}
                onClick={() => { setActiveTab(t as any); setMobileMenuOpen(false); }}
                className={`text-sm font-black uppercase tracking-widest transition-all relative shrink-0 py-3 md:py-0 text-left md:text-center px-4 md:px-0 rounded-xl md:rounded-none ${
                    activeTab === t 
                    ? 'text-primary bg-primary/5 md:bg-transparent' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 md:hover:bg-transparent'
                }`}
              >
                {t === 'appointments' ? 'Ajanda' : t === 'reports' ? 'Raporlar' : t === 'expenses' ? 'Giderler' : t === 'campaigns' ? 'Kampanyalar' : t === 'posts' ? 'Blog' : t === 'beforeafter' ? 'Önce/Sonra' : t === 'gallery' ? 'Galeri' : t === 'services' ? 'Hizmetler' : t === 'templates' ? 'Şablonlar' : t === 'testimonials' ? 'Yorumlar' : t === 'faqs' ? 'S.S.S' : 'Ayarlar'}
                {t === 'appointments' && pendingCount > 0 && (
                  <span className="absolute top-3 md:-top-2 right-4 md:-right-4 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center">{pendingCount}</span>
                  </span>
                )}
              </button>
            ))}
            <div className="md:hidden flex gap-2 mt-4 pt-4 border-t border-gray-50">
               <button onClick={fetchAll} className="flex-1 p-3 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2">
                  <RefreshCcw size={14} /> Yenile
               </button>
               <button onClick={handleLogout} className="flex-1 p-3 bg-red-50 text-red-500 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2">
                  <LogOut size={14} /> Çıkış
               </button>
            </div>
          </nav>
        </header>

        
        {/* Search & Export Bar */}
        {activeTab === 'appointments' && (
            <div className="mb-6 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-3.5 text-gray-300" size={20} />
                    <input 
                        type="text" 
                        placeholder="Randevu Ara (İsim, Tel, Hizmet)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none outline-none font-bold text-gray-700 focus:ring-2 ring-primary/20 transition-all"
                    />
                </div>
                <button 
                    onClick={exportToCSV}
                    className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                    <Download size={18} /> <span className="text-sm">CSV İndir</span>
                </button>
            </div>
        )}

        {/* SEARCH RESULTS VIEW */}
        {activeTab === 'appointments' && searchQuery && (
             <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-8">
                <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                    <Search size={22} className="text-primary" /> Arama Sonuçları ({filteredAppointments.length})
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] uppercase font-black text-gray-400 border-b border-gray-100">
                                <th className="pb-3 pl-4">Müşteri</th>
                                <th className="pb-3">Hizmet</th>
                                <th className="pb-3">Tarih</th>
                                <th className="pb-3">Durum</th>
                                <th className="pb-3">Telefon</th>
                                <th className="pb-3 text-right pr-4">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map(app => (
                                    <tr key={app.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="py-4 pl-4 font-bold text-gray-800">{app.customer_name}</td>
                                        <td className="py-4 text-sm text-gray-600">{app.service_name}</td>
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-800">{app.appointment_date}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">{app.appointment_time}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                                                app.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                                                app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                                app.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                'bg-orange-100 text-orange-600'
                                            }`}>
                                                {app.status === 'confirmed' ? 'Onaylı' : app.status === 'rejected' ? 'Red' : app.status === 'cancelled' ? 'İptal' : 'Bekliyor'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-xs font-mono text-gray-500">{app.phone}</td>
                                        <td className="py-4 pr-4 text-right">
                                            <button onClick={() => { setSelectedDate(app.appointment_date); setSearchQuery(''); }} className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                                <ChevronRight size={16} />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setShowEditModal(app);
                                                    setEditFormData({
                                                        date: app.appointment_date,
                                                        time: app.appointment_time,
                                                        duration: app.duration || 60,
                                                        status: app.status
                                                    });
                                                }}
                                                className="p-2 ml-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors"
                                            >
                                                <Settings size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-400 font-bold text-sm">Sonuç bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
        )}

        {activeTab === 'appointments' && !searchQuery && (
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
                            // Quick action: Open modal with first template
                            const template = templates[0];
                            if(template) {
                                setShowTemplateModal(app);
                                setEditingMessage(processTemplate(template.content, app));
                            } else {
                                setShowTemplateModal(app);
                                setEditingMessage('');
                            }
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
                  onClick={() => setShowTimeBlockModal(true)}
                  className="w-full mt-6 p-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all"
                >
                   <Coffee size={20} /> Zamanı Kapat
                </button>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="font-black text-xl mb-4">İstekler</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {appointments.filter(a => a.status === 'pending').map(app => {
                    const matchedCampaign = campaigns.find(c => 
                        c.active && c.start_date && c.end_date &&
                        app.appointment_date >= c.start_date && app.appointment_date <= c.end_date
                    );
                    return (
                    <div 
                        key={app.id} 
                        onClick={() => setSelectedDate(app.appointment_date)}
                        className={`p-4 bg-gray-50 rounded-3xl border cursor-pointer hover:shadow-md transition-all group ${matchedCampaign ? 'border-primary/30 bg-primary/5' : 'border-gray-100 hover:border-primary/30'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                          <h4 className="font-black text-sm text-gray-800">{app.customer_name}</h4>
                          <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-lg shadow-sm text-gray-600 border border-gray-100 flex items-center gap-1 group-hover:border-primary/20 transition-colors">
                              <Calendar size={10} /> 
                              {new Date(app.appointment_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'numeric' })}
                              <span className="w-px h-3 bg-gray-200 mx-0.5"></span>
                              {app.appointment_time}
                          </span>
                      </div>
                      <p className="text-[10px] font-bold text-primary uppercase mb-3">{app.service_name}</p>
                      
                      {matchedCampaign && (
                          <div className="mb-3 text-[10px] bg-white border border-primary/20 text-primary px-2 py-1 rounded-lg font-black flex items-center gap-1">
                              <Sparkles size={10} /> 
                              {matchedCampaign.discount_percent > 0 ? `%${matchedCampaign.discount_percent} İndirim` : ''} - {matchedCampaign.title}
                          </div>
                      )}
                      <div className="flex gap-2 mt-2">
                         <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(app.id, 'confirmed');
                              setShowTemplateModal(app);
                            }} 
                            className="flex-1 py-2 bg-green-500 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-colors"
                         >
                            Onayla & Yaz
                         </button>
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if(confirm(`${app.customer_name} isimli kişinin randevusunu reddetmek istediğinize emin misiniz?`)) {
                                    updateStatus(app.id, 'rejected');
                                }
                            }} 
                            className="flex-1 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                         >
                            <X size={12} /> Reddet
                         </button>
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              {/* CLOSEST APPOINTMENTS */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                   <Clock size={20} className="text-gray-400" /> Yaklaşanlar
                </h3>
                <div className="space-y-3">
                   {appointments
                      .filter(a => a.status === 'confirmed' && new Date(a.appointment_date) >= new Date(new Date().setHours(0,0,0,0)))
                      .sort((a, b) => new Date(`${a.appointment_date}T${a.appointment_time}`).getTime() - new Date(`${b.appointment_date}T${b.appointment_time}`).getTime())
                      .slice(0, 5)
                      .map(app => (
                        <div 
                           key={app.id} 
                           onClick={() => setSelectedDate(app.appointment_date)}
                           className="p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group"
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors">
                                 {new Date(app.appointment_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                              </span>
                              <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-lg border border-gray-100 shadow-sm text-gray-600">
                                 {app.appointment_time}
                              </span>
                           </div>
                           <h4 className="font-bold text-xs text-gray-800 truncate">{app.customer_name}</h4>
                           <p className="text-[10px] text-gray-400 truncate mt-0.5">{app.service_name}</p>
                        </div>
                   ))}
                   {appointments.filter(a => a.status === 'confirmed' && new Date(a.appointment_date) >= new Date(new Date().setHours(0,0,0,0))).length === 0 && (
                      <div className="text-center py-8 opacity-50">
                         <Calendar size={24} className="mx-auto mb-2 text-gray-300" />
                         <p className="text-[10px] uppercase font-bold text-gray-400">Yaklaşan randevu yok</p>
                      </div>
                   )}
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
                                            <button 
                                              onClick={() => {
                                                if(confirm('İptal etmek istediğinize emin misiniz?')) {
                                                  updateStatus(app.id, 'rejected');
                                                }
                                              }} 
                                              className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                            >
                                              <X size={16} />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setShowEditModal(app);
                                                    setEditFormData({
                                                        date: app.appointment_date,
                                                        time: app.appointment_time,
                                                        duration: app.duration || 60,
                                                        status: app.status
                                                    });
                                                }}
                                                className="p-2.5 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                                <Settings size={16} />
                                            </button>
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
                <button onClick={() => { setShowTemplateModal(null); setEditingMessage(null); }} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                
                {!editingMessage ? (
                  <>
                    <div className="mb-8">
                       <h2 className="text-2xl font-black text-gray-800">Mesaj Şablonu Seç</h2>
                       <p className="text-gray-400 text-sm">{showTemplateModal.customer_name} için WhatsApp mesajı gönderin</p>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                       {templates.map(t => (
                         <button 
                           key={t.id}
                           onClick={() => { 
                              const msg = processTemplate(t.content, showTemplateModal);
                              setEditingMessage(msg);
                           }}
                           className="w-full p-6 bg-gray-50 border-2 border-transparent hover:border-primary hover:bg-primary/5 rounded-3xl text-left transition-all active:scale-95 group"
                         >
                            <div className="flex items-center gap-3 mb-2">
                               <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors"><MessageSquare size={18} /></div>
                               <span className="font-black text-gray-800">{t.name}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed italic line-clamp-2">{processTemplate(t.content, showTemplateModal)}</p>
                         </button>
                       ))}
                       {templates.length === 0 && (
                          <div className="text-center py-8 text-gray-300">
                             <p className="font-bold text-sm">Kayıtlı şablon yok.</p>
                             <button onClick={() => { setShowTemplateModal(null); setActiveTab('templates'); }} className="text-primary text-xs font-black uppercase mt-2 hover:underline">Şablon Oluştur</button>
                          </div>
                       )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div>
                       <button onClick={() => setEditingMessage(null)} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-800 mb-4 transition-colors"><ChevronLeft size={14} /> Şablonlara Dön</button>
                       <h2 className="text-xl font-black text-gray-800">Mesajı Düzenle</h2>
                    </div>
                    
                    <textarea 
                      value={editingMessage || ''}
                      onChange={(e) => setEditingMessage(e.target.value)}
                      className="w-full h-48 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 focus:border-primary focus:bg-white outline-none font-medium text-gray-600 resize-none text-sm leading-relaxed"
                    />

                    <button 
                      onClick={() => {
                        let phone = showTemplateModal.phone.replace(/\D/g, '');
                        if (!phone.startsWith('90')) phone = '90' + phone;
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(editingMessage || '')}`, '_blank');
                        setShowTemplateModal(null);
                        setEditingMessage(null);
                      }}
                      className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg shadow-green-200"
                    >
                       <MessageSquare size={20} /> WhatsApp'ta Gönder
                    </button>
                  </div>
                )}
             </motion.div>
          </div>
        )}

        {/* TIME BLOCK MODAL */}
        {showTimeBlockModal && (
             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative">
                    <button onClick={() => setShowTimeBlockModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2"><Coffee className="text-gray-400" /> Mola/Kapalı Aralık</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Başlangıç Saati</label>
                            <input 
                                type="time"
                                value={blockTimeData.time}
                                onChange={(e) => setBlockTimeData({...blockTimeData, time: e.target.value})}
                                className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none focus:ring-2 ring-primary/20"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Süre (Dakika)</label>
                            <input 
                                type="number"
                                value={blockTimeData.duration}
                                onChange={(e) => setBlockTimeData({...blockTimeData, duration: e.target.value})}
                                className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none focus:ring-2 ring-primary/20"
                            />
                        </div>
                        <div>
                             <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Not (Opsiyonel)</label>
                             <input 
                                type="text"
                                value={blockTimeData.note}
                                onChange={(e) => setBlockTimeData({...blockTimeData, note: e.target.value})}
                                className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 ring-primary/20"
                             />
                        </div>

                        <button 
                            onClick={async () => {
                                await fetch('/api/appointments', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                      name: 'KAPALI ARALIK', 
                                      email: 'admin@derya.com', 
                                      phone: '-', 
                                      service_id: 0, 
                                      service_name: blockTimeData.note || 'MOLA', 
                                      date: selectedDate, 
                                      time: blockTimeData.time, 
                                      duration: parseInt(blockTimeData.duration), 
                                      notes: 'Mola'
                                    })
                                });
                                fetchAppointments();
                                setShowTimeBlockModal(false);
                            }}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg"
                        >
                            Oluştur
                        </button>
                    </div>
                </motion.div>
             </div>
        )}

        {/* EDIT APPOINTMENT MODAL */}
        {showEditModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative">
                    <button onClick={() => setShowEditModal(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">Randevu Düzenle</h3>
                    <p className="text-xs font-bold text-gray-400 mb-4 uppercase">{showEditModal.customer_name}</p>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Tarih</label>
                            <input 
                                type="date"
                                value={editFormData.date}
                                onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                                className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none focus:ring-2 ring-primary/20"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Saat</label>
                                <input 
                                    type="time"
                                    value={editFormData.time}
                                    onChange={(e) => setEditFormData({...editFormData, time: e.target.value})}
                                    className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Süre (Dk)</label>
                                <input 
                                    type="number"
                                    value={editFormData.duration}
                                    onChange={(e) => setEditFormData({...editFormData, duration: parseInt(e.target.value)})}
                                    className="w-full p-4 bg-gray-50 rounded-2xl font-black text-gray-800 outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Durum</label>
                            <select 
                                value={editFormData.status}
                                onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                                className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 ring-primary/20"
                            >
                                <option value="pending">Bekliyor</option>
                                <option value="confirmed">Onaylı</option>
                                <option value="rejected">Reddedildi</option>
                                <option value="cancelled">İptal Edildi</option>
                            </select>
                        </div>
                        <button 
                            onClick={handleUpdateAppointment}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dark transition-all shadow-lg"
                        >
                            Güncelle & Kaydet
                        </button>
                    </div>
                </motion.div>
            </div>
        )}

        {activeTab === 'gallery' && (
          <GalleryManager
            gallery={gallery}
            onUpload={async (file, cat, cap) => {
               setUploading(true);
               try {
                 const fd = new FormData(); fd.append('file', file); fd.append('category', cat); fd.append('caption', cap);
                 const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
                 if (!res.ok) throw new Error('Yükleme başarısız');
                 fetchGallery();
                 alert('Görsel eklendi!');
               } catch (e) {
                 alert('Görsel yüklenirken bir hata oluştu. Lütfen dosya boyutunu kontrol edin.');
               }
               setUploading(false);
            }}
            onDelete={async (id) => { if (confirm('Emin misiniz?')) { await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' }); fetchGallery(); } }}
            uploading={uploading}
          />
        )}
        {activeTab === 'services' && <ServiceManager services={services} onRefresh={fetchServices} />}
        {activeTab === 'reports' && <ReportManager appointments={appointments} services={services} expenses={expenses} />}
        {activeTab === 'campaigns' && <CampaignManager />}
        {activeTab === 'posts' && <PostManager />}
        {activeTab === 'beforeafter' && <BeforeAfterManager />}
        {activeTab === 'templates' && <TemplateManager templates={templates} onRefresh={fetchTemplates} />}
        {activeTab === 'testimonials' && <TestimonialManager />}
        {activeTab === 'faqs' && <FAQManager />}
        {activeTab === 'expenses' && <ExpenseManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </div>
    </div>
  );
}
