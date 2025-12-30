'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, LogOut, Image as ImageIcon } from 'lucide-react';
import GalleryManager from '@/components/admin/GalleryManager';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'gallery'>('appointments');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchAppointments();
    fetchGallery();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/admin/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery', error);
    }
  };

  const handleImageUpload = async (file: File, category: string, caption: string) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('caption', caption);

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchGallery();
      } else {
        alert('Yükleme başarısız!');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Yükleme hatası!');
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (id: number) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchGallery();
      }
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    setAppointments(apps => apps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));

    try {
      await fetch('/api/admin/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (newStatus === 'confirmed') {
        const appointment = appointments.find(a => a.id === id);
        if (appointment && appointment.phone) {
          let phone = appointment.phone.replace(/\D/g, '');
          if (!phone.startsWith('90')) phone = '90' + phone;
          
          const message = encodeURIComponent(`Merhaba ${appointment.customer_name}, Derya Yurdusay Nail Art randevunuz onaylanmıştır. 🌸\\nTarih: ${appointment.appointment_date}\\nSaat: ${appointment.appointment_time}`);
          window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Failed to update status', error);
      fetchAppointments();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'appointments' ? 'Randevu Yönetimi' : 'Galeri Yönetimi'}
              </h1>
              <p className="text-gray-500 text-sm">
                {activeTab === 'appointments' 
                  ? 'Tüm randevuları buradan yönetebilirsiniz' 
                  : 'Galeri görsellerini ekleyin ve yönetin'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === 'appointments' && (
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold">
                  {appointments.filter(a => a.status === 'pending').length} Yeni
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'appointments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500'
              }`}
            >
              Randevular
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'gallery'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500'
              }`}
            >
              Galeri
            </button>
          </div>
        </header>

        {activeTab === 'appointments' ? (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Henüz randevu yok</div>
            ) : (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{app.customer_name}</h3>
                      <p className="text-sm text-gray-600">{app.email} | {app.phone}</p>
                      <p className="text-sm text-gray-600">{app.service}</p>
                      <p className="text-sm text-gray-600">{app.appointment_date} - {app.appointment_time}</p>
                    </div>
                    <div className="flex gap-2">
                      {app.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => updateStatus(app.id, 'confirmed')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, 'cancelled')}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <span className={`px-4 py-2 rounded-lg ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {app.status === 'confirmed' ? 'Onaylandı' : 'İptal'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <GalleryManager
            gallery={gallery}
            onUpload={handleImageUpload}
            onDelete={handleImageDelete}
            uploading={uploading}
          />
        )}
      </div>
    </div>
  );
}
