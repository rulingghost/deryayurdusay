'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FAQManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ question: '', answer: '', order: 1 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/faqs');
    if (res.ok) setItems(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success('Soru başarıyla eklendi');
      setForm({ question: '', answer: '', order: items.length + 1 });
      fetchItems();
    } else {
        toast.error('Hata oluştu');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
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
          <h3 className="text-xl font-black">Yeni Soru Ekle (S.S.S)</h3>
        </div>
        <form onSubmit={handleAdd} className="space-y-4">
            <input type="text" placeholder="Soru" value={form.question} onChange={e => setForm({...form, question: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" required />
            <textarea placeholder="Cevap" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold h-32 resize-none" required />
            <input type="number" placeholder="Sıra No" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-32" />
            <button type="submit" disabled={loading} className="w-full bg-primary text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-colors disabled:opacity-50">Ekle</button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 relative group flex items-start gap-4">
             <div className="p-4 bg-primary/5 text-primary rounded-2xl">
                <HelpCircle size={24} />
             </div>
             <div className="flex-1">
                <h4 className="font-black text-gray-800 mb-2">{item.question}</h4>
                <p className="text-gray-500 leading-relaxed text-sm">{item.answer}</p>
                <div className="mt-2 text-[10px] text-gray-300 font-bold uppercase">Sıra: {item.display_order}</div>
             </div>
             <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
