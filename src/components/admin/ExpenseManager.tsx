'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', amount: '', category: 'other', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    const res = await fetch('/api/admin/expenses');
    if (res.ok) setExpenses(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    setLoading(true);
    const res = await fetch('/api/admin/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
        toast.success('Gider eklendi');
        setForm({ title: '', amount: '', category: 'other', date: new Date().toISOString().split('T')[0] });
        fetchExpenses();
    } else {
        toast.error('Hata oluştu');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
      if(!confirm('Silmek istediğinize emin misiniz?')) return;
      const res = await fetch(`/api/admin/expenses/${id}`, { method: 'DELETE' });
      if(res.ok) {
          toast.success('Silindi');
          fetchExpenses();
      }
  };

  const categories: Record<string, string> = {
      'rent': 'Kira/Aidat',
      'material': 'Malzeme',
      'bill': 'Fatura',
      'salary': 'Maaş',
      'other': 'Diğer'
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    <div className="space-y-8">
        <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-red-100 rounded-2xl text-red-500"><TrendingDown size={24} /></div>
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Toplam Gider (Bu Ay)</h3>
                    <p className="text-3xl font-black text-red-500">{totalExpense.toLocaleString('tr-TR')} ₺</p>
                </div>
            </div>
            {/* Simple month filter (future) */}
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Plus className="text-primary" /> Yeni Gider Ekle</h3>
            <form onSubmit={handleAdd} className="grid md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Gider Adı</label>
                    <input type="text" placeholder="Örn: Kira" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl font-bold outline-none focus:ring-2 ring-red-200" required />
                </div>
                <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Tutar (TL)</label>
                    <input type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl font-bold outline-none focus:ring-2 ring-red-200" required />
                </div>
                <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Kategori</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl font-bold outline-none focus:ring-2 ring-red-200">
                        {Object.entries(categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>
                <button disabled={loading} className="p-3 bg-red-500 text-white rounded-xl font-black hover:bg-red-600 transition-colors">EKLE</button>
            </form>
        </div>

        <div className="space-y-4">
            {expenses.map(exp => (
                <div key={exp.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-xl font-black text-xs uppercase w-24 text-center">{categories[exp.category] || exp.category}</div>
                        <div>
                            <h4 className="font-bold text-gray-800">{exp.title}</h4>
                            <p className="text-xs text-gray-400 font-bold">{exp.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-black text-lg text-red-500">-{parseFloat(exp.amount).toLocaleString('tr-TR')} ₺</span>
                        <button onClick={() => handleDelete(exp.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                </div>
            ))}
            {expenses.length === 0 && <p className="text-center text-gray-400 font-bold py-10">Kayıtlı gider yok.</p>}
        </div>
    </div>
  );
}
