'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Star, Quote, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5, service: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/testimonials');
    if (res.ok) setItems(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success('Yorum başarıyla eklendi');
      setForm({ name: '', comment: '', rating: 5, service: '' });
      fetchItems();
    } else {
        toast.error('Hata oluştu');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Silindi');
      fetchItems();
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <Plus size={24} />
          <h3 className="text-xl font-black">Yeni Yorum Ekle</h3>
        </div>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Müşteri Adı" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" required />
            <input type="text" placeholder="Hizmet (Örn: Nail Art)" value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
             <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                <span className="font-bold text-gray-400 text-sm">Puan:</span>
                {[1,2,3,4,5].map(star => (
                    <button type="button" key={star} onClick={() => setForm({...form, rating: star})} className={`${form.rating >= star ? 'text-orange-400' : 'text-gray-300'}`}>
                        <Star size={24} fill="currentColor" />
                    </button>
                ))}
             </div>
          </div>
          <textarea placeholder="Müşteri Yorumu" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold h-32 resize-none" required />
          <button type="submit" disabled={loading} className="w-full bg-primary text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-colors disabled:opacity-50">Yorum Ekle</button>
        </form>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 relative group">
             <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
             <div className="flex gap-1 mb-2">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} className="text-orange-400 fill-current" />)}
             </div>
             <p className="text-gray-600 italic text-sm mb-4 leading-relaxed">"{item.comment}"</p>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><User size={20} /></div>
                <div>
                   <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                   <p className="text-[10px] text-primary uppercase font-black">{item.service}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
