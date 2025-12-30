'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BeforeAfterManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', before_url: '', after_url: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/before-after');
    if (res.ok) setItems(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/before-after', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success('Öncesi/Sonrası eklendi');
      setForm({ title: '', before_url: '', after_url: '' });
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
        <form onSubmit={handleAdd} className="space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Öncesi Görsel URL</label>
              <input 
                type="text" 
                placeholder="https://..." 
                value={form.before_url} 
                onChange={(e) => setForm({...form, before_url: e.target.value})} 
                className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Sonrası Görsel URL</label>
              <input 
                type="text" 
                placeholder="https://..." 
                value={form.after_url} 
                onChange={(e) => setForm({...form, after_url: e.target.value})} 
                className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
                required 
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="glitter-btn px-12 py-5 rounded-2xl font-black uppercase tracking-widest w-full">
            {loading ? 'Ekleniyor...' : 'Öncesi/Sonrası Ekle'}
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
