'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Star, Quote, User, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5, service: '' });
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const pendingItems = items.filter(i => !i.approved);
  const approvedItems = items.filter(i => i.approved);
  const displayedItems = filter === 'all' ? items : filter === 'pending' ? pendingItems : approvedItems;

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

  const handleApprove = async (id: number) => {
      const res = await fetch('/api/admin/testimonials', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id, approved: true })
      });
      if(res.ok) {
          toast.success('Yorum onaylandı ve yayına alındı');
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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-2">
          <button onClick={() => setFilter('pending')} className={`pb-2 px-4 font-bold ${filter === 'pending' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}>Bekleyen ({pendingItems.length})</button>
          <button onClick={() => setFilter('approved')} className={`pb-2 px-4 font-bold ${filter === 'approved' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}>Onaylanan ({approvedItems.length})</button>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-6">
        {displayedItems.map(item => (
          <div key={item.id} className={`bg-white p-6 rounded-[32px] border ${!item.approved ? 'border-orange-100 bg-orange-50/10' : 'border-gray-100'} relative group`}>
             <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {!item.approved && (
                    <button onClick={() => handleApprove(item.id)} className="p-2 bg-green-50 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors" title="Onayla"><Check size={18} /></button>
                )}
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors" title="Sil"><Trash2 size={18} /></button>
             </div>
             
             {!item.approved && <span className="absolute top-4 left-4 text-[9px] font-black bg-orange-100 text-orange-500 px-2 py-1 rounded-lg">ONAY BEKLİYOR</span>}
             
             <div className="flex gap-1 mb-2 mt-6">
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
        {displayedItems.length === 0 && <div className="col-span-2 text-center py-10 text-gray-400 font-bold">Kayıt bulunamadı.</div>}
      </div>
    </div>
  );
}
