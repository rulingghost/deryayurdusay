'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BeforeAfterManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{title: string; before_file: File | null; after_file: File | null}>({ title: '', before_file: null, after_file: null });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/before-after');
    if (res.ok) setItems(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.before_file || !form.after_file) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('before_image', form.before_file);
    fd.append('after_image', form.after_file);

    const res = await fetch('/api/admin/before-after', {
      method: 'POST',
      body: fd,
    });

    if (res.ok) {
      toast.success('Öncesi/Sonrası eklendi');
      setForm({ title: '', before_file: null, after_file: null });
      fetchItems();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/admin/before-after/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Başarıyla silindi');
      fetchItems();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-8 text-primary">
          <Sparkles size={24} />
          <h3 className="text-xl font-black uppercase tracking-tight">Yeni Öncesi/Sonrası Ekle</h3>
        </div>
        <form onSubmit={handleAdd} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Başlık / İşlem Adı</label>
            <input 
              type="text" 
              placeholder="Örn: Tırnak Rekonstrüksiyonu" 
              value={form.title} 
              onChange={(e) => setForm({...form, title: e.target.value})} 
              className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BEFORE IMAGE UPLOAD */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Öncesi Görseli</label>
              <div 
                 onClick={() => document.getElementById('before_upload')?.click()}
                 className={`relative w-full aspect-square rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50/50 group overflow-hidden ${form.before_file ? 'border-primary/50' : 'border-gray-200'}`}
              >
                  {form.before_file ? (
                      <img src={URL.createObjectURL(form.before_file)} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                      <div className="text-center p-6 space-y-2 group-hover:scale-110 transition-transform">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400"><ImageIcon size={20} /></div>
                          <span className="text-xs font-bold text-gray-400 block">Görsel Seç</span>
                      </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <p className="text-white font-bold text-xs uppercase tracking-widest">Değiştir</p>
                  </div>
                  <input 
                    id="before_upload"
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && setForm({...form, before_file: e.target.files[0]})} 
                  />
              </div>
            </div>

            {/* AFTER IMAGE UPLOAD */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Sonrası Görseli</label>
              <div 
                 onClick={() => document.getElementById('after_upload')?.click()}
                 className={`relative w-full aspect-square rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50/50 group overflow-hidden ${form.after_file ? 'border-primary/50' : 'border-gray-200'}`}
              >
                  {form.after_file ? (
                      <img src={URL.createObjectURL(form.after_file)} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                      <div className="text-center p-6 space-y-2 group-hover:scale-110 transition-transform">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400"><ImageIcon size={20} /></div>
                          <span className="text-xs font-bold text-gray-400 block">Görsel Seç</span>
                      </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <p className="text-white font-bold text-xs uppercase tracking-widest">Değiştir</p>
                  </div>
                  <input 
                    id="after_upload"
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && setForm({...form, after_file: e.target.files[0]})} 
                  />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading || !form.title || !form.before_file || !form.after_file} className="glitter-btn px-12 py-5 rounded-2xl font-black uppercase tracking-widest w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Yükleniyor...' : 'Öncesi/Sonrası Ekle'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-black text-gray-800">{item.title}</h4>
              <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-400 uppercase">Öncesi</span>
                <img src={item.before_url} className="w-full aspect-square object-cover rounded-2xl" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-primary uppercase">Sonrası</span>
                <img src={item.after_url} className="w-full aspect-square object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
